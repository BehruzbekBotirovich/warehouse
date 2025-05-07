<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Suppliers</h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <!-- Active Suppliers -->
      <a-card class="shadow-sm">
        <div class="p-4">
          <h3 class="text-gray-500 font-medium">Active Suppliers</h3>
          <div class="flex items-baseline mt-2">
            <span class="text-3xl font-bold text-gray-800">100</span>
            <span class="ml-2 text-sm text-green-500">12% vs last month</span>
          </div>
        </div>
      </a-card>

      <!-- Inactive Suppliers -->
      <a-card class="shadow-sm">
        <div class="p-4">
          <h3 class="text-gray-500 font-medium">Inactive Suppliers</h3>
          <div class="flex items-baseline mt-2">
            <span class="text-3xl font-bold text-gray-800">19</span>
            <span class="ml-2 text-sm text-green-500">12% vs last month</span>
          </div>
        </div>
      </a-card>

      <!-- Deleted Suppliers -->
      <a-card class="shadow-sm">
        <div class="p-4">
          <h3 class="text-gray-500 font-medium">Deleted Suppliers</h3>
          <div class="flex items-baseline mt-2">
            <span class="text-3xl font-bold text-gray-800">10</span>
            <span class="ml-2 text-sm text-green-500">12% vs last month</span>
          </div>
        </div>
      </a-card>
    </div>

    <!-- Table Section -->
    <a-card class="shadow-sm">
      <div class="p-4">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between mb-4"
        >
          <h2 class="text-xl font-semibold text-gray-800 mb-2 md:mb-0">
            Active Suppliers
          </h2>
          <div class="flex flex-col sm:flex-row gap-2">
            <a-input-search
              placeholder="Search"
              class="w-full sm:w-48"
              @search="onSearch"
            />
            <a-button class="flex items-center">
              <template #icon>
                <filter-outlined />
              </template>
              Filters
            </a-button>
            <a-button @click="isAddOpen=true" type="primary" class="flex items-center">
              <template #icon>
                <plus-outlined />
              </template>
              Add New Supplier
            </a-button>
            <a-button class="flex items-center">
              <template #icon>
                <export-outlined />
              </template>
              Export
            </a-button>
          </div>
        </div>

        <!-- Table -->
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="pagination"
          class="w-full"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'actions'">
              <a-space>
                <a-tooltip title="Edit" @click="openEdit">
                  <IconEdit
                    class="cursor-pointer text-blue-500 hover:text-blue-700"
                  />
                </a-tooltip>
                <a-tooltip title="Delete">
                  <a-popconfirm
                    title="Are you sure to delete this product?"
                    ok-text="Yes"
                    cancel-text="No"
                    @confirm="deleteProduct(record.productId)"
                  >
                    <IconDelete
                      class="cursor-pointer text-red-500 hover:text-red-700"
                    />
                  </a-popconfirm>
                </a-tooltip>
              </a-space>
            </template>
          </template>
        </a-table>
      </div>
    </a-card>
  </div>
  <!--  modals-->
    <a-button type="primary" @click="showModal"
      >Open Modal with async logic</a-button
    >
    <a-modal
      v-model:open="isAddOpen"
      title="Title"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
    >
      <add-supplier-modal/>
    </a-modal>

</template>

<script setup>
import AddSupplierModal from './components/AddSupplierModal.vue'
import useModal from '@/store/modal.pinia.js'
import { ref, shallowRef } from 'vue'
import {
  FilterOutlined,
  PlusOutlined,
  ExportOutlined,
  MoreOutlined
} from '@ant-design/icons-vue'

const isAddOpen = ref(false)
// Table columns
const columns = [
  {
    title: 'Contact Name',
    dataIndex: 'contactName',
    key: 'contactName'
  },
  {
    title: 'Supplier ID',
    dataIndex: 'supplierId',
    key: 'supplierId'
  },
  {
    title: 'Contact Name',
    dataIndex: 'contactName2',
    key: 'contactName2'
  },
  {
    title: 'Email-id',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'Actions',
    key: 'actions'
  }
]

// Table data
const data = ref([
  {
    key: '1',
    contactName: 'Phoenix Baker',
    supplierId: 'BC2022110001',
    contactName2: 'Mr.Baker',
    email: 'phonek.baker@hotmail.com',
    address: 'Minnesota ***',
    phone: '+1 8639724863'
  },
  {
    key: '2',
    contactName: 'Lana Steiner',
    supplierId: 'BC2022110001',
    contactName2: 'Lana',
    email: 'lanasteiner@mightyvapes.com',
    address: 'New York ***',
    phone: '+1 8639724863'
  },
  {
    key: '3',
    contactName: 'Demi Wilkinson',
    supplierId: 'BC2022110001',
    contactName2: 'Ms.Wilkinson',
    email: 'dwilkinson@longpiper.us',
    address: 'California ***',
    phone: '+1 8639724863'
  },
  {
    key: '4',
    contactName: 'CW',
    supplierId: '',
    contactName2: '',
    email: '',
    address: '3147, Copper Rd, Irving, Texas, 95709',
    phone: ''
  },
  {
    key: '5',
    contactName: 'Candice Wu',
    supplierId: 'BC2022110001',
    contactName2: 'Candice',
    email: 'xing.wu@hyper.space',
    address: 'Texas ***',
    phone: '+1 8639724863'
  }
])

// Pagination
const pagination = ref({
  current: 1,
  pageSize: 5,
  total: 50,
  showSizeChanger: false,
  showQuickJumper: true
})

function openAdd() {
  modal.open({
    component: shallowRef(AddSupplierModal)
  })
}

const open = ref(false);
const confirmLoading = ref(false);
const showModal = () => {
  open.value = true;
};

const handleOk = () => {
  modalText.value = 'The modal will be closed after two seconds';
  confirmLoading.value = true;
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
  }, 2000);
};

const onSearch = (value) => {
  console.log('Search:', value)
}
</script>

<style scoped>
:deep(.ant-table-thead > tr > th) {
  background-color: #f9fafb;
  font-weight: 600;
  color: #374151;
}
</style>