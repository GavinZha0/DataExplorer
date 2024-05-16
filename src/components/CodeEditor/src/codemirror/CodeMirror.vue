<template>
  <div class="relative !h-full w-full overflow-hidden" ref="el"></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, onUnmounted, watchEffect, watch, unref, nextTick } from 'vue';
  import { useDebounceFn } from '@vueuse/core';
  import { useAppStore } from '/@/store/modules/app';
  import { useWindowSizeFn } from '/@/hooks/event/useWindowSizeFn';
  import CodeMirror from 'codemirror';
  import { MODE } from './../typing';
  // css
  import './codemirror.css';
  import 'codemirror/theme/idea.css';
  import 'codemirror/theme/material-palenight.css';
  // modes
  import 'codemirror/mode/javascript/javascript';
  import 'codemirror/mode/css/css';
  import 'codemirror/mode/htmlmixed/htmlmixed';
  import 'codemirror/mode/sql/sql';
  import 'codemirror/mode/python/python';
  import 'codemirror/mode/javascript/javascript';
  import 'codemirror/mode/clike/clike';

  // hint
  import 'codemirror/addon/hint/show-hint';
  import 'codemirror/addon/hint/show-hint.css';
  import 'codemirror/addon/hint/sql-hint';

  const props = defineProps({
    mode: {
      type: String as PropType<MODE>,
      default: MODE.JSON,
      validator(value: any) {
        // 这个值必须匹配下列字符串中的一个
        return Object.values(MODE).includes(value);
      },
    },
    value: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
  });

  const emit = defineEmits(['change']);

  const el = ref();
  let editor: Nullable<CodeMirror.Editor>;

  const debounceRefresh = useDebounceFn(refresh, 100);
  const appStore = useAppStore();

  watch(
    () => props.value,
    async (value) => {
      await nextTick();
      const oldValue = editor?.getValue();
      if (value !== oldValue) {
        editor?.setValue(value ? value : '');
      }
    },
    { flush: 'post' },
  );

  watchEffect(() => {
    editor?.setOption('mode', props.mode);
  });

  watch(
    () => props.readonly,
    async () => {
      editor?.setOption('readOnly', props.readonly);
    },
    {
      immediate: true,
    },
  );

  watch(
    () => appStore.getDarkMode,
    async () => {
      setTheme();
    },
    {
      immediate: true,
    },
  );

  function setTheme() {
    unref(editor)?.setOption(
      'theme',
      appStore.getDarkMode === 'light' ? 'idea' : 'material-palenight',
    );
  }

  function refresh() {
    editor?.refresh();
  }

  async function init() {
    const addonOptions = {
      autoCloseBrackets: true,
      autoCloseTags: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers'],
    };

    const handleSHowHint = (cm: any, option: any) => {
      let cursor = cm.getCursor();
      let cursorLine = cm.getLine(cursor.line);
      let end = cursor.ch;
      let start = end;
      let token = cm.getTokenAt(cursor);


      return option.tables;

/*
      return {
        list: ['hello', 'world'],
        from: { ch: token.start, line: cursor.line },
        to: { ch: token.end, line: cursor.line },
      };
*/
    };

    editor = CodeMirror(el.value!, {
      value: '',
      mode: props.mode,
      readOnly: props.readonly,
      tabSize: 2,
      theme: 'material-palenight',
      lineWrapping: true,
      lineNumbers: true,
      showHint: true,
      spellcheck: true,
      autofocus: true,
      smartIndent: true,
      autocorrect: true,
      hintOptions: {
        //hint: CodeMirror.hint.sql,
        //hint: handleSHowHint,
        completeSingle: true,
        tables: {
          aaa: ['abc1', 'abc2'],
        },
      },
      extraKeys: { Ctrl: 'autocomplete' },
      ...addonOptions,
    });
    editor?.setValue(props.value);
    setTheme();

    //editor?.on("cursorActivity", () => {
    //  editor.showHint();
    //});

/*
    CodeMirror.registerHelper('hint', 'custom', function (editor, options) {
      let cursor = editor.getCursor();
      let token = editor.getTokenAt(cursor);
      return {
        list: ['custom-hint'],
        from: CodeMirror.Pos(token.line, token.start),
        to: CodeMirror.Pos(token.line, token.end),
      };
    });
*/


    editor?.on('change', () => {
      emit('change', editor?.getValue());
    });
  }

  onMounted(async () => {
    await nextTick();
    init();
    useWindowSizeFn(debounceRefresh);
  });

  onUnmounted(() => {
    editor = null;
  });
</script>
