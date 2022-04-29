import { useEffect } from "react";

const HomePage = (props) => {
  // useEffect(
  //   () => {
  //     const getAccessToken = async () => {
  //       const params = {
  //         code: props.code,
  //         state: props.state
  //       };
        
  //       const response = await axios.post("/auth/token", params);
  //       const json = await response.data;
  //       console.log(json);
  //     }

  //     await getAccessToken();
  //   }
  // );

  return(
    <div>
      hi
      <p>{props.code}</p>
      <p>{props.state}</p>
    </div>
  );
}

export default HomePage;