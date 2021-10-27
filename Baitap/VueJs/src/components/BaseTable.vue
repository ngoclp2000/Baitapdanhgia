<template>
    <table :class="type">
        <!-- <colgroup>
            <col class="count-col" span="1" style="width: 3%;">
            <col v-for="(th,index) in ths" span="1" :style="{width: th.colWidth}" :key="index">
        </colgroup> -->
        <thead>
            <tr>
                <th style=" width: 70px; padding-left: 11px">
                    <div class="count" style="margin-right: 5px">
                        <input ref="all" id="all" class="checkbox-custom" name="checkbox-1"
                            @click="toggleCheckedAll($event)" type="checkbox">
                        <label for="all" class="checkbox-custom-label"></label>
                    </div>
                    <div class="count">#</div>
                </th>
                <th v-for="(th,index) in ths"
                    :style="{textAlign: th.textAlign || 'left', width: th.colWidth || '150px'}"
                    :key="index" @mousemove="showTooltip($event)" @mouseleave="hideTooltip($event)">
                    {{th.value}}
                    <div class="tooltip bottom" >
                        {{th.value}}
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr :class="{'bg-selected': checkedList[index]}" @dblclick="dbClickRow(data,$event)"
                v-for="(data,index) in dataTable" :key="index">
                <td style="padding-left: 11px; ">
                    <div class="count" style="margin-right: 5px">
                        <input :ref="'checkbox' + index" :id="index" class="checkbox-custom" name="checkbox-1"
                            @click="clickCheckBox(data,$event,index)" type="checkbox">
                        <label :for="index" class="checkbox-custom-label"></label>
                    </div>
                    <div class="count" style="padding-top:11px">{{index+1}}</div>
                </td>
                <td :fieldName="th.fieldName" v-for="(th,index1) in informationThead" :key="index1"
                    :style="{textAlign: th.textAlign || 'left',width: th.colWidth || '150px'}"
                    @mousemove="showTooltip($event)" @mouseleave="hideTooltip($event)">
                    {{getDataTable(data,th.fieldName)}}
                    <div class="tooltip bottom">
                        {{getDataTable(data,th.fieldName)}}
                    </div>
                </td>

            </tr>
        </tbody>
    </table>
</template>

<script>
    import Format from "../store/format.js"
    export default {
        async created() {},
        props: ['ths', 'type'],
        data() {
            return {
                dataTable: [],
                checkedList: []
            }
        },
        components: {

        },
        computed: {
            informationThead() {
                return this.ths.filter(th => th.fieldName != "Edit")
            }
        },
        methods: {
            /**
             * Hiển thị tooltip
             * Created By TBN (3/8/2021)
             */
            showTooltip($event) {
                if (window.innerWidth <= 1024) {
                    let positionX = $event.screenX; // Vị trí x con trỏ theo screenview
                    let positionY = $event.clientY; // Vị trí y con trỏ theo clientview
                    let width = $event.target.offsetWidth; // Chiều dài của element đang trỏ tới
                    let height = $event.target.offsetHeight; // Chiều rộng của element đang trỏ tới
                    let lengthText = $event.target.innerText.length; // Độ dài của nội dung
                    let tooltip = $event.target.querySelector('.tooltip');
                    tooltip.style.left = (positionX - width / 2 - 5) + "px"
                    tooltip.style.top = (positionY + 25) + "px"
                    tooltip.style.width = (width + lengthText * 1.5) + "px"
                    tooltip.style.height = height + "px"
                    $event.target.querySelector('.tooltip').classList.add("show-flex");
                }
            },
            /**
             * Ẩn tool tip
             * Created By TBN (3/8/2021)
             */
            hideTooltip($event) {
                $event.target.querySelector('.tooltip').classList.remove("show-flex");
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
            clickCheckBox(data, $event, index) {

                // Kiểm tra xem người click chọn hoặc bỏ 
                // Sau đó cập nhật lại danh sách được chọn
                let arr = [...this.checkedList]
                if ($event.target.checked) {
                    this.$emit("updateSelectedData", data, "add");
                    arr[index] = true;
                } else {
                    this.$emit("updateSelectedData", data, "remove");
                    arr[index] = false;
                }
                this.checkedList = arr;
            },
            /**
             * Sự kiện double click vào hàng tránh trường hợp double click vào checkbox
             * Created By TBN (25/7/2021)
             */
            dbClickRow(data, $event) {
                if ($event.target.nodeName == "LABEL" || $event.target.nodeName == "DIV")
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
             */
            getDataTable(data, fieldName) {
                if (fieldName == "DateOfBirth")
                    return Format.formatDate(data[fieldName]);
                else if (fieldName == "Salary" || fieldName == "DebitAmount")
                    return Format.formatMoney(data[fieldName]);
                else if (fieldName == "WorkStatus") {
                    let status = data[fieldName]
                    switch (status) {
                        case 1:
                            return "Đang làm việc"
                        case 2:
                            return "Đã nghỉ việc"
                        default:
                            return "Không xác định"
                    }
                } else
                    return data[fieldName];
            },
        }

    }
</script>

<style scoped>
    .count {
        display: inline-block;
    }

    .text-center {
        text-align: center !important;
    }

    .text-right {
        text-align: right !important;
    }

    input[type="checkbox"]:checked:before {
        background-color: #04b474;
    }

    .bg-selected {
        background-color: #e3f3ee !important;
    }

    .checkbox-custom {
        display: none;
    }

    .checkbox-custom-label {
        display: inline-block;
        position: relative;
        vertical-align: middle;
        margin: 5px;
        cursor: pointer;

    }

    .checkbox-custom+.checkbox-custom-label:before {
        content: '';
        background: #fff;
        border-radius: 4px;
        border: 2px solid #ddd;
        display: inline-block;
        vertical-align: middle;
        width: 20px;
        height: 20px;
        padding: 0px;
    }

    .checkbox-custom:checked+.checkbox-custom-label:before {
        background-color: #04b474;
        border-color: #04b474;
    }

    .checkbox-custom:checked+.checkbox-custom-label:after {
        content: "";
        padding: 2px;
        position: absolute;
        width: 1px;
        height: 5px;
        border: 1px solid #ffffff;
        border-width: 0 3px 3px 0;
        transform: rotate(45deg);
        top: 4px;
        left: 8px;
    }
</style>