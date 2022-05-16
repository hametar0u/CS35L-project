import { useState, useCallback } from "react";
import axios from "axios";
import { useThrottle } from "../hooks/useThrottle";
import { useDebounce } from "../hooks/useDebounce";

const SearchBarProto = (props) => {
  const [searchResults, setSearchResults] = useState([]);

  const jikanFilter = async (val) => {
    if (!val) {
      setSearchResults([]);
      return;
    }

    const obj = {
      anime: val
    };

    await axios
      .post("/listings/jikanInfo", obj, {
        withCredentials: true
      })
      .then((response) => {
        console.log(response);
        setSearchResults(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const throttledFn = useThrottle(jikanFilter);
  const memoizedThrottle = useCallback(throttledFn, [throttledFn]);
  const debouncedFn = useDebounce(jikanFilter);
  const memoizedDebounce = useCallback(debouncedFn, [debouncedFn]);

  const handleChange = (e) => {
    const { value: newVal } = e.target;
    newVal.length > 3 ? memoizedDebounce(newVal) : memoizedThrottle(newVal);
  };


  return (
    <>
    <div className="bg-light-blue rounded-lg">
      <div className="rounded-full m-2 p-2">
          <input className="rounded-lg pl-2 pr-2 w-1/3" type="text" placeholder="Search Anime" onChange={handleChange}></input></div>
        <div>
          {searchResults && searchResults.map((result, i) => {
            return (
              <div className="pt-5 pb-5">
                  <div className="pl-5" key={result.malId}>
                  <div className="flex flex-row gap-2">
                    <button className="bg-light-purple w-5 h-5 items-center align-center rounded-full text-xs" onClick={() => props.addAnime(result.malId)}>+</button>
                    <p className="">{result.title}</p>
                  </div>
                </div>
              </div>
              
            );
          })}
        </div>
      
    </div>
    
    </>
  );

};

export default SearchBarProto;