import {Button} from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {IoIosNotificationsOutline} from "react-icons/io";
import {AlertBox} from "./AlertBox.jsx";
import {useEffect, useState} from "react";
import {getDetails} from "../../pages/cart/cardDetail/fetchData.jsx";
import {AiOutlineAlert} from "react-icons/ai";

// import { RocketIcon } from "@radix-ui/react-icons"


export function Notifications() {

    const [alert, setAlert] = useState([])

    useEffect(() => {
        getDetails("inventory", "lowStock").then(items => {
                setAlert(items)
        })
    }, []);
    return (
        <>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="border-0"><IoIosNotificationsOutline size={30}/></Button>
                </PopoverTrigger>
                <PopoverContent className="w-[30vw] flex flex-col gap-y-8">
                    {alert.map(item => {
                        return <AlertBox key={item.itemCode} title="LOW STOCK"
                                         desc={`Item Code - ${item.itemCode} is having low stocks - Item Qty - ${item.itemQty}`}
                                            icon={<AiOutlineAlert/>}
                                />

                    })}

                </PopoverContent>
            </Popover>
        </>
    )
}



