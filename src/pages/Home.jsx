import React, { useState } from "react";
import center_logo from "../assets/images/center_logo.png";
import Input from "../components/ui/Input/Input";
import Button from "../components/ui/Button/Button";
import api from "../data/axiosConfig";
import validator from "validator";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import Footer from "../components/ui/Footer/Footer";
import Sidebar from "../components/ui/Sidebar/Sidebar";


const Home = () => {

    let timer;
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [isUrlError, setIsUrlError] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [loading, isLoading] = useState(false);
    const [formData, setFormData] = useState([]);
    const [open, setOpen] = useState(false);

    const handleMenuOpen=()=>{
        setOpen(!open);
    }

    const handleSpace = (event) => {
        var splitString = event.split(' ').join('-');
        setTitle(splitString);
    }

    const handleUrl = (event) => {
        let url = event.trim();
        setUrl(url);
        clearTimeout(timer);

        timer = setTimeout(() => {
            if (url.length === 0) {
                setIsUrlError(false);
                setIsButtonDisabled(true);
            } else if (url.length > 0 && !validator.isURL(url)) {
                setIsUrlError(true);
                setIsButtonDisabled(true);
            } else {
                setIsUrlError(false);
                setIsButtonDisabled(false);
            }
        }, 1000);
    }

    const handleSubmit = async (e) => {
        isLoading(true);
        e.preventDefault();

        clearTimeout(timer);

        timer = setTimeout(async () => {
            api.post("/shorten",
                {
                    "url": url,
                    "title": title
                }
            ).then((response) => {
                console.log(response.data.data.url);
                const newShortUrl = response.data.data.url;
                const isDuplicate = formData.some(entry => entry.shortUrl === newShortUrl && entry.longUrl === url);
                if (isDuplicate) {
                    toast.info("URL already shortened, suggest to custom your short URL!", { 
                        position: toast.POSITION.TOP_CENTER,
                        autoClose:2000
                    });
                }else{
                    setFormData([...formData, { shortUrl: response.data.data.url, longUrl: url }]);
                    toast.success(response.data.message, { 
                        position: toast.POSITION.TOP_CENTER,
                        autoClose:2000
                    });
                }
                setUrl("");
                setTitle("");
                setIsButtonDisabled(true);
                isLoading(false);
            })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 409) {
                        toast.error(error.response.data.message, { position: toast.POSITION.TOP_CENTER });
                    } else {
                        toast.error("Something went wrong!", { position: toast.POSITION.TOP_CENTER });
                    }
                    isLoading(false);
                });
        }, 1000);

    }

    return (
        <div className="flex flex-row z-10 md:my-0 my-12">
            <div className="flex flex-col max-h-screen">
            <div className={`${open? "md:w-3/4 ":"md:w-full"} w-full duration-300 flex flex-col h-full items-center bg-zinc-100 font-poppins p-0 md:p-16`}>
                    <ToastContainer />
                    <div className="w-96 mx-auto pt-6 scale-75 md:scale-100">
                        <img src={center_logo} alt="gdsc_logo" width="450" height="450" />
                    </div>
                    <p className="text-center text-2xl md:text-3xl font-semibold opacity-75 tracking-wide">Shorten your long url here!</p>
                    <Input
                        type="text"
                        placeholder="https://yourdomain.id/your-long-url"
                        className="w-4/5 md:w-2/3 mt-3 mx-auto min-w-max max-w-lg"
                        value={url}
                        onChange={e => handleUrl(e.target.value)}
                        isUrlError={isUrlError}
                    />
                    <div className="w-full text-center h-full my-5">
                        <div className="w-2/3 max-w-lg mx-auto flex flex-row items-center justify-center">
                            <p className=" text-md md:text-lg font-bold mr-1 md:mr-5">gdsc.link/</p>
                            <Input
                                type="text"
                                placeholder="Enter your short URL (Optional)"
                                className="md:w-full"
                                value={title}
                                onChange={e => handleSpace(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button
                        isButtonDisabled={isUrlError || isButtonDisabled}
                        isLoading={loading}
                        onClick={handleSubmit}
                    />

                    {/* NEXT FEATURE */}
                    {/* <p className="m-5 text-center ">By using GDSC LINK, you agree to our <span><a className=" text-blue-600" href="/terms-of-service">Terms of Service</a>
                        </span>
                    </p> */}
                </div>
                <Footer/>
            </div>
            <Sidebar
              dataList={formData}
              onClick={handleMenuOpen}
            />
        </div>
    );
}
export default Home;