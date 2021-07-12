import React from "react";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import './NavBar.css'; 

export const Nav = styled.div`
  border-top: 1px black solid;
  text-align: center;
    margin: 15px auto;
    text-decoration: none;
    list-style-type: none;
    ul{
      padding-inline-start: 0px;
    }
    li{
      text-align: center;
      margin: 15px auto;
      text-decoration: none;
      list-style-type: none;
    }
  @media screen and (min-width: 768px) {
    ul {
      background-color: white;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    padding-left: 25px;
    list-style-type: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }

    &:hover {
      color: #FF5A5F;
    }
`;

function Footer() {
  return (
    <Nav>
      <li><StyledLink to="/" style={{marginRight: "auto", fontSize: "30px"}}>Eleusinia</StyledLink></li>
      <li><p>&copy; 2020</p></li>
    </Nav>
  );
};

export default Footer;
