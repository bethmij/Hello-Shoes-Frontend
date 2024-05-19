const categoryList = ["INTERNATIONAL", "LOCAL"]

export function getSupplier(supplierCode, supplierList) {
    return [
        [{
            id: "supplierCode",
            title: "Supplier Code",
            type: "text",
            placeholder: "",
            description: "Auto generated",
            value: (supplierCode !== "") ? supplierCode : supplierList.supplierCode,
        },
            {
                id: "supplierName",
                title: "Supplier Name",
                type: "text",
                placeholder: "Name",
                description: "Full name required",
                value: supplierList.supplierName
            }],
        [{
            id: "category",
            title: "Category",
            type: "select",
            placeholder: "Category",
            description: "",
            selectList: categoryList,
            value: supplierList.category
        },
            {
                id: "addressLine01",
                title: "Address Line 01",
                type: "text",
                placeholder: "Address",
                description: "Building no or name",
                value: supplierList.addressLine01
            }], [
            {
                id: "addressLine02",
                title: "Address Line 02",
                type: "text",
                placeholder: "Address",
                description: "Lane",
                value: supplierList.addressLine02
            },
            {
                id: "addressLine03",
                title: "Address Line 03",
                type: "text",
                placeholder: "Address",
                description: "Main city",
                value: supplierList.addressLine03
            }],
        [{
            id: "addressLine04",
            title: "Address Line 04",
            type: "text",
            placeholder: "Address",
            description: "Main state",
            value: supplierList.addressLine04
        },
            {
                id: "addressLine05",
                title: "Address Line 05",
                type: "number",
                placeholder: "Address",
                description: "Postal code",
                value: supplierList.addressLine05
            }],
        [

            {
                id: "addressLine06",
                title: "Address Line 06",
                type: "text",
                placeholder: "Address",
                description: "Country",
                value: supplierList.addressLine06
            },
            {
                id: "contactNo1",
                title: "Contact number",
                type: "text",
                placeholder: "Contact",
                description: "Mobile number",
                value: supplierList.contactNo1
            }
        ],
        [
            {
                id: "contactNo2",
                title: "Contact number",
                type: "text",
                placeholder: "Contact",
                description: "Land number",
                value: supplierList.contactNo2
            },
            {
                id: "email",
                title: "Customer Email",
                type: "email",
                placeholder: "Email",
                description: "Email required",
                value: supplierList.email
            }]
    ]


}