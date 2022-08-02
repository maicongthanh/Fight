import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
    return (
        <div className='mt-[100px] mx-[150px] bg-[#edecff] py-8 flex justify-between items-center px-3 text-[14px]' >
            <div className='flex gap-5'>
                <div className='flex gap-2 justify-center items-center'>
                    <div className='bg-[#4D46FA] rounded-[50%] h-[25px] w-[25px] flex gap-2 justify-center items-center text-[#fff]'>
                        <FontAwesomeIcon icon={faPhone} />
                    </div>
                    Call us: +84 908 02 02 58
                </div>
                <div className='flex gap-2 justify-center items-center'>
                    <div className='bg-[#4D46FA] rounded-[50%] h-[25px] w-[25px] flex gap-2 justify-center items-center text-[#fff]'>
                        <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                    Email: chucinog@gmail.com
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <div>Follow us</div>
                <div className='border-b border-black h-[0px] w-[40px]'></div>
                <div className='flex gap-2 justify-center items-center'>
                    <div className='rounded-[50%] h-[22px] w-[22px] overflow-hidden'>
                        <div className='bg-[url("../public/img/facebook.jpg")] bg-contain h-[22px] w-[22px] object-contain'>
                        </div>
                    </div>
                    <div className='rounded-[50%] h-[22px] w-[22px] overflow-hidden'>
                        <div className='bg-[url("../public/img/insta.jpg")] bg-contain h-[22px] w-[22px] object-contain'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer