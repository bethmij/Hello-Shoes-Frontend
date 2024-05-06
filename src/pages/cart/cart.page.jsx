
import {Rabbit, Bird, Turtle} from "lucide-react"
import {Label} from "../../components/ui/label.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select.jsx";
import {Input} from "../../components/ui/input.jsx";
import {Textarea} from "../../components/ui/textarea.jsx";
import {InputItem} from "../../components/shared/input.jsx";
import {useForm} from "react-hook-form";
import Tables from "../../components/shared/table.jsx";
import {cartColumns} from "./cardDetail/cart.jsx";
import {data} from "autoprefixer";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button} from "../../components/ui/button.jsx";
import {
    getCustomerIDs,
    getCustomerName,
    getEmployeeCodes,
    getEmployeeName,
    getItemCodes
} from "./cardDetail/fetchData.jsx";

const customerID = ["C001","C002","C003"]
// let itemCodeList = []


// const dataa = []

const onSubmit = async (data, id) => {
    try {
        const response = await axios.get("http://localhost:8080/app/inventory/"+id);
        if (response.status === 200) {
            const items = response.data
            console.log(items)
        }
    } catch (error) {

        alert('Error posting data to backend:');
    }
};





function CartPage() {

    const {register, handleSubmit,watch} = useForm()
    const [data, setData] = useState([]);
    const [itemCode, setItemCode] = useState([]);
    const [customerCode, setCustomerCode] = useState([]);
    const [employeeCode, setEmployeeCode] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [employeeName, setEmployeeName] = useState('');

    useEffect(() => {
        getItemCodes()
            .then(itemCodes => {
               setItemCode(itemCodes)
            })

        getCustomerIDs()
            .then(customerIDs => {
                setCustomerCode(customerIDs)
            })

        getEmployeeCodes()
            .then(employeeCodes => {
                setEmployeeCode(employeeCodes)
            })

        getEmployeeCodes()
            .then(employeeCodes => {
                setEmployeeCode(employeeCodes)
            })


    }, []);

    const setCusName = (id) => {
        getCustomerName(id)
            .then(name => {
                setCustomerName(name)
            })
    }

    const setEmployName = (id) => {
        getEmployeeName(id)
            .then(name => {
                setEmployeeName(name)
            })
    }

    return(
        <>
            <form className="grid w-2/6 ps-2 ms-10  z-50 items-start overflow-auto pt-24">
                <fieldset className="rounded-lg ps-5  border pb-10">
                    <legend className="text-xl  font-medium">
                        Settings
                    </legend>
                    <div className="flex flex-row">
                        <InputItem type={"text"} id="orderID" title="Order ID" placeholder="ID"
                                   register={register}/>
                        <InputItem type={"number"} id="addedPoints" title="Added Points" register={register}/>

                    </div>
                    <div className="flex flex-row">
                        <InputItem type={"select"} id="customerID" title="Customer ID" register={register}
                                   selectList={customerCode} onChange={(selectedOption) => {setCusName(selectedOption)}}
                        />
                        <InputItem type={"text"} id="customerName" title="Customer Name" placeholder="Name"
                                   register={register} isEdit={true} value={customerName}
                        />
                    </div>
                    <div className="flex flex-row">
                        <InputItem type={"select"} id="employeeID" title="Employee ID" register={register}
                                   selectList={employeeCode} onChange={(selectedOption) => {setEmployName(selectedOption)}}
                        />
                        <InputItem type={"text"} id="employeeName" title="Employee Name" placeholder="Name"
                                   register={register} isEdit={true} value={employeeName}
                        />
                    </div>

                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-xl font-medium">
                        Messages
                    </legend>
                    <div className="flex flex-row">
                        <InputItem type={"select"} id="itemCode" title="Item Code" register={register}
                                   selectList={itemCode}/>
                        <InputItem type={"text"} id="ps-5ps-5" title="Item Quantity" placeholder="Quantity"
                                   register={register}/>
                    </div>
                    <Button className="mx-10">Add to Cart</Button>
                </fieldset>
            </form>

            {/*<div className="w-[50vw] ms-20 mt-28 h-[45vh]  z-50">*/}
            {/*    <Tables columns={cartColumns} data={}/>*/}
            {/*</div>*/}

        </>
    )
}

export default CartPage