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

    useEffect(() => {
        if (props.resetForm) {
            resetValue();
        }
    }, [props.resetForm]);

    const resetValue = () => {
        setInputValue('');
    };

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

                    <Input

                        {...props.register(props.id)}
                        id={props.id}
                        type={props.type}
                        name={props.id}
                        placeholder={props.placeholder}
                        className="mt-2 mb-2 w-full"
                        value={inputValue}
                        readOnly={props.isEdit}
                        onChange={handleChange}
                        required={props.isRequired}
                        defaultValue={props.defaultValue}
                    />



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
        <div className="z-10 ms-10 mt-10" key={props.id}>
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
    requiredLength: PropTypes.number,
    resetForm: PropTypes.bool,
    defaultValue: PropTypes.string
};
