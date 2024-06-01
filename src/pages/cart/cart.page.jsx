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
import React, {useEffect, useMemo, useState} from "react";
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
import noImageAvailable from "../../assets/img/no-image-available.jpg";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger} from "../../components/ui/dialog.jsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/ui/tabs.jsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../components/ui/card.jsx";
import paymentImg from "../../assets/img/payment.png"
import {CardPayment} from "../../components/shared/CardPayment.jsx";
import {CashPayment} from "../../components/shared/CashPayment.jsx";
import {FaOpencart} from "react-icons/fa";
import swal from 'sweetalert';
const sizeRange = ["XS", "S", "M", "L", "XL"]

// const dataa = []


function CartPage() {

    const {register, handleSubmit, watch, setValue} = useForm()
    const [tableData, setTableData] = useState([]);
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
    const [balance, setBalance] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('CARD');
    const [formData, setFormData] = useState(null);
    const [searchID, setSearchID] = useState()
    const [addedPoints, setAddedPoints] = useState()
    const [button, setButton] = useState("Place Order")
    const [isPaid, setIsPaid] = useState(false)
    const [resetForm, setResetForm] = useState(false);
    const [itemSize, setItemSize] = useState("")

    // useEffect(() => {
    //     if (formData) {
    //         let itemList = {};
    //
    //         tableData.map((item) => {
    //             itemList[item.itemCode] = item.itemQuantity;
    //         });
    //
    //         const completeData = {
    //             ...formData,
    //             orderID,
    //             customerName,
    //             cashier: employeeName,
    //             totalPrice: formData.cash,
    //             paymentMethod: paymentMethod,
    //             inventoryList: itemList,
    //         };
    //
    //         sendOrder(completeData)
    //     }
    // }, [formData, paymentMethod]);

    useEffect(() => {
        if (formData) {
            let itemList = {};
            tableData.map((item) => {
                itemList[item.itemCode] = {size:itemSize, quantity:item.itemQuantity};
            });

            if (customerCode === "") {
                swal("Error", "Customer Code should selected", "error")
            } else {

                let customerType = (customerCode === "Non-Loyalty") ? "NON_LOYALTY" : "LOYALTY"

                const completeData = {
                    ...formData,
                    orderID,
                    customerName,
                    cashier: employeeName,
                    totalPrice: price,
                    paymentMethod,
                    inventoryList: itemList,
                    customerType: customerType
                };

                sendOrder(completeData);
            }
        }
    }, [formData]);


    useEffect(() => {
        getCodeList("inventory")
            .then(itemCodes => {
                setItemCodeList(itemCodes)
            })

        getCodeList("customer")
            .then(customerIDs => {
                customerIDs.unshift("Non-Loyalty")
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

        if ((id === "") || (id === "Non-Loyalty")) {
            setCustomerName("")
        } else {
            if (id !== "Non-Loyalty") {
                getName("customer", id)
                    .then(name => {
                        setCustomerName(name)
                    })
            }
        }
    }

    const setEmployName = (id) => {
        if (id === "") {
            setEmployeeName("")
        } else {
            getName("employee", id)
                .then(name => {
                    setEmployeeName(name)
                })
        }
    }

    const setItemID = (id) => {
        getDetails("inventory", id)
            .then(items => {
                setItem(items)
            })
    }

    const setCartTableData = () => {
        let existingItem = [...tableData]

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
        setTableData(existingItem)
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
            setCartTableData(quantity);
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
            setPrice(sale.totalPrice)
            setPaymentMethod(sale.paymentMethod)
            setButton("Update Order")
            setIsPaid(true)
        })
        getDetails("sale/getItem", orderID).then(items => {
            setTableData(items)
        })
    }

    const sendOrder = async (completeData) => {

        let url = "http://localhost:8080/app/sale";
        setResetForm(false)
        if (button.startsWith("Place")) {
            completeData.totalPrice = price

            if (tableData.length === 0) {
                await swal("Error", "No items in the cart. Please add items before placing an order.", "error");
            } else {
                if (isPaid) {
                    // completeData.paymentMethod = paymentMethod
                    await saveDBData(url, completeData, "Order", () => {
                        setResetForm(true)
                        getNextID("sale")
                            .then(code => {
                                setOrderID(code)
                            })
                        setPrice(0);
                        setBalance('');
                        setPaymentMethod('CARD');
                        setTableData([])
                        setSearchID("")
                        setButton("Place Order")
                    })
                } else {
                    await swal("Error", "Please do the payment", "error")
                }
            }
        } else if (button.startsWith("Update")) {

            completeData.addedPoints === "" && (completeData.addedPoints = addedPoints);
            completeData.customerID === "" && (completeData.customerID = customerCode);
            completeData.employeeID === "" && (completeData.employeeID = employeeName);
            completeData.totalPrice === "" && (completeData.totalPrice = price);

            await updateDBData(url, completeData, "Order", () => {
                setResetForm(true)
                getNextID("sale")
                    .then(code => {
                        setOrderID(code)
                    })
                setPrice(0);
                setBalance('');
                setPaymentMethod('CARD');
                setTableData([])
                setSearchID("")
            })
        }
    }
    const columns = useMemo(() => cartColumns(tableData, setTableData), [tableData, setTableData]);
    // const [isDialogOpen, setIsDialogOpen] = useState(false);
    // const handleInputChange = (setter) => (event) => {
    //     setter(event.target.value);
    // };

    return (<>
        <div className="absolute top-0 left-1/2 flex gap-x-5 -ms-32 mt-4 opacity-80">
            <FaOpencart size="45"/>
            <h1 className="text-4xl ">Purchase Order</h1>
        </div>

        <div className="grid w-2/6 ps-2 ms-10  z-50 items-start overflow-auto pt-24">
            <fieldset className="rounded-lg ps-5  border pb-10">
                <legend className="text-xl  font-medium">
                    Order Detail
                </legend>
                <div className="flex flex-row  me-8 -ms-4 gap-x-20">
                    <div className="w-56">
                        <InputItem type={"text"} id="orderID" title="Order ID" placeholder="orderID"
                                   register={register} isEdit={true} value={orderID} resetForm={resetForm}/>
                    </div>


                </div>
                <div className="flex flex-row me-8 -ms-4 gap-x-12">
                    {/*<InputItem type={"select"} id="customerID" title="Customer ID" selectList={customerCodeList}*/}
                    {/*           isRequired={true} register={register} value={customerCode} onChange={(event) => {*/}
                    {/*    setCusName(event.target.value)*/}
                    {/*}}/>*/}
                    <div className="w-2/5 ms-10 mt-5 ">
                        <SearchableDropdown id="customerID" title="Customer ID" list={customerCodeList}
                                            required={true} setValue={setValue} onSubmit={(value) => {
                            setCustomerCode(value)
                            setCusName(value)
                        }} resetForm={resetForm}/>
                    </div>

                    <InputItem type={"text"} id="customerName" title="Customer Name" placeholder="Name"
                               register={register} isEdit={true} value={customerName} resetForm={resetForm}
                    />
                </div>
                <div className="flex flex-row me-8 -ms-4 gap-x-12 z-0">
                    {/*<InputItem type={"select"} id="employeeID" value={employeeCode} title="Employee ID"*/}
                    {/*           selectList={employeeCodeList} isRequired={true}*/}
                    {/*           register={register} onChange={(event) => {*/}
                    {/*    setEmployName(event.target.value)*/}
                    {/*}}/>*/}
                    <div className="w-2/5 ms-10 mt-5 ">
                        <SearchableDropdown id="employeeID" title="Employee ID" list={employeeCodeList}
                                            resetForm={resetForm}
                                            required={true} setValue={setValue} onSubmit={(value) => {
                            setEmployeeCode(value)
                            setEmployName(value)
                        }}/>
                    </div>

                    <InputItem type={"text"} id="employeeName" title="Employee Name" placeholder="Name"
                               register={register} isEdit={true} value={employeeName} resetForm={resetForm}
                    />
                </div>

            </fieldset>
            <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-xl font-medium">
                    Item Detail
                </legend>
                <div className="flex flex-row me-10 -mt-5 gap-x-14">
                    <div className="w-2/5 ms-10 mt-5 ">
                        <SearchableDropdown
                            id="itemCode"
                            title="Item Code"
                            list={itemCodeList}
                            resetForm={resetForm}
                            setValue={setValue}
                            onSubmit={(value) => {
                                setItemID(value)
                            }}
                        />
                    </div>
                    <InputItem type={"number"} id="itemQuantity" title="Item Quantity" placeholder="Quantity"
                               register={register} onChange={(event) => handleQuantityChange(event)}
                               resetForm={resetForm}/>

                </div>
                <div className="flex ">
                    <div className="w-2/5">
                        <InputItem id={"size"} title={"Item Size"} type={"select"} register={register} resetForm={resetForm}
                                   setValue={setValue} selectList={sizeRange} onChange={(event) => {
                            setItemSize(event.target.value)
                        }}/>
                    </div>
                    <div className="flex justify-center align-middle self-center ms-20">
                    <Button className="mx-10 z-0 mb-5" onClick={handleAddToCart}>Add to Cart</Button>
                    </div>
                </div>

            </fieldset>
        </div>

        <div className=" w-2/3 h-[95vh] mt-10 flex flex-col z-50">
            <form onSubmit={handleSubmit(data1 => {
                console.log(data1)
            })}>
                <div className="relative flex-row flex mt-16 ms-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                    <Input
                        id="search"
                        name="search"
                        onChange={(event) => setSearchID(event.target.value)}
                        type="search"
                        placeholder="Search products..."
                        className="pl-8 w-3/6"
                        resetForm={resetForm}
                    />
                    <Button type="submit" className={"w-1/6 ms-10 text-lg"} onClick={() => {
                        getOrder(searchID)
                    }}>Search</Button>
                </div>
            </form>
            <ScrollArea className="w-[50vw] ms-20 mt-16 h-[45vh]   rounded-3xl z-0">
                <div className="w-full h-full  z-50">
                    <Tables columns={columns} data={tableData}/>
                </div>
            </ScrollArea>

            <div className="flex flex-row">
                <div className="w-80 ms-40  flex justify-center items-center align-middle">
                    <div className="">
                        <h1 className="text-4xl text-metal  z-50 mt-5">Total Price : $ {price}</h1>
                    </div>

                </div>
                <div className="w-3/6   h-full flex flex-col">

                    <Dialog>
                        <DialogTrigger>
                            <Button className=" z-0 w-2/3 mt-16 -ms-3 text-lg">Payment</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogDescription>
                                    <div className="w-full h-full">
                                        <Tabs defaultValue="card" className="w-full">
                                            <TabsList className="grid w-full grid-cols-2">
                                                <TabsTrigger value="card" onClick={() => {
                                                    setPaymentMethod("CARD")
                                                }}>Card</TabsTrigger>
                                                <TabsTrigger value="cash" onClick={() => {
                                                    setPaymentMethod("CASH")
                                                }}>Cash</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="card" className="mt-6">
                                                <CardPayment totalPrice={price} isPaid={setIsPaid}/>
                                            </TabsContent>
                                            <TabsContent value="cash" className="mt-6">
                                                <CashPayment totalPrice={price} balance={balance}
                                                             isPaid={setIsPaid}
                                                             onChange={(event) => setBalanceAmount(event)}/>
                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <form onSubmit={handleSubmit((data1) => setFormData(data1))}>
                        <div className="w-full  h-2/3 ">
                            <Button type="submit"
                                    className="mx-10 z-0 w-2/3 mt-16 ms-24 text-lg">{button}</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </>)
}

export default CartPage