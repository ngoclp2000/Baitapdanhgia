<template>
    <div>
        <date-pick ref="datePick" :class="{'error' : isError}" @mouseover.native="isDisplayError = true"
            @mouseleave.native="isDisplayError=false" v-model="date" @change.native="checkBlur"
            @input.native="formatDateInput($event)" :isDateDisabled="isFutureDate"
            :displayFormat="'DD/MM/YYYY'" :months="months" :weekdays="weekdays" nextMonthCaption="Tháng sau"
            prevMonthCaption="Tháng trước" :inputAttributes="{tabindex,placeholder: 'DD/MM/YYYY'}"></date-pick>
        <div v-show="isError && isDisplayError" class="wrong-input">{{errorContent}}</div>
    </div>
</template>

<script>
    import DatePick from 'vue-date-pick';
    import 'vue-date-pick/dist/vueDatePick.css';
    import Format from '../store/format.js'
    import Validation from '../store/validate.js'
    export default {
        created() {
            this.errorContent = this.resource[this.$browserLocale]['management']['entity']['Employee']['dictionaryError'][this.name].invalid;
            
        },
        destroyed() {
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
                let input = this.$refs.datePick.$el.querySelector('input');
                if (this.date == "") {
                    this.isError = false;
                    input.classList.remove('border-red')
                }
                this.$emit("bindingDataInput");
                this.isEdit = false;
            }
        },
        computed: {
            resource(){
                return this.$store.state.resource;
            }
        },
        methods: {
            isFutureDate(date) {
            const currentDate = new Date();
            return date > currentDate;
            },   
            formatDateInput($event){
                let dateInput = $event.target;
                if(this.date) {
                    let newDate = Format.formatDateInput(dateInput.value);
                    dateInput.value = newDate;
                }
            },
            checkBlur() {
                let input = this.$refs.datePick.$el.querySelector('input')
                if (this.date != null && this.date != "" && !Validation.checkValidDate(this.date)) {
                    this.isError = true;
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