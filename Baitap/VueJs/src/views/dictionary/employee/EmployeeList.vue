<template>
    <div class="content-container employee-content">

        <div :class="{'toggle-navbar' : toggle.isToggleNavbar}" class="content">

            <div class="content-header">
                <div class="title">{{title}}</div>
                <BaseButton @click="displayAddForm" classList="m-btn-default" hasIcon="true" bgColor="#019160"
                    :btnText="btnAddText" urlIcon="add.png" />
            </div>
            <div class="filter-bar">
                <div class="filter-left">
                    <BaseInput contentPlHolder="Tìm kiếm theo mã nhân viên,họ tên và số điện thoại"
                        classList="icon-search input-search user-input" type="text" errorContent="" refType=""
                        validType="search" ref="searchchingInput" @enterPress="filterData" />
                    <BaseCombobox ref="department" @filterData="filterData"
                        class="cbo select-container filter-select searching" isSearching="true" dataType="department" />
                    <BaseCombobox ref="position" @filterData="filterData"
                        class="cbo select-container filter-select searching" isSearching="true" dataType="position" />
                </div>
                <div class="filter-right">
                    <BaseButton @click="displayConfirmationPopup" classList="m-btn-delete " hasIcon="true"
                        bgColor="#e9ebee" btnText="" urlIcon="delete.png" />
                    <BaseButton @click="refreshData" classList="m-btn-refresh employee" hasIcon="true"
                        bgColor="#e9ebee" btnText="" urlIcon="refresh.png" />
                    <BaseButton @click="importData" classList="m-btn-refresh employee" hasIcon="true"
                        bgColor="#e9ebee" btnText="" urlIcon="import.png" />
                    <input accept=".csv" style="display: none;" @change="importDataHandle" ref="upload"
                        class="input-image" type="file" />
                </div>
            </div>
            <div class="grid">
                <div class="no-content" v-if="totalRecord == 0">
                    Không tìm thấy dữ liệu
                </div>
                <LoadingSpinner v-if="isShowSpinner" />
                <BaseTable v-show="!isShowSpinner" @hideSpinner="hideSpinner" @updateMaxPageNumber="updateMaxPageNumber"
                    @updateTotalRecord="updateTotalRecord" @updateSelectedData="updateSelectedData"
                    @displayFormEdit="displayFormEdit" ref="table" :type="type" :ths="ths" />
            </div>
            <BasePagingBar v-show="!isShowSpinner" type="nhân viên" @updatePageSize="updatePageSize"
                :pageSize="$store.state.data.payload.pageSize" ref="pagingBar" @updatePagination="updatePagination"
                :totalRecord="totalRecord" :maxPageNumber="maxPageNumber" />
        </div>
        <EmployeeDetail @hideForm="hideForm" v-if="isShowForm" @refreshData="refreshData" ref="employee" />

        <BasePopup @hideLayout="isShowPopUp=false" @deleteConfirm="deleteData" ref="confirmation"
            classContainer="popup-confirmation center-div" title="Xoá nhân viên" :content="popupContent"
            type="confirmation" :buttonTexts="deleteButtonText" :btnClassList="['m-btn-first','m-btn-second']" />
    </div>

</template>

<script>
    import BaseTable from '../../../components/BaseTable.vue'
    import EmployeeDetail from './EmployeeDetail.vue'
    import BaseButton from '../../../components/BaseButton.vue'
    import BaseCombobox from '../../../components/BaseCombobox.vue'
    import BasePopup from '../../../components/BasePopup.vue'
    import BaseInput from '../../../components/BaseInput.vue'
    import BasePagingBar from '../../../components/BasePagingBar.vue'
    import LoadingSpinner from '../../../layout/LoadingSpinner.vue'
    import EmployeeAPI from '../../../api/components/EmployeeAPI'
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
                pageSize: 20,
                pageIndex: 0
            }
            this.$store.commit('CHANGE_PAYLOAD', payload);
            await this.refreshData();
            // Lấy dữ liệu phòng ban
            let department = await this.getDepartmentData();
            this.$refs.department.data.push({
                content: "Tất cả phòng ban",
                DepartmentId: ""
            })
            this.$refs.department.setData(department.map(a => Object.assign({}, a)));
            this.$refs.department.updateInput("Tất cả phòng ban");
            // Lấy dữ liệu vị trí
            let position = await this.getPositionData();
            this.$refs.position.data.push({
                content: "Tất cả vị trí",
                PositionId: ""
            })
            this.$refs.position.setData(position.map(a => Object.assign({}, a)));
            this.$refs.position.updateInput("Tất cả vị trí")
        },
        props: [],
        data() {
            return {
                isShowSpinner: true,
                isReady: false,
                selectedData: [],
                isShowForm: false,
                isShowPopUp: false,
                maxPageNumber: 0,
                totalRecord: 0,
                dataDepartments: [],
                dataPositions: [],
                deleteButtonText: ["Có", "Không"],
                btnAddText: "Thêm nhân viên",
                title: "Danh sách nhân viên",
                popupContent: "",
                type: "employee-table",
                ths: [{
                        fieldName: "EmployeeCode",
                        value: "Mã nhân viên",
                        colWidth: "100px",
                    }, {
                        fieldName: "FullName",
                        value: "Họ và tên",
                    }, {
                        fieldName: "GenderName",
                        value: "Giới tính",
                        colWidth: "100px",
                    }, {
                        fieldName: "DateOfBirth",
                        value: "Ngày sinh",
                        colWidth: "100px",
                        textAlign: "center"
                    }, {
                        fieldName: "PhoneNumber",
                        value: "Số điện thoại",
                        colWidth: "100px",
                    },
                    {
                        fieldName: "Email",
                        value: "Email",
                    }, {
                        fieldName: "PositionName",
                        value: "Chức vụ",
                    }, {
                        fieldName: "DepartmentName",
                        value: "Phòng ban",
                    }, {
                        fieldName: "Salary",
                        value: "Mức lương cơ bản",
                        textAlign: "right"
                    }, {
                        fieldName: "WorkStatus",
                        value: "Tình trạng công việc",
                    },
                ]
            }
        },
        components: {
            BaseTable,
            EmployeeDetail,
            BaseButton,
            BaseCombobox,
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
                                let res = await EmployeeAPI.createNewData(result.data);
                                let index = await this.$store.dispatch('randomText', 4)
                                let content = res.data.Message.usrMsg
                                let type = "success"
                                let payloadToast = {
                                    content,
                                    type,
                                    index
                                }
                                this.isShowSpinner = false;
                                this.$store.dispatch('createToast', payloadToast)
                                this.refreshData();
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
                let department = this.$store.state.data.department.filter(element => element.content == this
                    .$refs.department.inputContent)[0]
                let position = this.$store.state.data.position.filter(element => element.content == this
                    .$refs.position.inputContent)[0]
                let departmentId = department != null ? department.DepartmentId : ""
                let positionId = position != null ? position.PositionId : ""
                let contentFilter = this.$refs.searchchingInput.inputContent;
                // Kiểm tra xem có chọn phòng ban,vị trí cụ thể hay không
                departmentId != "" ? payload["departmentId"] = departmentId : delete payload.departmentId
                positionId != "" ? payload["positionId"] = positionId : delete payload.positionId
                contentFilter != "" ? payload["contentFilter"] = contentFilter : payload["contentFilter"] = "NV"
            },
            /**
             * Lọc dữ liệu theo tiêu chí
             * Created By TBN(27/7/2021)
             */
            filterData() {
                // Lấy payload từ kho dữ liệu
                let payload = this.$store.state.data.payload
                this.checkField(payload)
                // Mặc định trang đầu tiên
                payload["pageIndex"] = 0
                this.$refs.pagingBar.currentPage = 1 // Chuyển trang hiện tại về 1 
                this.$refs.pagingBar.pages = [1, 2, 3, 4] // Đặt lại nội dung của dãy 4 số ở paging bar

                // Gọi vào mutation để thay đổi payload
                this.$store.commit('CHANGE_PAYLOAD', payload)
                this.refreshData()
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
                    this.$refs.table.setData(res.data.Data)
                    let newList = [];
                    res.data.Data.forEach(() => {
                        newList.push(false);
                    })
                    this.$refs.table.checkedList = newList;
                    this.updateMaxPageNumber(res.data.TotalPage);
                    this.updateTotalRecord(res.data.TotalRecord)
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
                } catch (error) {
                    console.log(error);
                }
                this.isReady = true;
                this.hideSpinner();
            },
            /**
             * Xóa dữ liệu theo danh sách EmployeeId
             * Created by TBN (31/7/2021)
             */
            async deleteData() {
                if (this.isReady) {
                    this.isShowSpinner = true;
                    for (const element of this.selectedData) {
                        try {
                            await EmployeeAPI.deleteData(element.EmployeeId)
                        } catch (error) {
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
                    }
                    this.isShowSpinner = false;
                    if (this.selectedData.length > 0) {
                        let index = await this.$store.dispatch('randomText', 4)
                        let content = "Xoá dữ liệu thành công"
                        let type = "success"
                        let payloadToast = {
                            content,
                            type,
                            index
                        }
                        this.$store.dispatch('createToast', payloadToast)
                        this.selectedData = []
                        this.refreshData()
                    }
                }else{
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
                        let maxSize = 8; // Số mã khách hàng tối đa để tránh overflow
                        this.$refs.confirmation.contentTooltip = ""; // Reset nội dung của tool tip
                        this.popupContent = "Bạn có chắc chắn muốn xóa nhân viên "; // Khởi tạo nội dung cho popup
                        //Thêm mã khách hàng vào nội dung của popup
                        for (let i = 0; i < this.selectedData.length; i++) {
                            if (i < maxSize) {
                                // Nếu vượt quá mức tối đa thì dừng không thêm
                                this.popupContent += "[" + this.selectedData[i].EmployeeCode + "],";
                                // Thêm nội dung vào tooltip
                                this.$refs.confirmation.contentTooltip += "[" + this.selectedData[i].EmployeeCode +
                                    "],";
                            } else {
                                // Thay dấu ... cho phần còn lại
                                (i == maxSize) ? this.popupContent += "...": true;
                                // Tiếp tục thêm mã khách hàng vào nội dung của tooltip
                                this.$refs.confirmation.contentTooltip += "[" + this.selectedData[i].EmployeeCode +
                                    "],";
                            }
                        }
                        // Nếu vượt quá sẽ cho phép hiện tooltip
                        (this.selectedData.length > maxSize) ? this.$refs.confirmation.isOverflowContent = true:
                            this
                            .$refs.confirmation.isOverflowContent = false;
                        // Xóa dấu , cuối cùng
                        this.$refs.confirmation.contentTooltip = this.$refs.confirmation.contentTooltip.slice(0, -
                            1);
                        if (this.popupContent[this.popupContent.length - 1] == ',')
                            this.popupContent = this.popupContent.slice(0, -1);
                        this.popupContent += " không?"
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
            async displayFormEdit(selectedData) {
                this.isShowForm = true;
                this.$nextTick(async () => {
                    this.$refs.employee.title = "SỬA THÔNG TIN NHÂN VIÊN"
                    this.$refs.employee.popupCloseFormContent =
                        "Bạn có muốn đóng hộp thoại sửa nhân viên hay không?"
                    this.$refs.employee.titlePopup = "Đóng hộp thoại sửa nhân viên"
                    this.$refs.employee.isEdit = true;
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
                this.refreshData()
            },
            /**
             * Cập nhật kích thước trang
             * Created By TBN (28/7/2021)
             */
            updatePageSize(pageSize) {
                // Xử lý tương tự như lọc dữ liệu chỉ thay đổi pageNumber

                let payload = this.$store.state.data.payload
                this.checkField(payload)
                payload["pageSize"] = pageSize
                payload["pageIndex"] = 0;
                this.refreshData()
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