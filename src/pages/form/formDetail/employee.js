const genderList = ["MALE", "FEMALE", "OTHER"]
const statusList = ["MARRIED", "SINGLE"]
const accessRoleList = ["ADMIN", "USER"]

export const employeeForm = [
    [{
        id: "employeeCode",
        title: "Employee Code",
        type: "text",
        placeholder: "",
        description: "Auto generated",
    },
        {
            id: "employeeName",
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
        id: "accessRole",
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
            id: "dateJointed",
            title: "Join Date",
            type: "date",
            placeholder: "Date",
            description: "Date of Joined to the company",
        }],
        [{
            id: "attachedBranch",
            title: "Attached Branch",
            type: "text",
            placeholder: "Branch",
            description: "Which branch attached",
        }, {
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