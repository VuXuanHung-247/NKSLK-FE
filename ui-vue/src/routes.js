import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import ProductsView from './components/views/Products.vue'
import EmployeesView from './components/views/Employees/Employees.vue'
import DepartmentsView from './components/views/Employees/Departments.vue'
import CitysView from './components/views/Employees/Citys.vue'
import ReportsView from './components/views/Reports.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Tổng quan',
        meta: {description: 'Nhật ký sản lượng khoán'}
      }, {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Quản lý Công việc'
        // meta: {description: 'Danh sách Công việc'}
      }, {
        path: 'products',
        component: ProductsView,
        name: 'Quản lý Sản phẩm'
        // meta: {description: 'Danh sách Sản phẩm'}
      }, {
        path: 'employees',
        component: EmployeesView,
        name: 'Quản lý Công nhân'
        // meta: {description: 'Danh sách Sản phẩm'}
      }, {
        path: 'departments',
        component: DepartmentsView,
        name: 'Quản lý Phòng ban'
        // meta: {description: 'Danh sách Sản phẩm'}
      }, {
        path: 'citys',
        component: CitysView,
        name: 'Quản lý Tỉnh/Thành phố'
        // meta: {description: 'Danh sách Sản phẩm'}
      }, {
        path: 'reports',
        component: ReportsView,
        name: 'Báo cáo thống kê'
        // meta: {description: 'Danh sách Sản phẩm'}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
