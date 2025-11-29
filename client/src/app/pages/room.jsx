'use client'
import React, { useState, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const Room = () => {
  const [userStream, setUserStream] = useState(null);
  const videoRef = useRef(null);

  // attach stream to video element whenever it changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      if (userStream) {
        video.srcObject = userStream;
        // try to play (some browsers require user gesture)
        const playPromise = video.play();
        if (playPromise && playPromise.catch) {
          playPromise.catch(() => {
            // autoplay failed — user gesture required; that's fine
          });
        }
      } else {
        // if stream is removed, clear srcObject
        video.srcObject = null;
      }
    }

    // cleanup when component unmounts: stop tracks
    return () => {
      if (userStream) {
        userStream.getTracks().forEach((t) => t.stop());
      }
    }
  }, [userStream]);

  const streamUser = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: { width: 1280, height: 720 }
      });
      setUserStream(stream);
    } catch (err) {
      console.error("getUserMedia error:", err);
      alert("Could not access camera/mic. Check permissions.");
    }
  };

  const stopStream = () => {
    if (userStream) {
      userStream.getTracks().forEach((track) => track.stop());
      setUserStream(null);
    }
  };

  return (
    <div className="p-6">
      {/* External video (YouTube) */}
      <div className="mb-6">
        <ReactPlayer
          src="https://www.youtube.com/watch?v=LXb3EKWsInQ"
          width="640px"
          height="360px"
          controls={true}
        />
      </div>

      {/* Controls */}
      <div className="mb-4">
        <button
          type="button"
          onClick={streamUser}
          className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg mr-4"
        >
          Start Stream
        </button>

        <button
          type="button"
          onClick={stopStream}
          className="text-white bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-lg"
          disabled={!userStream}
        >
          Stop Stream
        </button>
      </div>

      {/* Local webcam preview (use native video element) */}
      <div>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          width="1280"
          height="720"
          className="bg-black rounded-md shadow"
        />
      </div>
    </div>
  );
}

export default Room;