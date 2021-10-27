<template>
    <div class="m-dialog center-div ">
        <div class="layout-blur customer-detail-layout center-div">
        </div>
        <div class="customer-detail center-div">
            <div class="sticky">
                <div class="title">{{title}}</div>
                <BaseButton @click="displayWarning" id="btn-close" class="m-btn-close" hasIcon="true"
                    urlIcon="x.svg" />
            </div>
            <div class="customer-detail-content">
                <div class="upper-part">
                    <div class="image-upload">
                        <input @change="renderImage" ref="upload" class="input-image" type="file" />
                        <img @click="triggerUpload" ref="avatar" id="upload-img"
                            src="../../../assets/image/default-avatar.jpg" alt="your image" />
                        <div class="note">Vui lòng chọn ảnh có định <br /> dạng <br />.jpg, .jpeg, .png, .gif.)</div>
                    </div>
                    <div class="general-information">
                        <div class="input-information">
                            <div class="name-information">
                                Mã khách hàng (<span style="color: red;">*</span>)
                            </div>
                            <BaseInput tabindex="1" maxlength="12" ref="CustomerCode" classList="user-input required"
                                type="text" errorContent="Trường không thể trống" refType="customerCode"
                                validType="required"
                                @bindingDataInput="bindingDataInput('CustomerCode',$refs['CustomerCode'].inputContent)" />
                        </div>
                        <div class="input-information">
                            <div class="name-information">
                                Họ và tên (<span style="color: red;">*</span>)
                            </div>
                            <BaseInput tabindex="2" ref="FullName" classList="user-input required" type="text"
                                errorContent="Trường không thể trống" refType="" validType="required"
                                @bindingDataInput="bindingDataInput('FullName',$refs['FullName'].inputContent)" />
                        </div>
                        <div class="input-information">
                            <div class="name-information">
                                Ngày sinh
                            </div>
                            <BaseDatePick tabindex="3" ref="DateOfBirth"
                                @bindingDataInput="bindingDataInput('DateOfBirth',$refs['DateOfBirth'].date)" />
                        </div>

                        <div class="input-information">
                            <div class="name-information">
                                Giới tính
                            </div>
                            <BaseCombobox tabindex="4" errorContent="Trường không được để trống" ref="GenderName"
                                class="cbo select-container" dataType="gender"
                                @bindingDataInput="bindingDataInput('GenderName',$refs['GenderName'].inputContent)" />
                        </div>
                        <div class="input-information">
                            <div class="name-information">
                                Mã thẻ thành viên
                            </div>
                            <BaseInput tabindex="5" ref="MemberCardCode" classList="user-input" type="text" refType=""
                                validType="none"
                                @bindingDataInput="bindingDataInput('MemberCardCode',$refs['MemberCardCode'].inputContent)" />
                        </div>
                        <div class="input-information">
                            <div class="name-information">
                                Nhóm khách hàng
                            </div>
                            <BaseCombobox tabindex="6" errorContent="Trường không được để trống" ref="CustomerGroupName"
                                class="cbo select-container"
                                @bindingDataInput="bindingDataInput('CustomerGroupName',$refs['CustomerGroupName'].inputContent)" />
                        </div>
                        <div class="input-information fullinput-container">
                            <div class="name-information">
                                Tiền nợ
                            </div>
                            <BaseInput tabindex="7" ref="DebitAmount" classList="user-input input-currency full-input"
                                type="text" errorContent="Sai tiền lương" refType=" " validType="money"
                                classInputContainer="full-input"
                                @bindingDataInput="bindingDataInput('DebitAmount',$refs['DebitAmount'].inputContent)" />
                        </div>
                    </div>
                </div>
                <div class="bottom-part">
                    <div>
                        <div class="input-information">
                            <div class="name-information">
                                Email (<span style="color: red;">*</span>)
                            </div>
                            <BaseInput tabindex="8" ref="Email" classList="user-input email-input large-input"
                                type="text" errorContent="Sai email" refType=" " validType="email"
                                @bindingDataInput="bindingDataInput('Email',$refs['Email'].inputContent)" />
                        </div>
                        <div class="input-information">
                            <div class="name-information">
                                Số điện thoại (<span style="color: red;">*</span>)
                            </div>
                            <BaseInput tabindex="9" ref="PhoneNumber" classList="user-input number-input" type="text"
                                errorContent="Sai số điện thoại" refType=" " validType="phoneNumber"
                                @bindingDataInput="bindingDataInput('PhoneNumber',$refs['PhoneNumber'].inputContent)" />
                        </div>
                        <div class="input-information">
                            <div class="name-information">
                                Tên công ty
                            </div>
                            <BaseInput tabindex="10" ref="CompanyName" classList="user-input large-input" type="text"
                                validType="none"
                                @bindingDataInput="bindingDataInput('CompanyName',$refs['CompanyName'].inputContent)" />
                        </div>
                        <div class="input-information">
                            <div class="name-information">
                                Mã số thuế
                            </div>
                            <BaseInput tabindex="11" ref="CompanyTaxCode" classList="user-input tax-input" type="text"
                                errorContent="Sai mã số thuế" refType=" " validType="tax"
                                @bindingDataInput="bindingDataInput('CompanyTaxCode',$refs['CompanyTaxCode'].inputContent)" />
                        </div>
                        <div class="input-information fullinput-container">
                            <div class="name-information">
                                Địa chỉ
                            </div>
                            <BaseInput tabindex="12" ref="Address" classList="user-input full-input" type="text"
                                refType=" " validType="none" classInputContainer="full-input"
                                @bindingDataInput="bindingDataInput('Address',$refs['Address'].inputContent)" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <BaseButton tabindex="12" @click="displayWarning" classList="cancel" btnText="Hủy" />
                <BaseButton tabindex="13" @click="storeInformation" id="btn-employee-save" hasIcon="true"
                    urlIcon="floppy-disk.png" bgColor="#019160" textColor="#ffffff" btnText="Lưu" />
            </div>
        </div>
        <BasePopup ref="closeForm" @toggleForm="$emit('hideForm')" classContainer="popup-warning center-div"
            :title="titlePopup" :content="popupCloseFormContent" type="warning" :buttonTexts="warningButtonText"
            :btnClassList="['m-btn-first','m-btn-second']" />
        <BasePopup @focusErrorField="focusErrorField" ref="errorForm" classContainer="popup-list center-div"
            title="Lí do bị từ chối" content="" type="error" :buttonTexts="errorButtonText"
            :btnClassList="['','m-btn-first']" />
    </div>

</template>

<script>
    import BaseButton from '../../../components/BaseButton.vue'
    import BaseInput from '../../../components/BaseInput.vue'
    import BaseCombobox from '../../../components/BaseCombobox.vue'
    import BasePopup from '../../../components/BasePopup.vue'
    import CustomerAPI from '../../../api/components/CustomerAPI'
    import BaseDatePick from '../../../components/BaseDatePick.vue'
    import Format from '../../../store/format.js'
    import MISACODE from '../../../store/const.js'
    export default {
        async created() {

        },
        async mounted() {
            // Gán dữ liệu cho combobox
            await this.$refs.GenderName.setData(this.$store.state.data.gender);
            await this.$refs.CustomerGroupName.setData(this.$store.state.data.customerGroup);
            let dateInput = ['DateOfBirth'];
            dateInput.forEach(element => this.$refs[element].isEdit = this.isEdit);
            if (!this.isEdit) {
                // Khi mounted sẽ lấy mã khách hàng mới nhất và focus vào trường này.
                try {
                    let res = await CustomerAPI.getNewCustomerCode();
                    this.$refs.CustomerCode.init(res.data)
                    let index = await this.$store.dispatch('randomText', 4)
                    let content = "Lấy mã khách hàng mới thành công"
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
            }
            this.$refs.CustomerCode.$refs.input.focus() // Focus EmployeeCode input
        },
        data: () => {
            return {
                title: "THÔNG TIN KHÁCH HÀNG",
                popupCloseFormContent: "Bạn có muốn đóng hộp thoại thêm khách hàng hay không?",
                titlePopup: "Đóng hộp thoại thêm khách hàng",
                warningButtonText: ["Tiếp tục nhập", "Đóng"],
                errorButtonText: ["", "Đóng"],
                listNotInput: ["avatar", "upload", "closeForm", "errorForm"],
                isEdit: false,
                currentCustomer: {},
                keepingCustomer: {}
            }
        },
        components: {
            BaseButton,
            BaseInput,
            BaseCombobox,
            BasePopup,
            BaseDatePick
        },
        methods: {
            /**
             * Đẩy sự kiện click ảnh vào input upload
             * Created By TBN
             */
            triggerUpload() {
                this.$refs.upload.click();
            },
            /**
             * Hiện ảnh lấy từ file upload của input
             * Created By TBN
             */
            renderImage() {
                let uploadInput = this.$refs.upload
                if (uploadInput.files && uploadInput.files[0]) {
                    this.$refs.avatar.src = URL.createObjectURL(uploadInput.files[0]);
                }
            },
            /**
             * Hiện popup close form
             */
            displayWarning() {
                console.log(this.currentCustomer,this.keepingCustomer);
                if(this.checkUnchangeState()){
                    this.$emit('hideForm');
                }else{
                    this.$refs.closeForm.isShow = true;
                    this.$emit('displayLayout')
                }
            },
            /**
             * Thiết lập lại giá trị ban đầu cho các components thuộc component hiện tại
             * Input, combobox
             */
            init() {
                let dateInput = ['DateOfBirth']
                for (const [key] of Object.entries(this.$refs)) {
                    this.keepingCustomer[key] = ""
                    if (this.listNotInput.includes(key) || dateInput.includes(key)){
                        continue;
                    }
                    else if (key != "CustomerCode") {
                        if (this.$refs[key].data != undefined)
                            this.$refs[key].resetOptions()
                        this.$refs[key].init("")
                        this.$refs[key].removeXIcon()
                        this.$refs[key].isError = false
                    }
                }
            },
            /**
             * Kiểm tra tính đúng đắn của các trường dữ liệu trong cửa sổ nhập dữ liệu
             * Created By TBN
             */
            async checkValidity() {
                // Ditionary chuyển từ tên trường TA sang TV
                let convertText = {
                    CustomerCode: "Trường  mã khách hàng",
                    FullName: "Trường họ và tên không được để trống",
                    DateOfBirth: "Trường ngày sinh nhập sao",
                    Email: "Trường Email nhập sai/ để trống",
                    PhoneNumber: "Trường số điện thoại nhập sai",
                    CompanyTaxCode: "Trường mã số thuế nhập sai",
                }
                let errorContents = [] // Nội dung lỗi
                // Loop qua các refs của input và combobox
                for (const [key, value] of Object.entries(this.currentCustomer)) {
                    // Nếu lỗi hoặc trông thì sẽ gán lỗi
                    let requiredField = ["IdentityNumber", "Email", "PhoneNumber", "EmployeeCode", "FullName"]
                    if (this.$refs[key] != null && this.$refs[key].isError || (value == "" && requiredField
                            .includes(key))) {
                        let content = convertText[key]
                        // Nếu có lỗi thì sẽ đẩy vào mảng lỗi
                        errorContents.push({
                            key,
                            content,
                        })
                    }
                }
                return errorContents
            },
            /**
             * Lưu dữ liệu hoặc sửa dữ liệu của nhân viên
             * Created By TBN
             */
            async storeInformation() {
                if (this.checkUnchangeState()) {
                    let index = await this.$store.dispatch('randomText', 4)
                    let content = "Dữ liệu của quý khách không thay đổi so với ban đầu"
                    let type = "warning"
                    let payloadToast = {
                        content,
                        type,
                        index
                    }
                    this.$store.dispatch('createToast', payloadToast)
                } else {
                    this.$emit('displayLayout') // Hiện layout
                    let errorContents = await this.checkValidity(); // Nhận mảng nội dung lỗi 
                    if (errorContents.length == 0) {
                        // Nếu không có lỗi thì sẽ binding dữ liệu từ input và combobox vào obj để chuyển
                        // lên database
                        this.currentCustomer["DebitAmount"] = this.normalizeSalary(this.currentCustomer[
                            "DebitAmount"]);
                        this.currentCustomer["Gender"] = this.genderId(this.currentCustomer["GenderName"])
                        let customerGroup = this.$store.state.data.customerGroup.filter(element => element
                            .CustomerGroupName == this.currentCustomer["CustomerGroupName"])[0]
                        this.currentCustomer["CustomerGroupId"] = (customerGroup ? customerGroup.CustomerGroupId :
                            null)

                        // Kiểm tra là sửa hay thêm mới
                        if (this.isEdit) {
                            // Sửa dữ liệu sau đó thông báo bằng toast message
                            try {
                                let res = await CustomerAPI.updateData(this.currentCustomer.CustomerId, this
                                    .currentCustomer)
                                let index = await this.$store.dispatch('randomText', 4)
                                let content = res.data.Message.usrMsg
                                let type = "";
                                if (res.data.MISACode == MISACODE.Fail) {
                                    type = "error"
                                } else {
                                    type = "success";
                                }
                                let payloadToast = {
                                    content,
                                    type,
                                    index
                                }
                                this.$store.dispatch('createToast', payloadToast)
                                this.$emit('hideForm')
                                this.$emit('refreshData')
                            } catch (error) {
                                let arrError = error.response.data.Message;
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
                            }
                        } else {
                            // Thêm mới khách hàng sau đó thông báo bằng toast message
                            let payload = []
                            payload.push(this.currentCustomer)
                            try {
                                let res = await CustomerAPI.createNewData(payload);
                                console.log(res);
                                let index = await this.$store.dispatch('randomText', 4)
                                let content = res.data.Message.usrMsg
                                let type = "";
                                if (res.data.MISACode == MISACODE.Fail) {
                                    type = "error"
                                } else {
                                    type = "success";
                                }
                                let payloadToast = {
                                    content,
                                    type,
                                    index
                                }
                                this.$store.dispatch('createToast', payloadToast)
                                this.$emit('hideForm')
                                this.$emit('refreshData')
                            } catch (error) {
                                let arrError = error.response.data.Message;
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
                            }
                        }
                    } else {
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

                        // Hiện popup danh sách lỗi 
                        this.$refs.errorForm.isShow = true;
                        this.$emit('displayLayout')
                        //console.log(this.$refs.errorForm)
                        this.$refs.errorForm.heightContent = 126 + 36 * errorContents.length + 'px'
                        this.$refs.errorForm.setContentError(errorContents)
                    }
                }

            },
            /**
             * Sau khi tắt popup thông báo lỗi sẽ focus vào trường lỗi đầu tiên để
             * người dùng tiếp tục nhập lại
             */
            focusErrorField(errorContents) {
                let firstTime = true // Flag để chọn trường đầu tiên
                let dateInput = ['DateOfBirth']
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
                this.currentCustomer[field] = value;
            },
            /**
             * So sánh xem có sự thay đổi về dữ liệu hay không
             * Created By TBN (10/8/2021)
             */
            checkUnchangeState() {
                let initalData = this.keepingCustomer;
                for (const [key, value] of Object.entries(this.currentCustomer)) {
                    switch (key) {
                        case "DateOfBirth":
                            if (Format.formatDate(initalData[key]).split("/").reverse().join("/") != value) {
                                return false;
                            }
                            break;
                        case "DebitAmount":
                            if (value != "" && initalData[key] != this.normalizeSalary(value)) {
                                return false
                            }
                            break;
                        default:
                            if (value != initalData[key]) {
                                return false;
                            }
                            break;
                    }
                }
                return true;
            },
            /**
             * Áp dữ liệu vào bảng
             */
            bindingData(data) {
                this.keepingCustomer = {
                    ...data
                }
                this.currentCustomer = {
                    ...data
                }
                for (const [key, value] of Object.entries(this.currentCustomer)) {
                    if (this.$refs[key] != null) {
                        switch (key) {
                            case "DateOfBirth":
                                this.$refs[key].date = Format.formatDate(value).split("/").reverse()
                                    .join("/")
                                break;
                            case "WorkStatus": {
                                if (value == 1) {
                                    this.$refs[key].init("Đang làm việc")
                                } else if (value == 2) {
                                    this.$refs[key].init("Đã nghỉ việc")
                                } else
                                    this.$refs[key].init("Không xác định")
                            }
                            break;
                        case "DebitAmount":
                            this.$refs[key].init(Format.formatMoney(value));
                            break;
                        default:
                            this.$refs[key].init(value);
                            break;
                        }
                        this.$refs[key].isError = false
                    }
                }
            },
            /**
             * Lấy mã giới tính theo giới tính
             * Created By TBN (10/8/2021)
             */
            genderId(genderName) {
                if (genderName == "Nam")
                    return 1
                else if (genderName == "Nữ")
                    return 0
                else return null
            },
            /**
             * Chuyển dữ liệu tiền về dạng bình thường(không chứa .)
             * Created By TBN (10/8/2021)
             */
            normalizeSalary(salary) {
                if (salary && salary != "")
                    return salary.replaceAll(".", "");
                else return null;
            }
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