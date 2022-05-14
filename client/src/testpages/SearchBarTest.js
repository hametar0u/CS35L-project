import { useState, useCallback } from "react";
import axios from "axios";
import { useThrottle } from "../hooks/useThrottle";

const SearchBarProto = () => {
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

  const handleChange = (e) => {
    const { value: newVal } = e.target;
    memoizedThrottle(newVal);
  };

  const addAnime = (malId) => {
    console.log(`add anime with id ${malId}`);
  }

  return (
    <>
    <div className="bg-bermuda rounded-full m-2 p-2">
        <input type="text" placeholder="Jikan Filter" onChange={handleChange}></input></div>
      <div>
        {searchResults && searchResults.map((result, i) => {
          return (
            <div key={result.malId}>
              <p>{result.title}</p>
              <button onClick={() => addAnime(result.malId)}>add</button>
            </div>
          );
        })}
      </div>
    </>
  );

};

export default SearchBarProto;