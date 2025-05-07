<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <h1 class="text-2xl font-bold text-gray-800 mb-6">Category</h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <!-- Active Categories -->
      <a-card class="shadow-sm">
        <div class="p-4">
          <h3 class="text-gray-500 font-medium">Active Categories</h3>
          <div class="flex items-baseline mt-2">
            <span class="text-3xl font-bold text-gray-800">100</span>
            <span class="ml-2 text-sm text-green-500">12% vs last month</span>
          </div>
        </div>
      </a-card>

      <!-- Inactive Categories -->
      <a-card class="shadow-sm">
        <div class="p-4">
          <h3 class="text-gray-500 font-medium">Inactive Categories</h3>
          <div class="flex items-baseline mt-2">
            <span class="text-3xl font-bold text-gray-800">19</span>
            <span class="ml-2 text-sm text-green-500">12% vs last month</span>
          </div>
        </div>
      </a-card>

      <!-- Selected Categories -->
      <a-card class="shadow-sm">
        <div class="p-4">
          <h3 class="text-gray-500 font-medium">Selected Categories</h3>
          <div class="flex items-baseline mt-2">
            <span class="text-3xl font-bold text-gray-800">10</span>
            <span class="ml-2 text-sm text-green-500">12% vs last month</span>
          </div>
        </div>
      </a-card>
    </div>

    <!-- Active Categories Table Section -->
    <a-card class="shadow-sm mb-6">
      <div class="p-4">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between mb-4"
        >
          <h2 class="text-xl font-semibold text-gray-800 mb-2 md:mb-0">
            Active Categories
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
          </div>
        </div>

        <!-- Table -->
        <a-table
          :columns="activeColumns"
          :data-source="activeData"
          :pagination="pagination"
          class="w-full"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'products'">
              <div class="flex items-center ">
               <img class="w-8 h-8 border border-white object-cover   rounded-full" src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg" alt="tovar">
               <img class="w-8 h-8 border border-white object-cover   rounded-full" src="https://tareqaltaif.com/images/product-06.jpg" alt="tovar">
               <img class="w-8 h-8 border border-white object-cover   rounded-full" src="https://plus.unsplash.com/premium_photo-1679913792906-13ccc5c84d44?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" alt="tovar">
               <img class="w-8 h-8 border border-white object-cover   rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlQtuVgTTsVZyTu7RVZam9cT6ubt5dPyeKXw&s" alt="tovar">
                <span class="text-gray-500">+4</span>
              </div>
            </template>
            <template v-else-if="column.key === 'actions'">
              <a-space>
                <a-tooltip title="Edit">
                  <edit-outlined
                    class="cursor-pointer text-blue-500 hover:text-blue-700"
                  />
                </a-tooltip>
                <a-tooltip title="Delete">
                  <delete-outlined
                    class="cursor-pointer text-red-500 hover:text-red-700"
                  />
                </a-tooltip>
              </a-space>
            </template>
          </template>
        </a-table>
      </div>
    </a-card>

    <!-- Bottom Actions -->
    <div class="flex justify-end gap-4">
      <a-button class="flex items-center">
        <template #icon>
          <plus-outlined />
        </template>
        Add New Category
      </a-button>
      <a-button class="flex items-center">
        <template #icon>
          <export-outlined />
        </template>
        Export
      </a-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  FilterOutlined,
  PlusOutlined,
  ExportOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleFilled
} from '@ant-design/icons-vue'



// Table columns
const activeColumns = [
  {
    title: 'Category Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Category ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  },
  {
    title: 'Products',
    key: 'products'
  },
  {
    title: 'Actions',
    key: 'actions'
  }
]
const IsEditOpen = ref(false)
const isCurrentInfoOpen = ref(true)

// Table data
const activeData = ref([
  {
    key: '1',
    name: 'Food & Beverages',
    id: 'BC2022110001',
    description:
      'Provide the solution given or The last conversation with customer'
  },
  {
    key: '2',
    name: 'E-Ciggs',
    id: 'BC2022110001',
    description:
      'Provide the solution given or The last conversation with customer'
  },
  {
    key: '3',
    name: 'FMCG',
    id: 'BC2022110001',
    description:
      'Provide the solution given or The last conversation with customer'
  },
  {
    key: '4',
    name: 'Bakery & Confectionery',
    id: 'BC2022110001',
    description:
      'Provide the solution given or The last conversation with customer'
  }
])

// Pagination
const pagination = ref({
  current: 1,
  pageSize: 4,
  total: 50
})

const onSearch = (value) => {
  console.log('Search:', value)
  // Implement search functionality
}
</script>

<style scoped>
/* Additional custom styles if needed */
:deep(.ant-table-thead > tr > th) {
  background-color: #f9fafb;
  font-weight: 600;
  color: #374151;
}

:deep(.ant-pagination-item-active) {
  border-color: #3b82f6;
}

:deep(.ant-pagination-item-active a) {
  color: #3b82f6;
}
</style>