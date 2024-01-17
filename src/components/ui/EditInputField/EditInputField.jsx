import React from 'react';

const EditInputField = ({
    value,
    onChange
}) => {
    const [outline, setOutline] = React.useState("focus:border-black");

    const handleFocus=()=>{
        setOutline("border-black");
    }

    const handleBlur=()=>{
        setOutline("border-gray-200");
    }

    return (
            <div tabIndex={0} className={`${outline} border-2 rounded-lg p-2 relative focus:border-black `}>
                <span className='font-bold'>gdsc.link/</span>
                <input type="text" className='focus:outline-none' placeholder='Enter new URL' onFocus= {handleFocus} onBlur={handleBlur} value={value} onChange={onChange}/>
            </div>
    );
}

export default EditInputField;
