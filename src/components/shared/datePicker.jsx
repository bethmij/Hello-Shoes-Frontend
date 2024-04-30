import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import PropTypes from "prop-types";

export function DatePicker({ register, id }) {
    const [date, setDate] = useState(null);

    return (
        <>
            <input
                type="hidden"
                {...register(id)}
                id={id}
                name={id}
                value={date ? format(date, 'yyyy-MM-dd') : ''}
            />

            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[280px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent  className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </>
    )
}

DatePicker.propTypes = {
    register: PropTypes.func.isRequired, // Make sure register is a function
    id: PropTypes.string.isRequired
}
