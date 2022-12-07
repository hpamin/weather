import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { WeatherContext } from '../context/WeatherProvider';
import Autocomplete from './Autocomplete'


// import required modules
import { toast } from 'react-toastify';

/********Imgs*******/
import CurrentTime from './CurrentTime';
import Citydetailsdata from './Citydetailsdata';
import InputSearchdata from './InputSearchdata';

export default function Screen() {
  
  const {inputCity, cityName} = useContext(WeatherContext)
  
  const [weatherDataList , setWeatherDataList] = useState([])
  const [weatherCity , setWeatherCity] = useState([])
  
  const [cityDetails , setCityDetails] = useState()

  async function weatherApi(){
    try{
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&appid=2cf19acef7a6417bb0f37c51286a055b&units=metric&cnt=7`)
      setWeatherDataList(data.list);
      setWeatherCity(data.city);
    }catch{
      toast.error("please check your connection or use VPN !!",{
        position: "top-left",
      })
    }
  }
  

  useEffect(()=>{
    weatherApi()
  },[inputCity])
  

  return (
    <section className='w-screen min-h-screen  flex justify-center items-center bg-cover bg-SkyBg '>
      <div className='w-7/12 h-screen '>
        <CurrentTime />
        {cityDetails ? 
          (
            <Citydetailsdata cityDetails = {cityDetails}  />
          ) 
          : (
            <div className='w-full h-3/4 flex justify-center items-center'>
              <h2 className='text-slate-200 text-3xl font-bold'>To see more Details Click 'click more' !</h2>
            </div>
          )
        }

      </div>
      <div className='SearchCityData w-5/12 h-screen p-7 flex flex-col items-center justify-evenly' >
        <div className='w-full h-3/6'>
            {inputCity ?  <h2 className='text-4xl text-slate-200 font-bold text-center mb-5'> {inputCity} weather </h2> : 
            (<h2 className='text-4xl text-slate-200 font-bold text-center mb-5'> Search City of Iran </h2>)  }
            
            <Autocomplete suggestions={cityName} />
        </div>
        <div className='w-full h-80 bg-slate-300 rounded-2xl p-5 flex justify-evenly gap-3 items-center flex-col'>

           <InputSearchdata weatherDataList={weatherDataList} setCityDetails={setCityDetails} />
        
        </div>
      </div>
    </section>
  )
}
