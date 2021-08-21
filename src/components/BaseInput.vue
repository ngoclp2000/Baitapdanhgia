<template>
    <div class="input-container" :class="classInputContainer">
        <!-- <div v-show="isDisplayX" @click="resetInput" class="x-icon"
            :class="[validType == 'money' || type == 'right-text'? 'currency-icon' : '',validType == 'search' ? 'search-icon' : '',iconClass]"></div> -->
        <input :tabindex="tabindex" :maxlength="maxlength" @mouseover="isDisplayToolTip = true" ref="input"
            @mouseleave="isDisplayToolTip=false" :placeholder="contentPlHolder" v-model="inputContent"
            @keydown="evtKeyboardChoosingOption" @input="inputChange" @blur="validateContent"
            @keyup.enter="$emit('enterPress')" @keydown.tab="$emit('tabPress')" :type="type" :disabled="isDisabled"
            :class="[classList, isError ? 'error' : '', active?'active':'',(isReadyData != null && !isReadyData) ? 'waiting-input' : '']"
            v-tooltip="{
                content: (noneCheck == null ? errorContentData : tooltipContent),
                delay: {
                    show: 300,
                    hide: 0,
                },
                trigger: 'manual',
                show: (isError && isDisplayToolTip) || (noneCheck != null && isDisplayToolTip),
            }">
        <!-- <div class="tooltip bottom" ref="tooltip" v-show="isError && isDisplayError && (disableToolTip == null)">
            {{errorContentData}}
        </div> -->
        <!-- <div v-show="isError && isDisplayError" class="wrong-input" style="z-index:100">{{errorContentData}}</div> -->
        <div v-show="validType == 'money'" class="currency">(VND)</div>
    </div>
</template>

<script>
    import Validation from '../store/validate'
    import Format from '../store/format'
    export default {
        created() {
            switch(this.validType) {
                case 'required':
                    this.errorContentData = this.errorContent.empty;
                    break;
            }
            
        },
        props: ['maxlength', 'contentPlHolder', 'type', 'classList', 'validType',
            'iconClass', 'tabindex', 'classInputContainer', 'isDisabled', 'name', 'isReadyData', 'isShowDropdown',
            'tooltipContent', 'disableToolTip','noneCheck'
        ],
        data() {
            return {
                isDisplayToolTip: false,
                isError: false,
                isDisplayX: false,
                inputContent: null,
                active: false,
                errorContentData: "",
                isChange : false,
            }
        },

        methods: {
            /**
             * 
             */
            inputChange() {
                this.isDisplayToolTip = false;
                this.isChange = true;
                if (this.inputContent.length != 0) {
                    if (this.validType == "money")
                        this.inputContent = Format.formatMoney(this.inputContent)
                    else if (this.validType == "telephoneNumber")
                        this.inputContent = Format.formatTelephoneNumber(this.inputContent);
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
                    this.$emit('evtKeyboardChoosingOption', e.keyCode, e)
            },
            /**
             * Phương thức kiểm tra tính đúng đắn của dữ liệu trong input theo từng loại.
             * Created by TBN (22/7/2021)
             */
            validateContent() {
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
                            if (Validation.checkValidNumber(Format.changeToNumber(this.inputContent))) {
                                this.isError = false;
                            } else
                                this.isError = true;
                            break;
                        case "telephoneNumber":
                            if (Validation.checkTelephoneNumber(this.inputContent)) {
                                this.isError = false;
                            } else
                                this.isError = true;
                            break;
                    }

                } else {
                    // Nếu nội dung trống
                    //this.isDisplayX = false; // Tắt dấu xóa nội dung input
                    // Nếu là combox và input không cần check lỗi thì sẽ dừng phương thức
                    let requiredField = ["required"]
                    if (!requiredField.includes(this.validType) || !this.isChange) {
                        this.isError = false;
                        return;
                    }
                    // Nếu không sẽ hiện lỗi
                    this.isError = true;
                    this.errorContentData = this.errorContent.empty
                }
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
                this.isChange = false;
                // Trigger Updated Stage
                this.inputContent = initialValue;
                if (initialValue != "" && initialValue != null)
                    this.isDisplayX = true;
                this.$emit('updateInput', this.inputContent) // Emit sự kiện cập nhật nội dung input lên component cha
                this.$emit('bindingDataInput', this.inputContent);
            }
        },
        computed: {
            toggle() {
                return this.$store.state.toggle;
            },
            resource() {
                return this.$store.state.resource;
            },
            errorContent(){
                return this.resource[this.$browserLocale]['management']['entity']['Employee']['dictionaryError'][this.name];
            }
        }
    }
</script>

<style scoped>
    .error {
        border-color: rgb(255, 71, 71) !important;
    }

    .active {
        border-color: rgb(44, 160, 28)
    }

    .waiting-input {
        background-color: #e9e9e9e9 !important;
    }
</style>