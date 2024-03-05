import React, { useEffect } from "react"
import "../../src/app.css"
export default function Notification({ message, setmessage }) {


  useEffect(() => {
    setTimeout(() => {
      setmessage(null)
    }, 3000)
  }, [message])


  if (message === null) {
    return null
  }
  return <div className="notification">{message}</div>
}
