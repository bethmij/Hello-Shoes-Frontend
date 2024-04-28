import {Link} from 'react-router-dom'
import {CiHome} from "react-icons/ci";


function RootLayout() {

    return (

        // <div className="menuContainer col-sm-1 col-md-1  p-0 " style="height: 91vh; margin-top: 60px;">
        //     <nav className=" navbar  p-0 position-relative" style="height: 100%; width:60%; background-color: #171717; z-index: 0">
        //
        //         <div style="width:70%; height: 20vw ; top: 1vw" className=" bg-transparent d-flex flex-column position-absolute ">
        //             <a className="menuBtn btnHome mb-5 p-0 ms-2" href="#">
        //                 <img src="../resources/assests/img/Screenshot__540_-removebg-preview.png" alt="Logo" width="90%" style="opacity: 0.5;"/>
        //             </a>
        //             <a className="menuBtn btnCustomer position-relative mb-5 ms-2" href="#">
        //                 <div className=" position-absolute " style="width: 5.5vw; height: 4vw; top: -1vw; left: -1vw; border-right: 3px solid #0d4920; background-color:#030E00; z-index: -1;"></div>
        //                 <img src="../resources/assests/img/Screenshot__541_-removebg-preview.png" alt="Logo" width="90%" style="z-index: 10;" />
        //             </a>
        //             <a className="menuBtn  btnItem mb-5 ms-2" href="#" >
        //                 <img src="../resources/assests/img/Screenshot__546_-removebg-preview.png" alt="Logo" width="90%" style="opacity: 0.5;"/>
        //             </a>
        //             <a className="menuBtn btnOrder mb-5 ms-2" href="#">
        //                 <img src="../resources/assests/img/Screenshot__543_-removebg-preview.png" alt="Logo" width="90%" style="opacity: 0.5;"/>
        //             </a>
        //         </div>
        //         <div style="width:70%; height: 10vw; bottom: 0vw;" className="menuBtn  bg-transparent d-flex flex-column position-absolute ">
        //             <a className="mb-5 p-0 ms-2" href="#">
        //                 <img src="../resources/assests/img/Screenshot__545_-removebg-preview.png" alt="Logo" width="80%" style="opacity: 0.5;"/>
        //             </a>
        //             <a className="menuBtn mb-5 ms-2" href="#">
        //                 <img src="../resources/assests/img/Screenshot__544_-removebg-preview.png" alt="Logo" width="80%" style="opacity: 0.5;"/>
        //             </a>
        //         </div>
        //
        //     </nav>
        // </div>
        <>
            <div id="root" className="h-screen w-full absolute"></div>
            <div className="h-screen w-20 flex flex-col justify-around items-center">
                <div className="h-screen w-20 bg-purple opacity-30 absolute"></div>

                <Link to={"/"} >
                    <div className="mt-4 cursor-pointer">
                        <CiHome size="60"/>
                    </div>
                </Link>

            </div>


        </>
    )

}

export default RootLayout