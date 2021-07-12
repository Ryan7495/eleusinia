import React from "react"
import RecipeLongList from "./Components/RecipeLongList";
import styled from 'styled-components';

export const Heading1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ACD48A;
`;

function Recipes() {
  return (
    <div>
      <Heading1>
        <br />
        <h1>Recipes</h1>
        <p>Browse through some of our famous recipes made with our Food Boxes</p>
        <br />
      </Heading1>
      <RecipeLongList />
    </div>
  );
}

export default Recipes;
