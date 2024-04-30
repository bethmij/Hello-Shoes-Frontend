import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import PropTypes from "prop-types";

export function SelectItems(props) {
    return (
        <Select  className="z-10 mt-10"> {/* Forward ref to the Select component */}
            <SelectTrigger className="w-full mt-2 mb-2">
                <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {props.list.map(item => {
                        return <SelectItem key={item} value={item}>{item}</SelectItem>
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>

    )
}

SelectItems.propTypes = {
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    list: PropTypes.array.isRequired
};

