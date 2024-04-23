import React, { useEffect, useState, Grid, Item } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import imagePath from "../Login/solar-panel-cell-on-dramatic-sunset-sky-background-free-photo.jpg";
import logo from "../../Components/SideNavigationPanel/blueLogoAsset 1.png";
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
  setSubtitle("You can view Rividco Home page");

  const [currentTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box
      objectFit="cover"
      overflow="hidden"
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        position={"fixed"}
        width={"100vw"}
        height={"100vh"}
        zIndex={-1}
      >
        <img
          src={imagePath}
          alt="companyLogo"
          style={{
            overflow: "hidden",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: "50%",
          }}
        />
      </Box>
      <Typography variant="h2" fontWeight={'bold'}>WELCOME TO</Typography>
      <img src={logo} alt="companyLogo" style={{ width: "50%", maxWidth: '500px', marginTop: '10px', objectFit: 'contain' }} />
      <Box
        position={"fixed"}
        bottom={"50px"}
        right={"50px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"flex-end"}
        color={"white"}
        backgroundColor={"rgba(0, 0, 0, 0.5)"}
        padding={"20px"}
        borderRadius={"10px"}
        boxShadow={"0 0 10px 5px rgba(0, 0, 0, 0.5)"}
      >
        <Typography variant="h1" fontWeight={'bold'}>
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </Typography>
        <Typography variant="h5" fontWeight={'bold'}>
          {currentTime.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </Box>

    </Box>

    // <>
    //   <Container>
    //     <div
    //       style={{
    //         position: "fixed",
    //         marginTop: "-23%",
    //         marginLeft: "-5%",
    //         width: "100vw",
    //         height: "100vh",
    //         opacity: "50%",
    //       }}
    //     >
    //       <img
    //         src={imagePath}
    //         alt="companyLogo"
    //         style={{ overflow: "hidden", width: "100%", height: "100%" }}
    //       />
    //     </div>

    //     <div
    //       style={{
    //         position: "fixed",
    //         marginTop: "-18%",
    //         marginLeft: "0%",
    //         width: "75vw",
    //         height: "100vh",
    //         opacity: "100%",
    //       }}
    //     >
    //       <Typography
    //         variant="h1"
    //         style={{
    //           fontWeight: "bold",
    //           fontSize: "65px",
    //         }}
    //       >
    //         <p style={{ textAlign: "center", color: "#071024" }}>
    //           Welcome to RIVIDCO PROJECTS!
    //         </p>
    //       </Typography>
    //     </div>

    //     <div
    //       style={{
    //         position: "fixed",
    //         marginTop: "-7%",
    //         marginLeft: "0%",
    //         width: "75vw",
    //         height: "100vh",
    //         opacity: "80%",
    //       }}
    //     >
    //       <Typography
    //         variant="h1"
    //         style={{
    //           marginBottom: "5px",
    //           fontSize: "60px",
    //           fontWeight: "Bold",
    //           textAlign: "center",
    //           color: "#071024",
    //         }}
    //       >
    //         {currentTime.toLocaleTimeString([], {
    //           hour: "2-digit",
    //           minute: "2-digit",
    //           hour12: true,
    //         })}
    //       </Typography>
    //       <Typography
    //         variant="h1"
    //         style={{
    //           fontWeight: "bold",
    //           textAlign: "center",
    //           color: "#071024",
    //           fontSize: "30px",
    //         }}
    //       >
    //         {currentTime.toLocaleDateString(undefined, {
    //           weekday: "long",
    //           year: "numeric",
    //           month: "long",
    //           day: "numeric",
    //         })}
    //       </Typography>
    //     </div>
    //   </Container>
    // </>
  );
};

export default Home;
