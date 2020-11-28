import React, { useState, useEffect }from 'react';

const Home = () => {
    const [response, setResponse] = useState('')
    const [err, setErr] = useState('')

    useEffect(() => {
        fetchResponse()
    });

    const fetchResponse = async () => {
        await fetch('http://127.0.0.1:5000', {
            method: 'GET'
        }).then((res) => res.json())
        .then((res) => setResponse(res.message))
        .catch((error) => {
            setErr(error.name + ': ' + error.message);
            console.log(err)
        })            
    }

    return (  
        <>  
            { (err === '') ? <h1>{response}</h1> : <h1>{err}</h1>}
        </>
    );
}
 
export default Home;