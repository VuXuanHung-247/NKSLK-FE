import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
/* eslint-disable */
import DashboardView from './components/views/Dashboard.vue'
import ProductsView from './components/views/Products.vue'
import EmployeesView from './components/views/Employees/Employees.vue'
import DepartmentsView from './components/views/Employees/Departments.vue'
import CitysView from './components/views/Employees/Citys.vue'
import DailyReportsView from './components/views/Reports/DailyReports.vue'
import CheckinView from './components/views/Reports/Checkin.vue'
import SalaryView from './components/views/Reports/Salary.vue'
import TablesView from './components/views/Tables.vue'
import TasksView from './components/views/TasksManagement/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import UnitTasksView from './components/views/TasksManagement/UnitTasks.vue'
import DailyWorkView from './components/views/DailyWork.vue'

// Routes
/* eslint-disable */
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
        path: 'dailywork',
        component: DailyWorkView,
        name: 'Nhật ký sản lượng khoán',
      },{
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
      },{
        path: 'unittasks',
        component: UnitTasksView,
        name: 'Đơn vị khoán'
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
        path: 'daily-reports',
        component: DailyReportsView,
        name: 'Danh sách nhật ký sản lượng khoán'
        // meta: {description: 'Danh sách Sản phẩm'}
      }, {
        path: 'checkin',
        component: CheckinView,
        name: 'Bảng chấm công'
        // meta: {description: 'Danh sách Sản phẩm'}
      }, {
        path: 'salary',
        component: SalaryView,
        name: 'Bảng lương'
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
