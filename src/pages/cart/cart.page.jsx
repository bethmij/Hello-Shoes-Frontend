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
    getCodeList, getDetails, getName, getNextID,
} from "./cardDetail/fetchData.jsx";
import {ScrollArea} from "../../components/ui/scroll-area.jsx";
import {SelectItems} from "../../components/shared/selectItem.jsx";
import SearchableDropdown from "../../components/shared/searchableDropdown.jsx";
import * as items from "zod";
import {RadioGroup, RadioGroupItem} from "../../components/ui/radio-group.jsx";
import {string} from "zod";


// const dataa = []

const onSubmit = async (data, id) => {
    try {
        const response = await axios.get("http://localhost:8080/app/inventory/" + id);
        if (response.status === 200) {
            const items = response.data
            console.log(items)
        }
    } catch (error) {

        alert('Error posting data to backend:');
    }
};

const sendOrder = async (completeData) => {
    const token = localStorage.getItem('accessToken')
    try {
        const response = await axios.post("http://localhost:8080/app/sale", JSON.stringify(completeData), {
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


function CartPage() {

    const {register, handleSubmit, watch, setValue} = useForm()
    const [data, setData] = useState([]);
    const [itemCode, setItemCode] = useState([]);
    const [customerCode, setCustomerCode] = useState([]);
    const [employeeCode, setEmployeeCode] = useState([]);
    const [customerName, setCustomerName] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [orderID, setOrderID] = useState('');
    const [item, setItem] = useState({});
    const [itemQuantity, setItemQuantity] = useState("");
    const [price, setPrice] = useState(0);
    const [balance, setBalance] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        if (formData) {
            let itemList = {};

            data.map((item) => {
                itemList[item.itemCode] = item.itemQuantity;
            });

            const completeData = {
                ...formData,
                orderID,
                customerName,
                cashier: employeeName,
                totalPrice: formData.cash,
                paymentMethod,
                inventoryList: itemList,
            };

            sendOrder(completeData)
        }
    }, [formData, paymentMethod]);


    useEffect(() => {
        getCodeList("inventory")
            .then(itemCodes => {
                setItemCode(itemCodes)
            })

        getCodeList("customer")
            .then(customerIDs => {
                setCustomerCode(customerIDs)
            })

        getCodeList("employee")
            .then(employeeCodes => {
                setEmployeeCode(employeeCodes)
            })
        getNextID("sale")
            .then(orderID => {
                setOrderID(orderID)
            })
    }, []);

    const setCusName = (id) => {
        getName("customer", id)
            .then(name => {
                setCustomerName(name)
            })
    }

    const setEmployName = (id) => {
        getName("employee", id)
            .then(name => {
                setEmployeeName(name)
            })
    }

    const setItemID = (id) => {
        getDetails("inventory", id)
            .then(items => {
                setItem(items)
            })
    }

    const setTableData = () => {
        let existingItem = [...data]

        let total;
        // const existingItem = { ...item, itemQuantity: itemQuantity };
        let index = existingItem.findIndex(order => order.itemCode === item.itemCode);

        if (index !== -1) {
            let oldQty = existingItem[index].itemQuantity
            existingItem[index].itemQuantity = itemQuantity;
            total = price + (parseInt(item.saleUnitPrice) * (itemQuantity - oldQty))
        } else {
            let itemData = {...item, orderID, itemQuantity}
            existingItem.push(itemData)
            total = setTotalPrice(existingItem)
        }
        setData(existingItem)
        setPrice(total)

    }

    const setTotalPrice = (items) => {
        // console.log(items)
        let total = 0

        items.map((item) => {
            // console.log("before", total, parseInt(item.saleUnitPrice) , itemQuantity )
            total = total + (parseInt(item.saleUnitPrice) * itemQuantity)
            // console.log("after", total)
        })
        return total
    }

    const setBalanceAmount = (event) => {
        let balance = price - event.target.value
        setBalance(String(balance))
    }

    const handleAddToCart = (event) => {
        event.preventDefault();

        const quantity = parseInt(itemQuantity);
        if (!isNaN(quantity)) {
            setTableData(quantity);
        }
    };

    const handleQuantityChange = (event) => {
        setItemQuantity(event.target.value);
    };

    return (
        <>
            <div className="grid w-2/6 ps-2 ms-10  z-50 items-start overflow-auto pt-24">
                <fieldset className="rounded-lg ps-5  border pb-10">
                    <legend className="text-xl  font-medium">
                        Order Detail
                    </legend>
                    <div className="flex flex-row">
                        <InputItem type={"text"} id="orderID" title="Order ID" placeholder="orderID"
                                   register={register} isEdit={true} value={orderID}
                        />
                        <InputItem type={"number"} id="addedPoints" title="Added Points" register={register}/>

                    </div>
                    <div className="flex flex-row">
                        <div className="w-2/5 ms-10 mt-5">
                            <SelectItems
                                id="customerID"
                                title="Customer ID"
                                list={customerCode}
                                setValue={setValue}
                                onSubmit={(value) => {
                                    setCusName(value)
                                }}
                            />
                        </div>
                        <InputItem type={"text"} id="customerName" title="Customer Name" placeholder="Name"
                                   register={register} isEdit={true} value={customerName}
                        />
                    </div>
                    <div className="flex flex-row">
                        <div className="w-2/5 ms-10 mt-5">
                            <SelectItems
                                id="employeeID"
                                title="Employee ID"
                                list={employeeCode}
                                setValue={setValue}
                                onSubmit={(value) => {
                                    setEmployName(value)
                                }}
                            />
                        </div>
                        <InputItem type={"text"} id="employeeName" title="Employee Name" placeholder="Name"
                                   register={register} isEdit={true} value={employeeName}
                        />
                    </div>

                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-xl font-medium">
                        Item Detail
                    </legend>
                    <div className="flex flex-row">
                        <div className="w-2/5 ms-10 mt-5">
                            <SearchableDropdown
                                id="itemCode"
                                title="Item Code"
                                list={itemCode}
                                setValue={setValue}
                                onSubmit={(value) => {
                                    setItemID(value)
                                }}
                            />
                        </div>
                        <InputItem type={"number"} id="itemQuantity" title="Item Quantity" placeholder="Quantity"
                                   register={register} onChange={(event) => handleQuantityChange(event)}/>
                    </div>
                    <Button className="mx-10 z-0" onClick={handleAddToCart}>Add to Cart</Button>
                </fieldset>
            </div>

            <div className=" w-2/3 h-[95vh] mt-10 flex flex-col z-50">
                <ScrollArea className="w-[50vw] ms-20 mt-28 h-[45vh]   rounded-3xl z-0">
                    <div className="w-full h-full  z-50">
                        <Tables columns={cartColumns} data={data}/>
                    </div>
                </ScrollArea>

                <div className="flex flex-row">
                    <div className="w-80 ms-40 ">
                        <div className="flex flex-col">
                            <h1 className="text-4xl text-metal  z-50 mt-5">Total Price : $ {price}</h1>
                        </div>


                        <RadioGroup defaultValue="option-one" className="z-50  mt-10 "  onValueChange={(value)=> {setPaymentMethod(value)}}>

                            <Label className="text-2xl opacity-60 mb-5"> Payment </Label>
                            <div className="flex items-center space-x-2 ms-2">
                                <RadioGroupItem value="CASH" id="cash"/>
                                <Label htmlFor="cash" className="text-xl opacity-60">Cash </Label>
                            </div>
                            <div className="flex items-center space-x-2 ms-2">
                                <RadioGroupItem value="CARD" id="card"/>
                                <Label htmlFor="card" className="text-xl opacity-60">Card</Label>
                            </div>

                        </RadioGroup>

                    </div>
                    <div className="w-3/6   h-full flex flex-col">
                        <div className="w-full  h-2/3 flex flex-row">
                            <InputItem type={"number"} id="cash" title="Cash" placeholder="$0.0" register={register}
                                       onChange={(event) => setBalanceAmount(event)}/>
                            <InputItem type={"text"} id="balance" title="Balance" placeholder="$0.0"
                                       register={register} isEdit={true} value={balance}/>
                        </div>
                        <form onSubmit={handleSubmit((data1)=> setFormData(data1))}>
                            <div className="w-full  h-2/3 ">
                                <Button type="submit" className="mx-10 z-0 w-2/3 mt-16 ms-24 text-lg">Place
                                    Order</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CartPage