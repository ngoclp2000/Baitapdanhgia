<template>
    <div class="content-container employee-content">
        <div :class="{'toggle-navbar' : toggle.isToggleNavbar}" class="content">
            <div class="content-header">
                <div class="title">{{title}}</div>
                <BaseButton @click="displayAddForm" classList="m-btn-default" bgHoverColor="#35bf22" bgColor="#2ca01c" :btnText="btnAddText" />
            </div>
            <div class="main-content">
                <div class="toolbar-content">
                    <div class="filter-bar">
                        <div class="filter-right">
                            <BaseInput contentPlHolder="Tìm theo mã, tên nhân viên, số điện thoại"
                                classList="icon-search input-search user-input" type="text" errorContent="" refType=""
                                validType="search" ref="searchchingInput" @enterPress="searchData"
                                tooltipContent="Nhập thông tin tìm kiếm" noneCheck="true" />
                            <div class="refesh-icon" @click="refreshDataButtonClick" v-tooltip="'Cập nhật dữ liệu'">

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
                    :totalRecord="totalRecord" :maxPageNumber="maxPageNumber" :isReady="isReady" />
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
        <BasePopup @hideLayout="isShowPopUp=false" @deleteData="deleteData" ref="confirmation" />
    </div>
</template>

<script>
    import BaseTable from '../../../components/BaseTable.vue'
    import EmployeeDetail from './EmployeeDetail.vue'
    import BaseButton from '../../../components/BaseButton.vue'
    import BasePopup from '../../../components/BasePopup.vue'
    import BaseInput from '../../../components/BaseInput.vue'
    import BasePagingBar from '../../../components/BasePagingBar.vue'
    import LoadingSpinner from '../../../layout/LoadingSpinner.vue'
    import EmployeeAPI from '../../../api/components/EmployeeAPI'
    import {
        MISACODE
    } from '../../../store/resource.js'
    import {
        mapActions,
        mapMutations
    } from 'vuex'
    export default {
        created() {
            // Trường dữ liệu cho Employe
            this.ths = this.resource[this.$browserLocale]['management']['entity']['Employee']['tableFieldName']['main'];
            this.title = this.resource[this.$browserLocale]['management']['entity']['Employee']['title'];
        },
        async mounted() {
            let payload = {
                contentFilter: "",
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
                btnAddText: "Thêm mới nhân viên",
                title: "",
                type: "employee-table",
                ths: [],
            }
        },
        components: {
            BaseTable,
            EmployeeDetail,
            BaseButton,
            BasePopup,
            BaseInput,
            BasePagingBar,
            LoadingSpinner
        },
        methods: {
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
                this.isShowForm = true;
                setTimeout(() => {
                    this.$refs.employee.init()
                }, 0)
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
            /**
             * Hàm kiểm tra các trường dữ liệu đưa lên request 
             * Created By TBN (20/8/2021)
             */
            checkField(payload) {
                // Lấy dữ liệu departmentId,positionId,employeeFilter từ các trường tìm kiếm
                let contentFilter = this.$refs.searchchingInput.inputContent;
                if (contentFilter != null) {
                    payload["contentFilter"] = contentFilter.split(' ').filter(e => e != "").join(' ');
                } else payload["contentFilter"] = null;
                // Kiểm tra xem có chọn phòng ban,vị trí cụ thể hay không
                //contentFilter != "" ? payload["contentFilter"] = contentFilter : payload["contentFilter"] = "NV"
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
             * Sự kiện bấm nút refresh
             * Created By TBN(20/8/2021)
             */
            async refreshDataButtonClick() {
                if (this.isReady) {
                    if (this.$refs.pagingBar)
                        this.$refs.pagingBar.currentPage = 1;
                    this.updatePagination(1);
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
             * Cập nhật lại dữ liệu theo tiêu chí trong payload
             * Created By TBN(27/7/2021)
             */
            async refreshData() {
                // Hiện spinner,chuyển trạng thái chưa sẵn sàng, chuyển trạng thái chưa sẵn sàng xuống table
                this.isShowSpinner = true;
                this.isReady = false;
                this.$refs.table.isReady = false;
                try {
                    // Gọi API lấy dữ liệu theo phân trang,tìm kiếm...
                    let res = await EmployeeAPI.filterEmployees(this.$store.state.data.payload);
                    // Cập nhật giá trị tổng số trang, tổng số bản ghi
                    this.updateMaxPageNumber(res.data.TotalPage);
                    this.updateTotalRecord(res.data.TotalRecord);
                    // Gán dữ liệu cho bảng
                    this.$refs.table.setData(res.data.Data)
                    // Cập nhật dữ liệu cho bảng: 
                    //  dòng được chọn(checkedList)
                    //  kiểu sắp xếp dữ liệu (true = Desc, false = Asc) (sortDirectionList)
                    //  Danh sách ẩn hiện cho context menu (displayFunctionList)
                    let newList = [];
                    res.data.Data.forEach(() => {
                        newList.push(false);
                    })
                    this.$refs.table.checkedList = [...newList];
                    this.$refs.table.sortDirectionList = [...newList];
                    this.$refs.table.displayFunctionList = [...newList];
                    // Chuyển dữ liệu vào kho (store)
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
                    // Chuyển trạng thái về sẵn sàng, dữ liệu
                    this.isReady = true;
                    this.$refs.table.isReady = true;
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
                    this.table.isReady = true;
                }
                this.hideSpinner(); // Ẩn spinner
            },
            /**
             * Xóa dữ liệu theo danh sách EmployeeId
             * Created by TBN (31/7/2021)
             */
            async deleteData() {
                this.isShowSpinner = true; // Hiện spinner
                try {
                    let res = await EmployeeAPI.deleteData(this.selectedData[0].EmployeeId);
                    // Kiểm tra trạng thái thành công hay thất bại của thao tác xóa
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
                    // Hiện lỗi trả về (500)
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
            },
            /**
             * Hiển thị form xác nhận xóa nhân viên
             * Created By TBN (2/8/2021)
             */
            async displayConfirmationPopup() {
                // Chỉnh thông tin cho popup
                this.objectPopUp.contentPopUp = this.popupContent['delete'].format(this.selectedData[0]
                    .EmployeeCode);
                this.objectPopUp.type = "warning"
                this.objectPopUp.buttonTexts = ["Không", "", "Có"];
                // Hiện popup
                this.$refs.confirmation.isShow = true;
                this.isShowPopUp = true;
            },
            /**
             * Hiển thị form sửa nhân viên
             * Create By TBN(26/7/2021)
             */
            async displayFormEdit(selectedData, isDuplicate) {
                this.isShowForm = true;
                this.$nextTick(async () => {
                    this.$refs.employee.isEdit = true;
                    this.$refs.employee.isDuplicate = isDuplicate;
                    await this.$refs.employee.bindingData(selectedData);
                })
            },
            /**
             * Hiển thị form nhân bản
             * Created BaseTable TBN(21/8/2021)
             */
            async displayFormDuplicate(selectedData) {
                this.isShowForm = true;
                this.$nextTick(async () => {
                    this.$refs.employee.isDuplicate = true;
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
            async updatePagination(pageNumber) {
                // Xử lý tương tự như lọc dữ liệu chỉ thay đổi pageNumber
                let payload = this.$store.state.data.payload
                this.checkField(payload)
                payload["pageIndex"] = pageNumber
                this.currentPage = pageNumber
                await this.refreshData()
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
            checkOverFlowTable() {
                let contentHeader = document.querySelector('.content .content-header');
                let toolbarContent = document.querySelector('.content .main-content .toolbar-content');
                let rectContentHeader = contentHeader.getBoundingClientRect();
                let reactToolbarContent = toolbarContent.getBoundingClientRect();
                let amountDistance = 30,
                    widthScrollBar = 10;
                let diff = reactToolbarContent.right + amountDistance - rectContentHeader.right;
                let initailPaddingRight = window.getComputedStyle(contentHeader, null).getPropertyValue('padding-right')
                    .replaceAll(/[^0-9]/g, '');

                if (Math.abs(diff) == widthScrollBar && initailPaddingRight == amountDistance) {
                    contentHeader.style.paddingRight = (parseInt(initailPaddingRight, 10) - diff) + "px";
                } else {
                    if (diff == 0) {
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
            },
            objectPopUp() {
                return this.$store.state.data.objectPopUp;
            },
            resource(){
                return this.$store.state.resource;
            },
            popupContent(){
                return this.$store.state.resource[this.$browserLocale]['management']['entity']['Employee']['popupContent'];
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