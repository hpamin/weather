import React from 'react'

/***Swiper***/
import { Swiper, SwiperSlide } from "swiper/react";

/****import required modules****/
import { Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

/*******img******/
import sunimg from '../img/icon/sun.png'
import couldimg from '../img/icon/cloud.png'
import cloudyimg from '../img/icon/cloudy.png'
import moderate from '../img/icon/moderate.png'
import snowimg from '../img/icon/snow.png'

export default function InputSearchdata({weatherDataList , setCityDetails}) {
  return (
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

              {weatherDataList.map((item, index)=>
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
                      <button 
                        className='border-2 w-3/5 h-10 rounded-xl text-slate-200 hover:bg-slate-200 hover:text-slate-400 duration-200' 
                        value={index} 
                        onClick={()=> {setCityDetails(item) }}> Click More</button>
                    </div>
                  </div>
                </SwiperSlide>
             )
             }

        </Swiper>
  )
}
