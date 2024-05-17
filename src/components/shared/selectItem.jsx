import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import PropTypes from "prop-types";
import {Label} from "../ui/label.jsx";

export function SelectItems(props) {
    return (

        <div className="mt-6">
            <Label htmlFor={props.id} className="text-xl mb-20 pb-10" >{props.title} </Label>
            <Select onValueChange={(value) => props.setValue(`${props.id}`, value)} className="bg-transparent">
                <SelectTrigger >
                    <SelectValue placeholder={ props.placeholder} />
                </SelectTrigger>
                <SelectGroup >
                    <SelectContent >
                    {props.list.map(item => {
                        return <SelectItem key={item} value={item}>{item}</SelectItem>
                    })}
                    </SelectContent>
                </SelectGroup>
            </Select>
        </div>

    )
}

SelectItems.propTypes = {
    id:PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    list: PropTypes.array.isRequired,
    setValue:PropTypes.func
};

