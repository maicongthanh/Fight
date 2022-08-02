/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft, faCalendarDays, faArrowRightLong } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import { getAllFlightsService } from './services/FlightsService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Footer from './components/Footer';
import Header from './components/Header';
function App() {

  const navigate = useNavigate()

  const [listFights, setListFights] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)

  const [listSearch, setListSearch] = useState([])
  const [listStartPoint, setListStartPoint] = useState([])
  const [listEndPoint, setListEndPoint] = useState([])

  const [state, setState] = useState({
    selectFrom: '',
    selectTo: '',

    selectStartDate: '',
    selectEndDate: ''
  })

  const { selectFrom, selectTo, selectStartDate, selectEndDate } = state

  const handleSelectStartDay = (date) => {
    setState({
      ...state,
      selectStartDate: date.getTime()
    })
  }

  const handleSelectEndDay = (date) => {
    setState({
      ...state,
      selectEndDate: +date.getTime() + 24 * 60 * 60 * 1000 - 1000
    })
  }

  const fetchAllFights = async () => {
    let res = await getAllFlightsService()
    if (res && res.status === +200) {
      setListFights(res.Flights)
    }
  }

  useEffect(() => {
    fetchAllFights()
  }, [])

  useEffect(() => {
    if (listFights && listFights.length > 0) {
      let data1 = listFights.map(item => {
        let labelStartPoint
        if (item.StartPoint === 'SGN') {
          labelStartPoint = 'Ho Chi Minh'
        }

        return {
          label: labelStartPoint,
          value: item.StartPoint
        }
      })
      if (data1) {
        const result = data1.reduce((finalArray, current) => {
          let obj = finalArray.find((item) => item.label === current.label)
          if (obj) {
            return finalArray;
          } else {
            return finalArray.concat([current])
          }
        }, [])
        if (result) {
          setListStartPoint(result)
        }
      }

      let data2 = listFights.map(item => {
        let labelEndPoint
        if (item.EndPoint === 'HPH') {
          labelEndPoint = 'Hai Phong'
        }
        return {
          label: labelEndPoint,
          value: item.EndPoint
        }
      })
      if (data2) {
        const result = data2.reduce((finalArray, current) => {
          let obj = finalArray.find((item) => item.label === current.label)
          if (obj) {
            return finalArray;
          } else {
            return finalArray.concat([current])
          }
        }, [])
        if (result) {
          setListEndPoint(result)
        }
      }

    }
  }, [listFights])

  useEffect(() => {
    if (listStartPoint && listStartPoint.length > 0 && listEndPoint && listEndPoint.length > 0) {
      setState({
        ...state,
        selectFrom: listStartPoint[0],
        selectTo: listEndPoint[0]
      })
    }
  }, [listStartPoint, listEndPoint])


  const handleSubmit = () => {
    if (!selectStartDate || !selectEndDate) {
      toast.warning('Please select a date')
      return;
    }
    if (selectStartDate > selectEndDate) {
      toast.warning('Start date must be less than end date')
      return;
    }

    if (selectStartDate < selectEndDate) {
      setIsSubmit(true)
      let data = listFights.filter(item => {
        let formattedStartDate = new Date(item.StartDate).getTime()
        let formattedEndDate = new Date(item.EndDate).getTime()
        if (selectStartDate < formattedStartDate && selectEndDate > formattedEndDate) {
          return item
        }
      })
      if (data) {
        setListSearch(data)

      }
    }
  }

  const handleSelect = (event, name) => {
    setState({
      ...state,
      [name]: event.target.value
    })
  }

  useEffect(() => {
    if (isSubmit === true) {
      navigate('fight-schedule', { state: { listSearch, selectTo, selectFrom, selectStartDate, selectEndDate } })
    }
  }, [isSubmit])

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='bg-[url("../public/img/background.jpg")] bg-cover h-[700px] w-full object-contain' >
        <div className='flex flex-col mx-[150px] justify-between h-full'>
          <Header />
          <div className='text-7xl font-extralight'>
            <div>
              Hello !
            </div>
            <div>
              Where are
            </div>
            <div>
              you <span className='text-primary font-bold'>flying</span> to ...
            </div>
          </div>

          <div className='bg-[#fff] w-[100%] min-h-[220px] rounded-xl relative top-12 shadow-[0_4px_30px_rgba(77,70,250,0.1)] p-5 flex flex-col gap-5'>
            <div className='flex gap-8 text-[14px] font-bold'>
              <div className='flex gap-2 font-bold'>
                <input type="radio" className='h-[24px] w-[24px] rounded-[100%]' />
                One way / Round-trip
                <input type="radio" className='h-[24px] w-[24px] rounded-[100%]' checked />
                Multi-city
              </div>
              <div>
                <select >
                  <option value="" key="">
                    <span>02</span> Adult , <span>01</span> children
                  </option>
                </select>
              </div>
              <div>
                <select>
                  <option value="" key="">Business Class</option>
                </select>
              </div>
            </div>

            <div className='grid lg:grid-cols-2 items-center relative gap-5'>
              <div className='flex relative items-center w-[100%]'>
                <div className='border-[2px] w-[100%] h-[100px] rounded-[12px] py-2 px-3 hover:border-primary hover:border-[2px]'>
                  <div className='text-[12px] font-bold tracking-widest opacity-50'>FROM</div>
                  <div className='font-bold text-[24px] text-primary' >
                    <select className='relative right-1 appearance-none w-[100%] outline-none cursor-pointer '>
                      {listStartPoint && listStartPoint.length > 0 &&
                        listStartPoint.map((item) => {
                          return (
                            <option value={item.value}>{item.label}</option>
                          )
                        })
                      }

                    </select>
                  </div>
                  <div className='font-bold text-[14px]'>Viet Nam</div>
                </div>


                <div className='w-[60px] h-[60px] bg-[#C4C4C4] rounded-[100px] absolute right-[48%]' >
                  <div className='w-[60px] h-[60px] bg-[#fff] rounded-[100px] flex justify-center items-center' >
                    <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                  </div>
                </div>

                <div className='border-[2px] w-[100%] h-[100px] rounded-[12px] py-2 px-10 ml-5 cursor-pointer hover:border-primary hover:border-[2px]'>
                  <div className='text-[12px] font-bold tracking-widest opacity-50'>TO</div>
                  <div className='font-bold text-[24px] text-primary' >
                    <select className='relative right-1 appearance-none w-[120%] outline-none cursor-pointer'
                      value={selectFrom}
                      name='selectFrom'
                      onChange={(event) => handleSelect(event, 'selectFrom')}
                    >
                      {listEndPoint && listEndPoint.length > 0 &&
                        listEndPoint.map((item) => {
                          return (
                            <option value={item.value}>{item.label}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                  <div className='font-bold text-[14px]'>Viet Nam</div>
                </div>
              </div>

              <div className='flex border-[2px] w-[100%] h-[100px] rounded-[12px] py-2 px-3 '>
                <div className='w-[50%]'>
                  <div className='text-[12px] font-bold tracking-widest opacity-50 uppercase' >Departure</div>
                  <div className='font-bold text-[24px] text-primary flex items-center '  >
                    <DatePicker
                      selected={selectStartDate}
                      onChange={(date) => handleSelectStartDay(date)}
                      dateFormat="d MMMM , yyyy"
                      className='w-[100%] cursor-pointer outline-none'
                    />
                    <FontAwesomeIcon icon={faCalendarDays} className='relative right-8 text-[16px]' />
                  </div>
                  <div className='flex gap-2 font-bold'>
                    <span className='underline'>Prev</span>
                    <span className='opacity-40'>Next</span>
                  </div>
                </div>
                <div className='w-[50%]'>
                  <div className='text-[12px] font-bold tracking-widest opacity-50 uppercase'>Return</div>
                  <div className='font-bold text-[24px] text-primary flex items-center' >
                    <DatePicker
                      selected={selectEndDate}
                      onChange={(date) => handleSelectEndDay(date)}
                      dateFormat="d MMMM , yyyy"
                      className='w-[100%] cursor-pointer outline-none'

                    />
                    <FontAwesomeIcon icon={faCalendarDays} className='relative right-8 text-[16px]' />
                  </div>
                  <div className='flex gap-2 font-bold'>
                    <span className='opacity-40'>Prev</span>
                    <span className='opacity-40'>Next</span>
                  </div>
                </div>
              </div>
            </div>


            <div className='flex justify-end mt-[10px] px-5 absolute right-0 bottom-[-12%]'>
              <button className='bg-primary text-white font-semibold py-2 px-4 rounded-xl w-[245px] h-[60px] flex justify-between items-center text-[18px]'
                onClick={handleSubmit}
              >
                Search Flights
                <FontAwesomeIcon icon={faArrowRightLong} />
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>


  );
}

export default App;
