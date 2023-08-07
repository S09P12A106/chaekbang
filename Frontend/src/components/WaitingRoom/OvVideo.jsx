import React, { useEffect, useRef } from 'react'

const OpenViduVideoComponent = ({ streamManager }) => {
  const videoRef = useRef()

  useEffect(() => {
    if (videoRef.current) {
      streamManager.addVideoElement(videoRef.current)
    }
  }, [streamManager])

  return <video autoPlay ref={videoRef} />
}

export default OpenViduVideoComponent
