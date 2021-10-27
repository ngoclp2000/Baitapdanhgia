
import EmployeeList from '../views/dictionary/employee/EmployeeList.vue'
import CustomerList from '../views/dictionary/customer/CustomerList.vue'
import Homepage from '../views/dictionary/home/Homepage.vue'
import Dashboard from '../views/dictionary/dashboard/Dashboard.vue'
import Report from '../views/dictionary/report/Report.vue'
import Order from '../views/dictionary/order/Order.vue'
import Setting from '../views/dictionary/setting/Setting.vue'
export const routes = [
    {path: '/employee', component: EmployeeList,meta: { title: 'Quản lý nhân viên' }},
    {path: '/customer', component: CustomerList,meta: { title: 'Quản lý khách hàng' }},
    {path: '/home', component: Homepage,meta: { title: 'Trang chủ' }},
    {path: '/dashboard', component: Dashboard,meta: { title: 'Tổng quan' }},
    {path: '/report', component: Report,meta: { title: 'Báo cáo' }},
    {path: '/order', component: Order,meta: { title: 'Đặt hàng' }},
    {path: '/setting', component: Setting,meta: { title: 'Cài đặt' }}
]

