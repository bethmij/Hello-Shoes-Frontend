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
import {useEffect, useMemo, useState} from "react";
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
import {Search} from "lucide-react"
import {string} from "zod";
import {saveDBData, updateDBData} from "./cardDetail/fetchData.jsx"


// const dataa = []





function CartPage() {

    const {register, handleSubmit, watch, setValue} = useForm()
    const [data, setData] = useState([]);
    const [itemCodeList, setItemCodeList] = useState([]);
    const [customerCodeList, setCustomerCodeList] = useState([]);
    const [employeeCodeList, setEmployeeCodeList] = useState([]);
    const [customerCode, setCustomerCode] = useState("");
    const [employeeCode, setEmployeeCode] = useState("");
    const [itemCode, setItemCode] = useState();
    const [itemQty, setItemQty] = useState()
    const [customerName, setCustomerName] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [orderID, setOrderID] = useState('');
    const [item, setItem] = useState({});
    const [itemQuantity, setItemQuantity] = useState("");
    const [price, setPrice] = useState(0);
    const [balance, setBalance] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [formData, setFormData] = useState(null);
    const [searchID, setSearchID] = useState()
    const [addedPoints, setAddedPoints] = useState()
    const [button, setButton] = useState("Place Order")

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
                setItemCodeList(itemCodes)
            })

        getCodeList("customer")
            .then(customerIDs => {
                setCustomerCodeList(customerIDs)
            })

        getCodeList("employee")
            .then(employeeCodes => {
                setEmployeeCodeList(employeeCodes)
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
            console.log("before", total, parseInt(item.saleUnitPrice), item.itemQuantity)
            total = total + (parseInt(item.saleUnitPrice) * item.itemQuantity)
            console.log("after", total)
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

    const getOrder = (orderID) => {
        getDetails("sale", orderID).then(sale => {
            setOrderID(sale.orderID)
            setAddedPoints(sale.addedPoints)
            setCustomerCode(sale.customerCode)
            setCustomerName(sale.customerName)
            setEmployeeCode(sale.employeeCode)
            setEmployeeName(sale.cashier)
            setPrice(setTotalPrice(data))
            setPaymentMethod(sale.paymentMethod)
            setButton("Update Order")
        })
        getDetails("sale/getItem",orderID).then(items => {
            setData(items)
        })
    }

    const sendOrder = async (completeData) => {

        const token = localStorage.getItem('accessToken')
        let url = "http://localhost:8080/app/sale";
        if(button.startsWith("Place")) {
            completeData.totalPrice = price

            // try {
            //     const response = await axios.post("http://localhost:8080/app/sale", JSON.stringify(completeData), {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Authorization': `Bearer ${token}`
            //         }
            //     });
            //     if (response.status === 201) {
            //         alert('Data posted to backend successfully!');
            //     }
            // } catch (error) {
            //     alert('Error posting data to backend:');
            // }

            await saveDBData(url, completeData, token, "Order")
        }else if(button.startsWith("Update")){

            completeData.addedPoints === "" && (completeData.addedPoints = addedPoints);
            completeData.customerID === "" && (completeData.customerID = customerCode);
            completeData.employeeID === "" && (completeData.employeeID = employeeName);
            completeData.totalPrice === "" && (completeData.totalPrice = price);

            // try {
            //     const response = await axios.patch("http://localhost:8080/app/sale", JSON.stringify(completeData), {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             'Authorization': `Bearer ${token}`
            //         }
            //     });
            //     if (response.status === 204) {
            //         alert('Data posted to backend successfully!');
            //     }
            // } catch (error) {
            //     alert('Error posting data to backend:');
            // }
            await updateDBData(url, completeData,token)
        }
    }
    const columns = useMemo(() => cartColumns(data,setData), [data,setData]);
    // const handleInputChange = (setter) => (event) => {
    //     setter(event.target.value);
    // };

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
                        <InputItem type={"number"} id="addedPoints" title="Added Points"  register={register} value={addedPoints}/>

                    </div>
                    <div className="flex flex-row">
                        <InputItem type={"select"} id="customerID" title="Customer ID" selectList={customerCodeList}
                                   register={register} value={customerCode}  onChange={(event) => {
                            setCusName(event.target.value)
                        }}/>
                        <InputItem type={"text"} id="customerName" title="Customer Name" placeholder="Name"
                                   register={register} isEdit={true} value={customerName}
                        />
                    </div>
                    <div className="flex flex-row">
                        <InputItem type={"select"} id="employeeID" value={employeeCode} title="Employee ID" selectList={employeeCodeList}
                                   register={register} onChange={(event) => {
                            setEmployName(event.target.value)
                        }}/>

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
                                list={itemCodeList}
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
                {/*<form onSubmit={handleSubmit(data1 => {*/}
                {/*    console.log(data1)*/}
                {/*})}>*/}
                <div className="relative flex-row flex mt-16 ms-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        id="search"
                        name="search"
                        onChange={(event) => setSearchID(event.target.value)}
                        type="search"
                        placeholder="Search products..."
                        className="pl-8 w-3/6"
                    />
                    <Button type="submit" className={"w-1/6 ms-10 text-lg"} onClick={() => {
                        getOrder(searchID)
                    }}>Search</Button>
                </div>
                {/*</form>*/}
                <ScrollArea className="w-[50vw] ms-20 mt-16 h-[45vh]   rounded-3xl z-0">
                    <div className="w-full h-full  z-50">
                        <Tables columns={columns} data={data}/>
                    </div>
                </ScrollArea>

                <div className="flex flex-row">
                    <div className="w-80 ms-40 ">
                        <div className="flex flex-col">
                            <h1 className="text-4xl text-metal  z-50 mt-5">Total Price : $ {price}</h1>
                        </div>


                        <RadioGroup value={paymentMethod} className="z-50  mt-10 " onValueChange={(value) => {
                            setPaymentMethod(value)
                        }}>

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
                        <form onSubmit={handleSubmit((data1) => setFormData(data1))}>
                            <div className="w-full  h-2/3 ">
                                <Button type="submit" className="mx-10 z-0 w-2/3 mt-16 ms-24 text-lg">{button}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CartPage