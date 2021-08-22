export const MISACODE = {
    /// <summary>
    /// Dữ liệu không hợp lệ
    /// </summary>
    NotValid: 104,
    /// <summary>
    /// Thành công
    /// </summary>
    Success: 200,
    /// <summary>
    /// Thất bại
    /// </summary>
    Fail: 201,
    /// <summary>
    /// Lỗi hệ thống
    /// </summary>
    Exception: 500
}

export const resource = {
    'vi': {
        gender: [{
            content: "Nam",
            value: 0
        }, {
            content: "Nữ",
            value: 1
        }, {
            content: "Khác",
            value: 2
        }],
        navbarItems: [{
                content: 'Tổng quan',
                classItem: 'navbar-item-icon-dashboard',
                link: '/dashboard'
            },
            {
                content: 'Tiền mặt',
                classItem: 'navbar-item-icon-cash',

                link: '/CAProcess'
            },
            {
                content: 'Nhân viên',
                classItem: 'navbar-item-icon-employee',
                link: '/BAProcess',

            },
            {
                content: 'Mua hàng',
                classItem: 'navbar-item-icon-buy',
                link: '/PUProcess',

            },
            {
                content: 'Bán hàng',
                classItem: 'navbar-item-icon-sell',
                link: '/SAProcess',

            }, {
                content: 'Quản lý hóa đơn',
                classItem: 'navbar-item-icon-receipt',
                link: '/IPProcess',

            }, {
                content: 'Kho',
                classItem: 'navbar-item-icon-warehouse',
                link: '/INProcess',

            }, {
                content: 'Công cụ dụng cụ',
                classItem: 'navbar-item-icon-tool',
                link: '/SUProcess',

            }, {
                content: 'Tài sản cố định',
                classItem: 'navbar-item-icon-asset',
                link: '/FAProcess',

            }, {
                content: 'Thuế',
                classItem: 'navbar-item-icon-tax',
                link: '/TAList',

            }, {
                content: 'Giá thành',
                classItem: 'navbar-item-icon-price',
                link: '/JCProcessSimple',

            }, {
                content: 'Tổng hợp',
                classItem: 'navbar-item-icon-synthesis',
                link: '/GLProcess',
            }, {
                content: 'Ngân sách',
                classItem: 'navbar-item-icon-budget',
                link: '/BUDDashboard',

            }, {
                content: 'Báo cáo',
                classItem: 'navbar-item-icon-report',
                link: '/ReportList',

            }, {
                content: 'Phân tích tài chính',
                classItem: 'navbar-item-icon-analysis',
                link: '/ReportAnalysis',
            }
        ],
        management: {
            pageSize: [{
                    content: "10 bản ghi trên 1 trang"
                },
                {
                    content: "20 bản ghi trên 1 trang"
                },
                {
                    content: "30 bản ghi trên 1 trang"
                },
                {
                    content: "50 bản ghi trên 1 trang"
                },
                {
                    content: "100 bản ghi trên 1 trang"
                }
            ],
            entity: {
                Employee: {
                    title: 'Nhân viên',
                    formTitle: 'Thông tin nhân viên',
                    popupContent: {
                        delete: 'Bạn có thực sự muốn xóa Nhân viên <{0}> không ?',
                        dataChange: 'Dữ liệu đã bị thay đổi. Bạn có muốn cất không?',
                        errorGetNewCode: 'Lấy mã nhân viên thất bại',
                        invalidCode : 'Mã không hợp lệ',
                        deleteFail: 'Xóa nhân viên thất bại'
                    },
                    text:{
                        noContent : 'Không có dữ liệu',
                        total : 'Tổng số',
                        record: 'bản ghi',
                        edit : 'Sửa'
                    },
                    toastMessage:{
                        unReadyData : 'Dữ liệu chưa sẵn sàng',
                        errorFieldData: 'Sai trường dữ liệu khi gửi request',
                        deleteFail : 'Xóa nhân viên thất bại',
                        deleteSuccess: 'Xóa nhân viên thành công',
                        unChangeData : "Dữ liệu của quý khách không thay đổi so với ban đầu"
                    },
                    tooltipContent: {
                        searchBar: 'Nhập thông tin tìm kiếm',
                        refreshData: 'Cập nhật dữ liệu',
                        footerFormButton:{
                            cancel: 'Hủy (ESC)',
                            save: 'Cất (Ctrl + S)',
                            saveAndMore: 'Cất và Thêm (Ctrl + Shift + S)'
                        },
                        closeButton: 'Đóng (ESC)',
                        popup:{
                            warning: {
                                primary: 'Có',
                                secondary: 'Không',
                            },
                            'warning-code': {
                                primary: 'Đồng ý',
                            },
                            error: {
                                primary: 'Đóng',
                            },
                            confirmation:{
                                primary: 'Có',
                                subPrimary: 'Không',
                                secondary: 'Hủy'
                            }
                        }
                    },
                    placeHolder: {
                        searchBar: "Tìm theo mã, tên nhân viên, số điện thoại",
                        date: "DD/MM/YYYY"
                    },
                    buttons: {
                        content: {
                            commonButton: {
                                addNewEmployee: 'Thêm mới nhân viên',
                            },
                            footerFormButton: {
                                cancel: 'Hủy',
                                save: 'Cất',
                                saveAndMore: 'Cất và Thêm'
                            },
                            footerPopUpButton: {
                                warning: ["Không", "", "Có"],
                                confirmation: ["Hủy", "Không", "Có"],
                                error: ["", "", "Đóng"],
                                'warning-code': ["", "", "Đồng ý"]
                            },
                            pagingBarButton: {
                                previous: 'Trước',
                                next: 'Sau'
                            }
                        }
                    },
                    formFieldTitle: {
                        IsCustomer: 'Là khách hàng',
                        IsSupplier: 'Là nhà cung cấp',
                        EmployeeCode: 'Mã nhân viên',
                        EmployeeName: 'Tên',
                        DepartmentName: 'Đơn vị',
                        EmployeePosition: 'Chức vụ',
                        DateOfBirth: 'Ngày sinh',
                        GenderName: 'Giới tính',
                        IdentityNumber: "Số CMND",
                        IdentityDate: "Ngày cấp",
                        IdentityPlace: "Nơi cấp",
                        Address: 'Địa chỉ',
                        PhoneNumber: 'ĐT di động',
                        TelephoneNumber: 'ĐT cố định',
                        Email: 'Email',
                        BankAccountNumber: 'Tài khoản ngân hàng',
                        BankName: 'Tên ngân hàng',
                        BankBranchName: 'Chi nhánh',
                        GroupName: 'Nhóm khách hàng, nhà cung cấp',
                        AccountDebtReceive: 'TK công nợ phải thu',
                        AccountDebtPay: 'Tk công nợ phải trả'
                    },

                    dictionaryError: {
                        EmployeeCode: {
                            empty: 'Mã không được để trống',
                            duplicate: 'Mã nhân viên <{0}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại'
                        },
                        EmployeeName: {
                            empty: 'Tên không được để trống',
                        },
                        DepartmentName: {
                            empty: 'Đơn vị không được để trống',
                            noOption: 'Dữ liệu <Đơn vị> không có trong danh mục'
                        },
                        DateOfBirth: {
                            invalid: 'Ngày sinh không đúng định dạng'
                        },
                        IdentityDate: {
                            invalid: 'Ngày cấp CMND không đúng định dạng'
                        },
                        IdentityNumber: {
                            invalid: 'Số CMND không đúng định dạng'
                        }
                    },
                    tableFieldName: {
                        main: [{
                                fieldName: "EmployeeCode",
                                value: "MÃ NHÂN VIÊN",
                                type: "number",
                            }, {
                                fieldName: "EmployeeName",
                                value: "TÊN NHÂN VIÊN",
                                colWidth: "250px",
                            }, {
                                fieldName: "GenderName",
                                value: "GIỚI TÍNH",
                            }, {
                                fieldName: "DateOfBirth",
                                value: "NGÀY SINH",
                                textAlign: "center",
                            }, {
                                fieldName: "PhoneNumber",
                                value: "SỐ ĐT DI ĐỘNG",
                                textAlign: "center",
                            },{
                                fieldName: "IdentityNumber",
                                value: "SỐ CMND",
                                type: "number",
                            },
                            {
                                fieldName: "EmployeePosition",
                                value: "CHỨC DANH",
                                colWidth: "250px",
                            }, {
                                fieldName: "DepartmentName",
                                value: "TÊN ĐƠN VỊ",
                                colWidth: "250px",
                            }, {
                                fieldName: "BankAccountNumber",
                                value: "SỐ TÀI KHOẢN",
                            }, {
                                fieldName: "BankName",
                                value: "TÊN NGÂN HÀNG",
                                colWidth: "250px",
                            }, {
                                fieldName: "BankBranchName",
                                value: "CHI NHÁNH TK NGÂN HÀNG",
                                colWidth: "250px",
                            },
                        ],
                        sub: {
                            fieldName: "Function",
                            value: "CHỨC NĂNG",
                            colWidth: "120px",
                            functionList: [{
                                    key: 'duplicate',
                                    value: 'Nhân bản'
                                },
                                {
                                    key: 'delete',
                                    value: 'Xóa'
                                }
                            ]
                        }
                    }
                }

            }
        },
    },
    'en': {
        gender: [{
            content: "Man",
            value: 0
        }, {
            content: "Women",
            value: 1
        }, {
            content: "Other",
            value: 2
        }],
        navbarItems: [{
                content: 'Dashboard',
                classItem: 'navbar-item-icon-dashboard',
                link: '/dashboard'
            },
            {
                content: 'Cash',
                classItem: 'navbar-item-icon-cash',

                link: '/CAProcess'
            },
            {
                content: 'Employee',
                classItem: 'navbar-item-icon-employee',
                link: '/BAProcess',

            },
            {
                content: 'Purchase',
                classItem: 'navbar-item-icon-buy',
                link: '/PUProcess',

            },
            {
                content: 'Sell',
                classItem: 'navbar-item-icon-sell',
                link: '/SAProcess',

            }, {
                content: 'Order',
                classItem: 'navbar-item-icon-receipt',
                link: '/IPProcess',

            }, {
                content: 'Warehouse',
                classItem: 'navbar-item-icon-warehouse',
                link: '/INProcess',

            }, {
                content: 'Tool',
                classItem: 'navbar-item-icon-tool',
                link: '/SUProcess',

            }, {
                content: 'Assets',
                classItem: 'navbar-item-icon-asset',
                link: '/FAProcess',

            }, {
                content: 'Tax',
                classItem: 'navbar-item-icon-tax',
                link: '/TAList',

            }, {
                content: 'Price',
                classItem: 'navbar-item-icon-price',
                link: '/JCProcessSimple',

            }, {
                content: 'Synthesis',
                classItem: 'navbar-item-icon-synthesis',
                link: '/GLProcess',
            }, {
                content: 'Budget',
                classItem: 'navbar-item-icon-budget',
                link: '/BUDDashboard',

            }, {
                content: 'Report',
                classItem: 'navbar-item-icon-report',
                link: '/ReportList',

            }, {
                content: 'Analysis',
                classItem: 'navbar-item-icon-analysis',
                link: '/ReportAnalysis',
            }
        ],
        management: {
            pageSize: [{
                    content: "10 records per page"
                },
                {
                    content: "20 records per page"
                },
                {
                    content: "30 records per page"
                },
                {
                    content: "50 records per page"
                },
                {
                    content: "100 records per page"
                }
            ],
            entity: {
                Employee: {
                    title: 'Employee',
                    formTitle: 'Employee Information',
                    popupContent: {
                        delete: 'Do you really want to delete Employee <{0}> ?',
                        dataChange: 'Data has changed. Do you want to store information?',
                        errorGetNewCode: 'Get new employee code fail',
                        invalidCode : 'Invalid code',
                        deleteFail: 'Delete employee fail'
                    },
                    text:{
                        noContent : 'No content',
                        total : 'Total',
                        record: 'records',
                        edit: 'Edit'
                    },
                    toastMessage:{
                        unReadyData : 'Data is not ready',
                        errorFieldData: 'Error field while sending request',
                        deleteFail : 'Delete employee fail',
                        deleteSuccess: 'Delete employee success',
                        unChangeData : "Data is not changed",
                    },
                    tooltipContent: {
                        searchBar: 'Enter the search information',
                        refreshData: 'Reload the data',
                        footerFormButton:{
                            cancel: 'Cancel (ESC)',
                            save: 'Save (Ctrl + S)',
                            saveAndMore: 'Save and More (Ctrl + Shift + S)'
                        },
                        closeButton: 'Close (ESC)',
                        popup:{
                            warning: {
                                primary: 'Yes',
                                secondary: 'No',
                            },
                            'warning-code': {
                                primary: 'Accept',
                            },
                            error: {
                                primary: 'Close',
                            },
                            confirmation:{
                                primary: 'Yes',
                                subPrimary: 'No',
                                secondary: 'Cancel'
                            }
                        }
                    },
                    placeHolder: {
                        searchBar: "Find by the code,name and phonenumber of the employee",
                        date: "DD/MM/YYYY"
                    },
                    buttons: {
                        content: {
                            commonButton: {
                                addNewEmployee: 'Add Employee',
                            },
                            footerFormButton: {
                                cancel: 'Cancel',
                                save: 'Save',
                                saveAndMore: 'Save and More'
                            },
                            footerPopUpButton: {
                                warning: ["No", "", "Yes"],
                                confirmation: ["Cancel", "No", "Yes"],
                                error: ["", "", "Close"],
                                'warning-code': ["", "", "Accept"]
                            },
                            pagingBarButton: {
                                previous: 'Previous',
                                next: 'Next'
                            }
                        }
                    },
                    formFieldTitle: {
                        IsCustomer: 'Is Customer',
                        IsSupplier: 'Is Supplier',
                        EmployeeCode: 'Employee code',
                        EmployeeName: 'Employee name',
                        DepartmentName: 'Department name',
                        EmployeePosition: 'Employee position',
                        DateOfBirth: 'Date of birth',
                        GenderName: 'Gender',
                        IdentityNumber: "Identity number",
                        IdentityDate: "Identity date",
                        IdentityPlace: "Identity place",
                        Address: 'Address',
                        PhoneNumber: 'Phone number',
                        TelephoneNumber: 'Telephone number',
                        Email: 'Email',
                        BankAccountNumber: 'Bank account number',
                        BankName: 'Bank name',
                        BankBranchName: 'Bank branch name',
                        GroupName: 'Group name',
                        AccountDebtReceive: 'Account debt receive',
                        AccountDebtPay: 'Account debt pay'
                    },

                    dictionaryError: {
                        EmployeeCode: {
                            empty: 'Employee code can not be empty',
                            duplicate: 'Employee Code <{0}> existed in the system, please try again'
                        },
                        EmployeeName: {
                            empty: 'Name can not be empty',
                        },
                        DepartmentName: {
                            empty: 'Department name can not be empty',
                            noOption: 'Data <Department name> is not available in the list'
                        },
                        DateOfBirth: {
                            invalid: 'Date of birth is invalid',
                        },
                        IdentityDate: {
                            invalid: 'Identity Date is invalid'
                        },
                        IdentityNumber: {
                            invalid: 'Identity Number is invalid'                        
                        }
                    },
                    tableFieldName: {
                        main: [{
                                fieldName: "EmployeeCode",
                                value: "EMPLOYEE CODE",
                                type: "number",
                            }, {
                                fieldName: "EmployeeName",
                                value: "EMPLOYEE NAME",
                                colWidth: "250px",
                            }, {
                                fieldName: "GenderName",
                                value: "GENDER NAME",
                            }, {
                                fieldName: "DateOfBirth",
                                value: "DATE OF BIRTH",
                                textAlign: "center",
                            }, {
                                fieldName: "PhoneNumber",
                                value: "PHONE NUMBER",
                                textAlign: "center",
                            },{
                                fieldName: "IdentityNumber",
                                value: "IDENTITY NUMBER",
                                type: "number",
                            },
                            {
                                fieldName: "EmployeePosition",
                                value: "EMPLOYEE POSITION",
                                colWidth: "250px",
                            }, {
                                fieldName: "DepartmentName",
                                value: "DEPARTMENT NAME",
                                colWidth: "250px",
                            }, {
                                fieldName: "BankAccountNumber",
                                value: "BANK ACCOUNT NAME",
                            }, {
                                fieldName: "BankName",
                                value: "BANK NAME",
                                colWidth: "250px",
                            }, {
                                fieldName: "BankBranchName",
                                value: "BANK BRANCH NAME",
                                colWidth: "250px",
                            },
                        ],
                        sub: {
                            fieldName: "Function",
                            value: "FUNCTION",
                            colWidth: "120px",
                            functionList: [{
                                    key: 'duplicate',
                                    value: 'Duplicate'
                                },
                                {
                                    key: 'delete',
                                    value: 'Delete'
                                }
                            ]
                        }
                    }
                }

            }
        },
    },
}