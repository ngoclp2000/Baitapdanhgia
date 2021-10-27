<template>
    <div class="input-container" :class="classInputContainer">
        <div v-show="isDisplayX" @click="resetInput" class="x-icon"
            :class="[validType == 'money' || type == 'right-text'? 'currency-icon' : '',validType == 'search' ? 'search-icon' : '',iconClass]"></div>
        <input :tabindex="tabindex" :maxlength="maxlength" @mouseover="isDisplayError = true" @mouseleave="isDisplayError=false"
            :placeholder="contentPlHolder" v-model="inputContent" ref="input" @keydown="evtKeyboardChoosingOption"
            @input="inputChange" @change="validateContent" @keyup.enter="$emit('enterPress')"
            @keydown.tab="$emit('tabPress')" :class="[classList, isError ? 'error' : '', active?'active':'']"
            :type="type" :disabled="isDisabled">
        <div v-show="isError && isDisplayError" class="wrong-input" style="z-index:100">{{errorContent}}</div>
        <div v-show="validType == 'money'" class="currency">(VND)</div>
    </div>
</template>

<script>
    import Validation from '../store/validate'
    import Format from '../store/format'
    export default {
        props: ['maxlength', 'contentPlHolder', 'type', 'classList', 'errorContent', 'validType',
            'iconClass','tabindex','classInputContainer', 'isDisabled'
        ],
        data() {
            return {
                isDisplayError: false,
                isError: false,
                isDisplayX: false,
                inputContent: "",
                active: false,
                typingTime: 0,
                doneTypingInterval: 500,
            }
        },
        
        methods: {
            inputChange() {
                if (this.inputContent.length != 0) {
                    if (this.validType == "money")
                        this.inputContent = Format.formatMoney(this.inputContent)
                    this.isDisplayX = true;
                } else {
                    this.isDisplayX = false;
                }
                // Emit dự kiện lọc option, cập nhật nội dung input, hiện dropdown khi nhập, sự kiện cập nhật dữ liệu
                this.$emit('filterOption', this.inputContent)
                this.$emit('updateInput', this.inputContent)
                this.$emit('showDropdown')
                this.$emit('bindingDataInput')
            },
            /**
             * Sự kiện Enter, mũi tên lên xuống và phải là combobox
             * Created by TBN (22/7/2021)
             */
            evtKeyboardChoosingOption(e) {
                if (this.validType == 'combobox' && [38, 40, 13].includes(e.keyCode))
                    this.$emit('evtKeyboardChoosingOption', e.keyCode,e)
            },
            /**
             * Phương thức kiểm tra tính đúng đắn của dữ liệu trong input theo từng loại.
             * Created by TBN (22/7/2021)
             */
            validateContent() {
                // Ngày, tháng
                if (this.validType == 'date') {
                    if (this.$refs.input.value != null) {
                        this.isError = false
                    } else
                        this.isError = true
                }

                // Kiểm tra nội dung
                if (this.inputContent.length > 0) {
                    // Nếu dữ liệu không rỗng

                    // Nếu là loại combobox thì sẽ chuyển dừng phương thức vì combox sẽ kiểm tra tại component BaseCombobox
                    if (this.validType == "combobox")
                        return
                    switch (this.validType) {
                        // Input bắt buộc nhập
                        case "required":
                            this.isError = false;
                            break;
                            // Input CMND/ Căn cước 
                        case "identification":
                            if (Validation.checkIdNumber(this.inputContent))
                                this.isError = false;
                            else {
                                this.isError = true;
                            }
                            break;
                            // Input email
                        case "email":
                            if (Validation.validateEmail(this.inputContent))
                                this.isError = false;
                            else
                                this.isError = true;
                            break;
                            // Input tiền hoặc số 
                        case "number":
                        case "phoneNumber":
                        case "money":
                            if (Validation.checkValidNumber(Format.changeToNumber(this.inputContent))) {
                                this.isError = false;
                            } else
                                this.isError = true;
                            break;
                            // Input thuế cá nhân
                        case "tax":
                            if (Validation.checkTaxNumber(this.inputContent) || this.inputContent == "")
                                this.isError = false;
                            else
                                this.isError = true;
                            break;
                    }

                } else {
                    // Nếu nội dung trống
                    this.isDisplayX = false; // Tắt dấu xóa nội dung input
                    // Nếu là combox và input không cần check lỗi thì sẽ dừng phương thức
                    let requiredField = ["identification", "email", "phoneNumber", "required"]
                    if (!requiredField.includes(this.validType)) {
                        this.isError = false;
                        return
                    }

                    // Nếu không sẽ hiện lỗi
                    this.isError = true;
                }
            },
            /**
             * Ẩn nút xóa nội dung input
             * Created by TBN (22/7/2021)
             */
            removeXIcon() {
                this.isDisplayX = false;
            },
            /**
             * Thiết lập lại trạng thái ban đầu của input
             * Created by TBN (22/7/2021)
             */
            resetInput() {
                // Focus vào input
                this.$refs.input.focus();
                this.inputContent = ""; // Xóa nội dung
                this.removeXIcon() // Ẩn nút xóa nội dung
                // Nếu là các input cần validate thì sẽ hiện lỗi trống dữ liệu
                let requiredField = ["identification", "email", "phoneNumber", "required"]
                if (!requiredField.includes(this.validType))
                    this.isError = false;
                else
                    this.isError = true;
                this.$emit("bindingDataInput","");
                // Emit lên component cha sự kiện đặt lại trạng thái option
                this.$emit('resetOption');
                // Nếu là combobox thì sẽ emit sự kiện lọc dữ liệu
                if (this.validType == "combobox")
                    this.$emit("filterOption", this.inputContent)
            },
            /**
             * Xét dữ liệu cho input
             * Created by TBN (22/7/2021)
             */
            setInputContent(newContent) {
                this.inputContent = newContent;
                this.isDisplayX = true;
                this.isError = false;
            },
            /**
             * Thiết lập dự liệu ban đầu cho input
             * Created by TBN (22/7/2021) 
             */
            init(initialValue) {
                // Trigger Updated Stage
                this.inputContent = initialValue;
                if (initialValue != "" && initialValue != null)
                    this.isDisplayX = true;
                this.$emit('updateInput', this.inputContent) // Emit sự kiện cập nhật nội dung input lên component cha
                this.$emit('bindingDataInput',this.inputContent);
            }
        },
        computed: {
            toggle() {
                return this.$store.state.toggle;
            }
        }
    }
</script>

<style scoped>
    .error {
        border-color: rgb(255, 71, 71) !important;
    }

    .active {
        border-color: #019160
    }
</style>