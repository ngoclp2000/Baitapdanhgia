import Vue from 'vue';
import Vuex from 'vuex';
import DepartmentAPI from '../api/components/DepartmentAPI'
import PositionAPI from '../api/components/PositionAPI'
import CustomerGroupAPI from '../api/components/CustomerGroupAPI'
Vue.use(Vuex)

const storeData = {
    state: {
        navbarItems: [{
                content: 'Tổng quan',
                classItem: 'navbar-item-icon-dashboard',
                isChosen: false,
                link: '/dashboard'
            },
            {
                content: 'Báo cáo',
                classItem: 'navbar-item-icon-report',
                isChosen: false,
                link: '/report'
            },
            {
                content: 'Mua hàng',
                classItem: 'navbar-item-icon-order',
                isChosen: false,
                link: '/order'
            },
            {
                content: 'Danh mục nhân viên',
                classItem: 'navbar-item-icon-employee',
                isChosen: false,
                link: '/employee'
            },
            {
                content: 'Danh mục khách hàng',
                classItem: 'navbar-item-icon-customer',
                isChosen: false,
                link: '/customer'
            }, {
                content: 'Thiết lập hệ thống',
                classItem: 'navbar-item-icon-setting',
                isChosen: false,
                link: '/setting'
            }
        ],
        toggle: {
            isToggleNavbar: false,
            isToggleForm: {
                customer: false,
                employee: false,
            },
        },
        data: {
            entity: [],
            department: [],
            position: [],
            customerGroup: [],
            restaurantList: [
                {
                    content: "Nhà hàng Biển Đông"
                },{
                    content: "Nhà hàng Nam Phương"
                },{
                    content: "Nhà hàng Hải Sơn"
                }
            ],
            gender: [{
                content: "Nam",
                value: 1
            }, {
                content: "Nữ",
                value: 2
            }],
            workStatus: [{
                content: "Đang làm việc",
                value: 1
            }, {
                content: "Đã nghỉ việc",
                value: 2
            },],
            pageSize:[
                {
                    content: "20"
                },
                {
                    content: "25"
                },
                {
                    content: "30"
                },
                {
                    content: "35"
                }
            ],
            toast: [
            ],
            payload : {
                    
            },
            
        }
    },
    actions: {
        /**
         * Lấy dữ liệu phòng ban
         * Created By TBN
         * @param {*} param0 
         * @returns 
         */
        async getDepartmentData({
            commit
        }) {
            let res = await DepartmentAPI.getAllData();
            commit('SET_DEPARTMENT_DATA', res.data);
            return [...res.data]
        },
        /**
         * Lấy dữ liệu vị trí
         * Created By TBN
         * @param {*} param0 
         * @returns 
         */
        async getPositionData({
            commit
        }) {
            let res = await PositionAPI.getAllData();
            commit('SET_POSITION_DATA', res.data);
            return [...res.data];
        },
        /**
         * Tạo random index cho toast message
         * Created By TBN
         * @param {*} param0 
         * @param {*} length 
         * @returns 
         */
        randomText({commit},length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            commit('NOTHING')
            //console.log(result);
            return result;
        },
        /**
         * Tạo mới toast message
         * Created By TBN
         * @param {*} param0 
         * @param {*} payload 
         */
        createToast({commit},payload) {
            commit('PUSH_TOAST_DATA', payload)
            setTimeout(() => {
                commit('REMOVE_TOAST_DATA', payload.index)
            }, 3000)
        },
        async getCustomerGroupData({
            commit
        }) {
            let res = await CustomerGroupAPI.getAllData()
            commit('SET_CUSTOMER_GROUP_DATA', res.data);
            return [...res.data]
        },
    },
    mutations: {
        TOGGLE_NAVBAR(state) {
            state.toggle.isToggleNavbar = !state.toggle.isToggleNavbar;
        },
        TOGGLE_FORM_EMPLOYEE(state) {
            state.toggle.isToggleForm.employee = !state.toggle.isToggleForm.employee;
        },
        TOGGLE_ITEM_ACTIVE(state, classItem) {
            state.navbarItems.forEach(element => {
                if (classItem == element.classItem)
                    element.isChosen = true
                else
                    element.isChosen = false
            })
        },
        SET_DEPARTMENT_DATA(state, data) {
            data.forEach(element => element.content = element.DepartmentName)
            state.data.department = [...data]
        },
        SET_POSITION_DATA(state, data) {
            data.forEach(element => element.content = element.PositionName)
            state.data.position = [...data]
        },
        SET_CUSTOMER_GROUP_DATA(state, data) {
            data.forEach(element => element.content = element.CustomerGroupName)
            state.data.customerGroup = [...data]
        },
        SET_ENTITY_DATA(state, data) {
            state.data.entity = data
        },
        PUSH_TOAST_DATA(state, data) {
            state.data.toast.push(data)
        },
        REMOVE_TOAST_DATA(state, index) {
            state.data.toast = state.data.toast.filter(element => element.index != index)
        },
        CHANGE_PAYLOAD(state,newPayload){
            state.data.payload = newPayload
        }
        ,
        NOTHING(){
            return "Nothing"
        }
    }

}

const store = new Vuex.Store(storeData);

export default store