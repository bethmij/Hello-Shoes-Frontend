import {Link} from 'react-router-dom'
import {CiHome} from "react-icons/ci";
import {PiShoppingCartLight, PiHighHeelThin} from "react-icons/pi";
import {CgProfile} from "react-icons/cg";
import {BsPersonDown, BsPersonBadge} from "react-icons/bs";
import {GoPackageDependencies} from "react-icons/go";
import {VscGraph} from "react-icons/vsc";
// import {useState} from "react";


function RootLayout() {

    const menuItem = [
        {
            to: "/page",
            icon: <CiHome size="55"/>
        },
        {
            to: "/sale",
            icon: <PiShoppingCartLight size="55"/>
        },
        {
            to: "/inventory",
            icon: <PiHighHeelThin size="55"/>
        },
        {
            to: "/customer",
            icon: <BsPersonDown size="55"/>
        },
        {
            to: "/supplier",
            icon: <GoPackageDependencies size="55"/>
        },
        {
            to: "/employee",
            icon: <BsPersonBadge size="55"/>
        },
        {
            to: "/admin-panel",
            icon: <VscGraph size="55"/>
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
            icon: <CgProfile size="55"/>
        }


    ]

    // const [isClicked, setIsClicked] = useState(false)

    return (
        <>

            <div id="root" className="h-screen w-full absolute"></div>
            <div className="h-screen w-24 flex  justify-center items-center">
                <div className="h-screen w-24 flex flex-col justify-around items-center relative">

                    {menuItem.map(item => {
                        return <Link key={item.to} className="no-underline" to={item.to} style={{zIndex: "1"}}>
                            <div className={`mt-4 bg-bermuda cursor-pointer `}>
                                {item.icon}
                            </div>
                        </Link>
                    })}


                    <div className="h-screen w-20 bg-purple opacity-30 absolute"></div>

                </div>
            </div>


        </>
    )

}

export default RootLayout