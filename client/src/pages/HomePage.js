import { useContext } from "react";
import { useState, useEffect } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import axios from "axios";
import Animes from "../components/AnimeCard";
import MinList from "../components/MinList";
import Navbar from "../components/Navbar/index";
import NewList from "../components/NewList";
import Modal from "../components/Modal";
import Nav from "../components/Nav";
import { ZoomInWrapper, SlidingWrapper } from "../components/MotionComponents";
import WarningModal from "../components/WarningModal";

//helper func
const getDifference = (array1, array2) => {
  return array1.filter((object1) => {
    return !array2.some((object2) => {
      return object1.id === object2.id;
    });
  });
};


const HomePage = () => {
  //main component
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios.post("/CheckIfNewUser", {}, { withCredentials: true })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err.response);
    })
  }, []);


  const modalOptions = {
    title: "Want unlimited lists?",
    body: "Join Our Anime List Premium for the low low price of $99999999999!",
    buttonText: "Join OAL Premium"
  };

  const handleModalButtonClick = () => {
    console.log("do click");
        window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
  };

  const doClick = () => {
    setOpen(!open);
  };

  // if(open) {
  return (
    <ZoomInWrapper className="w-full">
      <div className="h-screen w-screen bg-gradient-to-r from-background-mint via-background-blue to-white animate-bg">
        <div className="p-10">
          {/* <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/home">Back</Link> */}
          <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">
            <div className="flex flex-col gap-2 sm:gap-5 w-3/4 max-w-5xl">
              <div className="font-serif text-xl text-blue">Home</div>
              <div className="flex flex-row gap-5">
                <MinList/>
                <NewList onClick={doClick} />
              </div>
            </div>
          </div>
          {/* <div className="absolute top-0 left-0 pt-50 pl-105"> */}
          <Modal 
            showModal={open} 
            closeModal={() => setOpen(false)} 
            modalOptions={modalOptions}
            handleClick={handleModalButtonClick}
          />
          {/* </div>               */}
        </div>
      </div>
    </ZoomInWrapper>
  );
  // }
  // else {
  //   return(
  //     <ZoomInWrapper>
  //     <div>
  //             {/* <Nav /> */}
  //             <div className="p-10">
  //             <div className="flex justify-left sm:justify-center w-full pt-10 pb-10">
  //                 <div className="flex flex-col gap-12 sm:gap-16 w-3/4 max-w-5xl">
  //                 <div className="font-serif text-xl text-blue">
  //                   Our Anime List Home
  //                 </div>
  //                 <div className="flex flex-row gap-10">
  //                   <MinList/>
  //                   <NewList onClick={doClick}/>
  //                 </div>
  //                 </div>
  //             </div>
  //           </div>
  //     </div>
  //     </ZoomInWrapper>
  //   );
  // }
};

export default HomePage;
