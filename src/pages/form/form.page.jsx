import {InputItem} from "../../components/shared/input.jsx";
import {Button} from "../../components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {ScrollArea} from "../../components/ui/scroll-area.jsx";
import {useParams} from "react-router-dom";
import {getCustomer} from "./formDetail/customer.jsx";
import {employeeForm} from "./formDetail/employee.js";
import {CgFormatRight} from "react-icons/cg";
import axios from "axios";
import {supplierForm} from "./formDetail/supplier.js";
import {inventoryForm} from "./formDetail/inventory.js"
import {getDetails, getNextID} from "../cart/cardDetail/fetchData.jsx";
import {useEffect, useState} from "react";

let buttonName = "";


const onSubmit = async (data, url) => {

    const token = localStorage.getItem('accessToken')

    if (buttonName === "Submit") {
        try {
            const response = await axios.post(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                alert('Data posted to backend successfully!');
            }
        } catch (error) {
            alert('Error posting data to backend:');
        }

    } else if (buttonName === "Update") {
        try {
            const response = await axios.patch(url, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 201) {
                alert('Data posted to backend successfully!');
            }
        } catch (error) {
            alert('Error posting data to backend:');
        }
    }

};

function FormPage() {

    // const [isLoading, setIsLoading] = useState(false)
    const [customerList, setCustomerList] = useState([])
    const [customerCode, setCustomerCode] = useState("")

    const {id, action} = useParams()
    let form = ""
    let title = ""
    let url = ""


    useEffect(() => {
        if (id === "customer") {
            if (action.startsWith("save")) {
                getNextID("customer")
                    .then(orderID => {
                        setCustomerCode(orderID)
                    })

            } else if (action.startsWith("update")) {
                const customerID = action.split("update-")[1];
                getDetails("customer", customerID)
                    .then(items => {
                        setCustomerList(items);
                    });
            }

        }
    }, [id, action]);


    if (id === "customer") {
        form = getCustomer(customerCode, customerList);
        title = "Customer Form";
        url = "http://localhost:8080/app/customer";
        buttonName = action.startsWith("save") ? "Submit" : "Update"

    } else if (id === "employee") {
        form = employeeForm
        title = "Employee Form"
        url = "http://localhost:8080/app/employee"

    } else if (id === "supplier") {
        form = supplierForm
        title = "Supplier Form"
        url = "http://localhost:8080/app/supplier"

    } else if (id === "inventory") {
        form = inventoryForm
        title = "Inventory Form"
        url = "http://localhost:8080/app/inventory"
    }



    const {register, handleSubmit, watch} = useForm()

    return (
        <>
            <div className="absolute top-0 left-1/2 flex gap-x-5 -ms-32 mt-4 opacity-80">
                <CgFormatRight size="45"/>
                <h1 className="text-4xl ">{title}</h1>
            </div>


            <form className="w-4/5 h-4/5 ms-52 mt-32 flex-col rounded-full absolute "
                  onSubmit={handleSubmit(data => {
                      onSubmit(data, url)
                  })}>
                <ScrollArea className="h-full w-full rounded-3xl z-0">
                    <div className=" form w-full h-full absolute border-2 z-0 rounded-3xl "></div>
                    {/*<div className="w-5/6 h-3 ms-32 border-t-2 bg-background  bermuda absolute z-50  "></div>*/}

                    {form.map((formData, index) => (
                        <div key={index} className="flex justify-around mb-4 z-10">
                            {formData.map(data => (
                                <InputItem
                                    key={data.id}
                                    id={data.id}
                                    title={data.title}
                                    placeholder={data.placeholder}
                                    type={data.type}
                                    description={data.description}
                                    selectList={data.selectList}
                                    register={register}
                                    watch={watch}
                                    value={data.value}
                                    isEdit={data.isEdit}
                                />

                            ))}
                        </div>
                    ))
                    }

                </ScrollArea>

                <Button type="submit"
                        className=" w-2/12 h-12 absolute text-2xl text-opacity-40 -bottom-10 right-0 m-5 mt-10">{buttonName}</Button>
            </form>
        </>
    )

}

export default FormPage