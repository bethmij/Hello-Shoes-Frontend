const genderList = ["MALE", "FEMALE", "OTHER"]
const statusList = ["MARRIED", "SINGLE"]
const accessRoleList = ["ADMIN", "USER"]



export const employeeForm = [
    [{
        id: "code",
        title: "Employee Code",
        type: "text",
        placeholder: "",
        description: "Auto generated",
    },
        {
            id: "name",
            title: "Employee Name",
            type: "text",
            placeholder: "Name",
            description: "Full name required",
        }],
    [{
        id: "gender",
        title: "Employee Gender",
        type: "select",
        placeholder: "Gender",
        description: "",
        selectList: genderList
    },
        {
            id: "status",
            title: "Employee Status",
            type: "select",
            placeholder: "Status",
            description: "",
            selectList: statusList
        }],
    [{
        id: "role",
        title: "Access Role",
        type: "select",
        placeholder: "Role",
        description: "",
        selectList: accessRoleList
    },
        {
            id: "designation",
            title: "Designation",
            type: "text",
            placeholder: "Designation",
            description: "Designation of employee",
        }],
    [
        {
            id: "dob",
            title: "Employee DOB",
            type: "date",
            placeholder: "Date",
            description: "Date of birth",
        },
        {
            id: "joinDate",
            title: "Join Date",
            type: "date",
            placeholder: "Date",
            description: "Date of Joined to the company",
        }],
        [{
            id: "branch",
            title: "Attached Branch",
            type: "text",
            placeholder: "Branch",
            description: "Which branch attached",
        }, {
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
        }],
    [
        {
            id: "guardian",
            title: "Guardian",
            type: "text",
            placeholder: "Guardian",
            description: "Name the guardian or nominated person",
        },
        {
            id: "emergencyContact",
            title: "Emergency Contact",
            type: "text",
            placeholder: "Contact",
            description: "Inform in case of emergency",
        }]


]