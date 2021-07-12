import React from "react"
import styled from 'styled-components';
import BoxesLongList from "./Components/BoxesLongList";

export const Heading1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ACD48A;
`;

function Boxes() {
  return(
      <div>
        <Heading1>
          <br />
          <h1>Boxes</h1>
          <p>Find your perfect Food Boxes</p>
          <br />
        </Heading1>
        <BoxesLongList />
      </div>
  );
}

export default Boxes;
