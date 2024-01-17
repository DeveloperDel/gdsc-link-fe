import React from 'react';
import bracket_logo from "../../../assets/images/bracket_logo.png";
import { FaAngleLeft } from 'react-icons/fa';
import { useState } from 'react';
import ResultBox from '../ResultBox/ResultBox';

const Sidebar = ({
    dataList,
    onClick
}) => {
    const [open, setOpen] = useState(false);

    const handleMenuOpen=()=>{
        setOpen(!open);
    }

    return (
        <div className={`${open? "md:w-4/12 ":"md:w-0"} fixed top-0 right-0 h-screen duration-300 w-0 bg-white z-auto font-poppins shadow-md border-y-2 py-5 overflow-y-scroll max-h-screen min-w-0 `}>
            <div className={ `${open && "right-1/3"} border-s-2 duration-300 fixed cursor-pointer top-32 bg-white end-0 rounded-s-full `}>
                {
                    <FaAngleLeft className={` ${open && "rotate-180" } duration-300 hidden md:block`} size={55} onClick={() => { onClick(); handleMenuOpen(); }}/> 
                }
            </div>
            <div className={ `flex items-center mt-4 px-12 pt-16 ${open? "block":"hidden"}`}>
                <img className="mr-3" src={bracket_logo} alt="bracket_logo" width={65} height={65} />
                <h2 className="text-2xl font-semibold tracking-wide  ">My URL's</h2>
            </div>
            {
                dataList.length === 0?
                <div className="flex items-center mt-4 px-12">
                    <h2 className="text-2xl font-semibold tracking-wide mt-3">No URL's yet!</h2>
                </div>
                :
                dataList.map((item)=>(
                    <ResultBox className={open? "block":"hidden"} shortUrl={item.shortUrl} longUrl={item.longUrl}/>
                ))
            }
        </div>
    );
}

export default Sidebar;
