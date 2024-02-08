import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import imagePath from '../Login/blueLogoAsset 1.png';
import { useTopbarContext } from "../../Contexts/TopbarContext";

const Home = () => {

    const { setTitle, setSubtitle } = useTopbarContext();
    setTitle("Home");
    setSubtitle("Welcome to RIVIDCO PROJECTS!");

    const [currentTime, setDateTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);

    }, []);


    return (
        <Container>

            <div style={{ position: 'fixed', top: 0, right: 0, marginTop: '10%', marginRight: '5%' }}>
                <img
                    src={imagePath}
                    alt="companyLogo"
                    style={{ width: '40vw', height: '10vw' }}
                />
            </div>

            <div style={{ position: 'fixed', bottom: 0, right: 0, margin: '5%' }}>
                <Typography variant="h1" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </Typography>
                <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                    {currentTime.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </Typography>
            </div>

        </Container>
    )
}

export default Home