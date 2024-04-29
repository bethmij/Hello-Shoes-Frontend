import {Input} from "../ui/input.jsx"
import PropTypes from "prop-types";


export function InputItem(props) {


    return (

        <div className="z-10 ms-16 mt-10 w-1/3" key={props.title}>
            <label className="text-l">{props.title}</label>
            <Input type={props.type} placeholder={props.placeholder} className="mt-2 mb-2 w-full "/>
            <p className="opacity-60">
                {props.description}
            </p>
        </div>


    )
}

InputItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired
};
