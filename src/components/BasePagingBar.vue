<template>
    <div class="paging-bar">
        <div class="display-number paging-left">Tổng số: <span class="bold-text">{{totalRecord}}</span> bản ghi
        </div>

        <div class="paging-right">
            <BaseCombobox v-click-outside="hideBorderCombobox" @click.native="showBorderCombobox" ref="pageSize"
                directionDrop="dropup" class="cbo select-container filter-select" dataType="pageSize"
                :typeDataPaging="type +'/trang'" @updateContent="updatePageSize" isDisabledInput="1"
                :isReadyData="isReady" :class="{'waiting': isChangeBorderCbo}" />
            <div class="paging paging-center">
                <BaseButton :isReadyData="isReady" @click="goToPreviousPage" class="large" classList="btn-text large"
                    btnText="Trước" alt="" />
                <BaseButton :isReadyData="isReady" @click="goToPageNumber(pages[0])"
                    :classList="this.currentPage == pages[0] ? 'btn-text active-option' : 'btn-text'"
                    :btnText="pages[0].toString()" alt="" />
                <div v-if="!toggleThreeDot || isBothDisplayThreeDots" @click="threeDotsFirstClick"
                    class="three-dot three-dot-first">
                    ...
                </div>
                <BaseButton :isReadyData="isReady" @click="goToPageNumber(pages[1])"
                    :classList="this.currentPage == pages[1] ? 'btn-text active-option' : 'btn-text'"
                    :btnText="pages[1].toString()" alt="" />
                <BaseButton :isReadyData="isReady" @click="goToPageNumber(pages[2])"
                    :classList="this.currentPage == pages[2] ? 'btn-text active-option' : 'btn-text'"
                    :btnText="pages[2].toString()" alt="" />
                <BaseButton :isReadyData="isReady" v-if="this.isBothDisplayThreeDots" @click="goToPageNumber(pages[3])"
                    :classList="this.currentPage == pages[3] ? 'btn-text active-option' : 'btn-text'"
                    :btnText="pages[3].toString()" alt="" />
                <div v-if="toggleThreeDot || isBothDisplayThreeDots" @click="threeDotsLastClick"
                    class="three-dot three-dot-last">
                    ...
                </div>
                <BaseButton :isReadyData="isReady" @click="goToPageNumber(maxPageNumber)" v-if="maxPageNumber > 4"
                    :classList="this.currentPage == maxPageNumber ? 'btn-text active-option' : 'btn-text'"
                    :btnText="maxPageNumber.toString()" alt="" />
                <BaseButton :isReadyData="isReady" @click="goToNextPage" class="large" classList="btn-text large"
                    btnText="Sau" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
    import BaseButton from "./BaseButton.vue"
    import BaseCombobox from "./BaseCombobox.vue"
    export default {
        props: ['maxPageNumber', 'pageSize', 'totalRecord', 'type', 'isReady'],
        data() {
            return {
                currentPage: 1,
                pages: [1, 2, 3, 4],
                pageSizeChange: 0,
                toggleThreeDot: true,
                isBothDisplayThreeDots: false,
                currentIndex: 0,
                isChangeBorderCbo: false
            }
        },
        mounted() {
            this.$refs.pageSize.setData(this.$store.state.data.pageSize.map(a => Object.assign({}, a)), true);
            this.$refs.pageSize.updateInput(this.$store.state.data.pageSize[0].content);
            this.currentPage = 1
            this.pages = [1, 2, 3, 4];
        },
        watch: {
            currentPage() {
                let checkIndex = this.extractIndex(this.currentPage);
                this.currentIndex = (checkIndex != undefined ? checkIndex : this.currentIndex)
                if(this.currentPage >= 4 && this.currentPage < this.maxPageNumber - 2){
                    console.log("Hi");
                    this.isBothDisplayThreeDots = true;
                }else{
                    this.isBothDisplayThreeDots = false;
                }
            }
        },
        components: {
            BaseButton,
            BaseCombobox,
        },
        methods: {
            hideBorderCombobox() {
                if (this.isChangeBorderCbo) {
                    this.isChangeBorderCbo = false;
                }
            },
            showBorderCombobox() {
                this.isChangeBorderCbo = true;
            },
            threeDotsFirstClick() {
                this.toggleThreeDot = true;
                this.isBothDisplayThreeDots = false;
                this.pages = [1, 2, 3, 4];
            },
            threeDotsLastClick() {
                this.isBothDisplayThreeDots = false;
                this.toggleThreeDot = false;
                this.pages = [1, this.maxPageNumber - 2, this.maxPageNumber - 1, this.maxPageNumber];
            },
            /**
             * Sự kiện chuyển về trang đầu tiên
             * Created by TBN (21/7/2021)
             */
            async goToFirstPage() {
                this.currentPage = 1 // Chuyển trang hiện tại về 1 
                this.pages = [1, 2, 3, 4] // Đặt lại nội dung của dãy 4 số ở paging bar
                this.$emit("updatePagination", 0) // Emit sự kiện cập nhật trang dữ liệu
                // Thông báo chuyển trang thành công bằng toast message
                let index = await this.$store.dispatch('randomText', 4)
                let content = "Chuyển trang cuối cùng thành công"
                let type = "success"
                let payloadToast = {
                    content,
                    type,
                    index
                }
                this.$store.dispatch('createToast', payloadToast)
            },
            /**
             * Sự kiện về trang trước
             * Created by TBN (21/7/2021)
             */
            async goToPreviousPage() {
                if (this.currentPage == 1) {
                    // Nếu ở trang đầu tiên sẽ thông báo bằng toast message
                    let index = await this.$store.dispatch('randomText', 4)
                        .then(res => {
                            index = res
                        })
                    let content = "Đang ở trang đầu tiên"
                    let type = "information"
                    let payloadToast = {
                        content,
                        type,
                        index
                    }
                    this.$store.dispatch('createToast', payloadToast)
                } else {
                    if (this.currentPage == this.pages[0]) {
                        // Nếu ở trang đầu tiên trong dãy 4 số paging bar
                        if (this.currentPage <= 4) {
                            this.pages = [1, 2, 3, 4] // Chuyển dãy 4 số về ban đầu
                        } else {
                            // Trừ dãy số paging bar thêm số lần tùy thuộc số trang lớn nhất
                            let subtratAmount = (this.maxPageNumber > 4 ? 3 : 4);
                            this.pages.forEach((element, index) => this.pages[index] = element -
                                subtratAmount)
                        }
                    } else {
                        let shiftAmount = (this.maxPageNumber > 4 ? 3 : 4);
                        // Render lại paging nếu trang hiện tại nằm ngoài khoảng hiển thị của paging bar
                        if (this.currentPage - 1 + shiftAmount < this.maxPageNumber) {
                            switch (this.currentIndex) {
                                case 1:
                                    if (this.currentPage - 1 < shiftAmount) {
                                        this.pages = [1, 2, 3, 4];
                                    } else {
                                        this.pages = [1,this.currentPage - 3, this.currentPage - 2, this
                                            .currentPage -
                                            1];
                                    }
                                    break;
                                case 2:
                                    this.pages = [1,this.currentPage - 1, this.currentPage, this.currentPage +
                                        1];
                                    break;
                                case 3:
                                    this.pages = [1,this.currentPage - 2, this.currentPage - 1, this
                                        .currentPage];
                                    break;
                            }
                            this.toggleThreeDot = true;
                        } else {
                            if (this.currentIndex == 1) {
                                this.pages = [1,this.currentPage - 3, this.currentPage - 2, this.currentPage - 1];
                                this.toggleThreeDot = true;
                            } else {
                                this.pages = [1, this.maxPageNumber - 2, this.maxPageNumber - 1, this
                                .maxPageNumber];
                                this.toggleThreeDot = false;
                            }
                        }
                    }
                    this.currentPage-- // Thay đổi trang hiện tại
                    this.$emit("updatePagination", this.currentPage - 1) // Emit sự kiện cập nhật trang dữ liệu
                }
            },
            /**
             * Sự kiện click vào số trang tại paging bar
             * Created by TBN (21/7/2021)
             */
            async goToPageNumber(number) {
                if (number > this.maxPageNumber) {
                    // Nếu chọn vào trang vượt quá trang lớn nhất sẽ thông báo 
                    // trang không tồn tại bằng toast message
                    let index = await this.$store.dispatch('randomText', 4)
                        .then(res => {
                            index = res
                        })
                    let content = "Trang không tồn tại"
                    let type = "warning"
                    let payloadToast = {
                        content,
                        type,
                        index
                    }
                    this.$store.dispatch('createToast', payloadToast)
                } else {
                    // Kiểm tra xem có click chọn trang đầu hoặc trang cuối không
                    // Nếu có thì sẽ render lại paging bar
                    if(number == this.maxPageNumber){
                        this.pages = [1,this.maxPageNumber-2,this.maxPageNumber-1,this.maxPageNumber];
                        this.toggleThreeDot = false;
                    }else if(number == 1){
                        this.pages = [1,2,3,4];
                        this.toggleThreeDot = true;
                    }
                    // Chuyển đến trang được click
                    this.$emit("updatePagination", number - 1)
                    this.currentPage = number
                }
            },
            /**
             * Chuyển đến trang tiếp theo
             * Created by TBN (21/7/2021)
             */
            async goToNextPage() {

                // Kiểm tra xem có phải ở trang cuối không
                if (this.currentPage == this.maxPageNumber) {
                    // Nếu ở trang cuối thì thông báo bằng toast message
                    let index = await this.$store.dispatch('randomText', 4)
                        .then(res => {
                            index = res
                        })
                    let content = "Đang ở trang cuối cùng"
                    let type = "information"
                    let payloadToast = {
                        content,
                        type,
                        index
                    }
                    this.$store.dispatch('createToast', payloadToast)
                } else {
                    let shiftAmount = (this.maxPageNumber > 4 ? 3 : 4);
                    if (this.currentPage + shiftAmount < this.maxPageNumber) {
                        switch (this.currentIndex) {
                            case 1:
                                this.pages = [1,this.currentPage, this.currentPage + 1, this.currentPage +
                                    2
                                ]
                                break;
                            case 2:
                                this.pages = [1,this.currentPage - 1, this.currentPage, this.currentPage +
                                    1
                                ]
                                break;
                            case 3:
                                this.pages = [1,this.currentPage + 1, this.currentPage + 2, this
                                    .currentPage +
                                    3
                                ]
                                break;
                        }
                        this.toggleThreeDot = true;
                    } else {
                        this.pages = [1, this.maxPageNumber - 2, this.maxPageNumber - 1, this.maxPageNumber];
                        this.toggleThreeDot = false;
                    }
                    this.$emit("updatePagination", this.currentPage) // Emit sự kiện cập nhật trang dữ liệu
                    this.currentPage += 1 // Thay đổi trang hiện tại
                }
            },
            /**
             * Lấy index trang
             * Created By TBN(18/8/2021)
             */
            extractIndex(page) {
                let indexReturn = 0;
                this.pages.forEach((element, index) => {
                    if (element == page) {
                        indexReturn = index;
                        return;
                    }
                })
                return indexReturn;
            },
            /**
             * Chuyển tới trang cuối cùng
             * Created by TBN (21/7/2021)
             */
            async goLastPage() {
                // Kiểm tra trang lớn nhất có vượt quá số lớn nhất trong trang hiện tại hay không
                if (this.maxPageNumber < 4) {
                    // Chuyển trang về trang cuối cùng
                    this.currentPage = this.maxPageNumber
                    //this.pages = [1,2,3,4]
                    this.$emit("updatePagination", this.maxPageNumber - 1) // Emit sự kiện cập nhật trang dữ liệu
                } else {
                    // Chuyển về trang cuối cùng
                    this.currentPage = this.maxPageNumber
                    // Thiết lập số trang tại paging bar theo trang lớn nhất
                    this.pages = [this.maxPageNumber - 3, this.maxPageNumber - 2, this.maxPageNumber - 1, this
                        .maxPageNumber
                    ]
                    this.$emit("updatePagination", this.maxPageNumber - 1) // Emit sự kiện cập nhật trang dữ liệu
                }
                // Thông báo chuyển trang thành công bằng toast message
                let index = await this.$store.dispatch('randomText', 4)
                    .then(res => {
                        index = res
                    })
                let content = "Chuyển trang cuối cùng thành công"
                let type = "success"
                let payloadToast = {
                    content,
                    type,
                    index
                }
                this.$store.dispatch('createToast', payloadToast)
            },
            /**
             * Cập nhật kích thước trang
             * Created By TBN (28/7/2021)
             */
            updatePageSize() {
                this.currentPage = 1
                this.pages = [1, 2, 3, 4];
                //this.pageSizeChange = sel.options[sel.selectedIndex].value;
                this.$emit('updatePageSize', this.$refs.pageSize.inputContent);
            }
        },

        computed: {
            calculatePage() {
                return ((this.currentPage - 1) * this.pageSize + 1) + "-" + (this.currentPage * this.pageSize > this
                    .totalRecord ? this.totalRecord : this.currentPage * this.pageSize)
            }
        }
    }
</script>

<style scoped>
    .waiting {
        border-color: rgb(44, 160, 28) !important;
    }

    .three-dot {
        cursor: pointer;
        height: 20px;
        width: 20px;
        display: flex;
        justify-content: center;
        align-content: center;
    }

    .max-number select {
        margin-right: 5px;
        outline: none;
        border: none;
    }

    .max-number select,
    .max-number .page-size {
        display: inline-block;
    }

    .bold-text {
        font-family: "GoogleSans-Bold";
    }

    @font-face {
        font-family: 'GoogleSans-Bold';
        src: url('../static/font/GoogleSans-Bold.otf') format('opentype');
    }
</style>