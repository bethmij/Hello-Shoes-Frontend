import {Link, Outlet} from 'react-router-dom'
import {CgFormatRight, CgProfile} from "react-icons/cg";
import CurrentTime from "../shared/time.jsx";
import {CiHome} from "react-icons/ci";
import {PiHighHeelThin, PiShoppingCartLight} from "react-icons/pi";
import {BsPersonBadge, BsPersonDown} from "react-icons/bs";
import {GoPackageDependencies} from "react-icons/go";
import {VscGraph} from "react-icons/vsc";

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
        to: "/customer.js",
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
        to: "/1",
        icon: ""
    },
    {
        to: "/2",
        icon: ""
    },
    {
        to: "/3",
        icon: ""
    },
    {
        to: "/user",
        icon: <CgProfile size="55" color="#78045B"/>
    }


]



function RootLayout() {

    return (
        <>
            <div id="root" className="h-screen w-full absolute"></div>
            <div className="w-full h-20 absolute bg-black opacity-50"></div>

            <div className=" w-full h-20 absolute flex justify-between">
                <div id="nameTag" className="h-full w-60 ms-28 mt-3"></div>

                <div className="me-5 opacity-60">
                    <CurrentTime/>
                </div>
            </div>

            <div className="flex">

                <nav className="h-screen w-24 flex  justify-center items-center">
                    <div className="h-screen w-24 flex flex-col justify-around items-center relative">
                        {menuItem.map(item => {
                            return <Link key={item.to} className="no-underline" to={item.to} style={{zIndex: "1"}}>
                                <div className={`mt-4 cursor-pointer opacity-60`}>
                                    {item.icon}
                                </div>
                            </Link>
                        })}
                        <div className="h-screen w-20 bg-purple opacity-40 absolute"></div>
                    </div>
                </nav>

                <Outlet/>

            </div>


        </>
    )

}

export default RootLayout