import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Home = () => {

    const [currentTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    
    }, []);


  return (
    <Container>
        <Typography variant="h1" gutterBottom style={{ marginTop: '10%', fontFamily: 'Times New Roman'}}>
            RIVIDCO PROJECTS
        </Typography>
        <div style={{ position: 'fixed', bottom: 0, right: 0, margin: '5%'}}>
            <Typography variant="h1" style={{ marginBottom: '5px', fontFamily: 'Times New Roman' }}>
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
            </Typography>
            <Typography variant="h4" style={{ fontFamily: 'Times New Roman'}}>
                {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
        </div>
    </Container>
  )
}

export default Home