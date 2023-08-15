/*!
Copyright (c) The Cytoscape Consortium

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the “Software”), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import fileSaver from 'file-saver';
import { renderFileLayer } from '/@/views/dataviz/dataview/leafletFunc';

(function (window) {
  'use strict';

  // registers the extension on a cytoscape lib ref
  var register = function (cytoscape, $) {
    if (!cytoscape || !$) {
      return;
    } // can't register if cytoscape or jquery unspecified

    $.fn.cyPanzoom = $.fn.cytoscapePanzoom = function (options) {
      panzoom.apply(this, [options, cytoscape, $]);

      return this; // chainability
    };

    // if you want a core extension
    cytoscape('core', 'panzoom', function (options) {
      // could use options object, but args are up to you
      panzoom.apply(this, [options, cytoscape, $]);

      return this; // chainability
    });
  };

  var defaults = {
    zoomFactor: 0.1, // zoom factor per zoom tick
    minZoom: 0.1, // min zoom level
    maxZoom: 10, // max zoom level
    fitPadding: 50, // padding when fitting
    fitSelector: undefined, // selector of elements to fit
    animateOnFit: function () {
      // whether to animate on fit
      return false;
    },
    fitAnimationDuration: 1000, // duration of animation on fit

    // icon class names
    sliderHandleIcon: 'fas fa-minus',
    resetIcon: 'fas fa-house fa-xl',
    zoomInIcon: 'fas fa-plus fa-xl',
    zoomOutIcon: 'fas fa-minus fa-xl',
    fullscreenIcon: 'fas fa-expand fa-xl',
    exportIcon: 'fas fa-download fa-xl',
    lassoIcon: 'fas fa-object-group fa-xl',
    openIcon: 'fas fa-folder-open fa-xl',
    panelIcon: 'fas fa-info fa-xl',
    searchIcon: 'fas fa-magnifying-glass fa-xl',
    layoutIcon: 'fas fa-sitemap fa-xl',
    layouts: [],
    legend: {},
    fileName: 'network.png',
    dataFile: undefined,
    viewUtil: undefined,
    toolkit: {},
  };

  var panzoom = function (params, cytoscape, $) {
    var cyRef = this;
    var options = $.extend(true, {}, defaults, params);
    var fn = params;

    var functions = {
      destroy: function () {
        var $this = $(cyRef.container());
        var $pz = $this.find('.cy-toolkit');

        $pz.data('winbdgs').forEach(function (l) {
          $(window).unbind(l.evt, l.fn);
        });

        $pz.data('cybdgs').forEach(function (l) {
          cyRef.off(l.evt, l.fn);
        });

        $pz.remove();
      },

      init: function () {
        return $(cyRef.container()).each(function () {
          var $container = $(this);
          $container.cytoscape = cytoscape;

          var winbdgs = [];
          var $win = $(window);

          var windowBind = function (evt, fn) {
            winbdgs.push({ evt: evt, fn: fn });

            $win.bind(evt, fn);
          };

          var windowUnbind = function (evt, fn) {
            for (var i = 0; i < winbdgs.length; i++) {
              var l = winbdgs[i];

              if (l.evt === evt && l.fn === fn) {
                winbdgs.splice(i, 1);
                break;
              }
            }

            $win.unbind(evt, fn);
          };

          var cybdgs = [];

          let toolkit = document.createElement('div');
          toolkit.className = 'cy-toolkit';
          $container.prepend(toolkit);

          // toolbox on left
          buildToolkit('reset', toolkit);
          buildToolkit('zoomIn', toolkit);
          buildToolkit('zoomOut', toolkit);
          if (options.toolkit.fullscreen) {
            buildToolkit('fullscreen', toolkit);
          }
          if (options.toolkit.export) {
            buildToolkit('export', toolkit);
          }
          if (options.toolkit.open) {
            buildToolkit('open', toolkit);
          }
          if (options.toolkit.lasso) {
            buildToolkit('lasso', toolkit);
          }
          if (options.toolkit.panel) {
            buildToolkit('panel', toolkit);
          }
          let infoPanel = document.createElement('div');
          infoPanel.className = 'cy-info-panel';
          $container.prepend(infoPanel);

          if (options.toolkit.search) {
            buildToolkit('search', toolkit);
          }

          // legend panel on right
          let legendPanel = document.createElement('div');
          legendPanel.className = 'cy-legend-panel';
          $container.prepend(legendPanel);

          // layout selection
          var layoutSelect = document.createElement('select');
          layoutSelect.className = 'cy-toolkit-layout';
          for (const lay of options.layouts) {
            var opt = document.createElement('option');
            opt.value = lay.name;
            const textNode = document.createTextNode(lay.alias);
            opt.append(textNode);
            layoutSelect.appendChild(opt);
          }
          legendPanel.append(layoutSelect);

          let legendArea = document.createElement('div');
          legendArea.className = 'cy-legend-area';
          legendPanel.append(legendArea);

          for (const lg of options.legend?.items) {
            const itemIcon = document.createElement('i');
            const itemText = document.createElement('span');
            itemText.innerText = lg.label;
            if (lg.shape) {
              itemIcon.className = 'icon fas fa-' + lg.shape + ' fa-lg';
              itemIcon.style.color = 'LightSeaGreen';
              itemText.legendField = options.legend.shapeField;
              itemText[options.legend.shapeField] = lg.value;
            } else if (lg.color) {
              itemIcon.className = 'icon fas fa-square fa-lg';
              itemIcon.style.color = lg.color;
              itemText.legendField = options.legend.colorField;
              itemText[options.legend.colorField] = lg.color;
            }
            itemText.onclick = handleLegendSelection;
            //const itemCheck = document.createElement('input');
            //itemCheck.type = 'checkbox';
            //itemCheck.id = lg.label;
            //itemCheck.value = lg.label;
            const itemLabel = document.createElement('label');
            itemLabel.className = 'cy-legend-item';
            itemLabel.appendChild(itemIcon);
            itemLabel.appendChild(itemText);
            //itemLabel.appendChild(itemCheck);
            legendArea.append(itemLabel);
          }

          // functions for calculating panning
          ////////////////////////////////////

          function handle2pan(e) {
            var v = {
              x: e.originalEvent.pageX - $panner.offset().left - $panner.width() / 2,
              y: e.originalEvent.pageY - $panner.offset().top - $panner.height() / 2,
            };

            var r = options.panDragAreaSize;
            var d = Math.sqrt(v.x * v.x + v.y * v.y);
            var percent = Math.min(d / r, 1);

            if (d < options.panInactiveArea) {
              return {
                x: NaN,
                y: NaN,
              };
            }

            v = {
              x: v.x / d,
              y: v.y / d,
            };

            percent = Math.max(options.panMinPercentSpeed, percent);

            var vnorm = {
              x: -1 * v.x * (percent * options.panDistance),
              y: -1 * v.y * (percent * options.panDistance),
            };

            return vnorm;
          }

          function donePanning() {
            clearInterval(panInterval);
            windowUnbind('mousemove', handler);
          }

          var zx, zy;
          var panInterval;

          var handler = function (e) {
            e.stopPropagation(); // don't trigger dragging of panzoom
            e.preventDefault(); // don't cause text selection
            clearInterval(panInterval);

            var pan = handle2pan(e);

            if (isNaN(pan.x) || isNaN(pan.y)) {
              $pIndicator.hide();
              return;
            }

            panInterval = setInterval(function () {
              cyRef.panBy(pan);
            }, options.panSpeed);
          };

          windowBind('mouseup blur', function () {
            donePanning();
          });

          const doZoom = function (factor) {
            var zoom = cyRef.zoom();
            var lvl = zoom * factor;

            if (lvl < options.minZoom) {
              lvl = options.minZoom;
            }

            if (lvl > options.maxZoom) {
              lvl = options.maxZoom;
            }

            if (lvl < options.maxZoom && lvl > options.minZoom) {
              zx = $container.width() / 2;
              zy = $container.height() / 2;
              cyRef.zoom({
                level: lvl,
                position: { x: zx, y: zy },
              });
            }
          };

          function buildToolkit(name, container) {
            var toolIcon = document.createElement('i');
            toolIcon.className = 'icon ' + options[name + 'Icon'];
            var toolButton = document.createElement('div');
            toolButton.className = 'cy-toolkit-button';
            toolButton.id = name;
            toolButton.appendChild(toolIcon);
            container.append(toolButton);
            switch (name){
              case 'reset':{
                toolButton.onclick = handleReset;
                break;
              }
              case 'zoomIn':{
                toolButton.onclick = handleZoomIn;
                break;
              }
              case 'zoomOut':{
                toolButton.onclick = handleZoomOut;
                break;
              }
              case 'fullscreen':{
                toolButton.onclick = handleFullscreen;
                break;
              }
              case 'export':{
                toolButton.onclick = handleExport;
                break;
              }
              case 'open':{
                toolButton.onclick = handleOpen;
                var openDlg = document.createElement('input');
                openDlg.type = 'file';
                openDlg.className = 'cy-file-dlg';
                openDlg.onchange = handleOpenFile;
                container.append(openDlg);
                break;
              }
              case 'lasso':{
                toolButton.onclick = handleLasso;
                break;
              }
              case 'panel':{
                toolButton.onclick = handlePanel;
                break;
              }
              case 'search':{
                toolButton.className = 'cy-search-button';
                let searchInput = document.createElement('input');
                searchInput.type = 'search';
                searchInput.placeholder = 'Search...';
                searchInput.className = 'cy-search-input';
                toolButton.appendChild(searchInput);
                toolButton.onclick = handleSearch;
                break;
              }
            }
          }

          // zoom in buttons
          function handleZoomIn(e) {
            if (e.button != 0) {
              return;
            }
            e.preventDefault();
            e.stopPropagation();
            doZoom(1 + options.zoomFactor);
          }

          // zoom out buttons
          function handleZoomOut(e) {
            if (e.button != 0) {
              return;
            }
            e.preventDefault();
            e.stopPropagation();
            doZoom(1 - options.zoomFactor);
          }

          // reset button
          function handleReset(e) {
            if (e.button != 0) {
              return;
            }

            cyRef.reset();
            cyRef.fit(cyRef.elements());
            cyRef.elements().style('opacity', 1);
          }

          // fullscreen button
          function handleFullscreen(e) {
            if (e.button != 0) {
              return;
            }

            const fullscreenElement =
              document.fullscreenElement ||
              document.msFullscreenElement ||
              document.mozFullScreenElement ||
              document.webkitFullscreenElement;

            let fullscreenEnabled = false;
            let prefixName = undefined;
            // 判断浏览器前缀
            if (document.fullscreenEnabled) {
              fullscreenEnabled = document.fullscreenEnabled;
            } else if (document.webkitFullscreenEnabled) {
              fullscreenEnabled = document.webkitFullscreenEnabled;
              prefixName = 'webkit';
            } else if (document.mozFullScreenEnabled) {
              fullscreenEnabled = document.mozFullScreenEnabled;
              prefixName = 'moz';
            }

            if (fullscreenElement === null) {
              if (fullscreenEnabled) {
                const element = cyRef.container();
                const methodName = prefixName == undefined ? 'requestFullscreen' : `${prefixName}RequestFullScreen`;
                element[methodName]();
              }
            } else {
              const methodName =
                prefixName === undefined ? 'exitFullscreen' : `${prefixName}ExitFullscreen`;
              document[methodName]();
            }
          }

          // lasso button
          function handleLasso(e) {
            if (e.button != 0) {
              return;
            }
            if (options.viewUtil) {
              options.viewUtil.enableLassoMode();
            }
          }

          // export button
          function handleExport(e) {
            if (e.button != 0) {
              return;
            }
            if (options.fileName.endsWith('.png')) {
              fileSaver.saveAs(cyRef.png(), options.fileName);
            } else if (options.fileName.endsWith('.json')) {
              let json = JSON.stringify(cyRef.json());
              let blob = new Blob([json], { type: 'application/json' });
              fileSaver.saveAs(blob, options.fileName);
            }
          }

          // open file button
          function handleOpen(e) {
            if (e.button != 0) {
              return;
            }
            let fileDlg = $('.cy-file-dlg');
            if (fileDlg) {
              fileDlg.click();
            }
            return false;
          }

          // open file dialog
          function handleOpenFile(e) {
            let files = Array.from(openDlg.files);
            if (files[0]) {
              const fileReader = new FileReader();
              fileReader.onload = () => {
                try {
                  // render file layer after data is loaded successfully
                  //mapInfo.file.data = fileReader.result;
                  if (files[0].type == 'application/json' && fileReader.result) {
                    options.dataFile.value = JSON.parse(fileReader.result);
                  }
                } catch (error) {
                  console.error(error);
                }
              };

              fileReader.onerror = (event) => {
                console.error(event);
              };
              fileReader.readAsText(files[0]);
            }
          }

          // lasso button
          function handleLegendSelection(e) {
            if (e.button != 0) {
              return;
            }
            cyRef.elements().style('opacity', 0.2);
            let catNodes = cyRef.nodes('['+e.currentTarget.legendField+'="'+e.currentTarget[e.currentTarget.legendField]+'"]');
            if (catNodes.length == 0) {
              catNodes = cyRef.nodes('['+e.currentTarget.legendField+'='+e.currentTarget[e.currentTarget.legendField]+']');
            }
            catNodes.style('opacity', 1);
          }

          // search buttons
          function handleSearch(e) {
            if (e.button != 0) {
              return;
            }
          }

          // layout selection change
          if (layoutSelect) {
            layoutSelect.onchange = function (e) {
              const selectedOption = e.target[e.target.selectedIndex];
              const layoutName = selectedOption.label;
              const layoutValue = e.target.value;
              const selectedLayout = options.layouts.find((ele) => {
                return ele.alias == layoutName;
              });
              if (selectedLayout) {
                cyRef.layout({ name: layoutValue, ...selectedLayout.options }).run();
              }
            };
          }

          // show/hide panel
          function handlePanel(e) {
            if (e.button != 0) {
              return;
            }

            let infoPanel = $('.cy-info-panel');
            if (infoPanel) {
              infoPanel.toggle();
            }
          }
        });
      },
      update: function (option) {
        for (const key of Object.keys(option)) {
          if (key == 'layouts') {
            // rebuild layout options
            let layoutSelect = $('.cy-toolkit-layout');
            // current selected layout
            let currentLayoutAlias = layoutSelect.find('option:selected').text();
            let selectedLayout = options.layouts.find((ele) => {
              return ele.alias == currentLayoutAlias;
            });
            //let layOptions = $('.cy-toolkit-layout option');
            // remove all options first
            $('.cy-toolkit-layout option').remove();

            let newSelectedLayout;
            for (const lay of option.layouts) {
              // rebuild options
              const opt = document.createElement('option');
              opt.value = lay.name;
              const textNode = document.createTextNode(lay.alias);
              if (lay.alias == currentLayoutAlias) {
                opt.selected = true;
                newSelectedLayout = lay;
              }
              opt.append(textNode);
              layoutSelect.append(opt);
            }

            if (!newSelectedLayout) {
              // current selected layout is deleted
              options.layouts = [...option.layouts];
              // run first layout option
              cyRef.layout({ name: option.layouts[0].name, ...option.layouts[0].options }).run();
            } else if (
              JSON.stringify(selectedLayout.options) != JSON.stringify(newSelectedLayout.options)
            ) {
              options.layouts = [...option.layouts];
              // run layout if current selected layout's option is changed
              cyRef.layout({ name: newSelectedLayout.name, ...newSelectedLayout.options }).run();
            } else {
              // non-selected layout is updated
              options.layouts = [...option.layouts];
            }
          } else if (key == 'legends') {
            //
          } else if (key == 'rankNodes') {
            // update rank info
            let infoPanel = $('.cy-info-panel');
            infoPanel.empty();
            for (const node of option.rankNodes) {
              const itemText = document.createElement('span');
              itemText.innerText = node.data('label') + ': ';
              const itemValue = document.createElement('span');
              itemValue.innerText = node.data('rec')[option.rankField];
              const itemLink = document.createElement('a');
              itemLink.className = 'cy-info-item';
              itemLink.cyNode = node;
              itemLink.appendChild(itemText);
              itemLink.appendChild(itemValue);
              itemLink.onclick = function (e) {
                e.currentTarget.cyNode.select();
              };
              infoPanel.append(itemLink);
            }
          } else if (key == 'infoNode') {
            // update rank info
            let infoPanel = $('.cy-info-panel');
            infoPanel.empty();
            if (!option.infoNode.data('rec')) {
              // don't have record
              return;
            }
            for (const field of option.infoFields) {
              const value = option.infoNode.data('rec')[field];
              if (value) {
                const itemText = document.createElement('span');
                itemText.innerText = field + ': ';
                const itemValue = document.createElement('span');
                itemValue.innerText = option.infoNode.data('rec')[field];
                const itemLink = document.createElement('a');
                itemLink.className = 'cy-info-item';
                itemLink.cyNode = option.infoNode;
                itemLink.appendChild(itemText);
                itemLink.appendChild(itemValue);
                itemLink.onclick = function (e) {
                  e.currentTarget.cyNode.select();
                };
                infoPanel.append(itemLink);
              }
            }
          } else if (key == 'tool') {
            let toolkit = $('.cy-toolkit');
            if (option.enabled) {
              buildToolkit(option.tool, toolkit);
            } else {
              let toolkitButtons = $('.cy-toolkit-button');
              for (const button of toolkitButtons) {
                if (button.id == option.tool) {
                  button.parentNode.removeChild(button);
                  break;
                }
              }
            }
          }
        }

        function buildToolkit(name, container) {
          var toolIcon = document.createElement('i');
          toolIcon.className = 'icon ' + options[name + 'Icon'];
          var toolButton = document.createElement('div');
          toolButton.className = 'cy-toolkit-button';
          toolButton.id = name;
          toolButton.appendChild(toolIcon);
          container.append(toolButton);
          switch (name){
            case 'reset':{
              toolButton.onclick = handleReset;
              break;
            }
            case 'zoomIn':{
              toolButton.onclick = handleZoomIn;
              break;
            }
            case 'zoomOut':{
              toolButton.onclick = handleZoomOut;
              break;
            }
            case 'fullscreen':{
              toolButton.onclick = handleFullscreen;
              break;
            }
            case 'export':{
              toolButton.onclick = handleExport;
              break;
            }
            case 'open':{
              toolButton.onclick = handleOpen;
              var openDlg = document.createElement('input');
              openDlg.type = 'file';
              openDlg.className = 'cy-file-dlg';
              openDlg.onchange = handleOpenFile;
              container.append(openDlg);
              break;
            }
            case 'lasso':{
              toolButton.onclick = handleLasso;
              break;
            }
            case 'panel':{
              toolButton.onclick = handlePanel;
              break;
            }
            case 'search':{
              toolButton.onclick = handleSearch;
              break;
            }
          }
        }

        // zoom in buttons
        function handleZoomIn(e) {
          if (e.button != 0) {
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          doZoom(1 + options.zoomFactor);
        }

        // zoom out buttons
        function handleZoomOut(e) {
          if (e.button != 0) {
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          doZoom(1 - options.zoomFactor);
        }

        // reset button
        function handleReset(e) {
          if (e.button != 0) {
            return;
          }
          cyRef.reset();
          cyRef.fit(cyRef.elements());
          cyRef.elements().style('opacity', 1);
        }

        // fullscreen button
        function handleFullscreen(e) {
          if (e.button != 0) {
            return;
          }

          const fullscreenElement =
            document.fullscreenElement ||
            document.msFullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement;

          let fullscreenEnabled = false;
          let prefixName = undefined;
          // 判断浏览器前缀
          if (document.fullscreenEnabled) {
            fullscreenEnabled = document.fullscreenEnabled;
          } else if (document.webkitFullscreenEnabled) {
            fullscreenEnabled = document.webkitFullscreenEnabled;
            prefixName = 'webkit';
          } else if (document.mozFullScreenEnabled) {
            fullscreenEnabled = document.mozFullScreenEnabled;
            prefixName = 'moz';
          }

          if (fullscreenElement === null) {
            if (fullscreenEnabled) {
              const element = cyRef.container();
              const methodName = prefixName == undefined ? 'requestFullscreen' : `${prefixName}RequestFullScreen`;
              element[methodName]();
            }
          } else {
            const methodName =
              prefixName === undefined ? 'exitFullscreen' : `${prefixName}ExitFullscreen`;
            document[methodName]();
          }
        }

        // lasso button
        function handleLasso(e) {
          if (e.button != 0) {
            return;
          }
          if (options.viewUtil) {
            options.viewUtil.enableLassoMode();
          }
        }

        // export button
        function handleExport(e) {
          if (e.button != 0) {
            return;
          }
          if (options.fileName.endsWith('.png')) {
            fileSaver.saveAs(cyRef.png(), options.fileName);
          } else if (options.fileName.endsWith('.json')) {
            let json = JSON.stringify(cyRef.json());
            let blob = new Blob([json], { type: 'application/json' });
            fileSaver.saveAs(blob, options.fileName);
          }
        }

        // open file button
        function handleOpen(e) {
          if (e.button != 0) {
            return;
          }
          let fileDlg = $('.cy-file-dlg');
          if (fileDlg) {
            fileDlg.click();
          }
        }

        // open file dialog
        function handleOpenFile(e) {
          let files = Array.from(openDlg.files);
          if (files[0]) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
              try {
                // render file layer after data is loaded successfully
                //mapInfo.file.data = fileReader.result;
                if (files[0].type == 'application/json' && fileReader.result) {
                  options.dataFile.value = JSON.parse(fileReader.result);
                }
              } catch (error) {
                console.error(error);
              }
            };

            fileReader.onerror = (event) => {
              console.error(event);
            };
            fileReader.readAsText(files[0]);
          }
        }

        // show/hide panel
        function handlePanel(e) {
          if (e.button != 0) {
            return;
          }

          let infoPanel = $('.cy-info-panel');
          if (infoPanel) {
            infoPanel.toggle();
          }
        }

        // search buttons
        function handleSearch(e) {
          if (e.button != 0) {
            return;
          }
        }
      },
    };

    $.fn.cyPanUpdate = functions.update;

    if (functions[fn]) {
      return functions[fn].apply(null, [this]);
    } else if (typeof fn == 'object' || !fn) {
      return functions.init.apply(this, arguments);
    } else {
      $.error('No such function `' + fn + '` for jquery.cytoscapePanzoom');
    }

    return $(this);
  };

  if (typeof module !== 'undefined' && module.exports) {
    // expose as a commonjs module
    module.exports = function (cytoscape, jquery) {
      register(cytoscape, jquery || require('jquery'));
    };
  } else if (typeof define !== 'undefined' && define.amd) {
    // expose as an amd/requirejs module
    define('cytoscape-panzoom', function () {
      return register;
    });
  }

  if (typeof cytoscape !== 'undefined' && typeof jQuery !== 'undefined') {
    // expose to global cytoscape (i.e. window.cytoscape)
    register(cytoscape, jQuery);
  }

  window.register = register;
  return register;
})(window);

export const panzoom = function (cytoscape, jquery) {
  window.register(cytoscape, jquery);
};
