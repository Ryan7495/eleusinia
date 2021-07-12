import React from "react"
import fruit from "./img/fruit.jpeg";
import styled from 'styled-components';

import RecipeList from "./Components/RecipeList";

//https://unsplash.com/photos/ArGvQkA7iOw for the fruit photo

export const Heading2 = styled.h2`
  font-weight: normal;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

export const MainIntro = styled.div`
  display: flex;
  justify-content: center;
`;

function Home() {
  return (
    <div style={{marginBottom: "50px"}}>
        <img src={fruit} alt="fruit" style={{ width: "100%", height: "700px", objectFit: "cover" }}/>
        <MainIntro>
          <Heading2>Favorite Recipes</Heading2>
        </MainIntro>
        <RecipeList />
    </div>
  );
}

export default Home;
