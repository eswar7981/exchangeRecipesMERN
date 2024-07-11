import React from 'react'
import { useState } from 'react'
const FetchGET = (url, headers) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        fetch(url, {
            method:'GET',
            headers: headers
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setData(data)
        })
    }, [url])
    return [data]
    
}

export default fetchGET
