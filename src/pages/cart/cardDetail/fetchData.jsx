import axios from "axios";





export const getItemCodes = async () => {
    let itemCodes = []
    try {
        const response = await axios.get("http://localhost:8080/app/inventory/getIDs");
        if (response.status === 200) {
            itemCodes = response.data
        }
    } catch (error) {
        alert('Error posting data to backend:');
    }
    return itemCodes
};

export const getCustomerIDs = async () => {
    let customerIDs = []
    try {
        const response = await axios.get("http://localhost:8080/app/customer/getIDs");
        if (response.status === 200) {
            customerIDs = response.data
        }
    } catch (error) {
        alert('Error posting data to backend:');
    }
    return customerIDs
};


export const getEmployeeCodes = async () => {
    let employeeCodes = []
    try {
        const response = await axios.get("http://localhost:8080/app/employee/getIDs");
        if (response.status === 200) {
            employeeCodes = response.data
        }
    } catch (error) {
        alert('Error posting data to backend:');
    }
    return employeeCodes
};



export const getCustomerName = async (id) => {
    let customerName = ""
    try {
        const response = await axios.get("http://localhost:8080/app/customer/getName/"+id);
        if (response.status === 200) {
            customerName = response.data
        }
    } catch (error) {
        alert('Error posting data to backend:');
    }
    return customerName
};

export const getEmployeeName = async (id) => {
    let employeeName = ""
    try {
        const response = await axios.get("http://localhost:8080/app/employee/getName/"+id);
        if (response.status === 200) {
            employeeName = response.data
        }
    } catch (error) {
        alert('Error posting data to backend:');
    }
    return employeeName
};