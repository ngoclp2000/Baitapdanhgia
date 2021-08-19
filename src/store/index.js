import Vue from 'vue';
import Vuex from 'vuex';
import DepartmentAPI from '../api/components/DepartmentAPI'
import PositionAPI from '../api/components/PositionAPI'
Vue.use(Vuex)

const storeData = {
    state: {
        navbarItems: [{
                content: 'Tổng quan',
                classItem: 'navbar-item-icon-dashboard',
                link: '/dashboard'
            },
            {
                content: 'Tiền mặt',
                classItem: 'navbar-item-icon-cash',
                
                link: '/CAProcess'
            },
            {
                content: 'Tiền gửi',
                classItem: 'navbar-item-icon-money-in',
                link: '/BAProcess',
                
            },
            {
                content: 'Mua hàng',
                classItem: 'navbar-item-icon-buy',
                link: '/PUProcess',
                
            },
            {
                content: 'Bán hàng',
                classItem: 'navbar-item-icon-sell',
                link: '/SAProcess',
                
            }, {
                content: 'Quản lý hóa đơn',
                classItem: 'navbar-item-icon-receipt',
                link: '/IPProcess',
                
            },{
                content: 'Kho',
                classItem: 'navbar-item-icon-warehouse',
                link: '/INProcess',
                
            },{
                content: 'Công cụ dụng cụ',
                classItem: 'navbar-item-icon-tool',
                link: '/SUProcess',
                
            },{
                content: 'Tài sản cố định',
                classItem: 'navbar-item-icon-asset',
                link: '/FAProcess',
                
            },{
                content: 'Thuế',
                classItem: 'navbar-item-icon-tax',
                link: '/TAList',
                
            },{
                content: 'Giá thành',
                classItem: 'navbar-item-icon-price',
                link: '/JCProcessSimple',
                
            },{
                content: 'Tổng hợp',
                classItem: 'navbar-item-icon-synthesis',
                link: '/GLProcess',
                
            },{
                content: 'Ngân sách',
                classItem: 'navbar-item-icon-budget',
                link: '/BUDDashboard',
                
            },{
                content: 'Báo cáo',
                classItem: 'navbar-item-icon-report',
                link: '/ReportList',
                
            },{
                content: 'Phân tích tài chính',
                classItem: 'navbar-item-icon-analysis',
                link: '/ReportAnalysis',
                
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
            companyList: [
                {
                    content: "CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC"
                },{
                    content: "CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ TÂN THÀNH"
                },{
                    content: "CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ NAM Á"
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
                    content: "10 bản ghi trên 1 trang"
                },
                {
                    content: "20 bản ghi trên 1 trang"
                },
                {
                    content: "30 bản ghi trên 1 trang"
                },
                {
                    content: "50 bản ghi trên 1 trang"
                },
                {
                    content: "100 bản ghi trên 1 trang"
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
                element.classItem = element.classItem.replace('-active', '');
                if (element.classItem.search(classItem) != -1 || classItem.search(element.classItem) != -1){
                    if(element.classItem.search('active') == -1){
                        element.classItem += '-active';
                    }
                }
                else{
                    element.classItem = element.classItem.replace('-active', '');
                }
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
        },NOTHING(){
            
        }
    }

}

const store = new Vuex.Store(storeData);

export default store