import React from 'react'
import useWindowDimensions from './Getwidthscreen'

export default function Citydetailsdata({cityDetails}) {

  return (
    <div className='w-full h-2/4 p-5 pr-10 pl-10'>
            <div className='flex gap-2 rounded-xl bg-slate-300  mb-5 mt-5 justify-center'>
              <h2 className='text-2xl font-bold font-mono'> Date:  </h2>
              <h3 className='text-2xl font-bold font-mono'> {(cityDetails.dt_txt || "").substring(0,10).replace(/-/g , "/")} </h3>
            </div>
            <div className='flex gap-2 rounded-xl bg-slate-300 mb-5 text-center justify-center'> 
              <h2 className='text-2xl font-bold font-mono'> Time: </h2>
              <h3 className='text-2xl font-bold font-mono'>{(cityDetails.dt_txt || "").substring(10,16)}  </h3> 
            </div>
          <div className='SearchCityData p-2 w-full h-full flex justify-around items-baseline mt-24 '>

              <div className='flex flex-col items-center gap-5 '>
                    <h2 className='text-4xl font-bold text-slate-200'>Wind</h2>
                <div>
                    <h2 className='text-cyan-100  font-bold text-2xl mb-2'> Speed : </h2>
                    <h3 className='text-slate-200 text-xl'> {cityDetails.wind.speed}Km/h </h3>
                </div>
                <div>
                    <h2 className='text-cyan-100 font-bold  text-2xl mb-2'>degree :</h2>
                    <h3 className='text-slate-200 text-xl'> {cityDetails.wind.deg} deg </h3>
                </div>
                <div>
                  <h2 className='text-cyan-100 font-bold  text-2xl mb-2'>gust :</h2>
                  <h3 className='text-slate-200 text-xl'> {cityDetails.wind.gust}Km/h </h3>
                </div>
              </div>

              <div className='flex flex-col items-center gap-5 '>
                <h2 className='text-4xl font-bold text-slate-200'> Weather </h2>
                <div>
                  <h2 className='text-cyan-100 font-bold  text-2xl mb-2'> main : </h2>
                  <h3 className='text-slate-200 text-xl'> {cityDetails.weather[0].main} </h3>
                </div>
                <div>
                  <h2 className='text-cyan-100 font-bold  text-2xl mb-2'> description: </h2>
                  <h3 className='text-slate-200 text-xl'> {cityDetails.weather[0].description} </h3>
                </div>
              </div>

              <div className='flex flex-col items-baseline gap-5 '>
                <h2 className='text-4xl font-bold text-slate-200 '>Temp</h2>
                <div>
                  <h2 className='text-cyan-100 font-bold  text-2xl mb-2'>Temp: </h2>
                  <h3 className='text-slate-200 text-xl'> {cityDetails.main.temp} </h3>
                </div>
                <div>
                  <h2 className='text-cyan-100 font-bold  text-2xl mb-2'>humidity: </h2>
                  <h3 className='text-slate-200 text-xl'> {cityDetails.main.humidity}% </h3>
                </div>
                <div>
                  <h2 className='text-cyan-100 font-bold  text-2xl mb-2'>Sea level</h2>
                  <h3 className='text-slate-200 text-xl'> {cityDetails.main.sea_level} </h3>
                </div>
              </div>

          </div>  

          </div>
  )
}
