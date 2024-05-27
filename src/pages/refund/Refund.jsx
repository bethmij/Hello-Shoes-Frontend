import refundImg from "../../assets/refund.png"
import {RiRefund2Fill} from "react-icons/ri";
import {InputItem} from "../../components/shared/input.jsx";
import React, {useEffect, useState} from "react";
import SearchableDropdown from "../../components/shared/searchableDropdown.jsx";
import {getDetails, refundItem} from "../cart/cardDetail/fetchData.jsx";
import {useForm} from "react-hook-form";
import {Button} from "../../components/ui/button.jsx";

const onSubmit = (data) => {
    refundItem(data)
}

export function Refund() {
    const {register, handleSubmit, setValue} = useForm()
    const [itemCodeList, setItemCodeList] = useState([])
    const [orderCodeList, setOrderCodeList] = useState([])

    useEffect(() => {
        getDetails("inventory", "getIDs").then((codes) => {
            setItemCodeList(codes)
        })
        getDetails("sale", "getIDs").then((codes) => {
            setOrderCodeList(codes)
        })
    }, []);
    return (
        <>
            <div className="absolute top-0 left-1/2 flex gap-x-5 -ms-32 mt-4 opacity-80">
                <RiRefund2Fill size="45"/>
                <h1 className="text-4xl ">{"Refund"}</h1>
            </div>
            <div className=" w-[90vw] h-[90vh] ms-16 mt-16 flex flex-row justify-center align-middle">
                <div className="w-[50vw] -ms-36">
                    <img src={refundImg} alt={"img"} className="h-full opacity-50"/>
                </div>
                <form className="w-[30vw] z-50 mt-40 ms-10 flex flex-col gap-y-40" onSubmit={handleSubmit(data => {
                    onSubmit(data)
                })}>
                    <div className="ms-10 -mt-20 ">
                        <div className="">
                            <SearchableDropdown
                                id="orderID"
                                title="Order Code"
                                list={orderCodeList}
                                setValue={setValue}
                                required={true}
                            />
                        </div>

                        <div className="mt-20">
                            <SearchableDropdown
                                id="itemCode"
                                title="Item Code"
                                list={itemCodeList}
                                setValue={setValue}
                                required={true}
                            />
                        </div>
                        <div className="mt-20 w-full -ms-10">
                            <InputItem id={"purchaseDate"} title={"Purchase Date"} type={"date"} register={register}
                                       isRequired={true}/>
                        </div>

                        <div className="mt-20 w-full -ms-10">
                            <InputItem id={"itemQty"} title={"Item Quantity"} type={"number"} register={register}
                                       isRequired={true}/>
                        </div>
                        <Button type="submit" className="w-full mt-20 text-xl">Confirm Refund</Button>

                    </div>

                </form>

            </div>
        </>
    )
}