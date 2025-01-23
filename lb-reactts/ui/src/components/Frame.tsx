import { ReactNode, useEffect, useState } from 'react'
import './Frame.css'

export default function Frame({ children }: { children: ReactNode }) {
    const [time, setTime] = useState('00:00')

    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date()
            setTime(`${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`)
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="phone-frame">
            <div className="phone-notch"></div>
            <div className="phone-time">{time}</div>
            <div className="phone-indicator"></div>
            <div className="phone-content">{children}</div>
        </div>
    )
}
