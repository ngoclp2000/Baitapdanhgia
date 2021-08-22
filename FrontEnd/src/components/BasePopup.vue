<template>
    <div v-if="isShow">
        <div class="popup-layout center-div" ref="layout">
        </div>
        <div class=" popup">
            <div class="popup-content">
                <div class="content-popup">
                    <div :class="objectPopUp.type" class="icon-popup">
                    </div>
                    <div class="content-popup-msg">
                        {{objectPopUp.contentPopUp}}
                    </div>
                </div>
                <div class="divide"></div>
                <div class="popup-footer"
                    :class="{ 'flex-center' : numberOfButton == 1,'flex-end' : objectPopUp.type == 'warning-code'}">
                    <div class="popup-footer-left" v-if="objectPopUp.buttonTexts[0] != ''">
                        <BaseButton tabindex="1" :tooltipContent="tooltipPopUp[objectPopUp.type]['secondary']"
                            @click="cancelButtonClick" classList="m-btn-default m-second-btn" bgColor="#fff"
                            textColor="#111111" :btnText="objectPopUp.buttonTexts[0]" />
                    </div>
                    <div class="popup-footer-right">
                        <BaseButton tabindex="2" :tooltipContent="tooltipPopUp[objectPopUp.type]['subPrimary']"
                            @click="subPrimaryButtonClick" v-if="objectPopUp.buttonTexts[1] != ''"
                            classList="m-btn-default m-second-btn" bgColor="#fff" textColor="#111111"
                            :btnText="objectPopUp.buttonTexts[1]" />
                        <BaseButton tabindex="3" :tooltipContent="tooltipPopUp[objectPopUp.type]['primary']"
                            ref="primary" @keydown.enter="primaryButtonClick" :class="{'mr0' : numberOfButton == 1 }"
                            @click="primaryButtonClick" classList="m-btn-default m-primary-btn"
                            bgColor="rgb(44, 160, 28)" bgHoverColor="#35bf22" textColor="#ffffff"
                            :btnText="objectPopUp.buttonTexts[2]" />
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import BaseButton from './BaseButton.vue'
    export default {
        props: [],
        components: {
            BaseButton
        },
        created() {

        },
        data() {
            return {
                isShow: false,
                errorContents: [],
                isDisplayTooltip: true,
                contentTooltip: "",
                isOverflowContent: false,
            }
        },
        watch: {
            isShow() {
                if (this.isShow) {
                    setTimeout(() => {
                        this.$refs.primary.$refs.button.focus();
                    }, 200)
                }
            }
        },
        methods: {
            /**
             * Sự kiện bấm nút primary trong popup
             * Created by TBN (21/7/2021)
             */
            primaryButtonClick() {
                if (this.objectPopUp.type == 'confirmation') {
                    this.$emit('storeInformation'); // Lưu thông tin
                } else if (this.objectPopUp.type == 'error' || this.objectPopUp.type == 'warning-code') {
                    this.$emit('focusErrorField', this.errorContents) // Focus vào lỗi đầu tiên
                    this.$emit('refreshData'); // Cập nhật lại dữ liệu
                } else {
                    this.$emit('deleteData'); // Xóa dữ liệu
                }
                this.isShow = false;
                this.$emit('hideLayout');
            },
            /**
             * Sự kiện bấm nút sub primary trong popup
             * Created By TBN (18/8/2021)
             */
            subPrimaryButtonClick() {
                if (this.objectPopUp.type == 'confirmation') {
                    this.$emit('hideForm'); // Ẩn form
                }
            },
            /**
             * Sự kiện bấm nút bên trái trong popup
             * Created by TBN (21/7/2021)
             */
            cancelButtonClick() {
                this.$emit('hideLayout')
                this.isShow = false;
            },
            /**
             * Đặt nội dung lỗi cho popup error list
             * Created by TBN (21/7/2021)
             */
            setContentError(errorContents) {
                this.errorContents = errorContents
            }
        },
        computed: {
            objectPopUp() {
                return this.$store.state.data.objectPopUp;
            },
            numberOfButton() {
                return this.objectPopUp.buttonTexts.filter(btnText => btnText != "").length;
            },
            tooltipPopUp() {
                return this.$store.state.resource[this.$browserLocale]['management']['entity']['Employee'][
                    'tooltipContent'
                ]['popup'];
            }
        }
    }
</script>

<style scoped>
    .flex-center {
        justify-content: center !important;
        align-content: center !important;
    }

    .flex-end {
        justify-content: flex-end !important;
        align-content: center !important;
    }
</style>