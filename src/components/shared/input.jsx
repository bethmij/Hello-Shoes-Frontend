import {Input} from "../ui/input.jsx";
import PropTypes from "prop-types";

export function InputItem(props) {

    const setInput = () => {
        if (props.type === 'text' || props.type === 'number' || props.type === 'email' || props.type === 'date') {

            return (
                <Input
                    {...props.register(props.id)}
                    id={props.id}
                    type={props.type}
                    name={props.id}
                    placeholder={props.placeholder}
                    className="mt-2 mb-2 w-full"
                />
            );
        } else if (props.type === 'select') {
            return (

                <select {...props.register(props.id)} name={props.id} id={props.id}
                        className="mt-2 mb-2 w-full h-10 border rounded-md border-input bg-background px-3 py-2 text-sm focus:outline-none ">
                    <option> {props.placeholder}</option>
                    {props.selectList.map(item => (
                        <option
                            key={item}
                            value={item}
                            className=""
                        >
                            {item}
                        </option>
                    ))}
                </select>
            )
        }
    }

    return (
        <div className="z-10 ms-16 mt-10 w-1/3" key={props.id}>
            <label className="text-l">{props.title}</label>
            {setInput()}
            <p className="opacity-60">
                {!props.errors ? props.description : props.errors.message}
            </p>
        </div>
    );
}

InputItem.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(['text', 'number', 'email', 'date', 'select']).isRequired,
    selectList: PropTypes.array,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object,
    watch: PropTypes.func
};
