import Vue from 'vue';
import Vuex from 'vuex';
import DepartmentAPI from '../api/components/DepartmentAPI'
import PositionAPI from '../api/components/PositionAPI'
import Common from './common'
import {
    resource
} from './resource'
Vue.use(Vuex)
// Locale 
let browserLocale = Common.convertBrowserLocale( window.navigator.userLanguage|| window.navigator.language);
const storeData = {
    state: {
        navbarItems: resource[browserLocale]['navbarItems'],
        toggle: {
            isToggleNavbar: false,
            isToggleForm: {
                employee: false,
            },
        },
        resource: resource,
        data: {
            entity: [],
            department: [],
            position: [],
            customerGroup: [],
            companyList: [{
                content: "CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC"
            }, {
                content: "CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ TÂN THÀNH"
            }, {
                content: "CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ NAM Á"
            }],
            gender: resource[browserLocale]['management']['gender'],
            pageSize: resource[browserLocale]['management']['pageSize'],
            toast: [],
            payload: {

            },
            objectPopUp: {
                titlePopUp: "",
                contentPopUp: "",
                type: "",
                buttonTexts: [],
            }
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
         * Created By TBN (26/7/2021)
         * @param {*} param0 
         * @param {*} length 
         * @returns 
         */
        randomText({
            commit
        }, length) {
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
        createToast({
            commit
        }, payload) {
            commit('PUSH_TOAST_DATA', payload)
            setTimeout(() => {
                commit('REMOVE_TOAST_DATA', payload.index)
            }, 3000)
        },
        /**
         * Hàm cập nhật dữ liệu popup
         * Created By TBN (21/8/2021)
         * @param {*} param0 
         * @param {*} payload 
         */
        updateObjectPopUp({
            commit
        }, payload) {
            commit('UPDATE_OBJECT_POPUP', payload);
        }
    },
    mutations: {
        /**
         * Cập nhật object PopUp
         * Created By TBN (21/8/2021)
         */
        UPDATE_OBJECT_POPUP(state, payload) {
            state.data.objectPopUp = payload;
        },
        /**
         * Ẩn,hiện navbar
         * Created By TBN (21/8/2021)
         */
        TOGGLE_NAVBAR(state) {
            state.toggle.isToggleNavbar = !state.toggle.isToggleNavbar;
        },
        /**
         * Chuyển đổi trạng thái active của item
         * Created By TBN (21/8/2021)
         * @param {*} state 
         * @param {*} classItem 
         */
        TOGGLE_ITEM_ACTIVE(state, classItem) {
            state.navbarItems.forEach(element => {
                element.classItem = element.classItem.replace('-active', '');
                if (element.classItem.search(classItem) != -1 || classItem.search(element.classItem) != -1) {
                    if (element.classItem.search('active') == -1) {
                        element.classItem += '-active';
                    }
                } else {
                    element.classItem = element.classItem.replace('-active', '');
                }
            })
        },
        /**
         * Gán dữ liệu đơn vị
         * Created By TBN (21/8/2021)
         * @param {*} state 
         * @param {*} data 
         */
        SET_DEPARTMENT_DATA(state, data) {
            data.forEach(element => element.content = element.DepartmentName)
            state.data.department = [...data]
        },
        /**
         * Gán dữ liệu thông tin
         * Created By TBN (21/8/2021)
         * @param {*} state 
         * @param {*} data 
         */
        SET_ENTITY_DATA(state, data) {
            state.data.entity = data
        },
        /**
         * Cập nhật dãy toast message
         * Created By TBN (21/8/2021)
         * @param {*} state 
         * @param {*} data 
         */
        PUSH_TOAST_DATA(state, data) {
            state.data.toast.push(data)
        },
        /**
         * Xóa toast message theo index
         * Created By TBN (21/8/2021)
         * @param {*} state 
         * @param {*} data 
         */
        REMOVE_TOAST_DATA(state, index) {
            state.data.toast = state.data.toast.filter(element => element.index != index)
        },
        /**
         * Thay đổi payload gửi dữ liệu backend
         * Created By TBN (21/8/2021)
         * @param {*} state 
         * @param {*} data 
         */
        CHANGE_PAYLOAD(state, newPayload) {
            state.data.payload = newPayload
        },
        NOTHING() {

        }
    }

}

const store = new Vuex.Store(storeData);

export default store