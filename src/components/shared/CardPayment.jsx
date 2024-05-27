import {useForm} from "react-hook-form";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card.jsx";
import paymentImg from "../../assets/payment.png";
import {InputItem} from "./input.jsx";
import {Label} from "../ui/label.jsx";
import {Input} from "../ui/input.jsx";
import {Button} from "../ui/button.jsx";
import React, {useState} from "react";
import PropTypes from "prop-types";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "../ui/input-otp.jsx";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
    cardNumber: z.string().regex(/^\*\*\*\* \*\*\*\* \*\*\*\* \d{4}$/, {
        message: "Invalid card number format"
    }),
    cardName: z.string().regex(/^[A-Za-z ]+$/, {
        message: "Name should only contain letter"
    }),
});

export function CardPayment(props) {
    const {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(schema)})
    const [cardNumber, setCardNumber] = useState()

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Card Payment</CardTitle>
                    <CardDescription className="text-lg">
                        Add your information below to pay by card
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit(() => {
                    props.isPaid(true)
                    swal("Success", "Payment Successful!", "success")
                })}>
                    <CardContent>
                        <img src={paymentImg} alt="img"/>

                        <div className="-ms-10 -mt-2 bg-puple">
                            <InputItem id={"amount"} title={"Payment Amount"} isEdit={true} type={"text"}
                                       value={`$ ${props.totalPrice}`} register={register}></InputItem>
                        </div>
                        <div className="-ms-10 -mt-6 ">
                            <InputItem id={"cardNumber"} name={"cardNumber"} title={"Card Number"} type={"text"}
                                       value={"**** **** **** "}
                                       onChange={(event) => setCardNumber(event.target.value)}
                                       isRequired={true} register={register}></InputItem>
                            {errors.cardNumber &&
                                <p className="text-danger ms-10 text-red -mb-7">{errors.cardNumber.message}</p>}

                        </div>
                        <div className="-ms-10">
                            <InputItem id={"cardName"} name={"cardName"} title={"Card Holder's Name"} type={"text"}
                                       isRequired={true}
                                       register={register}></InputItem>
                            {errors.cardName &&
                                <p className="text-danger ms-10 text-red -mb-7">{errors.cardName.message}</p>}
                        </div>
                        <div className="flex flex-row w-full justify-between items-center mt-10">
                            <div>
                                <div className="-ms-10 -mt-10">
                                    <InputItem id={"date"} title={"Expire Date"} type={"date"} isRequired={true}
                                               register={register}></InputItem>
                                </div>
                            </div>
                            <div className=" ms-16">
                                <div className="-ms-10 ">
                                    <Label className="text-lg">CVC</Label>
                                    <InputOTP maxLength={3} required>
                                        <InputOTPGroup className="w-25 mt-2">
                                            <InputOTPSlot index={0}/>
                                            <InputOTPSlot index={1}/>
                                            <InputOTPSlot index={2}/>
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                            </div>
                        </div>


                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full text-lg">Confirm Payment</Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}


CardPayment.propTypes = {
    totalPrice: PropTypes.number.isRequired,
    isPaid: PropTypes.func.isRequired
}