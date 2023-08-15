<template>
  <div :key="pageKey" class="md:flex">
    <template v-for="(item, index) in rawData" :key="item.name">
      <Card
        size="small"
        :title="item.type"
        class="md:w-1/4 w-full !md:mt-0"
        :class="{ '!md:mr-4': index + 1 < 4, '!mt-4': index > 0 }"
        style="cursor: pointer"
        @click="openReport(index)"
      >
        <template #extra>
          <Tag color="#3fb27f">{{ item.pageCount }}</Tag>
        </template>

        <span class="flex">
          <Icon icon="carbon:logo-github" color="#3fb27f" size="30" />
          <span class="text-lg ml-4">{{ item.name }}</span>
        </span>
        <div class="flex mt-2 h-10 text-secondary">{{ item.desc }}</div>
      </Card>
    </template>
  </div>
  <ReportForm @register="reportDrawer" />
</template>
<script lang="ts" setup name="Dashboard">
  import { Card, Tag } from 'ant-design-vue';
  import { Icon } from '/@/components/Icon';
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { API_DASHBOARD_GET } from '/@/api/dashboard/dashboard';
  import { useDrawer } from '/@/components/Drawer';
  import ReportForm from './reportForm.vue';
  import { getCurrentInstance } from 'vue';
  import { useAppStore } from '/@/store/modules/app';
  import { ApiDashboardDataType } from '/@/api/dashboard/model/dashboard';

  const route = useRoute();
  const rawData = ref<ApiDashboardDataType[]>([]);
  const [reportDrawer, { openDrawer: openReportDrawer }] = useDrawer();
  const pageKey = ref<number>(0);
  const instance = getCurrentInstance();
  const appStore = useAppStore()

  // monitor local route
  // load data if it is dashboard/reports
  watch(
    () => route.path,
    () => {
      if (route.path.indexOf('dashboard/') >= 0) {
        // clean up before load new data
        rawData.value.length = 0;
        loadDashboard(route.path);
        pageKey.value += 1;
        instance?.proxy?.$forceUpdate();
        appStore.isRouterAlive = false;
        appStore.isRouterAlive = true;
      }
    },
  );

  /*
   * open report
   */
  const openReport = (idx: number) => {
    // open reprot when click one
    openReportDrawer(true, { ...rawData.value[idx] });
  };

  /*
   * load reports to show on dashboard
   */
  const loadDashboard = (path: string) => {
    if (route.path.indexOf('dashboard/') >= 0) {
      API_DASHBOARD_GET(path).then((response) => {
        // get reports to show on current dashboard
        rawData.value = response.records;
      });
    }
  };

  loadDashboard(route.path);
</script>
