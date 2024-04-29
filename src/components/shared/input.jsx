import {Input} from "../ui/input.jsx"
import PropTypes from "prop-types";
import {SelectItems} from "./selectItem.jsx";
import {DatePicker} from "./datePicker.jsx";


const setInput = (props) => {
    if (props.type === 'text' || props.type === 'number' || props.type === 'email') {
        return <Input type={props.type} placeholder={props.placeholder} className="mt-2 mb-2 w-full "/>
    } else if (props.type === 'select') {
        return <SelectItems title={props.selectList.title} placeholder={props.selectList.placeholder}
                            list={props.selectList.list} className="mt-2 mb-2 w-full "/>
    } else if (props.type === 'date') {
        return <DatePicker className="mt-2 mb-2 w-full "/>
    }

}

export function InputItem(props) {


    return (

        <div className="z-10 ms-16 mt-10 w-1/3" key={props.title}>
            <label className="text-l">{props.title}</label>
            {setInput(props)}
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
    type: PropTypes.string.isRequired,
    selectList: PropTypes.object.isRequired
};
