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

                {/*<div className="w-4/5 h-4/5 ms-52 mt-32 flex justify-center items-center rounded-3xl absolute xl">*/}
                {/*    <p className="text-4xl text-bermuda">gchgchgcxhxgfxgfx</p>*/}
                {/*    <InputItem/>*/}
                {/*    <div id="form" className="w-full h-full absolute border-2 rounded-3xl z-0"></div>*/}

                {/*</div>*/}

                <div className="w-4/5 h-4/5 ms-52 mt-32 flex justify-center items-center rounded-3xl absolute xl">
                    <p className="text-white">gchgchgcxhxgfxgfx</p>
                    <InputItem/>
                    <div id="form" className="w-full h-full absolute border-2 rounded-3xl z-0"></div>
                </div>


            </div>


        </>
    )

}

export default RootLayout