const genderList = ["Male", "Female", "Other"]
const levelList = ["Gold", "Silver", "Bronze", "New"]


export let customer = {
    customerCode:"",
    customerName:"",
    gender:"",
    joinDate:"",
    points:"",
    level:"",
    dob:"",
    address1:"",
    address2:"",
    address3:"",
    address4:"",
    address5:"",
    contact:"",
    email:""
}

export const customerForm = [
    [{
        id: "customerCode",
        title: "Customer Code",
        type: "text",
        placeholder: "",
        description: "Auto generated",
    },
        {
            id: "customerName",
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
            id: "loyaltyJoinedDate",
            title: "Loyalty Join Date",
            type: "date",
            placeholder: "Date",
            description: "Date of the entitlement as a loyalty customer.js",
        }],
    [{
        id: "totalPoints",
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
            type: "text",
            placeholder: "Address",
            description: "Postal code",
        }], [
        {
            id: "contactNo",
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