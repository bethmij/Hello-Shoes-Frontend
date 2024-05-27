import {useForm} from "react-hook-form";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card.jsx";
import paymentImg from "../../assets/2331941.png";
import {InputItem} from "./input.jsx";
import {Label} from "../ui/label.jsx";
import {Input} from "../ui/input.jsx";
import {Button} from "../ui/button.jsx";
import React, {useState} from "react";
import PropTypes from "prop-types";

export function CashPayment(props) {
    const {register, handleSubmit} = useForm()
    const [cashPrice, setCashPrice] = useState()
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Cash Payment</CardTitle>
                    <CardDescription className="text-lg">
                        Add your information below to pay by cash
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(() => {
                    if (cashPrice>=props.totalPrice) {
                        props.isPaid(true)
                        swal("Success", "Payment Successful!", "success")
                    }else {
                        swal("Error", "Insufficient Payment Amount", "error")
                    }
                })}>
                    <CardContent className="space-y-2 mt-7">

                        <div className="flex justify-center">
                            <img src={paymentImg} alt="img" width={200} className="m-0 "/>
                        </div>
                        <div className="-ms-10 -mt-20">
                            <InputItem id={"amount"} title={"Payment Amount"} isEdit={true} type={"text"}
                                       value={`$ ${props.totalPrice}`} register={register}></InputItem>

                        </div>
                        <div className="-ms-10 -mt-10">
                            <InputItem id={"cash"} title={"Card Amount"} type={"number"} placeholder="$ 0.0"
                                       register={register} onChange={(event) => {
                                                props.onChange
                                                setCashPrice(event.target.value)
                            }} isRequired={true}></InputItem>
                        </div>
                        <div className="-ms-10 -mt-10 mb-10">
                            <InputItem id={"balance"} title={"Balance"} type={"number"} placeholder="$ 0.0"
                                       register={register} isEdit={true} value={props.balance}></InputItem>
                        </div>


                    </CardContent>
                    <CardFooter>
                        <Button className="w-full text-lg">Confirm Payment</Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}


CashPayment.propTypes = {
    totalPrice: PropTypes.number.isRequired,
    balance: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    isPaid: PropTypes.func.isRequired
}