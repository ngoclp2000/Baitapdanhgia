<template>
    <table :class="type">
        <!-- <colgroup>
            <col class="count-col" span="1" style="width: 3%;">
            <col v-for="(th,index) in ths" span="1" :style="{width: th.colWidth}" :key="index">
        </colgroup> -->
        <thead>
            <tr>
                <th class="white-16"></th>
                <th style=" width: 40px; min-width: 40px; max-width: 40px; position: sticky; left:16px; z-index:3;"
                    class="main-th">
                    <div class="count">
                        <input ref="all" id="all" class="checkbox-custom" name="checkbox-1"
                            @click="toggleCheckedAll($event)" type="checkbox">
                        <label for="all" class="checkbox-custom-label"></label>
                    </div>
                </th>
                <th class="main-th" v-for="(th,index) in ths"
                    :style="{textAlign: th.textAlign || 'left', width: th.colWidth || '150px'}" :key="index">
                    {{th.value}}
                    <i class="fas fa-sort icon-input"
                        style="color: #bbbbbb; margin-left: 8px; margin-right: 10px; cursor: pointer;"
                        @click="sortDataByField(th.fieldName,index,th.type)"></i>
                </th>
                <th
                    style="width: 120px;  min-width: 120px; text-align: center; z-index: 3; position: sticky; right: 60px;">
                    {{resource[this.$browserLocale]['management']['entity']['Employee']['tableFieldName']['sub'].value}}
                </th>
                <th class="white-30" style="position: sticky; right: 30px;"></th>
                <th class="grey-30" style="position: sticky; right: 0px;"></th>
            </tr>
        </thead>
        <tbody>
            <tr @dblclick="dbClickRow(data,$event)" :class="{'bg-selected': checkedList[index]}"
                v-for="(data,index) in dataTable" :key="index">
                <td class="white-16"></td>
                <td style="width: 40px; min-width: 40px; max-width: 40px;position: sticky; left:16px; z-index:2; background-color: #fff;"
                    class="main-td" :class="{'bg-selected': checkedList[index]}">
                    <div class="count" style="margin-right: 5px">
                        <input :ref="'checkbox' + index" :id="index" class="checkbox-custom" name="checkbox-1"
                            @click="clickCheckBox($event,index)" type="checkbox">
                        <label :for="index" class="checkbox-custom-label"
                            :class="{'active-checkbox':checkedList[index]}"></label>
                    </div>
                </td>
                <td class="main-td" :fieldName="th.fieldName" v-for="(th,index1) in ths" :key="index1"
                    :style="{textAlign: th.textAlign || 'left',width: th.colWidth || '150px'}">
                    {{getDataTable(data,th.fieldName)}}
                </td>
                <td class="main-td"
                    style="width: 120px; min-width: 120px; text-align: center; position: sticky; right: 60px; background-color: #fff;"
                    :class="{'bg-selected': checkedList[index]}">
                    <div class="function">
                        <div class="edit" @click="displayEditForm(data)">
                            Sửa
                        </div>
                        <div class="function-dropdown">
                            <div class="dropdown-container" :class="{'outline-blue': displayFunctionList[index]}">
                                <div class="dropdown" @click="toggleFunction(index,$event)">

                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="white-30" style="position: sticky; right: 30px;"></td>
                <td class="grey-30" style="position: sticky; right: 0px;"></td>
                <ul class="dropdown-content" v-if="displayFunctionList[index]">
                    <li v-for="(element,index) in functionList" :key="index"
                        @click="functionElementClick(data,index,element.key)">
                        {{element.value}}
                    </li>
                </ul>
            </tr>
        </tbody>

    </table>
</template>

<script>
    import Format from "../store/format.js"
    import Common from "../store/common.js"
    export default {
        async created() {

        },
        mounted() {
            // Sự kiện ẩn tất cả contextMenu khi click ra ngoài
            window.addEventListener('click', (event) => {
                let dropdown = document.querySelector('.function .function-dropdown .dropdown');
                let dropdownContent = document.querySelector('.dropdown-content');
                if (dropdownContent != null && dropdown != null && !dropdown.contains(event.target)) {
                    let length = this.displayFunctionList.length;
                    for (let i = 0; i < length; i++) {
                        this.$set(this.displayFunctionList, i, false)
                    }
                }
            })
        },
        destroy() {
            window.removeEventListener('click');
        },
        props: ['ths', 'type'],
        data() {
            return {
                dataTable: [],
                checkedList: [],
                sortDirectionList: [],
                displayFunctionList: [],
                isReady: false,
            }
        },
        components: {

        },
        computed: {
            resource() {
                return this.$store.state.resource;
            },
            functionList() {
                return this.resource[this.$browserLocale]['management']['entity']['Employee']['tableFieldName']['sub']
                    .functionList;
            }
        },
        methods: {
            /**
             *  Hàm chức năng của lựa chọn của phần context menu chức năng
             *  Created by TBN (21/8/2021)
             */
            functionElementClick(data, index, key) {
                switch (key) {
                    case 'duplicate':
                        this.duplicateEntity(data, index);
                        break;
                    case 'delete':
                        this.deleteEntity(data, index);
                        break;
                }
            },
            /**
             * Xóa dữ liệu
             * Created By TBN (17/8/2021)
             */
            deleteEntity(data, index) {
                this.$set(this.displayFunctionList, index, false);
                this.$emit("updateSelectedData", data, "add");
                this.$emit("displayConfirmationPopup");
            },
            /**
             * Nhân bản dữ liệu
             * Created By TBN (17/8/2021)
             */
            duplicateEntity(data, index) {
                this.$set(this.displayFunctionList, index, false);
                this.$emit('displayFormEdit', data, true);
            },
            /**
             * Hàm ẩn hiện contextMenu
             * Created By TBN(21/8/2021)
             */
            async displayContextByIndex(index) {
                let length = this.displayFunctionList.length;
                for (let i = 0; i < length; i++) {
                    if (i == index) {
                        this.$set(this.displayFunctionList, i, !this.displayFunctionList[i])
                    } else {
                        this.$set(this.displayFunctionList, i, false)
                    }
                }
            },
            /**
             * Ẩn/Hiện dropdown function 
             * Created By TBN (17/8/2021)
             */
            async toggleFunction(index, $event) {
                await this.displayContextByIndex(index);
                if (this.displayFunctionList[index]) {
                    let root = $event.target.getBoundingClientRect()
                    let positionX = root.x - 90; // Vị trí x con trỏ theo screenview
                    let positionY = root.y + 20; // Vị trí y con trỏ theo clientview
                    let dropdown = $event.target.parentElement.parentElement.parentElement.parentElement
                        .parentElement
                        .querySelector(
                            '.dropdown-content');
                    dropdown.style.top = positionY + "px";
                    dropdown.style.left = positionX + "px";
                }
            },
            /**
             * Hàm lựa chọn tất cả record
             * Created By TBN (25/7/2021)
             */
            toggleCheckedAll($event) {
                let flag = $event.target.checked; // true = checked, false = unchecked
                for (const [key] of Object.entries(this.$refs)) {
                    if (key == "all")
                        continue
                    if (this.$refs[key][0]) {
                        if (flag) {
                            if (!this.$refs[key][0].checked) {
                                this.$refs[key][0].click()
                            }
                        } else {
                            if (this.$refs[key][0].checked) {
                                this.$refs[key][0].click();
                            }
                        }

                    }
                }
                // Checked toàn bô
                if ($event.target.checked) {
                    for (let i = 0; i < this.checkedList.length; i++) {
                        this.checkedList[i] = true;
                    }
                } else {
                    // Unchecked toàn bộ
                    for (let i = 0; i < this.checkedList.length; i++) {
                        this.checkedList[i] = false;
                    }
                }
            },
            /**
             * Sự kiện click chekcbox trong table
             * Created by TBN
             */
            clickCheckBox($event, index) {

                // Kiểm tra xem người click chọn hoặc bỏ 
                // Sau đó cập nhật lại danh sách được chọn
                let arr = [...this.checkedList]
                if ($event.target.checked) {
                    //this.$emit("updateSelectedData", data, "add");
                    arr[index] = true;
                } else {
                    //this.$emit("updateSelectedData", data, "remove");
                    arr[index] = false;
                }
                this.checkedList = arr;
            },
            /**
             * Sự kiện sửa dữ liệu
             * Created By TBN (18/8/2021)
             */
            displayEditForm(data) {
                this.$emit('displayFormEdit', data)
            },
            /**
             * Sự kiện double click vào hàng tránh trường hợp double click vào checkbox
             * Created By TBN (25/7/2021)
             */
            dbClickRow(data, $event) {
                if (!$event.target.classList.contains('main-td'))
                    return;
                this.$emit('displayFormEdit', data)
            },
            /**
             * Lấy dữ liệu cho bảng
             * Created By TBN (25/7/2021)
             */
            async setData(data) {
                this.dataTable = [];
                this.dataTable = data;
            },
            /**
             * Lấy dữ liệu cho bảng theo tên trường của thead
             * Created By TBN (10/8/2021)
             */
            getDataTable(data, fieldName) {
                if (fieldName == "DateOfBirth") {
                    return Format.formatDate(data[fieldName]);
                } else
                    return data[fieldName];
            },
            /**
             * Sắp xếp dữ liệu 
             * Created By TBN (11/8/2021)
             */
            async sortDataByField(fieldName, index, type) {
                let initialData = this.dataTable;
                this.dataTable = [];
                this.dataTable = await Common.sortByFieldName(initialData, fieldName, this.sortDirectionList[index],
                    type);
                this.sortDirectionList[index] = !this.sortDirectionList[index];
            }
        }

    }
</script>

<style scoped>
    .th-last {
        width: 120px;
        min-width: 120px;
        text-align: center;
        z-index: 3;
        position: sticky;
        right: 60px;
    }

    /* Css cho chức năng của row */
    .function {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .function .edit {
        color: #0075c0;
        font-weight: 600;
        cursor: pointer;
        display: inline-block;
    }

    .function .function-dropdown {
        width: 46px;
        height: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 8px 10px 8px 10px;
    }

    .function .function-dropdown .dropdown-container {
        width: 26px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .function .function-dropdown .dropdown {
        background: url('../assets/icon/icon-sprites.svg') no-repeat;
        background-position: -896px -359px;
        width: 16px;
        height: 16px;
        cursor: pointer;
    }

    .dropdown-content {
        position: fixed;
        width: 117px;
        transition: all .2s ease;
        z-index: 3;
        background-color: #fff;
        border: 1px solid #babec5;
    }

    .dropdown-content li {
        list-style-type: none;
        padding: 5px 10px;
        transition: all .4s ease;
    }

    .dropdown-content li:first-of-type {
        margin-top: 2px;
    }

    .dropdown-content li:hover {
        color: rgb(44, 160, 28);
        background-color: #eceef1;
        cursor: pointer;
    }

    .count {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: center;
    }

    .outline-blue {
        outline: 1px solid #0075c0;
    }

    .text-center {
        text-align: center !important;
    }

    .text-right {
        text-align: right !important;
    }
</style>