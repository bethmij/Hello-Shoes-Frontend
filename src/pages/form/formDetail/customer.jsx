import {z} from "zod";

const genderList = ["MALE", "FEMALE", "OTHER"]
const levelList = ["GOLD", "SILVER", "BRONZE", "NEW"]


export let customer = {
    customerCode:"",
    customerName:"",
    gender:"",
    loyaltyJoinedDate:"",
    totalPoints:"",
    level:"",
    dob:"",
    addressLine01:"",
    addressLine02:"",
    addressLine03:"",
    addressLine04:"",
    addressLine05:"",
    contactNo:"",
    email:""
}

export const customerSchema = z.object({
    customerName: z.number(),

})

export function getCustomer(customerCode, customerList) {

    const formatDate = (dateString) => {
        if (!dateString || dateString.length < 8) {
            return '';
        }
        const year = dateString.substring(0, 4);
        const month = dateString.substring(4, 6);
        const day = dateString.substring(6, 8);
        return `${year}-${month}-${day}`;
    };
    let formattedJoinDate = (customerList.loyaltyJoinedDate !== undefined) ? formatDate(customerList.loyaltyJoinedDate) : null;
   // console.log(customerList.loyaltyJoinedDate )

    return [
        [{
            id: "customerCode",
            title: "Customer Code",
            type: "text",
            placeholder: "",
            description: "Auto generated",
            value: (customerCode !== "") ? customerCode : customerList.customerCode,
            isEdit:true
        },
            {
                id: "customerName",
                title: "Customer Name",
                type: "text",
                placeholder: "Name",
                description: "Full name required",
                value: customerList.customerName,
                required: true,
            }],
        [{
            id: "gender",
            title: "Customer Gender",
            type: "select",
            placeholder: "Gender",
            description: "",
            selectList: genderList,
            value: customerList.gender
        },
            {
                id: "loyaltyJoinedDate",
                title: "Loyalty Join Date",
                type: "date",
                placeholder: "Date",
                description: "Date of the entitlement as a loyalty customer.jsx",
                value: formattedJoinDate
            }],
        // [{
        //     id: "totalPoints",
        //     title: "Total point",
        //     type: "number",
        //     placeholder: "Points",
        //     description: "1 point purchase more than LKR 800",
        //     value: customerList.totalPoints
        // },
        //     {
        //         id: "level",
        //         title: "Customer Level",
        //         type: "select",
        //         placeholder: "Level",
        //         description: "Gold > 200  | Silver – 100-199 | Bronze – 50-99 | New < 50",
        //         selectList: levelList,
        //         value: customerList.level
        //     }],
        [
            {
                id: "dob",
                title: "Customer DOB",
                type: "date",
                placeholder: "Date",
                description: "Date of birth",
                value: formatDate(customerList.dob)
            },
            {
                id: "addressLine01",
                title: "Address Line 01",
                type: "text",
                placeholder: "Address",
                description: "Building no or name",
                value: customerList.addressLine01
            }], [
            {
                id: "addressLine02",
                title: "Address Line 02",
                type: "text",
                placeholder: "Address",
                description: "Lane",
                value: customerList.addressLine02
            },
            {
                id: "addressLine03",
                title: "Address Line 03",
                type: "text",
                placeholder: "Address",
                description: "Main city",
                value: customerList.addressLine03,
                required: true
            }],
        [{
            id: "addressLine04",
            title: "Address Line 04",
            type: "text",
            placeholder: "Address",
            description: "Main state",
            value: customerList.addressLine04
        },
            {
                id: "addressLine05",
                title: "Address Line 05",
                type: "number",
                placeholder: "Address",
                description: "Postal code",
                value: customerList.addressLine05,
                required: true
            }], [
            {
                id: "contactNo",
                title: "Contact number",
                type: "number",
                placeholder: "Contact",
                description: "Mobile number",
                value: customerList.contactNo,
                required: true
            },
            {
                id: "email",
                title: "Customer Email",
                type: "email",
                placeholder: "Email",
                description: "Email required",
                value: customerList.email

            }]
    ]


}


