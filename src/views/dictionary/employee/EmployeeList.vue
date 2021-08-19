<template>
    <div class="content-container employee-content">
        <div :class="{'toggle-navbar' : toggle.isToggleNavbar}" class="content">
            <div class="content-header">
                <div class="title">{{title}}</div>
                <BaseButton @click="displayAddForm" classList="m-btn-default" bgColor="#2ca01c" :btnText="btnAddText" />
            </div>
            <div class="main-content">
                <div class="toolbar-content">
                    <div class="filter-bar">
                        <div class="filter-right">
                            <BaseInput contentPlHolder="Tìm theo mã, tên nhân viên"
                                classList="icon-search input-search user-input" type="text" errorContent="" refType=""
                                validType="search" ref="searchchingInput" @enterPress="searchData" />
                            <div class="refesh-icon" @click="refreshData">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid">
                    <BaseTable @hideSpinner="hideSpinner" @updateMaxPageNumber="updateMaxPageNumber"
                        @updateTotalRecord="updateTotalRecord" @updateSelectedData="updateSelectedData"
                        @displayFormEdit="displayFormEdit" @displayConfirmationPopup="displayConfirmationPopup"
                        ref="table" :type="type" :ths="ths" />
                </div>
                <LoadingSpinner v-if="isShowSpinner && totalRecord != 0" />
                <BasePagingBar v-if="totalRecord != 0" type="nhân viên" @updatePageSize="updatePageSize"
                    :pageSize="$store.state.data.payload.pageSize" ref="pagingBar" @updatePagination="updatePagination"
                    :totalRecord="totalRecord" :maxPageNumber="maxPageNumber" :isReady="isReady"/>
                <div class="no-content" v-if="totalRecord == 0">
                    <div class="no-content-img">
                         
                    </div>
                    <div class="no-content-text">
                        Không có dữ liệu
                    </div>
                   <LoadingSpinner v-if="isShowSpinner" />
                </div>
                
            </div>

        </div>
        <EmployeeDetail @hideForm="hideForm" v-if="isShowForm" @refreshData="refreshData" ref="employee" />
        <BasePopup @hideLayout="isShowPopUp=false" @deleteData="deleteData" ref="confirmation"
            :objectPopUp="objectPopUp" />
    </div>
</template>

<script>
    import BaseTable from '../../../components/BaseTable.vue'
    import EmployeeDetail from './EmployeeDetail.vue'
    import BaseButton from '../../../components/BaseButton.vue'
    //import BaseCombobox from '../../../components/BaseCombobox.vue'
    import BasePopup from '../../../components/BasePopup.vue'
    import BaseInput from '../../../components/BaseInput.vue'
    import BasePagingBar from '../../../components/BasePagingBar.vue'
    import LoadingSpinner from '../../../layout/LoadingSpinner.vue'
    import EmployeeAPI from '../../../api/components/EmployeeAPI'
    import MISACODE from '../../../store/const.js'
    //import Common from '../../../store/common.js'
    const papa = require('papaparse')
    import {
        mapActions,
        mapMutations
    } from 'vuex'
    export default {
        async mounted() {
            let payload = {
                contentFilter: "NV",
                pageSize: 10,
                pageIndex: 0
            }
            this.$store.commit('CHANGE_PAYLOAD', payload);
            await this.refreshData();
            this.checkOverFlowTable();
        },
        data() {
            return {
                isShowSpinner: true,
                isReady: true,
                selectedData: [],
                isShowForm: false,
                isShowPopUp: false,
                maxPageNumber: 0,
                totalRecord: 0,
                currentPage: 1,
                dataDepartments: [],
                dataPositions: [],
                objectPopUp: {
                    classContainer: "",
                    titlePopUp: "",
                    contentPopUp: "",
                    type: "",
                    buttonTexts: [],
                    btnClassList: [],
                },
                btnAddText: "Thêm mới nhân viên",
                title: "Nhân viên",
                popupContent: "",
                type: "employee-table",
                ths: [{
                        fieldName: "EmployeeCode",
                        value: "MÃ NHÂN VIÊN",
                        type: "number",
                    }, {
                        fieldName: "EmployeeName",
                        value: "TÊN NHÂN VIÊN",
                        colWidth: "250px",
                    }, {
                        fieldName: "GenderName",
                        value: "GIỚI TÍNH",
                    }, {
                        fieldName: "DateOfBirth",
                        value: "NGÀY SINH",
                        textAlign: "center",
                    }, {
                        fieldName: "IdentityNumber",
                        value: "SỐ CMND",
                        type: "number",
                    },
                    {
                        fieldName: "EmployeePosition",
                        value: "CHỨC DANH",
                        colWidth: "250px",
                    }, {
                        fieldName: "DepartmentName",
                        value: "TÊN ĐƠN VỊ",
                        colWidth: "250px",
                    }, {
                        fieldName: "BankAccountNumber",
                        value: "SỐ TÀI KHOẢN",
                    }, {
                        fieldName: "BankName",
                        value: "TÊN NGÂN HÀNG",
                        colWidth: "250px",
                    }, {
                        fieldName: "BankBranchName",
                        value: "CHI NHÁNH TK NGÂN HÀNG",
                        colWidth: "250px",
                    },
                ]
            }
        },
        components: {
            BaseTable,
            EmployeeDetail,
            BaseButton,
            //BaseCombobox,
            BasePopup,
            BaseInput,
            BasePagingBar,
            LoadingSpinner
        },

        methods: {
            /**
             * Trigger input 
             * Created By TBN(1/8/2021)
             */
            importData() {
                this.$refs.upload.click();
            },
            /**
             * Xử lý sự kiện import dữ liệu
             * Created By TBN (1/8/2021)
             */
            async importDataHandle() {
                let uploadInput = this.$refs.upload
                if (uploadInput.files && uploadInput.files[0]) {
                    let fileImport = uploadInput.files[0];
                    papa.parse(fileImport, {
                        header: true, // Don't bog down the main thread if its a big file
                        complete: async (result) => {
                            // do stuff with result
                            this.isShowSpinner = true;
                            result.data.pop()
                            try {
                                // Thêm mới dữ liệu
                                let res = await EmployeeAPI.createNewData(result.data);
                                // Kiểm tra dữ liệu
                                if (res.data.MISACode == MISACODE.NotValid) {
                                    // Dữ liệu lỗi đưa ra các lỗi bằng toast message
                                    let arrError = res.data.Message;
                                    arrError.forEach(async (element) => {
                                        let index = await this.$store.dispatch('randomText',
                                            4)
                                        let content = element.usrMsg
                                        let type = "error"
                                        let payloadToast = {
                                            content,
                                            type,
                                            index
                                        }
                                        this.$store.dispatch('createToast', payloadToast)
                                    });
                                } else if (res.data.MISACode == MISACODE.Success) {
                                    // Dữ liệu không có lỗi và thêm mới thành công
                                    let index = await this.$store.dispatch('randomText', 4)
                                    let type = "success";
                                    let content = res.data.Message.usrMsg
                                    let payloadToast = {
                                        content,
                                        type,
                                        index
                                    }
                                    this.$store.dispatch('createToast', payloadToast)
                                    this.refreshData();
                                } else {
                                    // Thêm mới thất bại dữ liệu không lỗi
                                    let index = await this.$store.dispatch('randomText', 4)
                                    let type = "error";
                                    let content = res.data.Message.usrMsg
                                    let payloadToast = {
                                        content,
                                        type,
                                        index
                                    }
                                    this.$store.dispatch('createToast', payloadToast);
                                }
                                this.isShowSpinner = false;
                            } catch (error) {
                                // Lỗi hệ thống, dữ liệu
                                if (error.response.status == 400) {
                                    let index = await this.$store.dispatch('randomText', 4)
                                    let content = "Dữ liệu có lỗi vui lòng kiểm tra lại"
                                    let type = "error"
                                    let payload = {
                                        content,
                                        type,
                                        index
                                    }
                                    this.$store.dispatch('createToast',
                                        payload)
                                }
                                this.isShowSpinner = false;
                            }
                        }
                    });
                }

            },
            /**
             * Cập nhật tổng số bản ghi
             * Created By TBN(25/7/2021)
             */
            updateTotalRecord(totalRecord) {
                this.totalRecord = totalRecord;
            },
            /**
             * Hiển thị form thêm nhân viên
             * Created By TBN(25/7/2021)
             */
            async displayAddForm() {
                if (this.isReady) {
                    this.isShowForm = true;
                    setTimeout(() => {
                        this.$refs.employee.init()
                        this.$refs.employee.isEdit = false
                    }, 10)
                } else {
                    let index = await this.$store.dispatch('randomText', 4)
                    let content = "Dữ liệu chưa sẵn sàng"
                    let type = "warning"
                    let payloadToast = {
                        content,
                        type,
                        index
                    }
                    this.$store.dispatch('createToast', payloadToast)
                }

            },
            /**
             * Ẩn spinner
             * Created By TBN(27/7/2021)
             */
            hideSpinner() {
                this.isShowSpinner = false
            },
            /**
             * Ẩn form nhân viên
             * Created By TBN(2/8/2021)
             */
            hideForm() {
                this.$refs.employee.title = "THÊM NHÂN VIÊN"
                this.isShowForm = false;
            },
            checkField(payload) {
                // Lấy dữ liệu departmentId,positionId,employeeFilter từ các trường tìm kiếm
                let contentFilter = this.$refs.searchchingInput.inputContent;
                // Kiểm tra xem có chọn phòng ban,vị trí cụ thể hay không
                contentFilter != "" ? payload["contentFilter"] = contentFilter : payload["contentFilter"] = "NV"
            },
            /**
             * Lọc dữ liệu theo tiêu chí
             * Created By TBN(27/7/2021)
             */
            async searchData() {
                // Lấy payload từ kho dữ liệu
                let payload = this.$store.state.data.payload
                this.checkField(payload)
                // Mặc định trang đầu tiên
                payload["pageIndex"] = 0
                // Gọi vào mutation để thay đổi payload
                this.$store.commit('CHANGE_PAYLOAD', payload)
                await this.refreshData()
                if (this.totalRecord != 0) {
                    this.$refs.pagingBar.currentPage = 1 // Chuyển trang hiện tại về 1 
                    this.$refs.pagingBar.pages = [1, 2, 3, 4] // Đặt lại nội dung của dãy 4 số ở paging bar
                }
            },
            /**
             * Cập nhật lại dữ liệu theo tiêu chí trong payload
             * Created By TBN(27/7/2021)
             */
            async refreshData() {
                this.isShowSpinner = true;
                this.isReady = false;
                try {
                    let res = await EmployeeAPI.filterEmployees(this.$store.state.data.payload);
                    this.updateMaxPageNumber(res.data.TotalPage);
                    this.updateTotalRecord(res.data.TotalRecord);
                    this.$refs.table.setData(res.data.Data)
                    let newList = [];
                    res.data.Data.forEach(() => {
                        newList.push(false);
                    })
                    this.$refs.table.checkedList = [...newList];
                    this.$refs.table.sortDirectionList = [...newList];
                    this.$refs.table.displayFunctionList = [...newList];
                    this.$store.commit('SET_ENTITY_DATA', res.data.Data)
                    // Chuyển dấu tích chọn về default
                    if (this.$refs.table.$refs.all.checked)
                        this.$refs.table.$refs.all.click();
                    else {
                        for (const [key] of Object.entries(this.$refs.table.$refs)) {
                            if (key == "all")
                                continue
                            if (this.$refs.table.$refs[key][0]) {
                                if (this.$refs.table.$refs[key][0].checked) {
                                    this.$refs.table.$refs[key][0].click();
                                }
                            }
                        }
                    }
                    this.isReady = true;
                } catch (error) {
                    if (error.response.data.Message != null) {
                        let index = await this.$store.dispatch('randomText', 4)
                        let content = error.response.data.Message.usrMsg
                        let type = "error"
                        let payloadToast = {
                            content,
                            type,
                            index
                        }
                        this.$store.dispatch('createToast', payloadToast)
                    } else {
                        let index = await this.$store.dispatch('randomText', 4)
                        let content = "Sai trường dữ liệu khi gửi request"
                        let type = "error"
                        let payloadToast = {
                            content,
                            type,
                            index
                        }
                        this.$store.dispatch('createToast', payloadToast)
                    }
                }
                this.hideSpinner();
            },
            /**
             * Xóa dữ liệu theo danh sách EmployeeId
             * Created by TBN (31/7/2021)
             */
            async deleteData() {
                if (this.isReady) {
                    this.isShowSpinner = true;
                    try {
                        let res = null;
                        if (this.selectedData.length > 1) {
                            let arrayCustomerId = this.selectedData.map(a => a.CustomerId);
                            res = await EmployeeAPI.deleteMultipleData(arrayCustomerId);
                        } else {
                            res = await EmployeeAPI.deleteData(this.selectedData[0].EmployeeId);
                        }
                        if (res.data.MISACode == MISACODE.Fail) {
                            this.isShowSpinner = false;
                            let index = await this.$store.dispatch('randomText', 4)
                            let content = "Xóa khách hàng thất bại"
                            let type = "error"
                            let payloadToast = {
                                content,
                                type,
                                index
                            }
                            this.$store.dispatch('createToast', payloadToast)
                        } else {
                            this.isShowSpinner = false;
                            let index = await this.$store.dispatch('randomText', 4)
                            let content = "Xóa khách hàng thành công"
                            let type = "success"
                            let payloadToast = {
                                content,
                                type,
                                index
                            }
                            this.$store.dispatch('createToast', payloadToast);
                            this.selectedData = [];
                            await this.refreshData();
                            this.isShowSpinner = false;
                        }
                    } catch (error) {
                        this.isShowSpinner = false;
                        let index = await this.$store.dispatch('randomText', 4)
                        let content = error.data.Message.usrMsg
                        let type = "error"
                        let payloadToast = {
                            content,
                            type,
                            index
                        }
                        this.$store.dispatch('createToast', payloadToast)
                    }
                } else {
                    let index = await this.$store.dispatch('randomText', 4)
                    let content = "Dữ liệu chưa sẵn sàng"
                    let type = "warning"
                    let payloadToast = {
                        content,
                        type,
                        index
                    }
                    this.$store.dispatch('createToast', payloadToast)
                }
            },
            /**
             * Hiển thị form xác nhận xóa nhân viên
             * Created By TBN (2/8/2021)
             */
            async displayConfirmationPopup() {
                if (this.isReady) {
                    if (this.selectedData.length > 0) {
                        this.popupContent = "Bạn có thực sự muốn xóa Nhân viên <" + this.selectedData[0]
                            .EmployeeCode + "> không?"
                        // Chỉnh thông tin cho popup
                        this.objectPopUp.contentPopUp = this.popupContent;
                        this.objectPopUp.type = "confirmation"
                        this.objectPopUp.buttonTexts = ["Không", "", "Có"];
                        // Hiện popup
                        this.$refs.confirmation.isShow = true;
                        this.isShowPopUp = true;
                    } else {
                        let index = await this.$store.dispatch('randomText', 4)
                        let content = "Bạn chưa chọn nhân viên nào"
                        let type = "warning"
                        let payloadToast = {
                            content,
                            type,
                            index
                        }
                        this.$store.dispatch('createToast', payloadToast)
                    }
                } else {
                    let index = await this.$store.dispatch('randomText', 4)
                    let content = "Dữ liệu chưa sẵn sàng"
                    let type = "warning"
                    let payloadToast = {
                        content,
                        type,
                        index
                    }
                    this.$store.dispatch('createToast', payloadToast)
                }
            },
            /**
             * Hiển thị form sửa nhân viên
             * Create By TBN
             */
            async displayFormEdit(selectedData,isDuplicate) {
                this.isShowForm = true;
                this.$nextTick(async () => {
                    this.$refs.employee.isEdit = true;
                    this.$refs.employee.isDuplicate = isDuplicate;
                    await this.$refs.employee.bindingData(selectedData);
                })
            },
            /**
             * Cập nhật mảng employeeId muốn xóa
             * Created By TBN(26/7/2021)
             */
            updateSelectedData(data, type) {
                if (type == "remove")
                    this.selectedData = this.selectedData.filter(element => element.EmployeeId != data.EmployeeId)
                else {
                    if (this.selectedData.filter(element => element.EmployeeId == data.EmployeeId).length == 0)
                        this.selectedData.push(data)
                }

            },
            /**
             * Cập nhật trang hiện tại 
             * Created By TBN(26/7/2021)
             */
            updateMaxPageNumber(pageNumber) {
                this.maxPageNumber = pageNumber;
            },
            /**
             * Cập nhật dữ liệu phân trang 
             * Created By TBN(26/7/2021)
             */
            updatePagination(pageNumber) {
                // Xử lý tương tự như lọc dữ liệu chỉ thay đổi pageNumber
                let payload = this.$store.state.data.payload
                this.checkField(payload)
                payload["pageIndex"] = pageNumber
                this.currentPage = pageNumber
                this.refreshData()
            },
            /**
             * Cập nhật kích thước trang
             * Created By TBN (28/7/2021)
             */
            async updatePageSize(pageSize) {
                // Xử lý tương tự như lọc dữ liệu chỉ thay đổi pageNumber
                let payload = this.$store.state.data.payload
                this.checkField(payload)
                payload["pageSize"] = parseInt(pageSize.split(' ')[0], 10);
                payload["pageIndex"] = 0;
                await this.refreshData();

                // Kiểm tra overflow
                this.checkOverFlowTable();
            },
            /**
             * Kiểm tra xem bảng có bị overflow hay không
             * Nếu có điều chỉnh lại giao diện
             * Created By TBN (19/8/2021)
             */
            checkOverFlowTable(){
                let contentHeader = document.querySelector('.content .content-header');
                let toolbarContent = document.querySelector('.content .main-content .toolbar-content');
                let rectContentHeader = contentHeader.getBoundingClientRect();
                let reactToolbarContent = toolbarContent.getBoundingClientRect();
                let amountDistance = 30,widthScrollBar = 10;
                let diff = reactToolbarContent.right + amountDistance - rectContentHeader.right;
                let initailPaddingRight = window.getComputedStyle(contentHeader, null).getPropertyValue('padding-right').replaceAll(/[^0-9]/g, '');
                
                if(Math.abs(diff) == widthScrollBar && initailPaddingRight == amountDistance){
                    contentHeader.style.paddingRight = (parseInt(initailPaddingRight,10) - diff) + "px" ;
                }else{
                    if(diff == 0){
                        contentHeader.style.paddingRight = amountDistance + "px";
                    }
                }
            },
            ...mapActions(['getDepartmentData', 'getPositionData']),
            ...mapMutations(['CHANGE_PAYLOAD'])
        },
        computed: {
            toggle() {
                return this.$store.state.toggle
            }
        }

    }
</script>

<style scoped>
    .toggle-navbar {
        left: 52px;
        width: calc(100% - 221px + 169px);
    }
</style>