/* eslint-disable no-useless-concat */
import React, { useState } from 'react'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase, faUtensils } from '@fortawesome/free-solid-svg-icons'
import NumberFormat from 'react-number-format';

const DetailFight = (props) => {

    const { item, setListFightChoose, startName, endName } = props
    const [isOpen, setIsOpen] = useState(false)
    function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + "h" + ` ${rminutes}` + "m";
    }

    let dayStart, dayEnd, timeStart, timeEnd, timeDuration, Baggage, totalFee, priceAdult, backgroundImage
    if (item) {

        if (item.AirlineCode === 'VJ') {
            backgroundImage = 'bg-vietjetAir bg-contain h-[30px] w-[30px] bg-no-repeat'
        }
        if (item.AirlineCode === 'VN') {
            backgroundImage = 'bg-vietnamAirlines bg-cover h-[30px] w-[30px] object-contain'
        }
        if (item.AirlineCode === 'QH') {
            backgroundImage = 'bg-bamboo bg-cover h-[30px] w-[30px] object-contain'
        }
        let formattedHourStart = new Date(item.StartDate).getHours()
        let formattedMinuterStart = new Date(item.StartDate).getMinutes()

        let formattedHourEnd = new Date(item.EndDate).getHours()
        let formattedMinuterEnd = new Date(item.EndDate).getMinutes()

        let formattedStartDate = new Date(item.StartDate).getTime()
        let formattedEndDate = new Date(item.EndDate).getTime()

        dayStart = moment(formattedStartDate).format('DD MMMM')
        dayEnd = moment(formattedEndDate).format('DD MMMM')

        timeStart = `${formattedHourStart}:${formattedMinuterStart}`
        timeEnd = `${formattedHourEnd}:${formattedMinuterEnd}`

        let duration = (item.Duration)

        timeDuration = timeConvert(duration)

        Baggage = +item.Carryon.replace('kg', '')

        totalFee = item.ChargeAdult + item.PriceAdult + item.TaxAdult

        priceAdult = item.ChargeAdult + item.PriceAdult
    }

    const handleChoose = () => {
        if (item.isChoose === false) {
            item.isChoose = true
            setListFightChoose(prev => [...prev, item])
        } else {
            return;
        }
    }

    return (
        <div className='w-[100%] m-h-[50px] bg-[#fff] mt-[15px] rounded-xl p-5' >
            <div className='flex gap-10 items-center'>
                <div className='flex flex-2 items-center gap-2 '>
                    <div className={`${backgroundImage}`}
                    >
                    </div>
                    <span className='font-bold uppercase tracking-widest text-[14px]'>{item.name}</span>
                </div>
                <div className='flex flex-1 justify-center'>
                    <div className='flex flex-1 flex-col justify-center items-center'>
                        <div className='font-bold text-[14px]'>
                            {timeStart}
                        </div>
                        <div className='w-[33px] h-[21px] bg-[#edecff] rounded-[12px] flex justify-center items-center' >
                            <span className='text-[10px] font-bold'>
                                {item.StartPoint}
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-1 justify-center flex-col items-center'>
                        <div className='text-[14px]'>
                            {timeDuration}
                        </div>
                        <div className='flex items-center'>
                            <div className='w-[7px] h-[7px] border border-primary rounded-[70%]'>
                            </div>
                            <div className='border-b border-primary h-[0px] w-[80px]'></div>
                            <div className='w-[7px] h-[7px] border border-primary rounded-[70%] bg-primary'>
                            </div>
                        </div>
                        <div className='text-[12px]'>
                            Direct
                        </div>
                    </div>
                    <div className='flex flex-1 flex-col justify-center items-center'>
                        <div className='font-bold text-[14px]'>
                            {timeEnd}
                        </div>
                        <div className='w-[33px] h-[21px] bg-[#edecff] rounded-[12px] flex justify-center items-center' >
                            <span className='text-[10px] font-bold'>
                                {item.EndPoint}
                            </span>
                        </div>
                    </div>

                </div>
                <div className='flex flex-1 gap-10 justify-evenly text-[13px] items-center'>
                    <div className='leading-8'>
                        <div className='flex gap-2'>
                            <span>
                                <FontAwesomeIcon icon={faSuitcase} className='mr-1' />
                                Baggage
                            </span>
                            <span className='text-primary font-bold'>
                                {Baggage === 0 ? item.Freebag : `${Baggage} kg`}
                            </span>
                        </div>
                        <div className='flex gap-2'>
                            <span>
                                <FontAwesomeIcon icon={faUtensils} className='mr-1' />
                                In-flight
                            </span>
                            <span className='text-primary font-bold'>
                                Meal
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-center items-center'>
                            <span className='font-bold text-orange'>
                                <NumberFormat
                                    value={totalFee}
                                    displayType={'text'}
                                    thousandSeparator={true} suffix={' vnd'}
                                />
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-2 justify-end text-[14px]'>
                    <button className=
                        {item.isChoose === true ? 'bg-[#feefeb] text-orange w-[82px] h-[33px] rounded-xl font-bold cursor-default' : 'bg-orange text-[#fff] w-[82px] h-[33px] rounded-xl font-bold'}

                        onClick={handleChoose}
                    >
                        Choose
                    </button>
                </div>

            </div>
            <div className='flex gap-2 items-center my-3'>
                <div className='flex gap-4 uppercase font-bold text-[12px] w-[30%]'>
                    <span
                        className={isOpen === true ? 'text-primary opacity-100 cursor-pointer' : 'opacity-100 cursor-pointer'}
                        onClick={() => {
                            setIsOpen(true)
                        }
                        }
                    >
                        Flight detail
                    </span>
                    <span
                        className={isOpen === false ? 'text-primary opacity-100 cursor-pointer' : 'opacity-100 cursor-pointer'}

                        onClick={() => {
                            setIsOpen(false)
                        }
                        }
                    >
                        Fare info
                    </span>
                </div>
                <div className='border-b border-black h-[0px] w-[100%] opacity-10 '>
                </div>
            </div>
            {
                item.isChoose === false &&
                <div className='flex h-[70%] gap-20 '>
                    {isOpen === true &&
                        <>
                            <div className='flex gap-3 w-[50%] '>
                                <div className='flex flex-col justify-between  w-[30%] '>
                                    <div className='flex flex-col'>
                                        <span className='font-bold text-[14px]' >{timeStart}</span>
                                        <span className='text-[11px]'>{dayStart}</span>
                                    </div>
                                    <div className='text-[14px]'>
                                        {timeDuration}
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-bold text-[14px]'>{timeEnd}</span>
                                        <span className='text-[11px]'>{dayEnd}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col'>
                                    <div className='flex flex-col items-center h-[100%]'>
                                        <div className='w-[7px] h-[7px] border border-primary rounded-[50%]'>
                                        </div>
                                        <div className='border-r border-primary h-[100%] w-[2px]'></div>
                                        <div className='w-[7px] h-[7px] border border-primary rounded-[50%] bg-primary'>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-between'>
                                    <div className='flex flex-col'>
                                        <span className='font-bold text-[14px]'>{startName}</span>
                                        <span className='text-[12px]'>Tansonnhat Intl</span>
                                    </div>

                                    <div className='flex flex-col'>
                                        <span className='font-bold text-[14px]'>{endName}</span>
                                        <span className='text-[12px]'>Hai Phong Airport</span>
                                    </div>
                                </div>
                            </div>

                            <div className='px-5 '>
                                <div className='flex flex-1 items-center gap-2 '>
                                    <div className={`${backgroundImage}`}
                                    >
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-bold uppercase tracking-widest text-[14px]'>
                                            {item.name}
                                        </span>
                                        <div className='flex items-center text-[12px]'>
                                            <span className=''>{item.FlightNumber}</span>
                                            <span className='font-bold px-1 relative bottom-1'>.</span>
                                            <span className=''>{item.GroupClass}</span>

                                        </div>
                                    </div>
                                </div>
                                <div className='w-[500px] h-[101px] bg-[#F4F2F9] rounded-xl mt-3 flex p-3 text-[14px] leading-7 '>
                                    <div className='flex-1'>
                                        <ul className=''>
                                            <li>Baggage <span className='text-primary font-bold'>
                                                {Baggage === 0 ? item.Freebag : `${Baggage} kg`}
                                            </span> </li>
                                            <li>In-flight  <span className='text-primary font-bold'>Meal</span></li>
                                            <li>In-flight <span className='text-primary font-bold'>Entertainment</span> </li>
                                        </ul>
                                    </div>
                                    <div className='flex-1'>
                                        <ul>
                                            <li>Aircraft <span className='text-primary font-bold'>Airbus A{item.RelatedFlights[0].Plane}</span>  </li>
                                            <li>Seat layout <span className='text-primary font-bold'>{item.RelatedFlights[0].SeatClass}</span> </li>
                                            <li>Seat pitch <span className='text-primary font-bold'>29 inches (standard)</span> </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {isOpen === false &&
                        <>
                            <div className='h-[100%] gap-5'>
                                <div className='font-bold uppercase py-2 text-[14px]'>Conditions</div>
                                <div className='flex flex-1 items-center gap-2 '>
                                    <div className={`${backgroundImage}`}
                                    >
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='font-bold uppercase tracking-widest text-[14px]'>
                                            {item.name}
                                        </span>
                                        <div className='flex items-center text-[12px]'>
                                            <span className=''>{item.FlightNumber}</span>
                                            <span className='font-bold px-1 relative bottom-1'>.</span>
                                            <span className=''>{item.GroupClass}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-center items-center gap-3 pt-3 text-[14px]'>
                                    <div>
                                        {startName}
                                    </div>
                                    <div className='flex items-center'>
                                        <div className='w-[7px] h-[7px] border border-primary rounded-[50%]'>
                                        </div>
                                        <div className='border-b border-primary h-[0px] w-[40px]'></div>
                                        <div className='w-[7px] h-[7px] border border-primary rounded-[50%] bg-primary'>
                                        </div>
                                    </div>
                                    <div>
                                        {endName}
                                    </div>
                                </div>
                                <span className='text-primary text-[12px] relative bottom-2'>
                                    {item.GroupClass}
                                </span>
                                <div className='text-[12px]'>
                                    {item.HasChangedClass === false ? 'Non - Refundable' : 'Refundable'}
                                </div>
                            </div>

                            <div className='pr-40 pl-5 flex-1 text-[14px]'>
                                <div className='font-bold uppercase py-2 '>price details</div>
                                <div className='leading-6'>
                                    <div>
                                        <div className='flex justify-between'>
                                            <span>Adult Basic Fare (x1)</span>
                                            <span>
                                                <NumberFormat
                                                    value={priceAdult}
                                                    displayType={'text'}
                                                    thousandSeparator={true} suffix={' vnd'}
                                                />
                                            </span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Tax</span>
                                            <span>included</span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <span>Regular Total Price</span>
                                            <NumberFormat
                                                value={totalFee}
                                                displayType={'text'}
                                                thousandSeparator={true} suffix={' vnd'}
                                            />
                                        </div>
                                    </div>
                                    <div className='border-b border-black h-[0px] w-[100%] opacity-10 '>
                                    </div>
                                    <div>
                                        <div className='flex justify-between'>
                                            <span>You pay</span>
                                            <span className='font-bold text-orange'>
                                                <NumberFormat
                                                    value={totalFee}
                                                    displayType={'text'}
                                                    thousandSeparator={true} suffix={' vnd'}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            }
        </div >
    )
}

export default DetailFight