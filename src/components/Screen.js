import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { WeatherContext } from '../context/WeatherProvider';
import Autocomplete from './Autocomplete'

/***Swiper***/
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import { toast } from 'react-toastify';

/********Imgs*******/
import sunimg from '../img/icon/sun.png'
import couldimg from '../img/icon/cloud.png'
import cloudyimg from '../img/icon/cloudy.png'
import moderate from '../img/icon/moderate.png'
import snowimg from '../img/icon/snow.png'

export default function Screen() {
  
  const {inputCity, cityName} = useContext(WeatherContext)
  
  const [weatherDataList , setWeatherDataList] = useState([])
  const [weatherCity , setWeatherCity] = useState([])
  
  async function weatherApi(){
    try{
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&appid=2cf19acef7a6417bb0f37c51286a055b&units=metric&cnt=7`)
      setWeatherDataList(data.list);
      setWeatherCity(data.city);
      console.log(weatherCity);
      console.log(data);
      console.log(data.city);
      console.log(data.list);
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
    <section className='w-screen min-h-screen  flex justify-center items-center '>
      <div className='w-7/12 h-screen bg-cover bg-SkyBg'>
      </div>
      <div className='w-5/12 h-screen bg-slate-600 p-7 flex flex-col items-center justify-evenly' style={{boxShadow:'rgb(0 0 0 / 58%) 5px 0px 10px 0px inset'}} >
        <div className='w-full h-3/6'>
            {inputCity ?  <h2 className='text-4xl text-slate-200 font-bold text-center mb-5'> {inputCity} weather </h2> : 
            (<h2 className='text-4xl text-slate-200 font-bold text-center mb-5'> Search City of Iran </h2>)  }
            
            <Autocomplete suggestions={cityName} />
        </div>
        <div className='w-full h-80 bg-slate-300 rounded-2xl p-5 flex justify-evenly gap-3 items-center flex-col'>
        <Swiper 
             slidesPerView={3}
              spaceBetween={30}
              slidesPerGroup={3}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper w-full h-full"
            >

              {weatherDataList.map((item)=>
                <SwiperSlide key={item.dt}>
                    <div className="container flex flex-col items-center gap-2 " key={item.dt}>
                      <h3 className=''>{(item.dt_txt).substring(0,10).replace(/-/g , "/")}</h3>
                      <h4> {(item.dt_txt).substring(10,16)} </h4>
                      { item.weather[0].main === "Clouds" ?
                        (<img className='w-16' src={couldimg} />) :
                         item.weather[0].main === "Clear" ?
                        (<img className='w-16' src={sunimg} />) :
                         item.weather[0].main === "Snow" ?
                        (<img className='w-16' src={snowimg} /> ) :
                         item.weather[0].main === "Rain" ? 
                        (<img className='w-16' src={moderate} />) :
                  
                         <img className='w-16' src={cloudyimg} />                      
                      }
                        <h2 className='text-2xl font-bold'> {item.weather[0].main} </h2>
                      
                      <h3 className='text-xl '>{item.main.temp}</h3>  
                    <div className="overlay bg-slate-400/[0.9] flex items-center justify-center">
                      <button className='border-2 w-3/5 h-10 rounded-xl text-slate-200 hover:bg-slate-200 hover:text-slate-400 duration-200'> Click More</button>
                    </div>
                  </div>
                </SwiperSlide>
             )
             }

        </Swiper>
        </div>
      </div>
    </section>
  )
}
