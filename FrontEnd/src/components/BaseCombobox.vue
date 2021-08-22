<template>
    <div v-click-outside="closeDropdown">
        <BaseInput :tabindex="tabindex" @showDropdown="isShow = true" @updateInput="updateInput"
            @filterOption="filterOption" @evtKeyboardChoosingOption="evtKeyboardChoosingOption"
            @resetOption="resetOptions" ref="inputCombobox" classList="combobox user-input" @tabPress="tabPress"
            iconClass="combobox-icon" type="text" errorContent="Không có dữ liệu đã nhập" 
            :name="name" :contentPlHolder="contentPlHolder" :validType="validType != null ? 'combobox-' + validType : 'combobox'" :isDisabled="isDisabledInput"
            :isReadyData="isReadyData" :noneCheck="noneCheck"
            />
        <div ref="select" style="z-index:3" v-show="isShow && data.length > 0" class="select-custom" :class="directionDrop">
            <div v-for="(option,index) in data" :key="index" @click="evtMouseChoosingOption(option['content'])"
                class="option" :class="[option.isPointed ? 'point-option' : '',option.isChosen ?'show-select': '']">
                <div class="option-content none-pointer">{{option.content}}</div>
            </div>
        </div>
        <div @click="toggleDropdown" :class="{'rotate-oppositeX':isShow,'waiting-icon': (isReadyData != null && !isReadyData)}" class="icon-container">
            <div class="fas fa-chevron-down icon-input" style="display:none;"></div>
            <div class="icon-input-common"> </div>
        </div>
    </div>

</template>

<script>
    import {
        mapActions
    } from 'vuex'
    import BaseInput from "./BaseInput.vue"
    export default {
        props: ['contentPlHolder','type','dataType','isDisabledInput','errorContent'
        ,'isSearching','tabindex','directionDrop','validType','name','isReadyData','noneCheck'],
        async created() {
        },
        async mounted() {
        },
        watch: {
            data() {
                // Tính toán cho việc dropup
                if (this.$refs.select.classList.contains("dropup")) {
                    if(this.data.length <= 4)
                        this.$refs.select.style.top = -(15 + 32*this.data.length) + "px";
                    else{
                        this.$refs.select.style.top =  "-175px";
                    }
                }
            },
            isError(){
                this.$refs.inputCombobox.isError = true;
            },
        },
        data() {
            return {
                data: [],
                intialData: [],
                isShow: false,
                firstTime: true,
                chosenContent: "",
                errorContentData: "",
                firstTimeDropDown: true,
                inputContent: "",
                indexPointedOption: 0,
                isError: false,
            }
        },
        components: {
            BaseInput
        },
        methods: {
            /**
             * Set dữ liệu cho combobox
             * Created by TBN (27/7/2021)
             */
            setData(data,isInitail) {
                if (this.data.length == 0) {
                    this.data = [].concat(data);
                } else {
                    this.data = this.data.concat(data)
                }
                this.intialData = this.data;
                if(isInitail){
                    this.changeStatusOptions(this.data[0].content); // Mặc định cho những combobox search
                }
            },
            /**
             * Nhận sự kiện tab ra ngoài input của combobox
             * Created by TBN (22/7/2021)
             */
            tabPress() {
                this.isShow = false; // Ẩn combobox
                this.$refs.inputCombobox.active = false; // Xóa border xanh
            },
            /**
             * Cập nhật nội dung input
             * Created by TBN (22/7/2021)
             */
            updateInput(input) {
                this.inputContent = input;
                // Chuyển trạng thái của option đươc chọn
                this.$emit('bindingDataInput');
            },
            /**
             * Nhận sự kiên Enter, Mũi tên lên xuống tại input của combobox
             * Created by TBN (22/7/2021)
             */
            evtKeyboardChoosingOption(keyCode, event) {
                let ammountScroll = 20; // Số lượng fixel scrolled

                // Sự kiên ẩn hiện dropdown của combobox
                if (keyCode != 13) {
                    // Nếu là nút lên, xuống thì hiện dropdown và thiết lập ô được chỉ đến
                    if (this.isShow == false)
                        this.indexPointedOption = -1
                    this.isShow = true
                } else {
                    // Sự kiên Enter
                    // Toggle dropdown
                    this.isShow = !this.isShow
                    // Chờ một khoảng thời gian
                    setTimeout(() => {
                        if (this.isShow == false) {
                            // Nếu trước đó dropdown đang hiện
                            if (this.indexPointedOption >= 0) {
                                // Mượn sự kiện click chuột vào option
                                this.evtMouseChoosingOption(this.data[this.indexPointedOption].content)
                                // Emit sự kiện filterData lên components cha để thực hiện lọc dữ liệu
                                this.$emit('filterData')
                            }
                            // Chuyển trạng thái được trỏ tới của option về false
                            this.resetPointedOption()
                        } else {
                            // Nếu trước đó dropdown đang đóng
                            this.indexPointedOption = 0 // Set option đầu tiên được trỏ đến
                            this.setPointedOption(this.data[this.indexPointedOption].content)
                        }
                    }, 10)
                    return;
                }
                // Sự kiện mũi tên lên,xuống sau khi đã hiện dropdown
                setTimeout(() => {
                    let maxIndex = this.data.length - 1
                    if (keyCode == 38) {
                        // Scroll up selected custom by amount
                        if (this.indexPointedOption <= 0) {
                            event.target.parentElement.parentElement.querySelector('.select-custom').scrollBy({
                                top: (ammountScroll * maxIndex)
                            });
                        } else if (this.indexPointedOption != -1) {
                            event.target.parentElement.parentElement.querySelector('.select-custom').scrollBy({
                                top: -ammountScroll
                            });
                        }
                        // Nút lên kiểm tra xem có đang ở option đầu tiên
                        this.indexPointedOption = this.indexPointedOption <= 0 ? maxIndex : this
                            .indexPointedOption - 1
                    } else if (keyCode == 40) {
                        // Scroll down selected custom 
                        if (this.indexPointedOption == maxIndex) {
                            event.target.parentElement.parentElement.querySelector('.select-custom').scrollBy({
                                top: -(ammountScroll * maxIndex)
                            });
                        } else if (this.indexPointedOption != -1) {
                            event.target.parentElement.parentElement.querySelector('.select-custom').scrollBy({
                                top: ammountScroll
                            });
                        }
                        // Nút xuống kiểm tra xem có đang ở option cuối cùng k
                        this.indexPointedOption = this.indexPointedOption == maxIndex ? 0 : this
                            .indexPointedOption + 1

                    }
                    // Chuyển pointed option sang option mới
                    this.setPointedOption(this.data[this.indexPointedOption].content)
                }, 20)
            },
            /**
             * Chuyển pointed option sang option mới
             * Created by TBN (22/7/2021)
             */
            setPointedOption(content) {
                this.data.forEach(element => {
                    let obj = {}
                    obj = element
                    if (obj.content == content) {
                        obj.isPointed = true
                        this.$set(this.data, this.data.indexOf(element), obj)
                    } else {
                        obj.isPointed = false
                        this.$set(this.data, this.data.indexOf(element), obj)
                    }
                })
            },
            /**
             * Chuyển trạng thái của options
             * Created By TBN (22/7/2021)
             */
            changeStatusOptions(selectedOption) {
                this.data.forEach(element => {
                    let obj = {}
                    obj = element
                    if (obj.content == selectedOption) {
                        obj.isChosen = true
                        this.$refs.inputCombobox.setInputContent(obj.content);
                    } else {
                        obj.isChosen = false
                    }
                })
            },
            /**
             * Sự kiện click chuột vào option
             * Created by TBN (22/7/2021)
             */
            evtMouseChoosingOption(content) {
                // Cập nhật nội dung trong input
                this.updateInput(content);
                this.$emit('updateContent',content);
                this.changeStatusOptions(content);
                // Emit sự kiên lên component cha để lọc dữ liệu
                this.$emit('filterData');
                // Đóng dropdown
                this.closeDropdown();
            },
            /**
             * Chuyển trạng thái pointed của các option về false
             * Created by TBN (22/7/2021)
             */
            resetPointedOption() {
                this.indexPointedOption = -1;
                this.setPointedOption("")
            },
            /**
             * Sự kiện click xóa nội dung sẽ được thực hiện tại component BaseInput
             * Created  By TBN
             */
            removeXIcon() {
                this.$refs.inputCombobox.removeXIcon()
            },
            /**
             * Khởi tạo nội dung của input mới cần được thực hiện tại component BaseInput
             * Created by TBN (22/7/2021)
             */
            init(data) {
                this.isChange = false;
                this.$refs.inputCombobox.init(data)
            },
            /**
             * Chuyển trạng thái được chọn của các option về false
             * Created by TBN (22/7/2021)
             */
            resetOptions() {
                this.inputContent = ""
                this.data.forEach(element => {
                    let obj = element;
                    obj.isChosen = false
                    this.$set(this.data, this.data.indexOf(element), obj)
                })
                this.$emit('bindingDataInput')
            },
            /**
             * Toggle dropdown
             * Created by TBN (22/7/2021) 
             */
            toggleDropdown() {
                this.isShow = !this.isShow;
                if (this.isShow) {
                    this.$refs.inputCombobox.active = true
                }
                // Focus vào input
                this.$refs.inputCombobox.$refs.input.focus();
                this.resetPointedOption()
            },
            /**
             * Đóng dropdown cho sự kiện click ra ngoài input của combobox
             * Created by TBN (22/7/2021)
             */
            closeDropdown() {
                if (this.isShow) {
                    this.isShow = false;
                }
                if(this.$refs.inputCombobox)
                    this.$refs.inputCombobox.active = false;
            },
            /**
             * Lọc option theo nội dung người dùng nhập
             * Created BaseInput TBN (22/7/2021)
             */
            filterOption(content) {
                this.data = this.intialData.filter(element => element.content
                        .toLowerCase()
                        .search(content.toLowerCase()) != -1 || content == "")
                // Chuyển tất cả trạng thái được chọn và được trỏ về false
                
                this.data.forEach(element =>{
                    element['isChosen'] = false
                });
                this.data.forEach(element =>{
                    element['isPointed'] = false
                });
                
                // Nếu không có dữ liệu sẽ hiển thị lỗi
                if (this.data.length == 0) {
                    this.$refs.inputCombobox.errorContentData = this.dictionaryError[this.name].noOption;
                    this.$refs.inputCombobox.isError = true;
                } else {
                    this.$refs.inputCombobox.isError = false;
                }
            },
            ...mapActions(['getDepartmentData', 'getPositionData'])
        },
        computed: {
            dictionaryError(){
                return this.$store.state.resource[this.$browserLocale]['management']['entity']['Employee']['dictionaryError'];
            }
        }
    }
</script>

<style scoped>
    .show-image {
        visibility: visible !important;
    }

    .point-option {
        background-color: #E9EBEE !important;
        color: rgb(44, 160, 28) !important;
    }
    .waiting-icon{
        background-color: #e9e9e9 !important;
    }
    .show-select {
        border-color: rgb(44, 160, 28) !important;
        background-color: rgb(44, 160, 28) !important;
        color: #ffffff !important;
    }
</style>