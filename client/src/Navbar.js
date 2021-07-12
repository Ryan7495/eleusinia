import React from "react";
import {Link} from "react-router-dom";
import styled from 'styled-components';
import './NavBar.css'; 

export const Nav = styled.div`
    text-align: center;
    margin: 15px auto;
    text-decoration: none;
    list-style-type: none;
    background-color: white;
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
    list-style-type: none;


    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }

    &:hover {
      color: #FF5A5F;
    }
`;

function Navbar() {
  return (
    <Nav>
      <li><StyledLink to="/" style={{marginRight: "auto", fontSize: "30px"}}>Eleusinia</StyledLink></li>
      <ul>
        <li><StyledLink to="/recipes">Our Recipes</StyledLink></li>
        <li><StyledLink to="/boxes">Boxes</StyledLink></li>
        <li><StyledLink to="/about">About Us</StyledLink></li>
        <li><StyledLink to="/cart">Cart</StyledLink></li>
        <li><StyledLink to="/login" style={{paddingRight: "25px"}}>Login/Register</StyledLink></li>
      </ul>
    </Nav>
  );
};

export default Navbar;
