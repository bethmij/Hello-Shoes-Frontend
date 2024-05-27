import axios from "axios";
import swal from 'sweetalert';

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
        }else {
            await swal("Error", response.message || 'Unknown error', 'error')
        }
    } catch (error) {
        await sendError(error);

    }
    return codeList
};


export const getName = async (mapping, id) => {
    let name = ""
    try {
        const response = await axios.get("http://localhost:8080/app/" + mapping + "/getName/" + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            name = response.data
        }else {
            await swal("Error", response.message || 'Unknown error', 'error')
        }
    } catch (error) {
        await sendError(error);

    }
    return name
};

export const getNextID = async (mapping) => {
    let id = ""
    try {
        const response = await axios.get("http://localhost:8080/app/" + mapping + "/nextID", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            id = response.data
        }else {
            await swal("Error", response.message || 'Unknown error', 'error')
        }
    } catch (error) {
        await sendError(error);

    }
    return id
}

export const getDetails = async (mapping, id) => {
    let list = []
    try {
        const response = await axios.get("http://localhost:8080/app/" + mapping + "/" + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            list = response.data
        }else {
            await swal("Error", response.message || 'Unknown error', 'error')
        }
    } catch (error) {
        await sendError(error);

    }
    return list
};

export const deleteEntity = async (mapping, id,title) => {
    try {
        const response = await axios.delete("http://localhost:8080/app/" + mapping + "/" + id, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 204) {
            await swal("Success", `${title} Deleted Successfully!`, 'success')
        }else {
            await swal("Error", response.message || 'Unknown error', 'error')
        }
    } catch (error) {
        await sendError(error);

    }

}

export const fetchData = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            return response.data;
        }
        if (response.status === 200) {
            return response.data;
        }else {
            await swal("Error", response.message || 'Unknown error', 'error')
        }
    } catch (error) {
        await sendError(error);

    }
};

export const saveDBData = async (url, data, token, title,setData) => {
    try {
        const response = await axios.post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 201) {
            await swal("Success", `${title} Saved Successfully!`, 'success')
            setData()
        }else {
            await swal("Error", response.message || 'Unknown error', 'error')
        }
    } catch (error) {
        await sendError(error);


    }
}

export const updateDBData = async (url, data, token,title,setData) => {
    try {
        const response = await axios.patch(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 204) {
            await swal("Success", `${title} Update Successfully!`, 'success')
            setData()
        }else {
            await swal("Error", response.message || 'Unknown error', 'error')
        }

    } catch (error) {
        await sendError(error);
    }
}



export const refundItem = async (data,setData) => {
    try {
        const response = await axios.patch("http://localhost:8080/app/sale/refund", JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 204) {
            await swal("Success", `Refund Successfully!`, 'success')
            setData()
        }else {
            await swal("Error", response.message || 'Unknown error', 'error')
        }

    } catch (error) {
        await sendError(error);
    }
}

async function sendError(error) {

    if (error.response.status === 403) {
        await swal("Error", "Bad Request", 'error');
    } else if (error.response.status === 500) {
        const errorMsg = error.response.data.message
        await swal("Error", errorMsg, 'error');

    } else {
        const errorMsg = error.response.data.errors[0].message
        await swal("Error", errorMsg, 'error');
    }
}


