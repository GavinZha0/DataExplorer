<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <a-row type="flex" :gutter="4">
      <a-col :md="24 - contentFormSize" :sm="24">
        <CollapseContainer :title="t('admin.center.msg.inbox')" :canExpan="false" style="height: 450px">
          <BasicTable @register="registerInboxTable">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'msg'">
                <Popconfirm @confirm="handleMsgRead(record)" @cancel="handleMsgRead(record)">
                  <template v-if="record.type == 'MESSAGE'" #icon
                    ><message-outlined style="color: blue"
                  /></template>
                  <template v-else #icon><sound-outlined style="color: green" /></template>
                  <template #title>
                    <p>{{ record.from }}</p>
                    <p>{{ record.msg }}</p>
                  </template>
                  <a v-if="record.type === 'MESSAGE'" :style="{ fontWeight: record.read? '': 'bold' }">
                    {{ record.msg }}
                  </a>
                  <a v-else :style="{ color: 'green', fontWeight: record.read ? '' : 'bold' }">
                    {{ record.msg }}
                  </a>
                </Popconfirm>
              </template>
              <template v-else-if="column.key === 'type'">
                <Tag
                  :color="record.type === 'MESSAGE' ? 'blue' : 'green'"
                  style="margin-right: 2px"
                >
                  {{ record.type }}
                </Tag>
              </template>
              <template v-else-if="column.key === 'action'">
                <TableAction
                  :actions="[
                    {
                      icon: 'ant-design:message-outlined',
                      tooltip: t('admin.center.msg.action.rsp'),
                      onClick: handleMsgRsp.bind(null, record),
                    },
                    {
                      icon: 'ant-design:delete-outlined',
                      color: 'error',
                      tooltip: t('common.table.action.delete'),
                      popConfirm: {
                        title: t('common.table.action.confirm'),
                        placement: 'left',
                        confirm: handleMsgDelete.bind(null, record.id),
                      },
                    },
                  ]"
                />
              </template>
            </template>
          </BasicTable>
        </CollapseContainer>
        <CollapseContainer :title="t('admin.center.msg.outbox')" :canExpan="false" style="height: 350px">
          <BasicTable @register="registerOutboxTable">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'msg'">
                <Popconfirm @confirm="handleMsgRead(record)" @cancel="handleMsgRead(record)">
                  <template v-if="record.type == 'MESSAGE'" #icon><message-outlined style="color: blue"/></template>
                  <template v-else #icon><sound-outlined style="color: green" /></template>
                  <template #title>
                    <p>{{ record.from }}</p>
                    <p>{{ record.msg }}</p>
                  </template>
                  <a v-if="record.type === 'MESSAGE'" :style="{ fontWeight: record.read? '': 'bold' }">
                    {{ record.msg }}
                  </a>
                  <a v-else :style="{ color: 'green', fontWeight: record.read ? '' : 'bold' }">
                    {{ record.msg }}
                  </a>
                </Popconfirm>
              </template>
              <template v-else-if="column.key === 'type'">
                <Tag
                  :color="record.type === 'MESSAGE' ? 'blue' : 'green'"
                  style="margin-right: 2px"
                >
                  {{ record.type }}
                </Tag>
              </template>
              <template v-else-if="column.key === 'action'">
                <TableAction
                  :actions="[
                    {
                      icon: 'ant-design:delete-outlined',
                      color: 'error',
                      tooltip: t('common.table.action.delete'),
                      popConfirm: {
                        title: t('common.table.action.confirm'),
                        placement: 'left',
                        confirm: handleMsgDelete.bind(null, record.id),
                      },
                    },
                  ]"
                />
              </template>
            </template>
          </BasicTable>
        </CollapseContainer>
      </a-col>
      <div class="layout-area">
        <div
          @click="
            () => {
              contentFormSize = 6 - contentFormSize;
            }
          "
        >
          <span v-if="contentFormSize == 0" class="expand"><LeftOutlined /></span>
          <span v-else class="collapse"><RightOutlined /></span>
        </div>
      </div>
      <a-col :md="contentFormSize" :sm="24">
        <div style="margin-top: 10px; margin-right: 10px;">
          <BasicForm @register="registerDialogForm">
            <template #sendButton>
              <Button type="primary" block @click="handleMsgCreate">
                {{ t('admin.center.msg.send') }}
              </Button>
            </template>
          </BasicForm>
        </div>
      </a-col>
    </a-row>
  </PageWrapper>
</template>
<script lang="ts" setup name="MsgNotify">
  import { CollapseContainer } from '/@/components/Container/index';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Popconfirm, Button, Tag, message, Row as ARow, Col as ACol } from 'ant-design-vue';
  import { ref } from 'vue';
  import { API_MSG_CREATE, API_MSG_DEL, API_MSG_LIST, API_MSG_READ } from '/@/api/admin/center';
  import { dialogFormSchema, msgColumns } from '/@/views/admin/center/data';
  import { BasicForm, useForm } from '/@/components/Form';
  import {
    MessageOutlined,
    SoundOutlined,
    LeftOutlined,
    RightOutlined,
  } from '@ant-design/icons-vue';

  const { t } = useI18n();
  const contentFormSize = ref<number>(0);

  // table definition
  const [registerInboxTable] = useTable({
    api: () => API_MSG_LIST(),
    rowKey: 'id',
    columns: msgColumns,
    useSearchForm: false, // don't use this.
    showTableSetting: false,
    showIndexColumn: false,
    pagination: true,
    bordered: true,
    scroll: { x: 600, y: 350 },
    actionColumn: {
      width: 80,
      title: t('common.table.title.action'),
      dataIndex: 'action',
    },
  });

  // table definition
  const [registerOutboxTable] = useTable({
    api: () => API_MSG_LIST(false),
    rowKey: 'id',
    columns: msgColumns,
    useSearchForm: false, // don't use this.
    showTableSetting: false,
    showIndexColumn: false,
    pagination: true,
    bordered: true,
    scroll: { x: 600, y: 250 },
    actionColumn: {
      width: 80,
      title: t('common.table.title.action'),
      dataIndex: 'action',
    },
  });

  // form definition
  const [registerDialogForm, { getFieldsValue, setFieldsValue }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: dialogFormSchema, // include all fields although some are hidden
    showActionButtonGroup: false,
  });

  /*
   * delete msg
   */
  function handleMsgDelete(id: number) {
    API_MSG_DEL(id)
      .then(() => {
        message.success(t('common.tip.delete'));
      })
      .catch((err) => {
        message.warning(t('common.exception.delete'), err);
      });
  }

  /*
   * update table after edit
   */
  const handleMsgCreate = async () => {
    let values = await getFieldsValue();
    API_MSG_CREATE(values)
      .then(() => {
        message.success(t('common.tip.new'));
      })
      .catch((err) => {
        message.warning(t('common.exception.new'), err);
      });
  };

  const handleMsgRsp = (record: any) => {
    if (record.type == 'MESSAGE') {
      contentFormSize.value = 6;
      setFieldsValue({ to: record.from });
    }
  };

  /*
   * read msg
   */
  const handleMsgRead = (record: any) => {
    if (record.type == 'MESSAGE') {
      API_MSG_READ(record.id);
    }
  };
</script>
<style lang="less" scoped>
  .extra {
    float: right;
    margin-top: 10px;
    margin-right: 30px;
  }

  /* 伸缩按钮部分 */
  .layout-area {
    width: 10px;
    height: 100%;
    float: left;
    color: green;
    position: absolute;
    top: 3px;
    right: 0px;
    z-index: 999;
  }

  /* 伸缩按钮居中 */
  .layout-area .collapse {
    border: 1px solid #f0f000;
    border-radius: 0px 10px 10px 0px;
    position: absolute;
    right: 0px;
    top: 3px;
    background-color: #f0f000;
    height: 50px;
    padding-top: 15px;
    cursor: pointer;
    z-index: 999;
  }

  /* 伸缩按钮居中 */
  .layout-area .expand {
    border: 1px solid #f0f000;
    border-radius: 10px 0px 0px 10px;
    position: absolute;
    right: 0px;
    top: 3px;
    background-color: #f0f000;
    height: 50px;
    padding-top: 15px;
    cursor: pointer;
    z-index: 999;
  }
</style>
