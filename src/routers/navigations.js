import { h } from 'vue'
// views
import OverviewPage from '@/pages/dashboard/overview/OverviewPage.vue'
import ProfilePage from '@/pages/dashboard/profile/ProfilePage.vue'
import ProductsPage from '@/pages/dashboard/products/ProductsPage.vue'
import SupplierPage from '@/pages/dashboard/supplier/SupplierPage.vue'
import CategoryPage from '@/pages/dashboard/category/CategoryPage.vue'
import WarehousePage from '@/pages/dashboard/warehouse/WarehousePage.vue'

// icons
import IconProject from '@/components/icons/IconProject.vue'
import IconTasks from '@/components/icons/IconTasks.vue'
import IconTripleUser from '@/components/icons/IconTripleUser.vue'
import IconProfile from '@/components/icons/IconProfile.vue'
// views components

import IconCategory from '@/components/icons/IconCategory.vue'
import IconProducts from '@/components/icons/IconProducts.vue'
import IconWarehouse from '@/components/icons/IconWarehouse.vue'
import IconOverview from '@/components/icons/IconOverview.vue'

const navigations = [
  {
    path: 'overview',
    name: 'Overview',
    component: OverviewPage,
    meta: {
      showMenu: true,
      icon: () => h(IconOverview),
    }
  },
  {
    path: 'products',
    name: 'ProductsView',
    component: ProductsPage,
    meta: {
      showMenu: true,
      icon: () => h(IconProducts)
    }
  },
  {
    path: 'profile',
    name: 'ProfileView',
    component: ProfilePage,
    meta: {
      showMenu: true,
      icon: () => h(IconProfile)
    }
  },
  {
    path: 'supplier',
    name: 'SupplierView',
    component: SupplierPage,
    meta: {
      showMenu: true, // отображать только для админа и менеджера
      icon: () => h(IconTripleUser)
    }
  },
  {
    path: 'category',
    name: 'CategoryView',
    component: CategoryPage,
    meta: {
      showMenu: true, // отображать только для админа и менеджера
      icon: () => h(IconCategory)
    }
  },
  {
    path: 'warehouse',
    name: 'WarehouseView',
    component: WarehousePage,
    meta: {
      showMenu: true, // отображать только для админа и менеджера
      icon: () => h(IconWarehouse)
    }
  }
]

export default navigations
