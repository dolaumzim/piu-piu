import { useEffect, useMemo, useState } from "react"

export function useVisible(ref : React.MutableRefObject<HTMLDivElement | null>) {

    const [isIntersecting, setIntersecting] = useState(false)
  
    const observer = useMemo(() => new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting)
    ), [ref])
  
  
    useEffect(() => {
      ref && observer.observe(ref.current as HTMLDivElement)
      return () => observer.disconnect()
    }, [])
  
    return isIntersecting
  }