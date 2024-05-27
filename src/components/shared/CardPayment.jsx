import {useForm} from "react-hook-form";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card.jsx";
import paymentImg from "../../assets/payment.png";
import {InputItem} from "./input.jsx";
import {Label} from "../ui/label.jsx";
import {Input} from "../ui/input.jsx";
import {Button} from "../ui/button.jsx";
import React from "react";
import PropTypes from "prop-types";

export function CardPayment(props) {
    const {register} = useForm()
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Card Payment</CardTitle>
                    <CardDescription className="text-lg">
                        Add your information below to pay by card
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <img src={paymentImg} alt="img"/>
                    <div className="-ms-10 -mt-10">
                        <InputItem id={"amount"} title={"Payment Amount"} isEdit={true} type={"text"} value={`$ ${props.totalPrice}`} register={register}></InputItem>
                    </div>
                    <div className="-ms-10 -mt-10">
                        <InputItem id={"number"} title={"Card Number"} type={"text"} value={"**** **** **** "} register={register}></InputItem>
                    </div>
                    <div className="-ms-10 -mt-10 mb-10">
                        <InputItem id={"name"} title={"Card Holder's Name"} type={"text"}
                                   register={register}></InputItem>
                    </div>
                    <div className="flex flex-row w-full justify-between items-center ">
                        <div>
                            <div className="-ms-10 -mt-10">
                                <InputItem id={"date"} title={"Expire Date"} type={"date"}
                                           register={register}></InputItem>
                            </div>
                        </div>
                        <div className=" ms-16">
                            <div className="-ms-10 -mt-10">
                                <InputItem id={"cvc"} title={"CVC"} type={"number"}
                                           register={register}></InputItem>
                            </div>
                        </div>
                    </div>

                </CardContent>
                <CardFooter>
                    <Button className="w-full text-lg">Confirm Payment</Button>
                </CardFooter>
            </Card>
        </>
    )
}


CardPayment.propTypes = {
    totalPrice: PropTypes.number.isRequired
}