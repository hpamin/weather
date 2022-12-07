import React, { useContext, useState } from "react";
import { WeatherContext } from "../context/WeatherProvider";

const Autocomplete = (props) => {
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [input, setInput] = useState("");
  
  const {setInputCity} = useContext(WeatherContext)

  const onChange = e => {
    const { suggestions } = props;
    const input = e.currentTarget.value;
    const newFilteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setActive(0);
    setFiltered(newFilteredSuggestions);
    setIsShow(true);
    setInput(e.currentTarget.value)
  };
const onClick = e => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText)
    setInputCity(e.currentTarget.innerText)

  };
const onKeyDown = e => {
    if (e.keyCode === 13) { // enter key
      setActive(0);
      setIsShow(false);
      setInput(filtered[active])
      setInputCity(input)
    }
    else if (e.keyCode === 38) { // up arrow
      return (active === 0) ? null : setActive(active - 1);
    }
    else if (e.keyCode === 40) { // down arrow
      return (active - 1 === filtered.length) ? null : setActive(active + 1);
    }
  };
const renderAutocomplete = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <ul className="autocompleteUl bg-slate-300 w-full max-h-full overflow-y-scroll pr-5 mt-1">
            {filtered.map((suggestion, index) => {
              let className;
              if (index === active) {
                className = "active";
              }
              return (
                <li className='text-slate-800 cursor-pointer px-5 py-1 hover:text-slate-700 hover:bg-slate-200  duration-150 ease-in' key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className=" bg-slate-400 h-12 pr-5 rounded-2xl mt-5 flex items-center justify-center">
            <em className="text-slate-50 px-5 py-1">Not found</em>
          </div>
        );
      }
    }
    return <></>;
  }
return (
    <div className="w-full h-3/5">
      <input
        type="text"
        className='w-full h-14 px-5 outline-none bg-transparent border-b-4 focus:text-gray-300 hover:shadow-lg hover:border-r-sky-200 duration-300 text-slate-200 placeholder:text-slate-700'
        placeholder="Search a country"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      {renderAutocomplete()}
    </div>
  );
}
export default Autocomplete;