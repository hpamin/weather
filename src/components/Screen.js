import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { WeatherContext } from '../context/WeatherProvider';


// import required modules
import { toast } from 'react-toastify';

/********Imgs*******/
import useWindowDimensions from './Getwidthscreen';
import FullScreen from './responsive/FullScreen';
import MobileScreen from './responsive/MobileScreen';


export default function Screen() {
  
  const {inputCity, cityName} = useContext(WeatherContext)
  
  const [weatherDataList , setWeatherDataList] = useState([])
  const [weatherCity , setWeatherCity] = useState([])
  
  const [cityDetails , setCityDetails] = useState()

  
  const {width } = useWindowDimensions();

  async function weatherApi(){
    try{
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&appid=2cf19acef7a6417bb0f37c51286a055b&units=metric&cnt=7`)
      setWeatherDataList(data.list);
      setWeatherCity(data.city);
      console.log(weatherCity);
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
    <section className='w-screen h-screen bg-cover bg-SkyBg '>
      {width > 768 ?  
        <div className='flex justify-center items-center'>
          <FullScreen cityDetails={cityDetails}  weatherDataList={weatherDataList} setCityDetails={setCityDetails}  />
        </div>
      :  
        <MobileScreen weatherDataList={weatherDataList}/>
      }
    </section>
  )
}
