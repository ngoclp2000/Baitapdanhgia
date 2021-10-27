class Table {
    constructor(toggle, combobox, input) {
        this.toggle = toggle;
        this.combobox = combobox;
        this.input = input;
    }
    /**
     * 
     */
    ldEventDblClickRow() {
        $('tbody').on('dblclick', 'td', (e) => {
            if($(e.target).is('input') || e.target.querySelector('input')) return;
            let employeeId = $(e.target).parent().data("EmployeeId")
            this.toggle.toggleEmployeeForm(this.combobox, this.input); // Display Employee Form
            setTimeout(() => {
                $.ajax({
                    method: 'GET',
                    url: "http://cukcuk.manhnv.net/v1/Employees/" + employeeId
                }).done((data) => {
                    $('.employee-detail .title').text("SỬA THÔNG TIN NHÂN VIÊN");
                    $('.employee-detail').attr("type", "Edit") // Change type action: Must change to method type variable
                    // Binding value to employee form
                    $(this.input.employeeDetailInputs).each((index, element) => {
                        if($(element).attr('fieldName') == "DateOfBirth")
                            $(element).val(Common.formatDate(data[$(element).attr('fieldName')]).split("/").reverse().join("-"))
                        else if($(element).attr('fieldName') == "DepartmentName"){
                            $.ajax({
                                method: "GET",
                                url: "http://cukcuk.manhnv.net/api/Department/" + data["DepartmentId"]
                            }).done((res)=>{
                                $(element).val(res.DepartmentName)
                            })
                            console.log(data["DepartmentId"])
                        }else if($(element).attr('fieldName') == "PositionName"){
                            console.log(data["PositionId"])
                            $.ajax({
                                method: "GET",
                                url: "http://cukcuk.manhnv.net/v1/Positions/" + data["PositionId"]
                            }).done((res)=>{
                                $(element).val(res.PositionName)
                            })
                        }
                        else if($(element).attr("fieldName") == "WorkStatus"){
                            console.log(data["WorkStatus"])
                            $(element).val(data["WorkStatus"] != null  ? "Đang làm việc" : "Đã nghỉ việc")
                        }
                        else
                            $(element).val(data[$(element).attr('fieldName')])
                    })
                })
            }, 100)
            ToastMessage.createToastMessage("Lấy thông tin nhân viên thành công", "success")
        })
    }
}