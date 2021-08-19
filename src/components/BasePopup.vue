<template>
    <div>
        <div v-if="isShow" class="popup-layout center-div">

        </div>
        <div class=" popup" v-show="isShow">
            <div class="popup-content">
                <div class="content-popup">
                        <div :class="objectPopUp.type" class="icon-popup">

                        </div>
                        <div class="content-popup-msg">
                            {{objectPopUp.contentPopUp}}
                        </div>
                    </div>
                <div class="divide"></div>
                <div class="popup-footer" :class="{ 'flex-center' : numberOfButton == 1}">
                    <div class="popup-footer-left" v-if="objectPopUp.buttonTexts[0] != ''">
                        <BaseButton @click="cancelButtonClick"  classList="m-btn-default m-second-btn" bgColor="#fff" textColor="#111111" :btnText="objectPopUp.buttonTexts[0]" />
                    </div>
                    <div class="popup-footer-right">
                        <BaseButton @click="subPrimaryButtonClick" v-if="objectPopUp.buttonTexts[1] != ''" classList="m-btn-default m-second-btn" bgColor="#fff" textColor="#111111" :btnText="objectPopUp.buttonTexts[1]" />
                        <BaseButton :class="{'mr0' : numberOfButton == 1 }" @click="primaryButtonClick" classList="m-btn-default m-primary-btn" bgColor="rgb(44, 160, 28)" textColor="#ffffff" :btnText="objectPopUp.buttonTexts[2]" />
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
    import BaseButton from './BaseButton.vue'
    export default {
        props: ['objectPopUp'],
        components: {
            BaseButton
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
        methods: {
            /**
             * Hiển thị tooltip
             * Created By TBN (3/8/2021)
             */
            showTooltip($event) {
                if (this.isOverflowContent) {
                    let positionX = $event.screenX; // Vị trí x con trỏ theo screenview
                    let positionY = $event.clientY; // Vị trí y con trỏ theo clientview
                    let width = $event.target.offsetWidth; // Chiều dài của element đang trỏ tới
                    let tooltip = $event.target.querySelector('.tooltip');
                    tooltip.style.left = (positionX - width / 2 - 5) + "px"
                    tooltip.style.top = (positionY - 130) + "px"
                    tooltip.style.width = (width) + "px"
                    tooltip.style.height = (this.contentTooltip / 2) + "px"
                    $event.target.querySelector('.tooltip').classList.add("show");
                }
            },
            /**
             * Ẩn tool tip
             * Created By TBN (3/8/2021)
             */
            hideTooltip($event) {
                $event.target.querySelector('.tooltip').classList.remove("show");
            },
            /**
             * Sự kiện bấm nút primary trong popup
             * Created by TBN (21/7/2021)
             */
            primaryButtonClick() {
                if (this.objectPopUp.type == 'warning') {
                    this.$emit('storeInformation');
                } else if (this.objectPopUp.type == 'error') {
                    this.$emit('focusErrorField', this.errorContents)
                }else{
                    this.$emit('deleteData');
                }
                this.isShow = false;
                this.$emit('hideLayout')
            },
            /**
             * Sự kiện bấm nút sub primary trong popup
             * Created By TBN (18/8/2021)
             */
            subPrimaryButtonClick(){
                if(this.objectPopUp.type == 'warning'){
                    this.$emit('hideForm');
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
        computed:{
            numberOfButton(){
                return this.objectPopUp.buttonTexts.filter(btnText => btnText != "").length;
            }
        }
    }
</script>

<style scoped>
    .flex-center{
        justify-content: center !important;
        align-content: center !important;
    }
</style>