import React from 'react';
import { MdContentCopy } from "react-icons/md";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import api from "../../../data/axiosConfig";
import EditInputField from '../EditInputField/EditInputField';


const ResultBox = ({
    className,
    shortUrl,
    longUrl
}) => {

    const [openEditForm, setOpenEditForm] = React.useState(false);
    const [openQrModal, setOpenQrModal] = React.useState(false);
    const [qrCode, setQrCode] = React.useState('');
    const [displayUrl, setDisplayUrl] = React.useState(shortUrl);
    const [editUrl, setEditUrl] = React.useState(displayUrl.split('/').pop());

    const copyToClipboard = (e) => {
        navigator.clipboard.writeText(e);
        toast.info("Copied to clipboard!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true
        });
    }

    const handleQrCode= async (id)=>{
        const key = id.split('/').pop();
        await api.get(`/qr-code/${key}`,{
            responseType:'arraybuffer'
        })
            .then((response) => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                setQrCode("data:;base64," + base64);
        })
            .catch((error) => {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    draggable: true
                });
        });
        setOpenQrModal(true);
    }

    const handleUpdate = async ()=>{
        const path = displayUrl.split('/').pop();
        await api.put(`/edit/${path}`,{
            "url":editUrl
        })
        .then((response) => {
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true
            });
            setOpenEditForm(!openEditForm);
            setDisplayUrl(response.data.data.url);
        })
        .catch((error) => {
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true
            });
        });

    }

    const handleDownload= async (id)=>{
        const key = id.split('/').pop();
        await api.get(`/qr-code/download/${key}`)
        .then((response) => {
            console.log(response);
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                draggable: true
            });
        })
    }

    const cancelEdit=()=>{
        setOpenEditForm(!openEditForm);
    }

    const handleNewUrl=(e)=>{
        setEditUrl(e.target.value);
    }

    return (
        <div className={`${className} px-2 py-3 min-w-fit`}>
            {
                openEditForm?
                <div className="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow space-y-3">
                    <h5 class="break-all flex items-center mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white pb-2 border-b-2">{displayUrl}</h5>
                    <EditInputField 
                        onChange={(e) => handleNewUrl(e)}
                        value={editUrl}
                    />
                    <div>
                        <h2 className='font-semibold'>Original URL</h2>
                        <p class="break-all text-xs text-gray-700 dark:text-gray-400 my-1">{longUrl}</p>
                    </div>
                    <div className="flex justify-start space-x-3 mt-4">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-2" onClick={handleUpdate}>Update</button>
                        <button className='bg-red-400 hover:bg-red-600 text-white rounded-md px-4 py-2' onClick={cancelEdit}>Cancel</button>
                    </div>
                </div>
                :
                <div class="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <h5 class="break-all flex items-center mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white pb-2">{displayUrl} < MdContentCopy className=' ml-8 mr-3 cursor-pointer min-w-max' size={20} onClick={()=> copyToClipboard(displayUrl) }/> <MdOutlineQrCodeScanner className='cursor-pointer min-w-max mr-3' size={20} onClick={()=>handleQrCode(displayUrl)}/><FaRegEdit className='cursor-pointer min-w-max' size={20} onClick={cancelEdit}/> </h5>
                    <p class="break-all text-xs text-gray-700 dark:text-gray-400">{longUrl}</p>
                </div>
            }
            {
                openQrModal?
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center ">
                    <div className="bg-white rounded-lg w-1/5 p-3 min-w-max">
                        <div className="flex justify-end">
                            <button className="text-3xl" onClick={()=>setOpenQrModal(false)}>
                                    <IoIosCloseCircleOutline/>
                            </button>
                        </div>
                        <div className="flex flex-col justify-center items-center space-y-2">
                            <p className='font-bold text-xl'>QR Code Image</p>
                            <img src={qrCode} alt="qr-code" width={200} height={200} className=' shadow-lg rounded-lg'/>
                            <a href={displayUrl} className=' text-xs py-2' target='_blank'>{displayUrl}</a>
                            <button className=' bg-red-500 text-white font-normal p-2 rounded-lg' onClick={()=>handleDownload(displayUrl)}>Download</button>
                        </div>
                    </div>
                </div>
                :
                null
            }
        </div>
    );
}

export default ResultBox;
