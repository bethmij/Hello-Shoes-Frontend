import Select from 'react-select';
import PropTypes from "prop-types";
import { ChevronDown } from 'heroicons-react';



// const SearchableDropdown = (props) => {
//     const handleChange = (selectedOption) => {
//         props.setValue(`${props.id}`, selectedOption.value);
//         props.onSubmit(selectedOption.value);
//     };
//
//     const options = props.list.map(item => ({
//         value: item,
//         label: item
//     }));
//
//     return (
//         <div className="mt-6">
//             <label htmlFor={props.id} className="text-xl mb-20 pb-10">{props.title}</label>
//             <Select
//                 id={props.id}
//                 onChange={handleChange}
//                 options={options}
//                 placeholder={props.placeholder}
//                 className="bg-transparent"
//                 classNamePrefix="react-select"
//             />
//         </div>
//     );
// };

const customStyles = {
    container: (provided) => ({
        ...provided,
        marginTop: '8px',
        width: '100%',
    }),
    control: (provided, state) => ({
        ...provided,
        display: 'flex',
        height: '40px',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '0.675rem',
        borderColor: state.isFocused ? 'rgba(116,1,99,0.72)' : 'rgba(68,8,53,0.67)',
        backgroundColor: 'transparent',
        padding: '0.5rem 0.75rem',
        boxShadow: state.isFocused ? '0 0 0 2px #3182CE' : 'none',
        ':hover': {
            borderColor: '#460232',
        },
    }),
    valueContainer: (provided) => ({
        ...provided,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    }),
    input: (provided) => ({
        ...provided,
        margin: '0',
        padding: '0',
        color:"#FFFFFF"
    }),
    placeholder: (provided) => ({
        ...provided,
        color: '#d5dee9',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: '#cdcfd4',
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#200116',
        borderRadius: '0.675rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }),
    menuList: (provided) => ({
        ...provided,
        padding: '0',
        '::-webkit-scrollbar': {
            width: '8px',
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: '#460232',
            borderRadius: '4px',
        },
        '::-webkit-scrollbar-track': {
            backgroundColor: '#200116',
        },
    }),

    option: (provided, state) => ({
        ...provided,
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 0.75rem',
        backgroundColor: state.isSelected ? '#200116' : 'transparent',
        color: state.isSelected ? '#eaeaea' : '#e9e0e0',
        ':hover': {
            backgroundColor: '#27002b',
            color: '#f1f0f1',
        },
    }),


};

const SearchableDropdown = (props) => {
    const handleChange = (selectedOption) => {
        props.setValue(`${props.id}`, selectedOption.value);
        if(props.onSubmit) {
            props.onSubmit(selectedOption.value);
        }
    };

    const options = props.list.map(item => ({
        value: item,
        label: item
    }));

    return (
        <div className="mt-6 z-50">
            <label htmlFor={props.id} className="text-xl mb-2">{props.title}</label>
            <Select
                id={props.id}
                onChange={handleChange}
                options={options}
                placeholder={props.placeholder}
                classNamePrefix="react-select"
                styles={customStyles}
                components={{
                    DropdownIndicator: () => (
                        <span className="text-gray-500 ml-2"><ChevronDown className="h-4 w-4" /></span>
                    ),
                    IndicatorSeparator: () => null
                }}
                required={props.required}
            />
        </div>
    );
};


export default SearchableDropdown;

SearchableDropdown.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    list: PropTypes.array.isRequired,
    setValue: PropTypes.func,
    onSubmit: PropTypes.func,
    required:PropTypes.bool
};
