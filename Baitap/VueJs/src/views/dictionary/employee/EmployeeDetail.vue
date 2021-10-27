<template>
    <div class="m-dialog center-div ">
        <div class="layout-blur employee-detail-layout center-div">
        </div>
        <div class="employee-detail center-div">
            <div class="sticky">
                <div class="title">{{title}}</div>
                <BaseButton @click="displayWarning" id="btn-close" class="m-btn-close" hasIcon="true"
                    urlIcon="x.svg" />
            </div>
            <div class="employee-detail-content">
                <div class="image-upload">
                    <input @change="renderImage" ref="upload" class="input-image" type="file" />
                    <img @click="triggerUpload" ref="avatar" id="upload-img"
                        src="../../../assets/image/default-avatar.jpg" alt="your image" />
                    <div class="note">Vui lòng chọn ảnh có định <br /> dạng <br />.jpg, .jpeg, .png, .gif.)</div>
                </div>
                <div class="employee-information">
                    <div class="general-information">
                        <div class="sub-title">A. THÔNG TIN CHUNG:</div>
                        <div class="input-information">
                            <div class="name-information">
                                Mã nhân viên (<span style="color: red;">*</span>)
                            </div>
                            <BaseInput tabindex="1" maxlength="12" ref="EmployeeCode" classList="user-input required"
                                type="text" errorContent="Trường không thể trống" refType="employeeCode"
                                validType="required"
                                @bindingDataInput="bindingDataInput('EmployeeCode',$refs['EmployeeCode'].inputContent)" />
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
                                Số CMTND/ Căn cước (<span style="color: red;">*</span>)
                            </div>
                            <BaseInput tabindex="5" ref="IdentityNumber" classList="user-input id-input" type="text"
                                errorContent="Sai CMND/ Căn cước" refType=" " validType="identification"
                                @bindingDataInput="bindingDataInput('IdentityNumber',$refs['IdentityNumber'].inputContent)" />
                        </div>
                        <div class="input-information">
                            <div class="name-information">
                                Ngày cấp
                            </div>
                            <BaseDatePick tabindex="6" ref="IdentityDate"
                                @bindingDataInput="bindingDataInput('IdentityDate',$refs['IdentityDate'].date)" />
                            <!--<date-pick @focus="focusDatePick" ref="IdentityDate" class="user-input required" :value="identityDate"></date-pick> !-->
                        </div>
                        <div class="input-information block">
                            <div class="name-information">
                                Nơi cấp
                            </div>
                            <BaseInput tabindex="7" classList="user-input" type="text" errorContent="" refType=" "
                                validType="none" ref="IdentityPlace"
                                @bindingDataInput="bindingDataInput('IdentityPlace',$refs['IdentityPlace'].inputContent)" />
                        </div>
                        <div class="input-information">
                            <div class="name-information">
                                Email (<span style="color: red;">*</span>)
                            </div>
                            <BaseInput tabindex="8" ref="Email" classList="user-input email-input" type="text"
                                errorContent="Sai email" refType=" " validType="email"
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
                    </div>
                    <div class="work-information">
                        <div class="sub-title">B. THÔNG TIN CÔNG VIỆC:</div>
                        <div class="input-information">
                            <div class="name-information">
                                Vị trí
                            </div>
                            <BaseCombobox tabindex="10" errorContent="Trường không được để trống" ref="PositionName"
                                class="cbo select-container" dataType="position"
                                @bindingDataInput="bindingDataInput('PositionName',$refs['PositionName'].inputContent)" />
                        </div>
                        <div class="input-information">
                            <div class="name-information">
                                Phòng ban
                            </div>
                            <BaseCombobox tabindex="11" :dataCombobox="$store.state.data.department"
                                errorContent="Trường không được để trống" ref="DepartmentName"
                                class="cbo select-container" dataType="department"
                                @bindingDataInput="bindingDataInput('DepartmentName',$refs['DepartmentName'].inputContent)" />
                        </div>
                        <div class="input-information">
                            <div class="name-information">
                                Mã số thuế cá nhân
                            </div>
                            <BaseInput tabindex="12" ref="PersonalTaxCode" classList="user-input tax-input" type="text"
                                errorContent="Sai mã số thuế" refType=" " validType="tax"
                                @bindingDataInput="bindingDataInput('PersonalTaxCode',$refs['PersonalTaxCode'].inputContent)" />
                        </div>
                        <div class="input-information">
                            <div class="name-information">
                                Mức lương cơ bản
                            </div>
                            <BaseInput tabindex="13" ref="Salary" classList="user-input input-currency" type="text"
                                errorContent="Sai tiền lương" refType=" " validType="money"
                                @bindingDataInput="bindingDataInput('Salary',$refs['Salary'].inputContent)" />
                        </div>
                        <div class="input-information">
                            <div class="name-information">
                                Ngày gia nhập công ty
                            </div>
                            <BaseDatePick tabindex="14" ref="JoinDate"
                                @bindingDataInput="bindingDataInput('JoinDate',$refs['JoinDate'].date)" />
                            <!--<date-pick @focus="focusDatePick" ref="JoinDate" class="user-input required" :value="identityDate"></date-pick> !-->
                        </div>
                        <div class="input-information">
                            <div class="name-information">
                                Tình trạng công việc
                            </div>
                            <BaseCombobox tabindex="15" :dataCombobox="$store.state.data.workStatus"
                                errorContent="Trường không được để trống" ref="WorkStatus" class="cbo select-container "
                                dataType="workStatus" directionDrop="dropup" validType="combobox"
                                @bindingDataInput="bindingDataInput('WorkStatus',$refs['WorkStatus'].inputContent)" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <BaseButton tabindex="16" @click="displayWarning" classList="cancel" btnText="Hủy" />
                <BaseButton tabindex="17" @click="storeInformation" id="btn-employee-save" hasIcon="true"
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
    import EmployeeAPI from '../../../api/components/EmployeeAPI'
    import BaseDatePick from '../../../components/BaseDatePick.vue'
    import Format from '../../../store/format.js'
    import MISACODE from '../../../store/const.js'
    export default {
        async created() {

        },
        async mounted() {
            // Gán dữ liệu cho combobox
            this.$refs.PositionName.setData(this.$store.state.data.position.map(a => Object.assign({}, a)));
            this.$refs.DepartmentName.setData(this.$store.state.data.department.map(a => Object.assign({}, a)));
            this.$refs.GenderName.setData(this.$store.state.data.gender);
            await this.$refs.WorkStatus.setData(this.$store.state.data.workStatus);

            let dateInput = ['DateOfBirth', 'IdentityDate', 'JoinDate'];
            dateInput.forEach(element => this.$refs[element].isEdit = this.isEdit);
            if (!this.isEdit) {
                // Khi mounted sẽ lấy mã nhân viên mới nhất và focus vào trường này.
                try {
                    let res = await EmployeeAPI.getNewEmployeeCode();
                    this.$refs.EmployeeCode.init(res.data)
                    let index = await this.$store.dispatch('randomText', 4)
                    let content = "Lấy mã khách hàng thành công"
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
            this.$refs.EmployeeCode.$refs.input.focus() // Focus EmployeeCode input
        },
        data: () => {
            return {
                title: "THÔNG TIN NHÂN VIÊN",
                popupCloseFormContent: "Bạn có muốn đóng hộp thoại thêm nhân viên hay không?",
                warningButtonText: ["Tiếp tục nhập", "Đóng"],
                errorButtonText: ["", "Đóng"],
                titlePopup: "Đóng hộp thoại thêm nhân viên",
                isEdit: false,
                isChange: false,
                listNotInput: ["avatar", "upload", "closeForm", "errorForm"],
                currentEmployee: {},
                keepingEmployee: {}
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
             * Created By TBN (26/7/2021)
             */
            displayWarning() {
                if (this.checkUnchangeState()) {
                    this.$emit('hideForm');
                } else {
                    this.$refs.closeForm.isShow = true;
                    this.$emit('displayLayout')
                }
            },
            /**
             * Thiết lập lại giá trị ban đầu cho các components thuộc component hiện tại
             * Input, combobox
             * Created By TBN (26/7/2021)
             */
            init() {
                let dateInput = ['DateOfBirth', 'IdentityDate', 'JoinDate']
                for (const [key] of Object.entries(this.$refs)) {
                    this.keepingEmployee[key] = "";
                    if (this.listNotInput.includes(key))
                        continue
                    if (dateInput.includes(key))
                        continue
                    else if (key != "EmployeeCode") {
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
             * Created By TBN (26/7/2021)
             */
            async checkValidity() {
                let errorContents = [] // Nội dung lỗi
                // Ditionary chuyển từ tên trường TA sang TV
                let convertText = {
                    EmployeeCode: " Trường mã nhân viên không được để trống",
                    FullName: "Trường Họ và tên không được để trống",
                    WorkStatus: "Tình trạng làm việc",
                    DateOfBirth: "Trường ngày sinh nhập sai",
                    JoinDate: "Trường ngày gia nhập công ty nhập sai",
                    IdentityDate: "Trường ngày cấp nhập sai",
                    IdentityNumber: "Trường CMND nhập sai/ để trống",
                    Email: "Trường Email nhập sai/ để trống",
                    PhoneNumber: "Trường số điện thoại nhập sai",
                    Salary: "Trường lương cơ bản nhập sai/ để trống",
                    PersonalTaxCode: "Trường mã số thuế nhập sai"
                }
                // Loop qua các refs của input và combobox
                for (const [key, value] of Object.entries(this.currentEmployee)) {
                    //let content = "" // Lưu nội dung của lỗi hiện tại
                    // Nếu lỗi hoặc trông thì sẽ gán lỗi
                    let requiredField = ["IdentityNumber", "Email", "PhoneNumber", "EmployeeCode", "FullName"]
                    if (this.$refs[key] != null && (this.$refs[key].isError || (value == "" && requiredField
                            .includes(key)))) {
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
             * Created By TBN (26/7/2021)
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
                        // Không có lỗi thì format lại dữ liệu rồi đẩy lên database
                        this.currentEmployee["Salary"] = this.normalizeSalary(this.currentEmployee["Salary"]);
                        this.currentEmployee["WorkStatus"] = this.workStatusId(this.currentEmployee["WorkStatus"]);
                        this.currentEmployee["Gender"] = this.genderId(this.currentEmployee["GenderName"])
                        // Department 
                        let department = this.$store.state.data.department.filter(element => element
                            .DepartmentName == this.currentEmployee["DepartmentName"])[0]
                        this.currentEmployee["DepartmentId"] = (department ? department.DepartmentId : null);
                        // Position
                        let position = this.$store.state.data.position.filter(element => element
                            .PositionName == this.currentEmployee["PositionName"])[0]
                        this.currentEmployee["PositionId"] = (position ? position.PositionId : null)
                        // Kiểm tra là sửa hay thêm mới
                        if (this.isEdit) {
                            // Sửa dữ liệu sau đó thông báo bằng toast message
                            try {
                                let res = await EmployeeAPI.updateData(this.currentEmployee.EmployeeId, this
                                    .currentEmployee);
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
                            // Thêm mới nhân viên sau đó thông báo bằng toast message
                            let payload = []
                            payload.push(this.currentEmployee)
                            try {
                                let res = await EmployeeAPI.createNewData(payload);
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
                                console.log(error.response)
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
                for (const [key, value] of Object.entries(this.currentEmployee)) {
                    switch (key) {
                        case "DateOfBirth":
                        case "IdentityDate":
                        case "JoinDate":
                            if (Format.formatDate(initalData[key]).split("/").reverse().join("/") != value) {
                                return false;
                            }
                            break;
                        case "Salary":
                            if (value != "" && initalData[key] != this.normalizeSalary(value)) {
                                return false
                            }
                            break;
                        case "WorkStatus":
                            if(value != "" && this.workStatusId(value) != initalData[key]) {
                                return false;
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
                            case "JoinDate":
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
                        case "Salary":
                            this.$refs[key].init(Format.formatMoney(data[key]));
                            break;
                        default:
                            this.$refs[key].init(value);
                            break;
                        }
                        //this.$refs[key].isError = false
                    }
                }
            },
            normalizeSalary(salary) {
                if (salary && salary != "")
                    return salary.replaceAll(".", "");
                else return null;
            },
            workStatusId(workStatusName) {
                if (workStatusName == "Đang làm việc")
                    return 1
                else
                    return 2
            },
            genderId(genderName) {
                if (genderName == "Nam")
                    return 1
                else if (genderName == "Nữ")
                    return 2
                else return null
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