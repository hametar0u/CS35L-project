import { Link } from "react-router-dom";

const doClick = () => {
  window.location.href = "https://www.fbi.gov/services";
}

const Contact = () => {
  return (
    <div className="p-10">
      <Link className="bg-blue rounded-full m-2 p-2 text-white" to="/home">Back</Link>
        <div className="flex justify-left sm:justify-center w-full pt-40 pb-10">   
        <div className="flex flex-col gap-2 sm:gap-5 w-3/4 max-w-5xl">
        <div className="font-serif text-xl text-blue">
          Let's get in touch!
        </div>
        <div className="">
        We would love to help you in any way we can. If you have any feedback or concerns, do not hesitate to reach out.
        </div>
        <div className="">
        Our team will promptly respond to you within 50 business weeks.  
        </div>
        <button className="bg-mint rounded-full hover:shadow-md w-1/4" onClick={doClick}>Contact us</button>
        </div> 
        </div>
    </div>
  );
};

export default Contact;