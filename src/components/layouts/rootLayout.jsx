import {Link} from 'react-router-dom'
import {CiHome} from "react-icons/ci";
import {PiShoppingCartLight, PiHighHeelThin} from "react-icons/pi";
import {CgProfile} from "react-icons/cg";
import {BsPersonDown, BsPersonBadge} from "react-icons/bs";
import {GoPackageDependencies} from "react-icons/go";
import {VscGraph} from "react-icons/vsc";
import {CgFormatRight} from "react-icons/cg";
import CurrentTime from "../shared/time.jsx";
import {InputItem} from "../shared/input.jsx";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "../ui/button.jsx";


function RootLayout() {

    const menuItem = [
        {
            to: "/page",
            icon: <CiHome size="55" color="#78045B"/>
        },
        {
            to: "/sale",
            icon: <PiShoppingCartLight size="55" color="#78045B"/>
        },
        {
            to: "/inventory",
            icon: <PiHighHeelThin size="55" color="#78045B"/>
        },
        {
            to: "/customer",
            icon: <BsPersonDown size="55" color="#78045B"/>
        },
        {
            to: "/supplier",
            icon: <GoPackageDependencies size="55" color="#78045B"/>
        },
        {
            to: "/employee",
            icon: <BsPersonBadge size="55" color="#78045B"/>
        },
        {
            to: "/admin-panel",
            icon: <VscGraph size="55" color="#78045B"/>
        },
        {
            to: "/",
            icon: ""
        },
        {
            to: "/",
            icon: ""
        },
        {
            to: "/",
            icon: ""
        },
        {
            to: "/user",
            icon: <CgProfile size="55" color="#78045B"/>
        }


    ]

    const customerForm = [
        [{
            title: "Customer Code",
            type: "text",
            placeholder: "",
            description: "Auto generated",
        },
            {
                title: "Customer Name",
                type: "text",
                placeholder: "Name",
                description: "Full name required",
            }],
        [{
            title: "Customer Gender",
            type: "select",
            placeholder: "Gender",
            description: "",
            selectList: ["Male", "Female", "Other"]
        },
            {
                title: "Loyalty Join Date",
                type: "date",
                placeholder: "Date",
                description: "Date of the entitlement as a loyalty customer",
            }],
        [{
            title: "Total point",
            type: "number",
            placeholder: "Points",
            description: "1 point purchase more than LKR 800",
        },
            {
                title: "Customer Level",
                type: "select",
                placeholder: "Level",
                description: "Gold > 200  | Silver – 100-199 | Bronze – 50-99 | New < 50",
                selectList: ["Gold", "Silver", "Bronze", "New"]
            }],
        [
            {
                title: "Customer DOB",
                type: "date",
                placeholder: "Date",
                description: "Date of birth",
            },
            {
                title: "Address Line 01",
                type: "text",
                placeholder: "Address",
                description: "Building no or name",
            }], [
            {
                title: "Address Line 02",
                type: "text",
                placeholder: "Address",
                description: "Lane",
            },
            {
                title: "Address Line 03",
                type: "text",
                placeholder: "Address",
                description: "Main city",
            }],
        [{
            title: "Address Line 04",
            type: "text",
            placeholder: "Address",
            description: "Main state",
        },
            {
                title: "Address Line 05",
                type: "text",
                placeholder: "Address",
                description: "Postal code",
            }], [
            {
                title: "Contact number",
                type: "text",
                placeholder: "Contact",
                description: "Mobile number",
            },
            {
                title: "Customer Email",
                type: "email",
                placeholder: "Email",
                description: "Email required",
            }]


    ]


    // const [isClicked, setIsClicked] = useState(false)


    return (
        <>
            <div id="root" className="h-screen w-full absolute"></div>
            <div className="w-full h-20 absolute bg-black opacity-50"></div>

            <div className=" w-full h-20 absolute flex justify-between">
                <div id="nameTag" className="h-full w-60 ms-28 mt-3"></div>
                <div className="self-center flex gap-x-3">
                    <CgFormatRight size="45"/>
                    <h1 className="text-4xl">Customer Form</h1>
                </div>
                <div className="me-5">
                    <CurrentTime/>
                </div>
            </div>

            <div className="flex">

                <nav className="h-screen w-24 flex  justify-center items-center">
                    <div className="h-screen w-24 flex flex-col justify-around items-center relative">
                        {menuItem.map(item => {
                            return <Link key={item.to} className="no-underline" to={item.to} style={{zIndex: "1"}}>
                                <div className={`mt-4 cursor-pointer `}>
                                    {item.icon}
                                </div>
                            </Link>
                        })}
                        <div className="h-screen w-20 bg-purple opacity-40 absolute"></div>
                    </div>
                </nav>

                <div className="w-4/5 h-4/5 ms-52 mt-32 flex-col rounded-3xl absolute xl">
                    <ScrollArea className="h-full w-full rounded-3xl z-0">
                        <div id="form" className="w-full h-full absolute border-2 z-0 rounded-3xl "></div>


                        {customerForm.map((customer, index) => (
                            <div key={index} className="flex justify-around mb-4 z-10">
                                {customer.map(data => (
                                    <InputItem
                                        key={data.title}
                                        title={data.title}
                                        placeholder={data.placeholder}
                                        type={data.type}
                                        description={data.description}
                                        selectList={data.selectList}
                                    />
                                ))}
                            </div>
                        ))}
                    </ScrollArea>

                    <Button className=" w-2/12 h-12 absolute text-2xl text-opacity-40 -bottom-10 right-0 m-5 mt-10">Submit</Button>
                </div>


            </div>


        </>
    )

}

export default RootLayout