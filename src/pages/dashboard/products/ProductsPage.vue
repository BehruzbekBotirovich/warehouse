<template>
  <div class="p-4 space-y-4">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div class="flex flex-wrap gap-2">
        <a-input
          v-model:value="search"
          placeholder="Search by name or ID"
          allow-clear
          class="w-64"
        />
        <a-select
          v-model:value="selectedCategory"
          placeholder="Filter by category"
          class="w-48"
          allow-clear
        >
          <a-select-option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </a-select-option>
        </a-select>
      </div>
      <a-button type="primary" @click="showAddModal = true"
        >Add Product
      </a-button>
    </div>

    <!-- Product Table -->
    <a-table
      :columns="columns"
      :data-source="filteredProducts"
      :pagination="pagination"
      row-key="productId"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'image'">
          <img
            :src="record.image"
            alt="product"
            class="w-12 h-12 rounded object-cover"
          />
        </template>

        <template v-else-if="column.key === 'actions'">
          <a-space>
            <a-tooltip title="Edit">
              <IconEdit
                class="cursor-pointer text-blue-500 hover:text-blue-700"
                @click="editProduct(record)"
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

    <!-- Add/Edit Modal -->
    <a-modal
      v-model:open="showAddModal"
      :title="editingProduct ? 'Edit Product' : 'Add Product'"
      @ok="handleSubmit"
      :confirm-loading="loading"
    >
      <a-form layout="vertical" :model="form">
        <a-form-item label="Name">
          <a-input v-model:value="form.name" />
        </a-form-item>
        <a-form-item label="Image URL">
          <a-input v-model:value="form.image" />
        </a-form-item>
        <a-form-item label="Product ID">
          <a-input v-model:value="form.productId" />
        </a-form-item>
        <a-form-item label="Supplier ID">
          <a-input v-model:value="form.supplierId" />
        </a-form-item>
        <a-form-item label="Category">
          <a-select v-model:value="form.category" allow-clear>
            <a-select-option v-for="cat in categories" :key="cat"
              >{{ cat }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Price">
          <a-input-number v-model:value="form.price" class="w-full" />
        </a-form-item>
        <a-form-item label="Weight">
          <a-input v-model:value="form.weight" />
        </a-form-item>
        <a-form-item label="Stock Level">
          <a-input-number v-model:value="form.stock" class="w-full" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const selectedCategory = ref(null)
const showAddModal = ref(false)
const editingProduct = ref(null)
const loading = ref(false)

const categories = ['Vapes', 'E-Cig', 'Accessories', 'Liquids']

const products = ref([
  {
    productId: 'P001',
    name: 'Stinzy Vape Pro',
    image: 'https://img.vawoo.com/images/detailed/337/ezgif-4-5d723ce89e.jpg',
    supplierId: 'S001',
    category: 'Vapes',
    price: 29.99,
    weight: '200g',
    stock: 150
  },
  {
    productId: 'P002',
    name: 'Retro E-Cig',
    image:
      'https://www.88vape.com/cdn/shop/files/AspireRoverPlusVapeKit-Black_Side_512x640.png?v=1723034856',
    supplierId: 'S002',
    category: 'E-Cig',
    price: 19.99,
    weight: '180g',
    stock: 80
  },
  {
    productId: 'P003',
    name: 'Liquid Ice Mint',
    image:
      'https://www.vapekit.co.uk/images/ivg-spearmint-10ml-e-liquid-p11656-15613_image.jpg',
    supplierId: 'S003',
    category: 'Liquids',
    price: 9.5,
    weight: '100ml',
    stock: 200
  },
  {
    productId: 'P004',
    name: 'Vape Pouch Black',
    image:
      'https://cdn11.bigcommerce.com/s-hzgoj5n/images/stencil/1280x1280/products/2104/6404/black-vape-case__15163.1571652914.jpg?c=2',
    supplierId: 'S004',
    category: 'Accessories',
    price: 12.99,
    weight: '300g',
    stock: 65
  },
  {
    productId: 'P005',
    name: 'Berry Blast Juice',
    image:
      'https://cdn11.bigcommerce.com/s-d1um0gq6h9/images/stencil/1280x1280/products/842/3177/IceBerryBomb_60ml_3mg_1200x1200__05693.1638372830.jpg?c=2',
    supplierId: 'S005',
    category: 'Liquids',
    price: 11.25,
    weight: '90ml',
    stock: 95
  },
  {
    productId: 'P006',
    name: 'Mini Box Mod',
    image: 'https://www.vaporesso.com/hubfs/Products/LUXE%20Q2/img-6.jpg',
    supplierId: 'S006',
    category: 'Vapes',
    price: 45.0,
    weight: '400g',
    stock: 30
  }
])

const form = ref({})

const columns = [
  {
    title: 'Image',
    key: 'image',
    dataIndex: 'image',
    width: 80,
    customRender: () => null
  },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Product ID', dataIndex: 'productId' },
  { title: 'Supplier ID', dataIndex: 'supplierId' },
  { title: 'Category', dataIndex: 'category' },
  { title: 'Price ($)', dataIndex: 'price' },
  { title: 'Weight', dataIndex: 'weight' },
  { title: 'Stock', dataIndex: 'stock' },
  {
    title: 'Actions',
    key: 'actions',
    width: 80,
    align: 'center',
    customRender: () => null
  }
]

const pagination = {
  pageSize: 5,
  showSizeChanger: false
}

const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.productId.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory =
      !selectedCategory.value || p.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

function handleSubmit() {
  loading.value = true
  setTimeout(() => {
    if (editingProduct.value) {
      const index = products.value.findIndex(
        (p) => p.productId === editingProduct.value.productId
      )
      if (index !== -1) products.value[index] = { ...form.value }
    } else {
      products.value.push({ ...form.value })
    }
    resetForm()
    loading.value = false
  }, 800)
}

function resetForm() {
  form.value = {}
  editingProduct.value = null
  showAddModal.value = false
}

function editProduct(product) {
  editingProduct.value = { ...product }
  form.value = { ...product }
  showAddModal.value = true
}

function deleteProduct(id) {
  products.value = products.value.filter((p) => p.productId !== id)
}
</script>
