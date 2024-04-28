// import {Link} from "react-router-dom";

import NavigationBar from "../../components/navigationBar.jsx";
import {LiaUserCircle} from "react-icons/lia";


function HomePage() {
    return (
        <div className=" h-screen w-full overflow-y-hidden">
            {/*<div id="homePage" className=" h-screen w-full opacity-30 static">*/}

            <div id="mainPic" className="w-2/5 h-2/5 bg-amber-300 mt-5 float-left"></div>
            <div className=" w-3/5  h-20 flex ps-80 mt-36">
                <NavigationBar className="self-center"/>
                <LiaUserCircle color="#D4BACE" size="80" className="ms-2 self-center"/>
            </div>

            {/*<Link className="text-amber-800" to={"/page"}>Page</Link>*/}
            {/*</div>*/}

        </div>
    )

}

export default HomePage