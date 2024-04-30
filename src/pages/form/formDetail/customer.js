const genderList = ["Male", "Female", "Other"]
const levelList = ["Gold", "Silver", "Bronze", "New"]

export const customerForm = [
    [{
        id: "code",
        title: "Customer Code",
        type: "text",
        placeholder: "",
        description: "Auto generated",
    },
        {
            id: "name",
            title: "Customer Name",
            type: "text",
            placeholder: "Name",
            description: "Full name required",
        }],
    [{
        id: "gender",
        title: "Customer Gender",
        type: "select",
        placeholder: "Gender",
        description: "",
        selectList: genderList
    },
        {
            id: "joinDate",
            title: "Loyalty Join Date",
            type: "date",
            placeholder: "Date",
            description: "Date of the entitlement as a loyalty customer.js",
        }],
    [{
        id: "points",
        title: "Total point",
        type: "number",
        placeholder: "Points",
        description: "1 point purchase more than LKR 800",
    },
        {
            id: "level",
            title: "Customer Level",
            type: "select",
            placeholder: "Level",
            description: "Gold > 200  | Silver – 100-199 | Bronze – 50-99 | New < 50",
            selectList: levelList
        }],
    [
        {
            id: "dob",
            title: "Customer DOB",
            type: "date",
            placeholder: "Date",
            description: "Date of birth",
        },
        {
            id: "address1",
            title: "Address Line 01",
            type: "text",
            placeholder: "Address",
            description: "Building no or name",
        }], [
        {
            id: "address2",
            title: "Address Line 02",
            type: "text",
            placeholder: "Address",
            description: "Lane",
        },
        {
            id: "address3",
            title: "Address Line 03",
            type: "text",
            placeholder: "Address",
            description: "Main city",
        }],
    [{
        id: "address4",
        title: "Address Line 04",
        type: "text",
        placeholder: "Address",
        description: "Main state",
    },
        {
            id: "address5",
            title: "Address Line 05",
            type: "text",
            placeholder: "Address",
            description: "Postal code",
        }], [
        {
            id: "contact",
            title: "Contact number",
            type: "text",
            placeholder: "Contact",
            description: "Mobile number",
        },
        {
            id: "email",
            title: "Customer Email",
            type: "email",
            placeholder: "Email",
            description: "Email required",
        }]


]