import { Input } from "../ui/input.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover.jsx";
import { Button } from "../ui/button.jsx";
import { cn } from "../../lib/utils.js";
import { Calendar } from "@/components/ui/calendar";


export function InputItem(props) {
    const [date, setDate] = useState(null);

    const handleDateChange = (newDate) => {
        setDate(newDate);
        // console.log(newDate)
        // props.register(props.id).onChange(newDate ? format(newDate, 'yyyy-MM-dd') : '');
    };

    useEffect(() => {
        props.register(props.id); // Re-register the input when `date` changes
    }, [date, props.id, props.register]);

    const setInput = () => {
        if (props.type === 'text' || props.type === 'number' || props.type === 'email') {

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
        } else if (props.type === 'date') {

            // const registerResult = props.register(props.id);
            console.log(props);
            return (
                <>
                    <Input
                        {...props.register(props.id)}
                        id={props.id}
                        type="text"
                        name={props.id}
                        placeholder={props.placeholder}
                        value={date ? format(date, 'yyyy-MM-dd') : ''}
                    />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full mt-2 mb-2 justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={handleDateChange}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </>
            );
        }
    };



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
    errors: PropTypes.object
};
