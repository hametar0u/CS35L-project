import { Link } from "react-router-dom";

const FindUser = () => {
  return (
    <div className="p-10">
      <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/home">Back</Link>
        <div className="flex justify-left sm:justify-center w-full pt-40 pb-10">   
        <div className="flex flex-col gap-2 sm:gap-5 w-3/4 max-w-5xl">
        <div className="font-serif text-xl text-blue">
          Find a similar user
        </div>
        <div className="">
        please add some text here
        </div>
        </div> 
        </div>
    </div>
  );
};

export default FindUser;