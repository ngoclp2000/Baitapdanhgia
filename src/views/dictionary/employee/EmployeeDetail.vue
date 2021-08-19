<template>
    <div class="m-dialog center-div ">
        <div class="layout-blur employee-detail-layout center-div">
        </div>
        <div class="employee-detail center-div" :class="{'expand-content':(isCustomer || isSuppiler)}">
            <div class="sticky">
                <div class="title">{{title}}</div>
                <div class="option-type">
                    <input id="toggleCustomer" class="checkbox-custom" name="checkbox-1"
                        @click="isCustomer = !isCustomer" type="checkbox">
                    <label for="toggleCustomer" class="checkbox-custom-label">Là khách hàng</label>

                    <input id="toggleSupplier" class="checkbox-custom" name="checkbox-2"
                        @click="isSuppiler = !isSuppiler" type="checkbox">
                    <label for="toggleSupplier" class="checkbox-custom-label">Là nhà cung cấp</label>
                </div>
                <div class="m-btn-list">
                    <div class="m-btn-help">

                    </div>
                    <div @click="displayWarning()" class="m-btn-close">

                    </div>
                </div>
                <!-- <BaseButton @click="displayWarning" id="btn-close" class="m-btn-close" hasIcon="true"
                    urlIcon="x.svg" /> -->
            </div>
            <div class="employee-detail-content">
                <div class="upper-part">
                    <div class="general-information">
                        <div class="half-w pr26">
                            <div class="show-flex">
                                <div class="input-information w2p5">
                                    <div class="name-information">
                                        Mã <span style="color: red;">*</span>
                                    </div>
                                    <BaseInput tabindex="1" maxlength="12" ref="EmployeeCode"
                                        classList="user-input required" type="text"
                                        errorContent="Mã không được để trống" refType="employeeCode"
                                        validType="required"
                                        @bindingDataInput="bindingDataInput('EmployeeCode',$refs['EmployeeCode'].inputContent)" />
                                </div>
                                <div class="input-information w3p5 mr0">
                                    <div class="name-information">
                                        Tên <span style="color: red;">*</span>
                                    </div>
                                    <BaseInput tabindex="2" ref="EmployeeName" classList="user-input required"
                                        type="text" errorContent="Tên không được để trống" refType=""
                                        validType="required"
                                        @bindingDataInput="bindingDataInput('EmployeeName',$refs['EmployeeName'].inputContent)" />
                                </div>
                            </div>

                            <div class="input-information full-w">
                                <div class="name-information">
                                    Đơn vị <span style="color: red;">*</span>
                                </div>
                                <BaseCombobox tabindex="3" :dataCombobox="$store.state.data.department"
                                    errorContent="Đơn vị không được để trống" ref="DepartmentName" name="Đơn vị"
                                    class="cbo select-container full-w" dataType="department" validType="required"
                                    @bindingDataInput="bindingDataInput('DepartmentName',$refs['DepartmentName'].inputContent)" />
                            </div>
                            <div class="input-information full-w">
                                <div class="name-information">
                                    Chức danh
                                </div>
                                <BaseInput tabindex="4" ref="EmployeePosition" classList="user-input required full-w"
                                    type="text" errorContent="Trường không thể trống" refType=""
                                    @bindingDataInput="bindingDataInput('EmployeePosition',$refs['EmployeePosition'].inputContent)" />
                            </div>
                            <div class="input-information full-w" v-show="isCustomer || isSuppiler">
                                <div class="name-information">
                                    Nhóm khách hàng, nhà cung cấp
                                </div>
                                <BaseCombobox tabindex="12" errorContent="Trường không được để trống" ref="GroupName"
                                    class="cbo select-container full-w" dataType="position"
                                    @bindingDataInput="bindingDataInput('GroupName',$refs['GroupName'].inputContent)" />
                            </div>
                        </div>
                        <div class="half-w">
                            <div class="show-flex">
                                <div class="input-information w2p5">
                                    <div class="name-information">
                                        Ngày sinh
                                    </div>
                                    <BaseDatePick tabindex="5" ref="DateOfBirth" name="Ngày sinh"
                                        @bindingDataInput="bindingDataInput('DateOfBirth',$refs['DateOfBirth'].date)" />
                                </div>
                                <div class="input-information w3p5 mr0">
                                    <div class="name-information pl10">
                                        Giới tính
                                    </div>
                                    <div class="radio-container" ref="GenderName">
                                        <label class="container">Nam
                                            <input @change="changeGenderName($event)" type="radio" value="Nam"
                                                checked="checked" name="radio">
                                            <span class="checkmark"></span>
                                        </label>
                                        <label class="container">Nữ
                                            <input @change="changeGenderName($event)" type="radio" value="Nữ"
                                                name="radio">
                                            <span class="checkmark"></span>
                                        </label>
                                        <label class="container"> Khác
                                            <input @change="changeGenderName($event)" type="radio" value="Khác"
                                                name="radio">
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="show-flex">
                                <div class="input-information w3p5">
                                    <div class="name-information">
                                        Số CMND
                                    </div>
                                    <BaseInput tabindex="9" maxlength="12" ref="IdentityNumber"
                                        classList="user-input required" type="text"
                                        errorContent="Số CMND nhập sai định dạng" refType="identity"
                                        validType="identification"
                                        @bindingDataInput="bindingDataInput('IdentityNumber',$refs['IdentityNumber'].inputContent)" />
                                </div>
                                <div class="input-information w2p5 mr0">
                                    <div class="name-information">
                                        Ngày cấp
                                    </div>
                                    <BaseDatePick tabindex="10" ref="IdentityDate" name="Ngày cấp"
                                        @bindingDataInput="bindingDataInput('IdentityDate',$refs['IdentityDate'].date)" />
                                </div>
                            </div>
                            <div class="input-information full-w">
                                <div class="name-information">
                                    Nơi cấp
                                </div>
                                <BaseInput tabindex="11" maxlength="11" ref="IdentityPlace"
                                    classList="user-input required" type="text"
                                    @bindingDataInput="bindingDataInput('IdentityPlace',$refs['IdentityPlace'].inputContent)" />
                            </div>
                            <div class="input-information w2p5" v-show="isCustomer">
                                <div class="name-information">
                                    TK công nợ phải thu
                                </div>
                                <BaseInput tabindex="1" maxlength="13" ref="CustomerCode"
                                    classList="user-input required" type="text" errorContent="Trường không thể trống"
                                    refType="employeeCode"
                                    @bindingDataInput="bindingDataInput('CustomerCode',$refs['CustomerCode'].inputContent)" />
                            </div>
                            <div class="input-information w2p5 mr0" v-show="isSuppiler">
                                <div class="name-information">
                                    Tk công nợ phải trả
                                </div>
                                <BaseInput tabindex="1" maxlength="14" ref="CustomerCode"
                                    classList="user-input required" type="text" errorContent="Trường không thể trống"
                                    refType="employeeCode"
                                    @bindingDataInput="bindingDataInput('CustomerCode',$refs['CustomerCode'].inputContent)" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom-part">
                    <div class="input-information full-w mr0">
                        <div class="name-information">
                            Địa chỉ
                        </div>
                        <BaseInput tabindex="15" ref="Address" classList="user-input required " type="text"
                            @bindingDataInput="bindingDataInput('Address',$refs['Address'].inputContent)" />
                    </div>
                    <div class="show-flex">
                        <div class="input-information w1p4 ">
                            <div class="name-information">
                                ĐT di động
                            </div>
                            <BaseInput tabindex="16" ref="PhoneNumber" classList="user-input required " type="text"
                                errorContent="ĐT di động nhập sai định dạng" refType="" validType="phoneNumber"
                                @bindingDataInput="bindingDataInput('PhoneNumber',$refs['PhoneNumber'].inputContent)" />
                        </div>
                        <div class="input-information w1p4 ">
                            <div class="name-information">
                                ĐT cố định
                            </div>
                            <BaseInput tabindex="17" ref="TelephoneNumber" classList="user-input required " type="text"
                                errorContent="ĐT cố định nhập sai định dạng" refType="" validType="telephoneNumber"
                                @bindingDataInput="bindingDataInput('TelephoneNumber',$refs['TelephoneNumber'].inputContent)" />
                        </div>
                        <div class="input-information w1p4 mr0">
                            <div class="name-information">
                                Email
                            </div>
                            <BaseInput tabindex="18" ref="Email" classList="user-input required " type="text"
                                errorContent="Email nhập sai định dạng" refType="" validType="email"
                                @bindingDataInput="bindingDataInput('Email',$refs['Email'].inputContent)" />
                        </div>
                    </div>
                    <div class="show-flex">
                        <div class="input-information w1p4 ">
                            <div class="name-information">
                                Tài khoản ngân hàng
                            </div>
                            <BaseInput tabindex="19" ref="BankAccountNumber" classList="user-input required "
                                type="text" errorContent="Tài khoản ngân hàng nhập sai định dạng"
                                @bindingDataInput="bindingDataInput('BankAccountNumber',$refs['BankAccountNumber'].inputContent)" />
                        </div>
                        <div class="input-information w1p4 ">
                            <div class="name-information">
                                Tên ngân hàng
                            </div>
                            <BaseInput tabindex="20" ref="BankName" classList="user-input required " type="text"
                                errorContent="Trường không thể trống" refType=""
                                @bindingDataInput="bindingDataInput('BankName',$refs['BankName'].inputContent)" />
                        </div>
                        <div class="input-information w1p4 mr0">
                            <div class="name-information">
                                Chi nhánh
                            </div>
                            <BaseInput tabindex="21" ref="BankBranchName" classList="user-input required " type="text"
                                errorContent="Trường không thể trống" refType=""
                                @bindingDataInput="bindingDataInput('BankBranchName',$refs['BankBranchName'].inputContent)" />
                        </div>
                    </div>
                    <div data-v-294a9023="" class="divide"></div>
                    <div class="footer">
                        <div class="footer-left">
                            <BaseButton tabindex="22" @click="$emit('hideForm')" bgColor="#fff" classList="cancel"
                                btnText="Hủy" />
                        </div>
                        <div class="footer-right">
                            <BaseButton tabindex="23" @click="storeInformation(false)" class="px-3" bgColor="#fff"
                                btnText="Cất" />
                            <BaseButton tabindex="24" @click="storeInformation(true)" id="btn-employee-save"
                                bgColor="rgb(44, 160, 28)" textColor="#ffffff" btnText="Cất và Thêm" />
                        </div>
                    </div>
                </div>
            </div>
            <LoadingSpinner v-if="isShowSpinner" />
        </div>
        <BasePopup ref="popUp" @storeInformation="storeInformation(false)" @hideForm="$emit('hideForm')"
            @focusErrorField="focusErrorField" :objectPopUp="objectPopUp" />
    </div>

</template>

<script>
    import BaseButton from '../../../components/BaseButton.vue'
    import BaseInput from '../../../components/BaseInput.vue'
    import BaseCombobox from '../../../components/BaseCombobox.vue'
    import BasePopup from '../../../components/BasePopup.vue'
    import EmployeeAPI from '../../../api/components/EmployeeAPI'
    import BaseDatePick from '../../../components/BaseDatePick.vue'
    import Format from '../../../store/format.js'
    import LoadingSpinner from '../../../layout/LoadingSpinner.vue'
    import MISACODE from '../../../store/const.js'
    import {
        mapActions,
    } from 'vuex'
    export default {
        async created() {

        },
        async mounted() {
            // Gán dữ liệu cho combobox
            await this.getDepartmentData();
            this.$refs.DepartmentName.setData(this.$store.state.data.department.map(a => Object.assign({}, a)));
            let radios = document.querySelectorAll('input[name=radio]');
            this.currentEmployee["GenderName"] = Array.from(radios).filter(radio => radio.checked)[0].value;

            if (!this.isEdit || this.isDuplicate) {
                this.getNewEmployeeCode();
            }
            this.$refs.EmployeeCode.$refs.input.focus() // Focus EmployeeCode input
        },
        data: () => {
            return {
                title: "Thông tin nhân viên",
                objectPopUp: {
                    titlePopUp: "",
                    contentPopUp: "",
                    type: "",
                    buttonTexts: [],
                },
                isCustomer: false,
                isSuppiler: false,
                isEdit: false,
                isDuplicate: false,
                isActiveSave: true,
                isShowSpinner: false,
                listNotInput: ["avatar", "upload", "popUp"],
                currentEmployee: {},
                keepingEmployee: {}
            }
        },
        components: {
            BaseButton,
            BaseInput,
            BaseCombobox,
            BasePopup,
            BaseDatePick,
            LoadingSpinner
        },
        methods: {
            /**
             * Hàm lấy mã code mới
             * Created By TBN (18/8/2021)
             */
            async getNewEmployeeCode() {
                // Khi mounted sẽ lấy mã nhân viên mới nhất và focus vào trường này.
                try {
                    let res = await EmployeeAPI.getNewEmployeeCode();
                    this.$refs.EmployeeCode.init(res.data)
                    this.keepingEmployee.EmployeeCode = res.data;
                    let index = await this.$store.dispatch('randomText', 4)
                    let content = "Lấy mã nhân viên thành công"
                    let type = "success"
                    let payloadToast = {
                        content,
                        type,
                        index
                    }
                    this.$store.dispatch('createToast', payloadToast)
                } catch (error) {
                    console.log(error)
                }
                this.$refs.EmployeeCode.$refs.input.focus() // Focus EmployeeCode input
            },
            /**
             * Theo dõi sự thay đổi của radio chọn giới tính
             * Created By TBN (18/8/2021)
             */
            changeGenderName($event) {
                this.currentEmployee["GenderName"] = $event.target.value;
            },
            /**
             * Hiện popup close form
             * Created By TBN (26/7/2021)
             */
            displayWarning() {
                if (this.checkUnchangeState()) {
                    this.$emit('hideForm');
                } else {
                    // Thiết lập thông tin cho popup
                    this.objectPopUp.contentPopUp = "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?";
                    this.objectPopUp.type = "warning"
                    this.objectPopUp.buttonTexts = ["Hủy", "Không", "Có"]
                    this.$refs.popUp.isShow = true;
                    this.$emit('displayLayout')
                }
            },
            /**
             * Thiết lập lại giá trị ban đầu cho các components thuộc component hiện tại
             * Input, combobox
             * Created By TBN (26/7/2021)
             */
            async init() {
                let dateInput = ['DateOfBirth', 'IdentityDate']
                for (const [key] of Object.entries(this.$refs)) {
                    this.keepingEmployee[key] = "";
                    if (this.listNotInput.includes(key))
                        continue;
                    else if (dateInput.includes(key)) {
                        this.$refs[key].date = "";
                    } else if (key == "GenderName") {
                        let radios = document.querySelectorAll('input[name=radio]');
                        this.keepingEmployee[key] = Array.from(radios).filter(radio => radio.checked)[0].value;
                    } else if (key != "EmployeeCode") {
                        if (this.$refs[key].data != undefined)
                            this.$refs[key].resetOptions()
                        this.$refs[key].init("")
                        this.$refs[key].isError = false
                    }
                }
            },
            /**
             * Kiểm tra tính đúng đắn của các trường dữ liệu trong cửa sổ nhập dữ liệu
             * Created By TBN (26/7/2021)
             */
            async checkValidity() {
                let errorContents = [] // Nội dung lỗi
                // Ditionary chuyển từ tên trường TA sang TV
                let convertText = {
                    EmployeeCode: "Mã không được để trống",
                    EmployeeName: "Tên không được để trống",
                    DateOfBirth: "Ngày sinh nhập sai",
                    IdentityDate: "Ngày cấp nhập sai",
                    IdentityNumber: "CMND nhập sai/ để trống",
                    Email: "Email nhập sai/ để trống",
                    DepartmentName: "Đơn vị không được để trống",
                    PhoneNumber: "Số điện thoại di động nhập sai",
                    TelephoneNumber: "Số điện thoại cố định nhập sai"
                }
                // Loop qua các refs của input và combobox
                for (const [key, value] of Object.entries(this.currentEmployee)) {
                    //let content = "" // Lưu nội dung của lỗi hiện tại
                    // Nếu lỗi hoặc trông thì sẽ gán lỗi
                    let requiredField = ["EmployeeCode", "EmployeeName", "DepartmentName"]
                    if (this.$refs[key] != null && (this.$refs[key].isError || (value == "" && requiredField
                            .includes(key)))) {
                        let content = convertText[key]
                        // Nếu có lỗi thì sẽ đẩy vào mảng lỗi
                        errorContents.push({
                            key,
                            content,
                        })
                    } else {
                        if (key == "EmployeeCode") {
                            let content = "Mã đã tồn tại trong hệ thống"
                            // Nếu có lỗi thì sẽ đẩy vào mảng lỗi
                            try {
                                let res = await EmployeeAPI.getDataByCode(value);
                                if(res.data.length == 0) 
                                    continue;
                                else{
                                    if(res.data.EmployeeId == this.currentEmployee.EmployeeId)
                                        continue;
                                    else{
                                        this.$refs[key].errorContentData = "Mã đã tồn tại trong hệ thống"
                                    }
                                }
                            } catch (error) {
                                console.log(error.response);
                                content = "Mã không phù hợp"
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
                                    let content = "Mã code gửi lên không phù hợp"
                                    let type = "error"
                                    let payloadToast = {
                                        content,
                                        type,
                                        index
                                    }
                                    this.$store.dispatch('createToast', payloadToast)
                                }
                            }
                            errorContents.push({
                                key,
                                content,
                            })
                        }
                    }
                }
                return errorContents
            },
            /**
             * Lưu dữ liệu hoặc sửa dữ liệu của nhân viên
             * Created By TBN (26/7/2021)
             */
            async storeInformation(isMore) {
                if (this.isActiveSave)
                    this.isActiveSave = false;
                else
                    return;
                if (this.checkUnchangeState()) {
                    let index = await this.$store.dispatch('randomText', 4)
                    let content = "Dữ liệu của quý khách không thay đổi so với ban đầu"
                    let type = "warning"
                    let payloadToast = {
                        content,
                        type,
                        index
                    }
                    this.isActiveSave = true;
                    this.$store.dispatch('createToast', payloadToast)
                } else {
                    this.isShowSpinner = true;
                    this.$emit('displayLayout') // Hiện layout
                    let errorContents = await this.checkValidity(); // Nhận mảng nội dung lỗi 
                    if (errorContents.length == 0) {
                        // Không có lỗi thì format lại dữ liệu rồi đẩy lên database
                        this.currentEmployee["Gender"] = this.genderId(this.currentEmployee["GenderName"])
                        // Department 
                        let department = this.$store.state.data.department.filter(element => element
                            .DepartmentName == this.currentEmployee["DepartmentName"])[0]
                        this.currentEmployee["DepartmentId"] = (department ? department.DepartmentId : null);
                        // Kiểm tra là sửa hay thêm mới
                        if (this.isEdit && !this.isDuplicate) {
                            // Sửa dữ liệu sau đó thông báo bằng toast message
                            try {
                                let res = await EmployeeAPI.updateData(this.currentEmployee.EmployeeId, this
                                    .currentEmployee);
                                if (res.data.MISACode == MISACODE.NotValid) {
                                    let arrError = res.data.Message;
                                    arrError.forEach(async (element) => {
                                        let index = await this.$store.dispatch('randomText', 4)
                                        let content = element.usrMsg
                                        let type = "error"
                                        let payloadToast = {
                                            content,
                                            type,
                                            index
                                        }
                                        this.$store.dispatch('createToast', payloadToast)
                                    });
                                    this.isActiveSave = true;
                                } else if (res.data.MISACode == MISACODE.Success) {
                                    let index = await this.$store.dispatch('randomText', 4)
                                    let type = "success";
                                    let content = res.data.Message.usrMsg
                                    let payloadToast = {
                                        content,
                                        type,
                                        index
                                    }
                                    this.$store.dispatch('createToast', payloadToast)
                                    if (!isMore) {
                                        this.$emit('hideForm')
                                    } else {
                                        this.isEdit = false;
                                        this.init();
                                        await this.getNewEmployeeCode();
                                    }
                                    this.$emit('refreshData')
                                    this.isActiveSave = true;
                                } else {
                                    let index = await this.$store.dispatch('randomText', 4)
                                    let type = "error";
                                    let content = res.data.Message.usrMsg
                                    let payloadToast = {
                                        content,
                                        type,
                                        index
                                    }
                                    this.$store.dispatch('createToast', payloadToast);
                                    this.isActiveSave = true;
                                }

                            } catch (error) {
                                this.isActiveSave = true;
                                console.error(error);
                            }
                        } else {
                            // Thêm mới nhân viên sau đó thông báo bằng toast message
                            let payload = []
                            payload.push(this.currentEmployee)
                            try {
                                let res = await EmployeeAPI.createNewData(payload);
                                if (res.data.MISACode == MISACODE.NotValid) {
                                    let arrError = res.data.Message;
                                    arrError.forEach(async (element) => {
                                        let index = await this.$store.dispatch('randomText', 4)
                                        let content = element.usrMsg
                                        let type = "error"
                                        let payloadToast = {
                                            content,
                                            type,
                                            index
                                        }
                                        this.$store.dispatch('createToast', payloadToast)
                                    });
                                    this.isActiveSave = true;
                                } else if (res.data.MISACode == MISACODE.Success) {
                                    let index = await this.$store.dispatch('randomText', 4)
                                    let type = "success";
                                    let content = res.data.Message.usrMsg
                                    let payloadToast = {
                                        content,
                                        type,
                                        index
                                    }
                                    this.$store.dispatch('createToast', payloadToast)
                                    if (!isMore) {
                                        this.$emit('hideForm')
                                    } else {
                                        this.isEdit = false;
                                        this.init();
                                        await this.getNewEmployeeCode();
                                    }
                                    this.$emit('refreshData')
                                } else {
                                    let index = await this.$store.dispatch('randomText', 4)
                                    let type = "error";
                                    let content = res.data.Message.usrMsg
                                    let payloadToast = {
                                        content,
                                        type,
                                        index
                                    }
                                    this.isActiveSave = true;
                                    this.$store.dispatch('createToast', payloadToast)
                                }
                            } catch (error) {
                                this.isActiveSave = true;
                                console.log(error);
                            }
                        }
                    } else {
                        this.isActiveSave = true;
                        // Thông báo lỗi nhập sai trường
                        let index = await this.$store.dispatch('randomText', 4)
                        let content = "Nhập sai trường"
                        let type = "error"
                        let payloadToast = {
                            content,
                            type,
                            index
                        }
                        this.$store.dispatch('createToast', payloadToast)
                        // Thiết lập thông tin cho popup
                        this.objectPopUp.type = "error"
                        this.objectPopUp.contentPopUp = errorContents[0].content;
                        this.objectPopUp.buttonTexts = ["", "", "Đóng"];
                        this.$refs.popUp.setContentError(errorContents);
                        // Hiện popup danh sách lỗi 
                        this.$refs.popUp.isShow = true;
                        this.$emit('displayLayout')
                    }
                }
                this.isShowSpinner = false;
            },
            /**
             * Sau khi tắt popup thông báo lỗi sẽ focus vào trường lỗi đầu tiên để
             * người dùng tiếp tục nhập lại
             * Created By TBN (26/7/2021)
             */
            focusErrorField(errorContents) {
                let firstTime = true // Flag để chọn trường đầu tiên
                let dateInput = ['DateOfBirth', 'IdentityDate', 'JoinDate']
                for (let i = 0; i < errorContents.length; i++) {
                    // Kiểm tra xem có phải combobox hay không
                    if (dateInput.includes(errorContents[i].key)) {
                        if (firstTime) {
                            this.$refs[errorContents[i].key].$el.querySelector('input').focus(); // Focus input
                            firstTime = false
                        }
                        this.$refs[errorContents[i].key].isError = true;
                    } else if (this.$refs[errorContents[i].key].$refs.input.nodeName == undefined) {
                        if (firstTime) {
                            this.$refs[errorContents[i].key].$refs.input.$refs.input.focus(); // Focus input
                            firstTime = false
                        }
                        this.$refs[errorContents[i].key].$refs.input.isError = true
                    } else {
                        if (firstTime) {
                            this.$refs[errorContents[i].key].$refs.input.focus(); // Focus input
                            firstTime = false
                        }
                        if (this.$refs[errorContents[i].key].validType != "none")
                            this.$refs[errorContents[i].key].isError = true
                    }
                }
            },
            /**
             * Binding dữ liệu từ input vào current
             * Created By TBN (5/8/2021)
             */
            bindingDataInput(field, value) {
                this.currentEmployee[field] = value;
            },
            /**
             * So sánh xem có sự thay đổi về dữ liệu hay không
             * Created By TBN (10/8/2021)
             */
            checkUnchangeState() {
                let initalData = this.keepingEmployee;
                console.log(initalData,this.currentEmployee);
                for (const [key, value] of Object.entries(this.currentEmployee)) {
                    switch (key) {
                        case "DateOfBirth":
                        case "IdentityDate":
                            if (Format.formatDate(initalData[key]).split("/").reverse().join("/") != value) {
                                console.log(key,value,initalData[key]);
                                return false;
                            }
                            break;
                        default:
                            if (value != initalData[key]) {
                                console.log(key,value,initalData[key]);
                                return false;
                            }
                            break;
                    }
                }
                return true;
            },
            /**
             * Áp dữ liệu vào bảng
             * Created By TBN (25/7/2021)
             */
            bindingData(data) {
                this.keepingEmployee = {
                    ...data
                }
                this.currentEmployee = {
                    ...data
                }
                for (const [key, value] of Object.entries(this.currentEmployee)) {
                    if (this.$refs[key] != null) {
                        switch (key) {
                            case "DateOfBirth":
                            case "IdentityDate":
                                this.$refs[key].date = Format.formatDate(value).split("/").reverse()
                                    .join("/")
                                break;
                            case "GenderName": {
                                let radios = document.querySelectorAll("input[name=radio]");
                                Array.from(radios).filter(radio => radio.value == value)[0].checked = true;
                            }
                            break;
                        default:
                            this.$refs[key].init(value);
                            break;
                        }
                    }
                }
            },
            genderId(genderName) {
                if (genderName == "Nam")
                    return 0
                else if (genderName == "Nữ")
                    return 1
                else return 2
            },
            ...mapActions(['getDepartmentData', 'getPositionData']),
        },
        computed: {
            toggle() {
                return this.$store.state.toggle
            }
        }
    }
</script>

<style scoped>
    .show {
        display: block !important;
    }

    .fullscreen {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
    }
</style>