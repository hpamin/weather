import React, { createContext, useState } from 'react'

export const WeatherContext = createContext()

export default function WeatherProvider({children}) {

    const [inputCity , setInputCity] = useState("tehran")
    const cityName = []

  return (
    <WeatherContext.Provider value={{inputCity, setInputCity,cityName}}>
        {children}
    </WeatherContext.Provider>
  )
}
