import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useThrottle } from "../hooks/useThrottle";
import { useDebounce } from "../hooks/useDebounce";

const SearchBarProto = (props) => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const searchFilter = async (val) => {
    if (!val) {
      setSearchResults([]);
      return;
    }

    const obj = {
      anime: val, //hacky solution since each call only uses one of these fields
      username: val,
      club_name: val
    };

    let url;
    if (props.type === "MALuser") {
      url = "/listings/getUserById";
    }
    else if (props.type === "DBuser") {
      url = "/listings/getUserById"; //TODO: ROUTE NOT THERE YET
    }
    else { //anime
      url = "/listings/jikanInfo";
    }


    await axios
      .post(url, obj, {
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

  const throttledFn = useThrottle(searchFilter);
  
  const memoizedThrottle = useCallback(throttledFn, [throttledFn]);
  const debouncedFn = useDebounce(searchFilter);
  const memoizedDebounce = useCallback(debouncedFn, [debouncedFn]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    searchInput.length > 3 ? memoizedDebounce(searchInput) : memoizedThrottle(searchInput);
  }, [searchInput.length]);


  return (
    <>
    <div className="bg-light-blue rounded-lg">
      <div className="rounded-full m-2 p-2">
          <input className="rounded-lg pl-2 pr-2 w-max" type="text" placeholder={"Search " + props.name} onChange={handleChange}></input></div>
        <div>
          {searchResults && searchResults.map((result, i) => {
            return (
              <div className="pt-5 pb-5" key={result.malId}>
                  <div className="pl-5">
                  <div className="flex flex-row gap-2">
                    <button className="bg-light-purple w-5 h-5 items-center align-center rounded-full text-xs" onClick={() => {props.addAnime(result.malId); setSearchInput('')}}>+</button>
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