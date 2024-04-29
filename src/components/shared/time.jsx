import {useEffect, useState} from "react";

const CurrentTime = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDateTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, []);

    const formatDate = (date) => {
        const options = { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
        return date.toLocaleString('en-US', options).replace(',', ' : ');
    };

    return (
        <div className="text-2xl text-center mt-4">
             {formatDate(currentDateTime)}
        </div>
    );
};

export default CurrentTime