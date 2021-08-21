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
                content: 'Tiền gửi',
                classItem: 'navbar-item-icon-money-in',
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
            placeHolder: {
                searchBar: "Tìm theo mã, tên nhân viên, số điện thoại",
                date: 'DD/MM/YYYY'
            },
            buttons: {
                addNewEmployee: 'Thêm mới nhân viên'
            },
            entity: {
                Employee: {
                    title: 'Nhân viên',
                    formTitle: 'Thông tin nhân viên',
                    popupContent: {
                        delete: 'Bạn có thực sự muốn xóa Nhân viên <{0}> không ?'
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
                    buttonFooters: {
                        cancel: 'Hủy',
                        save: 'Cất',
                        saveAndMore: 'Cất và Thêm'
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
    // Resource cho ngôn ngữ tiếng Anh
    'en': {
        gender: [{
            content: "Men",
            value: 0
        }, {
            content: "Women",
            value: 1
        }, {
            content: "Other",
            value: 2
        }],
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
                content: 'Deposit',
                classItem: 'navbar-item-icon-money-in',
                link: '/BAProcess',

            },
            {
                content: 'Purchase',
                classItem: 'navbar-item-icon-buy',
                link: '/PUProcess',

            },
            {
                content: 'Bán hàng',
                classItem: 'navbar-item-icon-sell',
                link: '/SAProcess',

            }, {
                content: 'Order Management',
                classItem: 'navbar-item-icon-receipt',
                link: '/IPProcess',

            }, {
                content: 'Storage',
                classItem: 'navbar-item-icon-warehouse',
                link: '/INProcess',

            }, {
                content: 'Tools',
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
                content: 'Financial Analysis',
                classItem: 'navbar-item-icon-analysis',
                link: '/ReportAnalysis',
            }
        ],
        dictionaryError: {
            Employee: {
                EmployeeCode: {
                    empty: 'Code can not be empty',
                    duplicate: 'Employee Code <{0}> existed in the system, please check again'
                },
                EmployeeName: {
                    empty: 'Name can not be empty',
                },
                DepartmentName: {
                    empty: 'Department can not be empty',
                },
            }
        },
        entity: {
            Employee: {
                dictionaryError: {
                    EmployeeCode: {
                        empty: 'Mã không được để trống',
                        duplicate: 'Mã nhân viên <{0}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại'
                    },
                    EmployeeName: {
                        empty: 'Tên không được để trống',
                    },
                    DepartmentName: {
                        empty: 'Đơn vị không được để trống'
                    },
                },
                tableFieldName: {
                    main: [{
                            fieldName: "EmployeeCode",
                            value: "EMPLOYEECODE",
                            type: "number",
                        }, {
                            fieldName: "EmployeeName",
                            value: "EMPLOYEENAME",
                            colWidth: "250px",
                        }, {
                            fieldName: "GenderName",
                            value: "GENDER",
                        }, {
                            fieldName: "DateOfBirth",
                            value: "DATEOFBIRTH",
                            textAlign: "center",
                        }, {
                            fieldName: "IdentityNumber",
                            value: "IDENTITYNUMBER",
                            type: "number",
                        },
                        {
                            fieldName: "EmployeePosition",
                            value: "EMPLOYEEPOSITION",
                            colWidth: "250px",
                        }, {
                            fieldName: "DepartmentName",
                            value: "DEPARTMENTNAME",
                            colWidth: "250px",
                        }, {
                            fieldName: "BankAccountNumber",
                            value: "BANKACCOUNTNUMBER",
                        }, {
                            fieldName: "BankName",
                            value: "BANKNAME",
                            colWidth: "250px",
                        }, {
                            fieldName: "BankBranchName",
                            value: "BANKBRANCHNAME",
                            colWidth: "250px",
                        },
                    ],
                    sub: {
                        fieldName: "Function",
                        value: "FUNCTION",
                        colWidth: "120px",
                    }
                }
            }
        }
    },
}