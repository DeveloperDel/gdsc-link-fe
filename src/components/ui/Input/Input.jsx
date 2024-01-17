import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

const Input = ({
    type,
    placeholder,
    value,
    className,
    onChange,
    isUrlError
}) => {
    const [message] = React.useState("Please enter a valid URL! (ex: https://www.google.com)");

    return (
            <div className={`w-full text-center h-full`}>
                { isUrlError && 
                    <div className=" w-3/4 md:w-1/3 mx-auto mt-3 flex items-center justify-center bg-yellow-300 border-2 rounded-lg p-1 md:p-2 min-w-max max-w-lg">
                    <IoInformationCircleOutline className="mr-1 md:mr-2" size={25}/>
                    <p className="font-semibold text-sm">{message}</p>
                    </div>
                }
                <input 
                    className = {`${className} font-poppins border-2 h-14 rounded-lg border-transparent focus:outline-none focus:border-blue-800 p-3 drop-shadow-md min-w-max `} 
                    type = {`${type}`}
                    placeholder={`${placeholder}`}
                    value={value}
                    onChange={onChange}
                />
            </div>
    );
}
export default Input;