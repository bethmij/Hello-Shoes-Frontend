// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
import PropTypes from "prop-types";

export function SelectItems(props) {
    console.log(props)
    // return (
    //     <Select className="z-10 mt-10">
    //         <SelectTrigger className="w-full mt-2">
    //             <SelectValue placeholder={props.placeholder} />
    //         </SelectTrigger>
    //         <SelectContent>
    //             <SelectGroup>
    //                 <SelectLabel>{props.title}</SelectLabel>
    //                 {props.list.map( item => {
    //                     return <SelectItem key={item} value={item}>{item}</SelectItem>
    //                 })}
    //             </SelectGroup>
    //         </SelectContent>
    //     </Select>
    // )
}

SelectItems.propTypes = {
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    list: PropTypes.array.isRequired
};

