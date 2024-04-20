import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import imagePath from "../Login/solar-panel-cell-on-dramatic-sunset-sky-background-free-photo.jpg";
import { useTopbarContext } from "../../Contexts/TopbarContext";
// import * as testService from "../../services/projectTestService";

const Home = () => {
  // testService.addTest({
  //   "projectId": 1,
  //   "name": "string",
  //   "passed": 0,
  //   "conductedBy": 3,
  //   "conductedDate": "2024-04-15T07:56:27.622Z",
  //   "comments": "string"
  // }).then((res) => {
  //   console.log(res);
  // });

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
    <>
      <Container>
        <div
          style={{
            position: "fixed",
            marginTop: "-21%",
            marginLeft: "-5%",
            width: "100vw",
            height: "100vh",
            opacity: "50%",
          }}
        >
          <img
            src={imagePath}
            alt="companyLogo"
            style={{ overflow: "hidden", width: "100%", height: "100%" }}
          />
        </div>

        <div
          style={{
            position: "fixed",
            marginTop: "-20%",
            marginLeft: "0%",
            width: "75vw",
            height: "100vh",
            opacity: "100%",
          }}
        >
          <Typography
            variant="h1"
            style={{
              fontWeight: "bold",
              fontSize: "75px",
            }}
          >
            <p style={{ textAlign: "center", color: "#071024" }}>
              Welcome to the Rividco
            </p>
          </Typography>
        </div>

        <div
          style={{
            position: "fixed",
            marginTop: "-7%",
            marginLeft: "0%",
            width: "75vw",
            height: "100vh",
            opacity: "80%",
          }}
        >
          <Typography
            variant="h1"
            style={{
              marginBottom: "5px",
              fontSize: "60px",
              fontWeight: "Bold",
              textAlign: "center",
              color: "#071024",
            }}
          >
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </Typography>
          <Typography
            variant="h1"
            style={{
              fontWeight: "bold",
              textAlign: "center",
              color: "#071024",
              fontSize: "30px",
            }}
          >
            {currentTime.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default Home;
