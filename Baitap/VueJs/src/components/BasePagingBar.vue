<template>
    <div class="paging-bar">
        <div class="display-number">Hiển thị <span class="bold-text">{{calculatePage}}/{{totalRecord}}</span> {{type}} </div>
        <div class="paging">
            <BaseButton @click="goToFirstPage" bgColor="#ffffff" classList="btn-symbol" hasIcon="true" urlIcon="btn-firstpage.svg"
                alt="" />
            <BaseButton @click="goToPreviousPage" bgColor="#ffffff" classList="btn-symbol" hasIcon="true" urlIcon="btn-prev-page.svg"
                alt="" />
            <BaseButton @click="goToPageNumber(pages[0])"
                :classList="this.currentPage == pages[0] ? 'btn-text active-option' : 'btn-text'"
                :btnText="pages[0].toString()" alt="" />
            <BaseButton @click="goToPageNumber(pages[1])"
                :classList="this.currentPage == pages[1] ? 'btn-text active-option' : 'btn-text'"
                :btnText="pages[1].toString()" alt="" />
            <BaseButton @click="goToPageNumber(pages[2])"
                :classList="this.currentPage == pages[2] ? 'btn-text active-option' : 'btn-text'"
                :btnText="pages[2].toString()" alt="" />
            <BaseButton @click="goToPageNumber(pages[3])"
                :classList="this.currentPage == pages[3] ? 'btn-text active-option' : 'btn-text'"
                :btnText="pages[3].toString()" alt="" />
            <BaseButton @click="gotoNextPage" bgColor="#ffffff" classList="btn-symbol" hasIcon="true" urlIcon="btn-next-page.svg"
                alt="" />
            <BaseButton @click="goLastPage" bgColor="#ffffff" classList="btn-symbol" hasIcon="true" urlIcon="btn-lastpage.svg" alt="" />
        </div>
            <div class="description-paging-size">
            Kích thước trang
        </div>
        <BaseCombobox ref="pageSize" directionDrop="dropup" class="cbo select-container filter-select" 
         dataType="pageSize" :typeDataPaging="type" @bindingDataInput="updatePageSize" isDisabledInput="1"/>
    </div>
</template>

<script>
    import BaseButton from "./BaseButton.vue"
    import BaseCombobox from "./BaseCombobox.vue"
    export default {
        mounted(){
            this.$refs.pageSize.setData(this.$store.state.data.pageSize.map(a => Object.assign({}, a)));
            this.$refs.pageSize.updateInput(this.$store.state.data.pageSize[0].content);
        },
        components: {
            BaseButton,
            BaseCombobox,
        },
        methods: {
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
                            this.pages.forEach((element, index) => this.pages[index] = element -
                                4) // Trừ số trang ở paging bar đi 4
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
                    // Chuyển đến trang được click
                    this.$emit("updatePagination", number - 1)
                    this.currentPage = number
                }
            },
            /**
             * Chuyển đến trang tiếp theo
             * Created by TBN (21/7/2021)
             */
            async gotoNextPage() {
                
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
                    if (this.currentPage == this.pages[3]) {
                        // Nếu ở trang cuối trong dãy số paging bar
                        // Tăng dãy số paging bar thêm 4
                        this.pages.forEach((element, index) => this.pages[index] = element + 4)
                    }
                    this.$emit("updatePagination", this.currentPage) // Emit sự kiện cập nhật trang dữ liệu
                    this.currentPage+=1 // Thay đổi trang hiện tại
                }
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
            updatePageSize(){
                this.currentPage = 1
                this.pages = [1, 2, 3, 4];
                //this.pageSizeChange = sel.options[sel.selectedIndex].value;
                this.$emit('updatePageSize',this.$refs.pageSize.inputContent);
            }
        },
        props: ['maxPageNumber', 'pageSize', 'totalRecord','type'],
        data() {
            return {
                currentPage: 1,
                pages: [1, 2, 3, 4],
                pageSizeChange: 0
            }
        },
        computed: {
            calculatePage() {
                return ((this.currentPage - 1) * this.pageSize +1) + "-" + (this.currentPage * this.pageSize > this
                    .totalRecord ? this.totalRecord : this.currentPage * this.pageSize)
            }
        }
    }
</script>

<style scoped>
.max-number select{
    margin-right: 5px;
    outline: none;
    border: none;
}
.max-number select,.max-number .page-size{
    display: inline-block;
}
.bold-text{
    font-family: "GoogleSans-Bold";
}

@font-face {
    font-family: 'GoogleSans-Bold';
    src: url('../static/font/GoogleSans-Bold.otf') format('opentype');
}
</style>