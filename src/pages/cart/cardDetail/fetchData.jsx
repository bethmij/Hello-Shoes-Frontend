import axios from "axios";
const token = localStorage.getItem('accessToken')
console.log(token)

export const getCodeList = async (mapping) => {
    let codeList = []
    try {
        const response = await axios.get("http://localhost:8080/app/" + mapping + "/getIDs", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
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
        const response = await axios.get("http://localhost:8080/app/" + mapping + "/getName/" + id,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
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
        const response = await axios.get("http://localhost:8080/app/" + mapping + "/nextID",{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            id = response.data
        }
    } catch (error) {
        alert('Error posting data to backend:');
    }
    return id
}

export const getDetails = async (mapping, id) => {
    let list = []
    try {
        const response = await axios.get("http://localhost:8080/app/" + mapping + "/" + id,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            list = response.data
        }
    } catch (error) {
        alert('Error posting data to backend:');
    }
    return list
};

export const deleteEntity = async (mapping,id) => {
    try {
        const response = await axios.delete("http://localhost:8080/app/" + mapping + "/" + id,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 204) {
            alert('Deleted Successfully');
        }
    } catch (error) {
        alert('Error posting data to backend:');
    }
}

export const fetchData = async (url) => {
    try {
        const response = await axios.get(url,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error('Error fetching data from backend:', error);
    }
};



