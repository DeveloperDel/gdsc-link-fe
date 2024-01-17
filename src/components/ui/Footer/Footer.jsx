import React from 'react';
import footer_logo from '../../../assets/images/footer_logo.png';
import { IoLocationSharp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='flex flex-col justify-around'>
            <div className=' flex flex-col md:flex-row justify-between bg-white px-12 py-6 font-poppins'>
                <div className=' py-5 md:py-0 md:w-1/5'> 
                    <img src={footer_logo} alt="Footer Logo" width={350} height={350} />
                </div>
                <div className=' text-center md:text-left w-full md:w-2/5 text-sm '>
                    <p className='flex flex-row font-bold items-center pb-5'><IoLocationSharp className='mr-2' size={20}/>Institut Teknologi Del, Sitoluama</p>
                    <p className='pb-5'>Google Developer Student Clubs are university based community groups for students interested in Google developer technologies. By joining a GDSC, students grow their knowledge in a peer-to-peer learning environment and build solutions for local businesses and their community.</p>
                    <p className='font-bold'>Contact us (Email): </p>
                    <a href='mailto: gdscitdel@gmail.com'>gdscitdel@gmail.com</a>  
                </div>
                <div className='text-center md:text-left w-full md:w-1/5 py-3 md:py-0'>
                    <p className='font-bold text-md'>Social Media</p>    
                    <div className='flex flex-row py-3 md:justify-normal justify-center'>
                        <a href="https://instagram.com/gdsc.itdel">
                            <FaInstagram className='mr-5' size={25}/>
                        </a>
                        <a href="https://www.linkedin.com/company/gdsc-itdel/">
                            <FaLinkedinIn size={25}/>
                        </a>
                        <a href="https://discord.com/servers/google-developer-community-indonesia-875733589554266162">
                            <FaDiscord className='ml-5' size={25}/>
                        </a>
                    </div>
                </div>
            </div>
            <div className='justify-between px-12 py-3 border-y-2 font-poppins text-sm text-white bg-blue-500'>
                <p>© 2023 GDSC IT Del</p>
            </div>
        </footer>
    );
}

export default Footer;
