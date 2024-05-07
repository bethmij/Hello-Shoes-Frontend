import axios from "axios";

export const getCodeList = async (mapping) => {
    let codeList = []
    try {
        const response = await axios.get("http://localhost:8080/app/"+mapping+"/getIDs");
        if (response.status === 200) {
            codeList = response.data
        }
    } catch (error) {
        alert('Error posting data to backend:');
    }
    return codeList
};


export const getName = async (mapping, id) => {
    let name = ""
    try {
        const response = await axios.get("http://localhost:8080/app/"+mapping+"/getName/"+id);
        if (response.status === 200) {
            name = response.data
        }
    } catch (error) {
        alert('Error posting data to backend:');
    }
    return name
};

export const getNextID = async (mapping) => {
    let id = ""
    try {
        const response = await axios.get("http://localhost:8080/app/"+mapping+"/nextID");
        if (response.status === 200) {
            id = response.data
        }
    } catch (error) {
        alert('Error posting data to backend:');
    }
    return id
}

export const getDetails = async (mapping,id) => {
    let list = []
    try {
        const response = await axios.get("http://localhost:8080/app/"+mapping+"/"+id);
        if (response.status === 200) {
            list = response.data
        }
    } catch (error) {
        alert('Error posting data to backend:');
    }
    return list
};



