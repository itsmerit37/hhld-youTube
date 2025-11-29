'use client'
import React, {useState } from 'react'
import ReactPlayer from 'react-player'
const Room = () => {
    

   const [userStream, setUserStream] = useState();


   const callUser = async () => {
       const stream = await navigator.mediaDevices.getUserMedia({
           audio: true,
           video: true
       })
       setUserStream(stream);
    }
  return (
    <div>
         <button type="button"
               onClick={callUser}
               class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 m-10">Stream</button>
        
    <div>
    <ReactPlayer src='https://www.youtube.com/watch?v=LXb3EKWsInQ'
    controls={true}/>
    </div>
    </div>
  )
}

export default Room