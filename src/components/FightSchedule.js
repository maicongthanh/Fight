/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-useless-concat */
import { faArrowRightArrowLeft, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DetailFight from './DetailFight'
import moment from 'moment'
import NumberFormat from 'react-number-format'
import Footer from './Footer'
import Header from './Header'

const FightSchedule = () => {

    const location = useLocation();

    const [listFightsCurrent, setListFightsCurrent] = useState([])

    const [listFights, setListFights] = useState([])

    const [listFightChoose, setListFightChoose] = useState([])

    const [listAirlineCode, setListAirlineCode] = useState([])
    const [listGroupClass, setListGroupClass] = useState([])
    const [listTime, setListTime] = useState([])

    const [isOpen, setIsOpen] = useState(false)

    const [state, setState] = useState({
        selectedTime: '',
        selectedAirlineCode: '',
        selectedGroupClass: '',

        startName: '',
        endName: '',
        startDay: '',
        endDay: '',
    })

    const { selectedTime, selectedAirlineCode, selectedGroupClass, startName, endName, startDay, endDay } = state

    useEffect(() => {
        if (location && location?.state) {
            let data = location?.state?.listSearch.map(item => {
                if (item.AirlineCode === 'VJ') {
                    return { ...item, name: 'VietJet Air', isChoose: false }
                }
                if (item.AirlineCode === 'VN') {
                    return { ...item, name: 'Vietnam Airlines', isChoose: false }
                }
                if (item.AirlineCode === 'QH') {
                    return { ...item, name: 'Bamboo Airways', isChoose: false }
                }
            })
            if (data) {
                setListFightsCurrent(data)
                let newData = data.map(item => {
                    if (item.AirlineCode === 'VJ') {
                        return { label: 'VietJet Air', value: 'VJ' }
                    }
                    if (item.AirlineCode === 'VN') {
                        return { label: 'Vietnam Airlines', value: 'VN' }
                    }
                    if (item.AirlineCode === 'QH') {
                        return { label: 'Bamboo Airways', value: 'QH' }
                    }
                })
                if (newData) {
                    const result = newData.reduce((finalArray, current) => {
                        let obj = finalArray.find((item) => item.label === current.label)
                        if (obj) {
                            return finalArray;
                        } else {
                            return finalArray.concat([current])
                        }
                    }, [])
                    if (result) {
                        let object = {
                            label: 'ALL',
                            value: 'ALL'
                        }
                        result.unshift(object)
                        setListAirlineCode(result)
                    }
                }
                let newData1 = data.map(item => {
                    return {
                        label: item.GroupClass,
                        value: item.GroupClass
                    }
                })
                if (newData1) {
                    const result = newData1.reduce((finalArray, current) => {
                        let obj = finalArray.find((item) => item.label === current.label)
                        if (obj) {
                            return finalArray;
                        } else {
                            return finalArray.concat([current])
                        }
                    }, [])
                    if (result) {
                        let object = {
                            label: 'ALL',
                            value: 'ALL'
                        }
                        result.unshift(object)
                        setListGroupClass(result)
                    }
                }

                let newData2 = data.map(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    let formattedHourStart = new Date(item.StartDate).getHours()
                    let formattedMinuterStart = new Date(item.StartDate).getMinutes()

                    let timeStartLabel = `${formattedHourStart}:${formattedMinuterStart}`
                    return {
                        label: timeStartLabel,
                        value: timeStart
                    }
                })
                if (newData2) {
                    const result = newData2.reduce((finalArray, current) => {
                        let obj = finalArray.find((item) => item.label === current.label)
                        if (obj) {
                            return finalArray;
                        } else {
                            return finalArray.concat([current])
                        }
                    }, [])
                    if (result) {
                        let data = result.sort((a, b) => {
                            return a.value - b.value
                        })

                        let object = {
                            label: 'ALL',
                            value: 'ALL'
                        }
                        data.unshift(object)
                        setListTime(data)
                    }
                }

            }

            let startName = `${location.state.selectFrom.label} (${location.state.selectFrom.value})`;
            let endName = `${location.state.selectTo.label} (${location.state.selectTo.value})`;
            let startDay = moment(location.state.selectStartDate).format('ddd, DD MMMM, YYYY')
            let endDay = moment(location.state.selectEndDate).format('ddd, DD MMMM, YYYY')
            setState({
                ...state,
                startName,
                endName,
                startDay,
                endDay
            })
        }
    }, [location])


    useEffect(() => {
        if (listFightsCurrent && listFightsCurrent.length > 0) {
            setListFights(listFightsCurrent)
            setIsOpen(true)
        }
    }, [listFightsCurrent])

    let totalFeeChoose = 0
    if (listFightChoose && listFightChoose.length > 0) {
        totalFeeChoose = listFightChoose.reduce((total, currentValue) => {
            return total + (+currentValue.ChargeAdult + currentValue.PriceAdult + currentValue.TaxAdult)
        }, 0)
    }

    function timeConvert(n) {
        var num = n;
        var hours = (num / 60);
        var rhours = Math.floor(hours);
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return rhours + "h" + ` ${rminutes}` + "m";
    }

    const handleSelect = (event, name) => {
        setState({
            ...state,
            [name]: event.target.value
        })
    }


    useEffect(() => {
        if (selectedAirlineCode && selectedGroupClass && selectedTime) {
            //One ALL
            if (selectedGroupClass === 'ALL' && selectedAirlineCode !== 'ALL' && selectedTime !== 'ALL') {
                let data = listFightsCurrent.filter(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    if (item.AirlineCode === selectedAirlineCode && +timeStart === +selectedTime)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                    return;
                }
            } else {
                let data = listFightsCurrent.filter(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    if (item.AirlineCode === selectedAirlineCode && item.GroupClass === selectedGroupClass && +timeStart === +selectedTime)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                }
            }

            if (selectedAirlineCode === 'ALL' && selectedTime !== 'ALL' && selectedGroupClass !== 'ALL') {
                let data = listFightsCurrent.filter(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    if (item.GroupClass === selectedGroupClass && +timeStart === +selectedTime)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                    return;
                }
            } else {
                let data = listFightsCurrent.filter(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    if (item.AirlineCode === selectedAirlineCode && item.GroupClass === selectedGroupClass && +timeStart === +selectedTime)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                }
            }

            if (selectedAirlineCode !== 'ALL' && selectedTime === 'ALL' && selectedGroupClass !== 'ALL') {
                let data = listFightsCurrent.filter(item => {
                    if (item.GroupClass === selectedGroupClass && item.AirlineCode === selectedAirlineCode)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                    return
                }
            } else {
                let data = listFightsCurrent.filter(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    if (item.AirlineCode === selectedAirlineCode && item.GroupClass === selectedGroupClass && +timeStart === +selectedTime)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                }
            }


            //Two ALL
            if (selectedGroupClass === 'ALL' && selectedAirlineCode === 'ALL' && selectedTime !== 'ALL') {
                let data = listFightsCurrent.filter(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    if (+timeStart === +selectedTime)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                    return;
                }
            } else {
                let data = listFightsCurrent.filter(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    if (item.AirlineCode === selectedAirlineCode && item.GroupClass === selectedGroupClass && +timeStart === +selectedTime)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                }
            }

            if (selectedAirlineCode !== 'ALL' && selectedTime === 'ALL' && selectedGroupClass === 'ALL') {
                let data = listFightsCurrent.filter(item => {
                    if (item.AirlineCode === selectedAirlineCode)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                    return
                }
            } else {
                let data = listFightsCurrent.filter(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    if (item.AirlineCode === selectedAirlineCode && item.GroupClass === selectedGroupClass && +timeStart === +selectedTime)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                }
            }


            if (selectedAirlineCode === 'ALL' && selectedTime === 'ALL' && selectedGroupClass !== 'ALL') {
                let data = listFightsCurrent.filter(item => {
                    if (item.GroupClass === selectedGroupClass)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                    return
                }
            } else {
                let data = listFightsCurrent.filter(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    if (item.AirlineCode === selectedAirlineCode && item.GroupClass === selectedGroupClass && +timeStart === +selectedTime)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                }
            }

            //Three ALL
            if (selectedAirlineCode === 'ALL' && selectedTime === 'ALL' && selectedGroupClass === 'ALL') {
                setListFights(listFightsCurrent)
            }

            return;
        }

        if (selectedAirlineCode && selectedTime) {
            if (selectedTime === 'ALL' && selectedAirlineCode !== 'ALL') {
                let data = listFightsCurrent.filter(item => item.AirlineCode === selectedAirlineCode)
                if (data) {
                    setListFights(data)
                    return;
                }
            } else {
                let data = listFightsCurrent.filter(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    if (item.AirlineCode === selectedAirlineCode && +timeStart === +selectedTime)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                }
            }

            if (selectedAirlineCode === 'ALL' && selectedTime !== 'ALL') {
                let data = listFightsCurrent.filter(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    if (+timeStart === +selectedTime) {
                        return item;
                    }
                })
                if (data) {
                    setListFights(data)
                    return;
                }
            } else {
                let data = listFightsCurrent.filter(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    if (item.AirlineCode === selectedAirlineCode && +timeStart === +selectedTime)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                }
            }




            if (selectedAirlineCode === 'ALL' && selectedTime === 'ALL') {
                setListFights(listFightsCurrent)
            }
            return;
        }

        if (selectedAirlineCode && selectedGroupClass) {
            if (selectedAirlineCode === 'ALL' && selectedGroupClass !== 'ALL') {
                let data = listFightsCurrent.filter(item => item.GroupClass === selectedGroupClass)
                if (data) {
                    setListFights(data)
                    return;
                }
            } else {
                let data = listFightsCurrent.filter(item => {
                    if (item.AirlineCode === selectedAirlineCode && item.GroupClass === selectedGroupClass)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                }
            }

            if (selectedAirlineCode !== 'ALL' && selectedGroupClass === 'ALL') {
                let data = listFightsCurrent.filter(item => item.AirlineCode === selectedAirlineCode)
                if (data) {
                    setListFights(data)
                    return;
                }
            } else {
                let data = listFightsCurrent.filter(item => {
                    if (item.AirlineCode === selectedAirlineCode && item.GroupClass === selectedGroupClass)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                }
            }

            if (selectedAirlineCode === 'ALL' && selectedGroupClass === 'ALL') {
                setListFights(listFightsCurrent)
            }
            return;

        }

        if (selectedGroupClass && selectedTime) {
            if (selectedTime === 'ALL' && selectedGroupClass !== 'ALL') {
                let data = listFightsCurrent.filter(item => item.GroupClass === selectedGroupClass)
                if (data) {
                    setListFights(data)
                    return;
                }
            } else {
                let data = listFightsCurrent.filter(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    if (item.GroupClass === selectedGroupClass && +timeStart === +selectedTime)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                }
            }

            if (selectedGroupClass === 'ALL' && selectedTime !== 'ALL') {
                let data = listFightsCurrent.filter(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    if (+timeStart === +selectedTime) {
                        return item;
                    }
                })
                if (data) {
                    setListFights(data)
                    return;
                }
            } else {
                let data = listFightsCurrent.filter(item => {
                    let timeStart = new Date(item.StartDate).getTime()
                    if (item.GroupClass === selectedGroupClass && +timeStart === +selectedTime)
                        return item
                }
                )
                if (data) {
                    setListFights(data)
                }
            }

            if (selectedGroupClass === 'ALL' && selectedTime === 'ALL') {
                setListFights(listFightsCurrent)
            }
            return;
        }

        //AirlineCode
        if (selectedAirlineCode && selectedAirlineCode !== 'ALL') {
            let data = listFightsCurrent.filter(item => item.AirlineCode === selectedAirlineCode)
            if (data) {
                setListFights(data)
            }
            return
        }
        if (selectedAirlineCode && selectedAirlineCode === 'ALL') {
            setListFights(listFightsCurrent)
            return

        }

        //GroupClass
        if (selectedGroupClass && selectedGroupClass !== 'ALL') {
            let data = listFightsCurrent.filter(item => item.GroupClass === selectedGroupClass)
            if (data) {
                setListFights(data)
            }
            return
        }
        if (selectedGroupClass && selectedGroupClass === 'ALL') {
            setListFights(listFightsCurrent)
            return
        }
        //TimeStart
        if (selectedTime && selectedTime !== 'ALL') {
            let data = listFightsCurrent.filter(item => {
                let timeStart = new Date(item.StartDate).getTime()
                if (+timeStart === +selectedTime) {
                    return item;
                }
            })
            if (data) {
                setListFights(data)
            }
            return

        }
        if (selectedTime && selectedTime === 'ALL') {
            setListFights(listFightsCurrent)
            return
        }

    }, [selectedAirlineCode, selectedGroupClass, selectedTime])

    console.log(listFights);

    return (
        <>
            <div>
                <div className="container mx-auto px-[150px] h-[80px] bg-primary">
                    <Header type={2} />
                </div>
                <div className="container mx-auto px-[150px] h-[80px] ">
                    <div className='flex justify-between py-5 items-center'>
                        <div className='flex items-center justify-between w-[40%]'>
                            <div className=''>
                                <div className='text-primary font-bold'>{startName}</div>
                                <div className='text-[12px]'>
                                    {startDay}
                                </div>
                            </div>
                            {isOpen === true &&
                                <div>
                                    <FontAwesomeIcon icon={faArrowRightArrowLeft} className="opacity-20" />
                                </div>
                            }
                            <div className=''>
                                <div className='text-primary font-bold'>{endName}</div>
                                <div className='text-[12px]'>
                                    {endDay}
                                </div>
                            </div>
                        </div>

                        <div className='cursor-pointer w-[40%] text-[14px]'>
                            {isOpen === true &&
                                <ul className='flex justify-center gap-3 text-[16px] font-semibold'>
                                    <li className='border-r-2 border-[#000000] px-3 ' >Round-trip</li>
                                    <li className='border-r-2 border-[#000000] px-3'>
                                        <span className='text-primary'>02</span> Adult, <span className='text-primary'>01</span> children
                                    </li>
                                    <li>Business Class</li>
                                </ul>
                            }
                        </div>
                        <div className='flex w-[20%] justify-end'>
                            <button className='bg-orange text-white font-semibold py-2 px-4 rounded-xl flex gap-5 items-center text-[14px]'>
                                Change Flights
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </div>
                </div>
                <div className='bg-[#edecff]'>
                    <div className='container mx-auto px-[150px]'>
                        <div className='grid grid-cols-12 pt-[15px]'>
                            <div className='col-span-9 w-[100%]'>
                                {isOpen === true &&

                                    <div className='flex justify-end gap-5 items-center w-[100%] text-[12px]'>
                                        <div className='font-bold opacity-50 uppercase '>
                                            Filter
                                        </div>
                                        <div>
                                            <select className='h-[34px] w-[120px] rounded-xl px-2'>
                                                <option>Transit</option>
                                            </select>
                                        </div>
                                        <div>
                                            <select className='h-[34px] w-[120px] rounded-xl px-2'
                                                value={selectedTime}
                                                name='selectedTime'
                                                onChange={(event) => handleSelect(event, 'selectedTime')}
                                            >
                                                {listTime && listTime.length > 0 && listTime.map((item, index) => {
                                                    return (
                                                        <option value={item.value}>{item.label}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <select className='h-[34px] w-[120px] rounded-xl px-2'
                                                value={selectedAirlineCode}
                                                name='selectedAirlineCode'
                                                onChange={(event) => handleSelect(event, 'selectedAirlineCode')}
                                            >
                                                {listAirlineCode && listAirlineCode.length > 0 && listAirlineCode.map((item, index) => {
                                                    return (
                                                        <option value={item.value}>{item.label}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                        <div>
                                            <select className='h-[34px] w-[120px] rounded-xl px-2'
                                                value={selectedGroupClass}
                                                name='selectedGroupClass'
                                                onChange={(event) => handleSelect(event, 'selectedGroupClass')}
                                            >
                                                {listGroupClass && listGroupClass.length > 0 && listGroupClass.map((item, index) => {
                                                    return (
                                                        <option value={item.value}>{item.label}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                }
                                {listFights && listFights.length > 0 ?
                                    listFights.map((item) => {
                                        return (
                                            <DetailFight item={item} setListFightChoose={setListFightChoose} startName={startName} endName={endName} />
                                        )
                                    })
                                    :
                                    <div className='text-center mt-4 text-[18px] font-bold '>There are currently no flights, please choose another flight!</div>
                                }
                            </div>
                            {isOpen === true &&
                                <div className='col-span-3 bg-[#fff] ml-2 rounded-xl h-fit'>
                                    <div className='font-bold uppercase border-b border-[#ccc] p-3'>
                                        <span>your flights</span>
                                    </div>
                                    <div className='px-3 '>
                                        {listFightChoose && listFightChoose.length > 0 && listFightChoose.map((item, index) => {
                                            let formattedHourStart = new Date(item.StartDate).getHours()
                                            let formattedMinuterStart = new Date(item.StartDate).getMinutes()

                                            let formattedHourEnd = new Date(item.EndDate).getHours()
                                            let formattedMinuterEnd = new Date(item.EndDate).getMinutes()

                                            let formattedStartDate = new Date(item.StartDate).getTime()

                                            let dayStart = moment(formattedStartDate).format('ddd, DD MMMM , YYYY')
                                            let timeStart = `${formattedHourStart}:${formattedMinuterStart}`
                                            let timeEnd = `${formattedHourEnd}:${formattedMinuterEnd}`

                                            let duration = (item.Duration)

                                            let timeDuration = timeConvert(duration)
                                            let backgroundImage
                                            if (item.AirlineCode === 'VJ') {
                                                backgroundImage = 'bg-vietjetAir bg-contain h-[30px] w-[30px] bg-no-repeat'
                                            }
                                            if (item.AirlineCode === 'VN') {
                                                backgroundImage = 'bg-vietnamAirlines bg-cover h-[30px] w-[30px] object-contain'
                                            }
                                            if (item.AirlineCode === 'QH') {
                                                backgroundImage = 'bg-bamboo bg-cover h-[30px] w-[30px] object-contain'
                                            }

                                            return (
                                                <div className='border-b border-[#ccc] pb-2 mt-2'>
                                                    <div className='flex items-center gap-2 mb-3 flex-1'>
                                                        <div className='bg-[#979797] bg-cover h-[30px] w-[30px] object-contain rounded-[50%] flex justify-center items-center'>
                                                            <span className='font-bold text-white'>{index + 1}</span>
                                                        </div>
                                                        <div className='flex flex-col flex-1'>
                                                            <span className='text-[12px]'>{dayStart}</span>
                                                            <div className='text-[14px] '>
                                                                <span className='font-bold'>{startName} - {endName}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center gap-2 '>
                                                        <div className={`${backgroundImage}`}
                                                        >
                                                        </div>
                                                        <div className='flex flex-col'>
                                                            <span className='font-bold uppercase tracking-widest text-[14px]'>
                                                                {item.name}
                                                            </span>
                                                            <div className='text-[12px] '>
                                                                <span className='underline text-primary font-bold'>Detail</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-1 justify-between mt-3 items-center'>
                                                        <div className='flex flex-1 flex-col '>
                                                            <div className='font-bold text-[14px]'>
                                                                {timeStart}
                                                            </div>
                                                            <div className='w-[33px] h-[21px] bg-[#edecff] rounded-[12px] flex justify-center items-center' >
                                                                <span className='text-[10px] font-bold'>{item.StartPoint}</span>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-1 justify-center flex-col items-center'>
                                                            <div className='text-[14px]'>
                                                                {timeDuration}
                                                            </div>
                                                            <div className='flex items-center'>
                                                                <div className='w-[7px] h-[7px] border border-primary rounded-[70%]'>

                                                                </div>
                                                                <div className='border-b border-primary h-[0px] w-[150px]'></div>


                                                                <div className='w-[7px] h-[7px] border border-primary rounded-[70%] bg-primary'>

                                                                </div>
                                                            </div>
                                                            <div className='text-[12px]'>
                                                                Direct
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-1 flex-col items-end '>
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
                                                    <div className='bg-[#edecff] text-center rounded-xl px-[16px] py-[10px] mt-3 flex items-center justify-center'>
                                                        <span className='text-primary font-bold text-[12px]'>Change departure flight</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className='bg-[#F8F8F8] rounded-b-lg text-[14px]'>
                                        <div className='flex flex-col p-3'>
                                            <span>Subtotal</span>
                                            <span className='font-bold text-orange'>
                                                <NumberFormat
                                                    value={totalFeeChoose}
                                                    displayType={'text'}
                                                    thousandSeparator={true} suffix={' vnd'}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default FightSchedule