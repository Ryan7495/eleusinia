import React from "react"
import styled from 'styled-components';
import aboutFood from "./img/aboutFood.jpeg";
import MapBox from "./MapBox";
import './About.css';

export const MainIntro = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const SecondIntro = styled.div`
  display: flex;
  justify-content: center;
  background-color: #ACD48A;
  min-height: 100px;
  line-height: 80px;
`;

//aboutFood photo from https://unsplash.com/photos/C1Q3qOTlegg on March 26

function AboutUs() {
  return (
    <div style={{marginBottom: "200px", margin: "0", padding: "0"}}>
      <img src={aboutFood} alt="aboutFood" style={{ width: "100%", height: "400px", objectFit: "cover", position: "relative"  }}/>
      <MainIntro>
        <h1 className="headingAbout" style={{position: "absolute", left: "50%", top: "34%", transform: "translate(-50%, -50%)"}}>We believe in local and fresh products</h1>
      </MainIntro>
      <SecondIntro>
        <p>At Eleusenia, we are committed to supporting our local neighbors. That's why we value our customers and our farmers. Below is our map of suppliers. </p>
      </SecondIntro>
      <MapBox/>
    </div>
  );
}

export default AboutUs;
