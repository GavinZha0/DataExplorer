<template>
    <div class="main-content-screen">
        <div v-if="$slots.header" class="screen-header"><slot name="header"></slot></div>
        <div v-else class="screen-padding" />

        <div class="screen-content" ref="contentRef">
            <a-table
                bordered
                size="small"
                class="ant-table-striped"
                :rowKey="rowKey"
                :columns="customColumns"
                :dataSource="dataSource"
                :loading="loading"
                :pagination=pagination
                :scroll="{ scrollToFirstRowOnChange: true, y: tableScrollY }"
                @change="onChange"
            >
            </a-table>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, PropType, ref } from "vue";
import debounce from "lodash.debounce";
import { PaginationConfig } from "./type";

export default defineComponent({
    name: 'ScreenTable',
    props: {
        rowKey: {
            type: String,
        },
        columns: {
            type: Array,
            required: true
        },
        dataSource: {
            type: Array
        },
        loading: {
            type: Boolean
        },
        pagination: {
            type: Object as PropType<PaginationConfig | false | undefined>
        },
        onChange: {
            type: Function,
            required: true
        }
    },
    setup(props, { slots }) {

        const customColumns = computed<any>(() => {
            return props.columns.map((item: any)=> {
                if(item['slots'] && item['slots']['customRender']) {
                    item['customRender'] = slots[item['slots']['customRender']];
                }
                return item;
            });
        })

        const tableScrollY = ref<number>(0);
        const contentRef = ref<HTMLDivElement>();

        const resizeHandler = debounce(() => {
            if (contentRef.value) {
                tableScrollY.value = contentRef.value.offsetHeight - contentRef.value.getElementsByClassName('ant-table-thead')[0].clientHeight - 60;
                tableScrollY.value<200?200:tableScrollY.value;
            }
        }, 100);

        onMounted(()=> {
            resizeHandler();
            window.addEventListener('resize', resizeHandler);
        })

        onBeforeUnmount(()=> {
             window.removeEventListener('resize', resizeHandler);
        })

        return {
            contentRef,
            tableScrollY,
            customColumns
        }

    }
})
</script>

<style lang="less" scoped>
.main-content-screen {
  display: flex;
  flex-direction: column;
  height: calc(100% - 35px);
  border-radius: 4px;
  background-color: #fff;
  .screen-header {
    padding: 2px;
    min-height: 20px;
  }
  .screen-footer {
    padding: 2px;
    min-height: 20px;
    text-align: right;
    margin-right: 10px;
  }
  .screen-content {
    flex: 1;
    padding: 5px;
    overflow: hidden;
  }
  .screen-padding {
    padding-top: 5px;
  }
  ::v-deep(.ant-table.ant-table-bordered) > .ant-table-content {
    border-bottom: 1px solid #f0f0f0;
  }
    .ant-table-striped ::v-deep(.active-yes) {
        background-color: #ffffff;
    }
    .ant-table-striped ::v-deep(.active-no) {
        background-color: #ffffff;
    }
}

</style>
