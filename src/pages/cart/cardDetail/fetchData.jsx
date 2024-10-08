import axios from "axios";
import swal from 'sweetalert';
import {isAuthenticated} from "../../auth/authentication.jsx";


// console.log(token)

export const getCodeList = async (mapping) => {

    let codeList = []
    if (await isAuthenticated()) {
        const token = localStorage.getItem('accessToken')
        try {
            const response = await axios.get("http://localhost:8080/app/" + mapping + "/getIDs", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
                codeList = response.data
            } else {
                await swal("Error", response.message || 'Unknown error', 'error')
            }
        } catch (error) {
            await sendError(error);

        }
        return codeList
    }
};


export const getName = async (mapping, id) => {
    let name = ""
    if (await isAuthenticated()) {
        const token = localStorage.getItem('accessToken')
        try {
            const response = await axios.get("http://localhost:8080/app/" + mapping + "/getName/" + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                name = response.data
            } else {
                await swal("Error", response.message || 'Unknown error', 'error')
            }
        } catch (error) {
            await sendError(error);

        }
        return name
    }
};

export const getNextID = async (mapping) => {
    let id = ""
    if (await isAuthenticated()) {
        const token = localStorage.getItem('accessToken')
        try {
            const response = await axios.get("http://localhost:8080/app/" + mapping + "/nextID", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                id = response.data
            } else {
                await swal("Error", response.message || 'Unknown error', 'error')
            }
        } catch (error) {
            await sendError(error);

        }
        return id
    }
}

export const getDetails = async (mapping, id) => {
    let list = []
    if (await isAuthenticated()) {
        const token = localStorage.getItem('accessToken')
        console.log(token)
        try {
            const response = await axios.get("http://localhost:8080/app/" + mapping + "/" + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                list = response.data
            } else {
                await swal("Error", response.message || 'Unknown error', 'error')
            }
        } catch (error) {
            await sendError(error);

        }
        return list
    }
};

export const deleteEntity = async (mapping, id, title) => {
    if (await isAuthenticated()) {
        const token = localStorage.getItem('accessToken')
        try {
            const response = await axios.delete("http://localhost:8080/app/" + mapping + "/" + id, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 204) {
                await swal("Success", `${title} Deleted Successfully!`, 'success')
            } else {
                await swal("Error", response.message || 'Unknown error', 'error')
            }
        } catch (error) {
            await sendError(error);

        }
    }

}

export const fetchData = async (url) => {
    if (await isAuthenticated()) {
        const token = localStorage.getItem('accessToken')
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
            } else {
                await swal("Error", response.message || 'Unknown error', 'error')
            }
        } catch (error) {
            await sendError(error);

        }
    }
};

export const saveDBData = async (url, data, title, setData) => {
    if (await isAuthenticated()) {
        const token = localStorage.getItem('accessToken')
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
            } else {
                await swal("Error", response.message || 'Unknown error', 'error')
            }
        } catch (error) {
            await sendError(error);


        }
    }
}

export const updateDBData = async (url, data, title, setData) => {
    if (await isAuthenticated()) {
        const token = localStorage.getItem('accessToken')
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
            } else {
                await swal("Error", response.message || 'Unknown error', 'error')
            }

        } catch (error) {
            await sendError(error);
        }
    }
}


export const refundItem = async (data, setData) => {
    if (await isAuthenticated()) {
        const token = localStorage.getItem('accessToken')
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
            } else {
                await swal("Success", `Refund Successfully!`, 'success')
            }

        } catch (error) {
            await swal("Success", `Refund Successfully!`, 'success')
        }
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

export const updateBirthdayWish = async (data) => {
    if (await isAuthenticated()) {
        const token = localStorage.getItem('accessToken')
        try {
            const response = await axios.patch("http://localhost:8080/app/customer/birthday", JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 204) {
                console.log("customer updated!")
            } else {
                console.error("error")
            }

        } catch (error) {
            console.log(error)
        }
    }
}




