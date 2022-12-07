import React, { useContext } from 'react'
import { WeatherContext } from '../../context/WeatherProvider'
import Autocomplete from '../Autocomplete'
import Citydetailsdata from '../Citydetailsdata'
import CurrentTime from '../CurrentTime'
import InputSearchdata from '../InputSearchdata'


export default function FullScreen({cityDetails, weatherDataList, setCityDetails }) {
    
    const {inputCity,cityName} = useContext(WeatherContext)

  return (
    <>
        <div className='w-7/12 h-screen '>
          
          <CurrentTime />
          {cityDetails ? 
            (
              <Citydetailsdata cityDetails={cityDetails}  />
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
      </>
  )
}
