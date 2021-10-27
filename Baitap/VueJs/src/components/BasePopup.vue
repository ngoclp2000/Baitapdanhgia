<template>
    <div>
        <div v-if="isShow" class="popup-layout center-div">

        </div>
        <div :style="{ height : heightContent }" :class="classContainer" v-show="isShow">
            <div class="popup-title">{{title}}</div>
            <BaseButton @click="closeButtonClick" id="btn-close" class="m-btn-close" hasIcon="true"
                urlIcon="x.svg" />
            <div class="popup-content">
                <div v-if="(type == 'error')" class="popup-content error-content">
                    <div class="block-content" v-for="(data,index) in errorContents" :key="index">
                        <div class="icon-error-list">
                        </div>
                        <div>{{data.content}}</div>
                    </div>
                </div>
                <div v-if="!(type == 'error')" class="icon-warning"></div>
                <div v-if="!(type == 'error')" class="content-warning" @mousemove="showTooltip($event)"
                    @mouseleave="hideTooltip($event)" style="position: relative;">
                    <div class="tooltip">
                        {{contentTooltip}}
                    </div>
                    {{content}}
                </div>
            </div>
            <div class="popup-footer">
                <BaseButton @click="firstButtonClick" v-if="!(type == 'error')" :btnText="buttonTexts[0]"
                    :classList="btnClassList[0]" />
                <BaseButton @click="secondButtonClick" :btnText="buttonTexts[1]" :classList="btnClassList[1]" />
            </div>
        </div>
    </div>

</template>

<script>
    import BaseButton from './BaseButton.vue'
    export default {
        props: ['classContainer', 'title', 'content', 'type', 'buttonTexts', 'btnClassList'],
        components: {
            BaseButton
        },
        data() {
            return {
                isShow: false,
                errorContents: [],
                heightContent: "",
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
                    tooltip.style.height = (this.contentTooltip/2) + "px"
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
             * Sự kiện bấm nút bên phải trong popup
             * Created by TBN (21/7/2021)
             */
            secondButtonClick() {
                if (this.type == 'warning') {
                    this.$emit('toggleForm')
                } else if (this.type == 'error') {
                    this.$emit('focusErrorField', this.errorContents)
                }
                this.isShow = false;
                this.$emit('hideLayout')
            },
            /**
             * Sự kiện bấm nút bên trái trong popup
             * Created by TBN (21/7/2021)
             */
            firstButtonClick() {
                if (this.type == 'confirmation') {
                    this.$emit('deleteConfirm')
                }
                this.$emit('hideLayout')
                this.isShow = false;
            },
            /**
             * Sự kiện bấm nút x trong popup
             * Created by TBN (21/7/2021)
             */
            closeButtonClick() {
                this.isShow = false;
                this.$emit('hideLayout')
            },
            /**
             * Đặt nội dung lỗi cho popup error list
             * Created by TBN (21/7/2021)
             */
            setContentError(errorContents) {
                this.errorContents = errorContents
            }
        }
    }
</script>

<style scoped>
</style>