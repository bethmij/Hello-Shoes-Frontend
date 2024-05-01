const categoryList = ["INTERNATIONAL", "LOCAL"]

export const supplierForm = [
    [{
        id: "supplierCode",
        title: "Supplier Code",
        type: "text",
        placeholder: "",
        description: "Auto generated",
    },
        {
            id: "supplierName",
            title: "Supplier Name",
            type: "text",
            placeholder: "Name",
            description: "Full name required",
        }],
    [{
        id: "category",
        title: "Category",
        type: "select",
        placeholder: "Category",
        description: "",
        selectList: categoryList
    },
        {
            id: "addressLine01",
            title: "Address Line 01",
            type: "text",
            placeholder: "Address",
            description: "Building no or name",
        }], [
        {
            id: "addressLine02",
            title: "Address Line 02",
            type: "text",
            placeholder: "Address",
            description: "Lane",
        },
        {
            id: "addressLine03",
            title: "Address Line 03",
            type: "text",
            placeholder: "Address",
            description: "Main city",
        }],
    [{
        id: "addressLine04",
        title: "Address Line 04",
        type: "text",
        placeholder: "Address",
        description: "Main state",
    },
        {
            id: "addressLine05",
            title: "Address Line 05",
            type: "number",
            placeholder: "Address",
            description: "Postal code",
        }],
    [

        {
            id: "addressLine06",
            title: "Address Line 06",
            type: "text",
            placeholder: "Address",
            description: "Country",
        },
        {
            id: "contactNo1",
            title: "Contact number",
            type: "text",
            placeholder: "Contact",
            description: "Mobile number",
        }
    ],
    [
        {
            id: "contactNo2",
            title: "Contact number",
            type: "text",
            placeholder: "Contact",
            description: "Land number",
        },
        {
            id: "email",
            title: "Customer Email",
            type: "email",
            placeholder: "Email",
            description: "Email required",
        }]


]