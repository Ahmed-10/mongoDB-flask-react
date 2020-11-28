import React, { useState, useEffect }from 'react';

const Home = () => {
    const [response, setResponse] = useState('')
    const [err, setErr] = useState('')
    
    useEffect(() => {
        fetchResponse()
    },[])

    const fetchResponse = async () => {
        const res = await fetch('http://127.0.0.1:5000', {
            method: 'GET'
        }).catch((error) => setErr(error.name + ': ' + error.message))
        console.log(err)
        if (err !== ''){
            const jsonData = await res.json();
            setResponse(jsonData.message)      
        }
    }

    return (  
        <>  
            <h1>{response}</h1>
        </>
    );
}
 
export default Home;