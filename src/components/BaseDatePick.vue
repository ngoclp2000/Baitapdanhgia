<template>
    <div>
        <date-pick ref="datePick" :class="{'error' : isError}" @mouseover.native="isDisplayError = true"
            @mouseleave.native="isDisplayError=false" v-model="date" @change.native="checkBlur"
            :displayFormat="'DD/MM/YYYY'" :months="months" :weekdays="weekdays" nextMonthCaption="Tháng sau"
            prevMonthCaption="Tháng trước" :inputAttributes="{tabindex,placeholder: 'DD/MM/YYYY'}"></date-pick>
        <div v-show="isError && isDisplayError" class="wrong-input">{{errorContent}}</div>
    </div>
</template>

<script>
    import DatePick from 'vue-date-pick';
    import 'vue-date-pick/dist/vueDatePick.css';
    //import DatePicker from '../store/datepick.js'
    import Validation from '../store/validate.js'
    export default {
        created() {
            //DatePicker.runLoop();
        },
        destroyed() {
            //DatePicker.stopLoop();
        },
        components: {
            DatePick
        },
        props: {
            tabindex: String,
            name: String,
        },
        data: () => ({
            date: null,
            months: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
                "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
            ],
            weekdays: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
            isError: false,
            isDisplayError: false,
            errorContent: "",
            triggerCheckValid: false,
            isEdit: false,
        }),
        watch: {
            date() {
                //if (!this.isEdit || this.isEdit == null) {
                let input = this.$refs.datePick.$el.querySelector('input')
                if (this.date == "") {
                    this.isError = false;
                    input.classList.remove('border-red')
                }
                // } else {
                //     input.focus();
                // }
                // }
                this.$emit("bindingDataInput");
                this.isEdit = false;
            }
        },
        computed: {

        },
        methods: {
            checkBlur() {
                console.log(this.date)
                let input = this.$refs.datePick.$el.querySelector('input')
                if (this.date != null && this.date != "" && !Validation.checkValidDate(this.date)) {
                    this.isError = true;
                    this.errorContent = this.name + " nhập sai định dạng";
                    input.classList.add('border-red')
                } else {
                    this.isError = false;
                    input.classList.remove('border-red')
                }
            }
        }
    };
</script>
<style scoped>

</style>