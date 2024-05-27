const genderList = ["MALE", "FEMALE", "OTHER"]
const statusList = ["MARRIED", "SINGLE"]
const accessRoleList = ["ADMIN", "USER"]

export function getEmployee(employeeCode, employeeList) {

    // const formatDate = (dateString) => {
    //     if (!dateString || dateString.length < 8) {
    //         return '';
    //     }
    //     const year = dateString.substring(0, 4);
    //     const month = dateString.substring(4, 6);
    //     const day = dateString.substring(6, 8);
    //     return `${year}-${month}-${day}`;
    // };
    // let formattedJoinDate = (employeeList.loyaltyJoinedDate !== undefined) ? formatDate(customerList.loyaltyJoinedDate) : null;

    return [
        [{
        id: "employeeCode",
        title: "Employee Code",
        type: "text",
        value: (employeeCode !== "") ? employeeCode : employeeList.employeeCode,
        placeholder: "",
        description: "Auto generated",
    },
        {
            id: "employeeName",
            title: "Employee Name",
            type: "text",
            placeholder: "Name",
            description: "Full name required",
            value: employeeList.employeeName,
            required: true,
        }],
        [{
            id: "gender",
            title: "Employee Gender",
            type: "select",
            placeholder: "Gender",
            description: "",
            selectList: genderList,
            value: employeeList.gender

        },
            {
                id: "status",
                title: "Employee Status",
                type: "select",
                placeholder: "Status",
                description: "",
                selectList: statusList,
                value: employeeList.status

            }],
        [{
            id: "accessRole",
            title: "Access Role",
            type: "select",
            placeholder: "Role",
            description: "",
            selectList: accessRoleList,
            value: employeeList.accessRole
        },
            {
                id: "designation",
                title: "Designation",
                type: "text",
                placeholder: "Designation",
                description: "Designation of employee",
                value: employeeList.designation,
                required: true,

            }],
        [
            {
                id: "dob",
                title: "Employee DOB",
                type: "date",
                placeholder: "Date",
                description: "Date of birth",
                value: employeeList.dob

            },
            {
                id: "dateJointed",
                title: "Join Date",
                type: "date",
                placeholder: "Date",
                description: "Date of Joined to the company",
                value: employeeList.dateJointed

            }],
        [{
            id: "attachedBranch",
            title: "Attached Branch",
            type: "text",
            placeholder: "Branch",
            description: "Which branch attached",
            value: employeeList.attachedBranch,
            required: true,

        }, {
            id: "addressLine01",
            title: "Address Line 01",
            type: "text",
            placeholder: "Address",
            description: "Building no or name",
            value: employeeList.addressLine01

        }], [
        {
            id: "addressLine02",
            title: "Address Line 02",
            type: "text",
            placeholder: "Address",
            description: "Lane",
            value: employeeList.addressLine02

        },
        {
            id: "addressLine03",
            title: "Address Line 03",
            type: "text",
            placeholder: "Address",
            description: "Main city",
            value: employeeList.addressLine03,
            required: true,

        }],
        [{
            id: "addressLine04",
            title: "Address Line 04",
            type: "text",
            placeholder: "Address",
            description: "Main state",
            value: employeeList.addressLine04

        },
            {
                id: "addressLine05",
                title: "Address Line 05",
                type: "number",
                placeholder: "Address",
                description: "Postal code",
                value: employeeList.addressLine05,
                required: true,

            }], [
        {
            id: "contactNo",
            title: "Contact number",
            type: "number",
            placeholder: "Contact",
            description: "Mobile number",
            value: employeeList.contactNo,
            required: true,

        },
        {
            id: "email",
            title: "Customer Email",
            type: "email",
            placeholder: "Email",
            description: "Email required",
            value: employeeList.email,
            required: true,

        }],
        [
            {
                id: "guardian",
                title: "Guardian",
                type: "text",
                placeholder: "Guardian",
                description: "Name the guardian or nominated person",
                value: employeeList.guardian

            },
            {
                id: "emergencyContact",
                title: "Emergency Contact",
                type: "number",
                placeholder: "Contact",
                description: "Inform in case of emergency",
                value: employeeList.emergencyContact,
                required: true,

            }],[
            // {
            //
            //     id: "profilePic",
            //     title: "Employee Profile Pic",
            //     type: "file",
            //     placeholder: "Picture",
            //     description: "Choose File",
            //     onChange: handleFileChange
            //     // value: customerList.picture
            //
            // }
        ]
        ]


}
