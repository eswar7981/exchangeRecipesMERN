import { useState, useEffect } from 'react'

const useFetchPOST = (url, body) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        fetch(url, {
            method: 'POST',
            body: body
        }).then((res) => {
            return res.json()
        }).then((data) => {
            setData(data)
        })
    }, [url])

    return 'jell'
}

export default useFetchPOST
