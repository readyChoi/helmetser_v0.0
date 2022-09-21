import React, { useState } from "react";
import { useEffect } from "react"
import App from "../App";

// export const RNListener = () => {
//     /** react native 환경에서만 가능 */
//     const listener = (event:any) => {
//       const { data, type } = JSON.parse(event.data);
//       if (type === "TOKEN") {
//         // type이 TOKEN이기 때문에 이곳에 콘솔이 찍히게 됩니다.
//         console.log(data) // xxxxx
//       } else if (type === "NOTIFICATION") {
//       }
//     };

//     // if (window.ReactNativeWebView) {
//     //   /** android */
//     //   document.addEventListener("message", listener);
//     //   /** ios */
//     //   window.addEventListener("message", listener);
//     // } else {
//     //   // 모바일이 아니라면 모바일 아님을 alert로 띄웁니다.
//     //   alert({ message: ERROR_TYPES.notMobile });
//     // }
// };


export const RNListener = () => {
  const [token, setToken] = useState(null);
  
  useEffect(() => {
    if (window.ReactNativeWebView) {
      console.log('set RN message Listener')
      // android
      document.addEventListener("message", listener);
      // ios
      window.addEventListener("message", listener);
    }

    return () => {
      document.removeEventListener("message", listener);
      window.removeEventListener("message", listener);
    }
  }, [])

  const listener = (event: any) => {
    // console.log(JSON.parse(event.data));
    const { data, type } = JSON.parse(event.data);

    if (type === "TOKEN") {
      // console.log('TOKEN??', data)
      setToken(data);
    } else if (type === "NOTIFICATION") {
      // console.log('NOT TOKEN!!')
    }
  };

  return (
    <React.Fragment>
      <App token={token}/>
    </React.Fragment>
  )
}