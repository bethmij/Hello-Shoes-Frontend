import {Input} from "../ui/input.jsx";
import PropTypes from "prop-types";
import {useEffect, useRef, useState} from "react";

import {SelectItems} from "./selectItem.jsx";

export function InputItem(props) {

    // const initialValue = props.value || '';
    // const [inputValue, setInputValue] = useState(initialValue);
    //
    // useEffect(() => {
    //     setInputValue(props.value || '');
    // }, [props.value]);
    // const handleChange = (event) => {
    //     const newValue = event.target.value;
    //     setInputValue(newValue);
    //     if (props.onChange) {
    //         props.onChange(event);
    //     }
    // };
    const initialValue = props.value || '';
    const [inputValue, setInputValue] = useState(initialValue);
    const prevInputValue = useRef(initialValue);

    useEffect(() => {
        setInputValue(props.value || '');
    }, [props.value]);

    useEffect(() => {
        if (inputValue !== prevInputValue.current) {
            prevInputValue.current = inputValue;
        }
    }, [inputValue]);

    const handleChange = (event) => {

        const newValue = event.target.value;
        setInputValue(newValue);
        if (props.onChange) {
            props.onChange(event);
        }
    };

    const handleSubmit = (event) => {
        if (props.onSubmit) {
            props.onSubmit(event)
        }
    }


    const setInput = () => {
        if (props.type === 'text' || props.type === 'number' || props.type === 'email' || props.type === 'date' || props.type === 'file') {
            return (
                <div>
                    <Input

                        {...props.register(props.id
                        //     ,{
                        //     validate: (value) => {
                        //         if (props.id === 'customerName') {
                        //             // Check if the value length matches the required length
                        //             const isValid = value.length === props.requiredLength;
                        //             if (!isValid) {
                        //                 // alert(`Input must be exactly ${props.requiredLength} characters long for ${props.id}`);
                        //                 const errorParagraph = document.getElementById(props.id);
                        //
                        //                 if (errorParagraph) {
                        //                     errorParagraph.text("New error message");
                        //                 }
                        //                 return isValid || `Input must be exactly ${props.requiredLength} characters long`;
                        //             }
                        //             // If props.id is not 'customerName', consider it valid
                        //             return true;
                        //         }
                        //     }
                        // })
                        )}
                        id={props.id}
                        type={props.type}
                        name={props.id}
                        placeholder={props.placeholder}
                        className="mt-2 mb-2 w-full"
                        value={inputValue}
                        readOnly={props.isEdit}
                        onChange={handleChange}
                        required={props.isRequired}
                    />


                    {/*{props.errors && props.errors[props.id] && (*/}
                    {/*    <div className="alert alert-danger" role="alert">*/}
                    {/*        {props.errors[props.id].message}*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </div>

            );
        } else if (props.type === 'select') {
            return (

                <select
                    {...props.register(props.id)}
                    id={props.id}
                    onChange={handleChange}
                    value={inputValue}
                    onSubmit={handleSubmit}
                    required
                    className="mt-2 mb-2 w-full h-10 border rounded-md border-input bg-background px-3 py-2 text-sm focus:outline-none ">
                    <option></option>
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
                // <SelectItems
                //     id={props.id}
                //     list={props.selectList}
                //     setValue={props.setValue}
                //     onSubmit={handleSubmit}
                //     value={inputValue}
                // />
            )
        }
    }



    return (
        <div className="z-10 ms-10 mt-10 w-2/5" key={props.id}>
            <label className="text-xl">{props.title}</label>
            {setInput()}

            <p>{props.description}</p>
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
    watch: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
    isEdit: PropTypes.bool,
    setValue: PropTypes.func,
    onSubmit: PropTypes.func,
    isRequired:PropTypes.bool,
    requiredLength: PropTypes.number
};
