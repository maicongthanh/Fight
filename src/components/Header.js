import React from 'react'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const Header = (props) => {
    const navigate = useNavigate()

    const { type } = props

    const viewHomePage = () => {
        navigate('/')
    }

    return (
        <div className=
            {type === 2 ? 'flex justify-between py-5 items-center text-white' : 'flex justify-between py-5 items-center'}
        >
            <div className='text-lg font-bold flex items-center gap-2'>
                <span
                    onClick={viewHomePage}
                    className='cursor-pointer'
                >
                    Baycungban
                </span>
                <div className='rounded-[50%] h-[20px] w-[20px] overflow-hidden'>
                    <div className='bg-[url("../public/img/vietname.jpg")] bg-contain h-[20px] w-[20px] object-contain'>
                    </div>
                </div>
                <div className='rounded-[50%] h-[20px] w-[20px] overflow-hidden'>
                    <div className='bg-[url("../public/img/My.jpg")] bg-cover h-[20px] w-[20px] object-contain'>
                    </div>
                </div>

            </div>

            <div className=
                {type === 2 ? 'cursor-pointer text-[14px]' : 'cursor-pointer'}
            >
                <ul className='flex justify-center gap-3 items-center font-semibold'>
                    <li>Promotion</li>
                    <NavLink to='/fight-schedule'
                        className=
                        {type === 2 ? 'px-3 py-2 rounded-2xl bg-[#5f58fb]' : ''}

                    >
                        Flight Schedule
                    </NavLink>
                    <li>About us</li>
                    <li>Payment Guide</li>
                </ul>
            </div>
            <div>
                <button className=
                    {type === 2 ? 'bg-[#fff] text-primary font-semibold py-2 px-4 rounded-xl' : 'bg-primary text-white font-semibold py-2 px-4 rounded-xl'}

                >Booking now</button>
            </div>
        </div>
    )
}

export default Header