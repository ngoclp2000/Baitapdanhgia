<template>
    <div class="content-container customer-content">

        <div :class="{'toggle-navbar' : toggle.isToggleNavbar}" class="content">

            <div class="content-header">
                <div class="title">{{title}}</div>
                <BaseButton @click="displayAddForm" classList="m-btn-default" hasIcon="true" bgColor="#019160"
                    :btnText="btnAddText" urlIcon="add.png" />
            </div>
            <div class="filter-bar">
                <div class="filter-left">
                    <BaseInput contentPlHolder="Tìm kiếm theo mã nhân viên,họ tên và số điện thoại"
                        classList="icon-search input-search user-input" type="text" errorContent="" refType=" "
                        validType="search" ref="searchchingInput" @enterPress="filterData" />
                    <BaseCombobox ref="customerGroup" @filterData="filterData"
                        class="cbo select-container filter-select searching" isSearching="true"
                        dataType="customerGroup" />
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
            <BasePagingBar v-show="!isShowSpinner" @updatePageSize="updatePageSize"
                :pageSize="$store.state.data.payload.pageSize" ref="pagingBar" @updatePagination="updatePagination"
                :totalRecord="totalRecord" :maxPageNumber="maxPageNumber" type="khách hàng" />
        </div>
        <CustomerDetail @hideForm="hideForm" v-if="isShowForm" @refreshData="refreshData" ref="customer" />

        <BasePopup @hideLayout="isShowPopUp=false" @deleteConfirm="deleteData" ref="confirmation"
            classContainer="popup-confirmation center-div" title="Xoá nhân viên" :content="popupContent"
            type="confirmation" :buttonTexts="deleteButtonText" :btnClassList="['m-btn-first','m-btn-second']" />
    </div>

</template>

<script>
    import BaseTable from '../../../components/BaseTable.vue'
    import CustomerDetail from './CustomerDetail.vue'
    import BaseButton from '../../../components/BaseButton.vue'
    import BaseCombobox from '../../../components/BaseCombobox.vue'
    import BasePopup from '../../../components/BasePopup.vue'
    import BaseInput from '../../../components/BaseInput.vue'
    import BasePagingBar from '../../../components/BasePagingBar.vue'
    import LoadingSpinner from '../../../layout/LoadingSpinner.vue'
    import CustomerAPI from '../../../api/components/CustomerAPI'
    const papa = require('papaparse')
    import {
        mapActions,
        mapMutations
    } from 'vuex'
    export default {
        async created() {
            let payload = {
                contentFilter: "KH",
                pageSize: 20,
                pageIndex: 0
            }
            this.$store.commit('CHANGE_PAYLOAD', payload);
            await this.refreshData();
            let res = await this.getCustomerGroupData();
            // Đẩy dữ liệu vào các combobox
            this.$refs.customerGroup.data.push({
                content: "Tất cả nhóm khách hàng",
                CustomerGroupId: ""
            })
            this.$refs.customerGroup.setData(res.map(a => Object.assign({}, a)));
            this.$refs.customerGroup.updateInput("Tất cả nhóm khách hàng");
        },
        props: [],
        data() {
            return {
                isShowSpinner: true,
                selectedData: [],
                isShowForm: false,
                isShowPopUp: false,
                maxPageNumber: 0,
                totalRecord: 0,
                dataCustomerGroups: [],
                deleteButtonText: ["Có", "Không"],
                title: "Danh sách khách hàng",
                popupContent: "",
                btnAddText: "Thêm khách hàng",
                type: "customer-table",
                ths: [{
                        fieldName: "CustomerCode",
                        value: "Mã khách hàng",
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
                        textAlign: "center"
                    }, {
                        fieldName: "PhoneNumber",
                        value: "Số điện thoại",
                        colWidth: "100px",
                    },
                    {
                        fieldName: "Email",
                        value: "Email",
                    },
                    {
                        fieldName: "DebitAmount",
                        value: "Tiền nợ",
                        colWidth: "100px",
                        textAlign: "right"
                    },
                    {
                        fieldName: "CustomerGroupName",
                        value: "Nhóm khách hàng",
                    }
                ]
            }
        },
        components: {
            BaseTable,
            CustomerDetail,
            BaseButton,
            BaseCombobox,
            BasePopup,
            BaseInput,
            BasePagingBar,
            LoadingSpinner
        },

        methods: {
            /**
             * Trigger input field
             * Created By TBN (31/7/2021)
             */
            importData() {
                this.$refs.upload.click();
            },
            /**
             * Xử lý sự kiện import dữ liệu
             * Created By TBN (31/7/2021)
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
                            // Xử lý dữ liệu
                            result.data.forEach(element => {
                                for (let [key, value] of Object.entries(element)) {
                                    if (value == "null" || value == null)
                                        delete element[key];
                                }
                            })
                            try {
                                let res = await CustomerAPI.createNewData(result.data);
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
                                } else {
                                    let arrError = error.response.data.Message;
                                    arrError.forEach(async (element) => {
                                        let index = await this.$store.dispatch('randomText',
                                            4);
                                        let content = element.usrMsg
                                        let type = "error"
                                        let payload = {
                                            content,
                                            type,
                                            index
                                        }
                                        this.$store.dispatch('createToast',
                                            payload)
                                    });
                                }
                                this.isShowSpinner = false;
                                this.refreshData();
                            }
                        }
                    });
                }

            },
            /**
             * Cập nhật số bản ghi
             * Created By TBN (28/7/2021)
             */
            updateTotalRecord(totalRecord) {
                this.totalRecord = totalRecord;
            },
            /**
             * Hiển thị form thêm nhân viên
             * Created By TBN
             */
            displayAddForm() {
                this.isShowForm = true;
                setTimeout(() => {
                    this.$refs.customer.init()
                    this.$refs.customer.isEdit = false
                }, 10)
            },
            /**
             * Ẩn spinner
             * Created By TBN
             */
            hideSpinner() {
                setTimeout(() => {
                    this.isShowSpinner = false
                }, 0)
            },
            /**
             * Ẩn form nhân viên
             */
            hideForm() {
                this.$refs.customer.title = "THÊM KHÁCH HÀNG"
                this.isShowForm = false;
            },
            checkField(payload) {
                // Lấy dữ liệu customerGroupId,customerFilter từ các trường tìm kiếm
                let customerGroup = this.$store.state.data.customerGroup.filter(element => element.content == this
                    .$refs.customerGroup.inputContent)[0]
                let contentFilter = this.$refs.searchchingInput.inputContent;
                let customerGroupId = (customerGroup != null ? customerGroup.CustomerGroupId : "")

                // Kiểm tra xem có chọn phòng ban,vị trí cụ thể hay không
                customerGroupId != "" ? payload["customerGroupId"] = customerGroupId : delete payload.customerGroupId
                contentFilter != "" ? payload["contentFilter"] = contentFilter : payload["contentFilter"] = "KH"
            },
            /**
             * Lọc dữ liệu theo tiêu chí
             * Created By TBN
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
                setTimeout(() => {
                    this.refreshData()
                }, 100)
            },
            /**
             * Cập nhật lại dữ liệu theo tiêu chí trong payload
             * Created By TBN
             */
            async refreshData() {
                this.isShowSpinner = true;
                try {
                    let res = await CustomerAPI.filterCustomers(this.$store.state.data.payload);
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
                    console.log(error)
                }
                this.hideSpinner();
            },
            /**
             * Xóa dữ liệu theo danh sách EmployeeId
             */
            async deleteData() {
                this.isShowSpinner = true;
                for (const element of this.selectedData) {
                    try {
                        await CustomerAPI.deleteData(element.CustomerId);
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
                    let content = "Xóa khách hàng thành công"
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

            },
            /**
             * Hiển thị form xác nhận xóa nhân viên
             * Created By TBN
             */
            async displayConfirmationPopup() {
                // Nếu đã chọn khách hàng để xóa
                if (this.selectedData.length > 0) {
                    let maxSize = 6; // Số mã khách hàng tối đa để tránh overflow
                    this.$refs.confirmation.contentTooltip = ""; // Reset nội dung của tool tip
                    this.popupContent = "Bạn có chắc chắn muốn xóa khách hàng "; // Khởi tạo nội dung cho popup
                    //Thêm mã khách hàng vào nội dung của popup
                    for (let i = 0; i < this.selectedData.length; i++) {
                        if (i < maxSize) {
                            // Nếu vượt quá mức tối đa thì dừng không thêm
                            this.popupContent += "[" + this.selectedData[i].CustomerCode + "],";
                            // Thêm nội dung vào tooltip
                            this.$refs.confirmation.contentTooltip += "[" + this.selectedData[i].CustomerCode +
                                "],";
                        } else {
                            // Thay dấu ... cho phần còn lại
                            (i == maxSize) ? this.popupContent += "...": true;
                            // Tiếp tục thêm mã khách hàng vào nội dung của tooltip
                            this.$refs.confirmation.contentTooltip += "[" + this.selectedData[i].CustomerCode +
                                "],";
                        }
                    }
                    // Nếu vượt quá sẽ cho phép hiện tooltip
                    (this.selectedData.length > maxSize) ? this.$refs.confirmation.isOverflowContent = true: this
                        .$refs.confirmation.isOverflowContent = false;
                    // Xóa dấu , cuối cùng
                    this.$refs.confirmation.contentTooltip = this.$refs.confirmation.contentTooltip.slice(0, -1);
                    if (this.popupContent[this.popupContent.length - 1] == ',')
                        this.popupContent = this.popupContent.slice(0, -1);
                    this.popupContent += " không?"
                    // Hiện popup
                    this.$refs.confirmation.isShow = true;
                    this.isShowPopUp = true;
                } else {
                    let index = await this.$store.dispatch('randomText', 4)
                    let content = "Bạn chưa chọn khách hàng nào"
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
                this.$nextTick(() => {
                    this.$refs.customer.title = "SỬA THÔNG TIN KHÁCH HÀNG"
                    this.$refs.customer.popupCloseFormContent =
                        "Bạn có muốn đóng hộp thoại sửa khách hàng hay không?"
                    this.$refs.customer.titlePopup = "Đóng hộp thoại sửa khách hàng"
                    this.$refs.customer.isEdit = true
                    this.$refs.customer.bindingData(selectedData)
                })
            },
            /**
             * Cập nhật mảng employeeId muốn xóa
             * Created By TBN
             */
            updateSelectedData(data, type) {
                if (type == "remove")
                    this.selectedData = this.selectedData.filter(element => element.CustomerId != data.CustomerId)
                else {
                    if (this.selectedData.filter(element => element.CustomerId == data.CustomerId).length == 0)
                        this.selectedData.push(data)
                }
            },
            /**
             * Cập nhật trang hiện tại 
             * Created By TBN
             */
            updateMaxPageNumber(pageNumber) {
                this.maxPageNumber = pageNumber;
            },
            /**
             * Cập nhật dữ liệu phân trang 
             * Created By TBN
             */
            updatePagination(pageNumber) {

                // Lấy payload từ kho dữ liệu
                let payload = this.$store.state.data.payload
                this.checkField(payload);
                payload["pageIndex"] = pageNumber

                setTimeout(() => {
                    this.refreshData()
                }, 100)
            },
            /**
             * Cập nhật kích thước trang
             * Created By TBN (28/7/2021)
             */
            updatePageSize(pageSize) {
                // Lấy payload từ kho dữ liệu
                let payload = this.$store.state.data.payload
                this.checkField(payload)
                // Mặc định trang đầu tiên
                payload["pageIndex"] = 0
                payload["pageSize"] = pageSize
                this.$refs.pagingBar.currentPage = 1;

                setTimeout(() => {
                    this.refreshData()
                }, 100)
            },
            ...mapActions(['getCustomerGroupData']),
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