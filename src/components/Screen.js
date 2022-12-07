import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { WeatherContext } from '../context/WeatherProvider';
import Autocomplete from './Autocomplete'


// import required modules
import { toast } from 'react-toastify';

/********Imgs*******/
import useWindowDimensions from './Getwidthscreen';
import FullScreen from './responsive/FullScreen';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination, Autoplay } from "swiper";

/*******img******/
import sunimg from '../img/icon/sun.png'
import couldimg from '../img/icon/cloud.png'
import cloudyimg from '../img/icon/cloudy.png'
import moderate from '../img/icon/moderate.png'
import snowimg from '../img/icon/snow.png'


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
      <>
          <div className='mobileScreenSearch w-screen h-2/6 flex flex-col justify-center items-center gap-5'>
            <h2 className='text-3xl font-bold text-slate-200'> {inputCity ? `${(inputCity || "").toUpperCase()} City`  : 'Search the City of Iran'  }  </h2>
                  <Autocomplete suggestions={cityName} />
          </div>  
          <Swiper
              slidesPerView={3}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter:true,
              }}
              modules={[Pagination,Autoplay]}
               breakpoints = {{
                  // when window width is >= 320px
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 20
                  },
                  // when window width is >= 480px
                  480: {
                    slidesPerView: 3,
                    spaceBetween: 30
                  },
                  // when window width is >= 640px
                  640: {
                    slidesPerView: 4,
                    spaceBetween: 40
                  }
                }}
              className="mySwiper"
            >
              {weatherDataList.map((item)=>
                <SwiperSlide className='mb-7' >
                    <div className="container h-80 px-5 py-5 mt-20 rounded-xl bg-slate-100/[0.4] flex flex-col items-center justify-evenly gap-2" key={item.dt}>
                      <div className='text-center'>
                          <h3 className=''>{(item.dt_txt).substring(0,10).replace(/-/g , "/")}</h3>
                          <h4> {(item.dt_txt).substring(10,16)} </h4>
                      </div>
                      
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
                      <div className='text-center'>
                          <h2 className='text-2xl font-bold'> {item.weather[0].main} </h2>
                          <h3 className='text-xl '>{item.main.temp}</h3> 
                      </div>

                        <h4 className='text-slate-700 text-center'>Click To see more!</h4>

                    <div className="overlay bg-slate-100 flex items-center justify-center">
                      <Swiper
                            slidesPerView={1}
                            pagination={{
                              clickable: true,
                            }}
                            modules={[Pagination]}                            
                            className="mySwiper h-full w-full"
                          >
                            <SwiperSlide>
                              <div className='w-full h-full flex flex-col items-center justify-center gap-5'>
                                <h2 className='text-2xl font-bold text-slate-500 '>About Temp</h2>
                                <div className='flex items-baseline gap-3'>
                                  <h2 className='text-cyan-800 font-bold  text-xl mb-2'>Temp: </h2>
                                  <h3 className='text-slate-800 text-lg'> {item.main.temp} </h3>
                                </div>
                                <div  className='flex items-baseline gap-3'>
                                  <h2 className='text-cyan-800 font-bold  text-xl mb-2'>humidity: </h2>
                                  <h3 className='text-slate-800 text-lg'> {item.main.humidity}% </h3>
                                </div>
                                <div  className='flex items-baseline gap-3'>
                                  <h2 className='text-cyan-800 font-bold  text-xl mb-2'>Sea level: </h2>
                                  <h3 className='text-slate-800 text-lg'> {item.main.sea_level} </h3>
                                </div>
                              </div>
                            </SwiperSlide>
                            <SwiperSlide>
                              <div className='w-full h-full flex flex-col items-center justify-center gap-5'>
                                    <h2 className='text-2xl font-bold text-slate-500'>About Wind</h2>
                                <div className='flex items-baseline gap-3'>
                                    <h2 className='text-cyan-800 font-bold  text-xl mb-2'> Speed : </h2>
                                    <h3 className='text-slate-800 text-lg'> {item.wind.speed}Km/h </h3>
                                </div>
                                <div className='flex items-baseline gap-3'>
                                    <h2 className='text-cyan-800 font-bold  text-xl mb-2'>degree :</h2>
                                    <h3 className='text-slate-800 text-lg'> {item.wind.deg} deg </h3>
                                </div>
                                <div className='flex items-baseline gap-3'>
                                  <h2 className='text-cyan-800 font-bold  text-xl mb-2'>gust :</h2>
                                  <h3 className='text-slate-800 text-lg'> {item.wind.gust}Km/h </h3>
                                </div>
                              </div>
                            </SwiperSlide>
                            <SwiperSlide>
                              <div className='flex flex-col items-center gap-5 '>
                                <h2 className='text-2xl font-bold text-slate-500'>About Weather </h2>
                                <div className='flex items-baseline gap-3'>
                                  <h2 className='text-cyan-800 font-bold text-xl mb-2'> main : </h2>
                                  <h3 className='text-slate-800 text-lg'> {item.weather[0].main} </h3>
                                </div>
                                <div className='flex items-baseline gap-3'>
                                  <h2 className='text-cyan-800 font-bold text-xl mb-2'> description: </h2>
                                  <h3 className='text-slate-800 text-lg'> {item.weather[0].description} </h3>
                                </div>
                              </div>
                            </SwiperSlide>

                          </Swiper>
                    </div>
                  </div>
                </SwiperSlide>
             )
             }
          </Swiper>
      </>
      }
    </section>
  )
}
