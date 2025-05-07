<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Warehouses</h1>

    <!-- Active Warehouses Card -->
    <a-card class="shadow-sm mb-6">
      <div class="p-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-gray-800">Active Warehouses</h2>
          <div class="flex items-baseline">
            <span class="text-3xl font-bold text-gray-800 mr-2">100</span>
            <span class="text-sm text-green-500 flex items-center">
              <arrow-up-outlined class="mr-1" />
              12% vs last month
            </span>
          </div>
        </div>
      </div>
    </a-card>

    <!-- Table Section -->
    <a-card class="shadow-sm">
      <div class="p-4">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-800 mb-2 md:mb-0">Active Warehouses</h2>
          <div class="flex flex-col sm:flex-row gap-2">
            <a-input-search
              placeholder="Search"
              class="w-full sm:w-48"
              @search="onSearch"
            />
            <a-button class="flex items-center">
              <template #icon><filter-outlined /></template>
              Filters
            </a-button>
            <a-button type="primary" class="flex items-center" @click="openAddWarehouse">
              <template #icon><plus-outlined /></template>
              Add New Warehouse
            </a-button>
            <a-button class="flex items-center">
              <template #icon><export-outlined /></template>
              Export
            </a-button>
          </div>
        </div>

        <!-- Table -->
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="pagination"
          class="w-full warehouse-table"
          :row-class-name="(_record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'actions'">
              <a-button type="text" class="text-gray-500">
                <template #icon><more-outlined /></template>
              </a-button>
            </template>
            <template v-else-if="column.key === 'location' && !record.warehouseName">
              <span class="text-gray-400">{{ record.location }}</span>
            </template>
          </template>
        </a-table>

        <!-- Pagination -->
        <div class="flex justify-center mt-4">
          <a-pagination
            v-model:current="pagination.current"
            :total="pagination.total"
            :page-size="pagination.pageSize"
            :show-size-changer="false"
            simple
          />
        </div>
      </div>
    </a-card>
  </div>

  <!-- Add Warehouse Modal -->
  <AddWarehouseModal ref="addWarehouseModal" />
</template>

<script setup>
import { ref } from 'vue';
import {
  FilterOutlined,
  PlusOutlined,
  ExportOutlined,
  MoreOutlined,
  ArrowUpOutlined
} from '@ant-design/icons-vue';
import AddWarehouseModal from './components/AddWarehouseModal.vue';

// Table columns
const columns = [
  {
    title: 'Warehouse Name',
    dataIndex: 'warehouseName',
    key: 'warehouseName',
  },
  {
    title: 'Warehouse ID',
    dataIndex: 'warehouseId',
    key: 'warehouseId',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Capacity (in SKUs)',
    dataIndex: 'capacity',
    key: 'capacity',
  },
  {
    title: 'Actions',
    key: 'actions',
  },
];

// Table data
const data = ref([
  {
    key: '1',
    warehouseName: '365 Warehouse SVI, Austin',
    warehouseId: 'BEMA0123',
    location: 'Austin, Texas',
    capacity: '15000',
  },
  {
    key: '1a',
    warehouseName: '',
    warehouseId: '',
    location: '#315, Central Ave, Houston, Texas',
    capacity: '',
  },
  {
    key: '2',
    warehouseName: '365 Warehouse SVI, Houston',
    warehouseId: 'BEMA0123',
    location: 'Houston, Texas',
    capacity: '15000',
  },
  {
    key: '3',
    warehouseName: '365 Warehouse SVS, Vegas',
    warehouseId: 'BEMA0123',
    location: 'The Strip, Las Vegas',
    capacity: '15000',
  },
  {
    key: '4',
    warehouseName: '365 Warehouse SV10, New York',
    warehouseId: 'BEMA0123',
    location: 'Central Park, New York',
    capacity: '15000',
  },
]);

// Pagination
const pagination = ref({
  current: 1,
  pageSize: 5,
  total: 10,
});

const addWarehouseModal = ref();

const openAddWarehouse = () => {
  addWarehouseModal.value.showModal();
};

const onSearch = (value) => {
  console.log('Search:', value);
  // Implement search functionality
};
</script>

<style scoped>
/* Additional custom styles if needed */
:deep(.ant-table-thead > tr > th) {
  background-color: #f9fafb;
  font-weight: 600;
  color: #374151;
}

:deep(.warehouse-table .ant-table-tbody > tr > td) {
  border-bottom: none;
}

:deep(.warehouse-table .even-row) {
  background-color: #ffffff;
}

:deep(.warehouse-table .odd-row) {
  background-color: #f9fafb;
}

:deep(.ant-pagination-item-active) {
  border-color: #3b82f6;
}

:deep(.ant-pagination-item-active a) {
  color: #3b82f6;
}
</style>