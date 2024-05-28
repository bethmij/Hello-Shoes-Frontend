// import {Link} from "react-router-dom";

import NavigationBar from "../../components/navigationBar.jsx";
import {LiaUserCircle} from "react-icons/lia";
import {isAuthenticated} from "../auth/authentication.jsx";
import {useEffect} from "react";
import {sendEmail} from "../../components/shared/email.jsx";


function HomePage() {
    useEffect(() => {
        sendEmail()
    }, []);

    return (

        isAuthenticated() && (
            <div className="h-screen w-full ">
                <div id="homePage" className=" h-screen w-full opacity-35 absolute"></div>

                <div id="mainPic" className="w-2/5 h-2/5 bg-amber-300  float-left"></div>
                <div className=" w-3/5  h-20 flex ps-80 pt-52 ">
                    <NavigationBar className="self-center"/>
                    <LiaUserCircle color="#D4BACE" size="80" className="ms-2 self-center mb-20"/>
                </div>

                <div
                    className="w-2/3 h-2/5 bg-transparent ms-80 border-t-4 border-b-4 opacity-90 flex flex-col justify-center items-center"
                    color="#130D13">
                    <h1 className="text-7xl">EVERYDAY COMFORT</h1>
                    <p className=" text-3xl text-center mt-10">Step into style and step into confidence <br/> with our
                        curated collection of
                        footwear.</p>
                </div>


            </div>
        )
    )

}

export default HomePage