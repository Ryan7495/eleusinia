import React, { Component } from 'react';
import styled from 'styled-components';
import './Cart.css'; 

export const Heading1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ACD48A;
  height: 100px;
`;

export const ItemsList = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

class Cart extends Component {
    constructor() {
      super();
      this.state = {};
  
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        alert("Your item has been purchased");
    }

    render() {
        return (
            <div>
                <Heading1>
                    <br />
                    <h1>My Cart</h1>
                    <br />
                </Heading1>
                <ItemsList>
                    <div class='some-page-wrapper'>
                        <div class='row'>
                            <div class='column'>
                                <div class='blue-column'>
                                    Item 1: Box of Fruits
                                </div>
                            </div>
                            <div class='column'>
                                <div class='price-column'>
                                    Price: 12.99$
                                </div>
                            </div>
                        </div>
                        <div class='row2'>
                            <div class='column'>
                                <div class='blue-column'>
                                    Description of box
                                </div>
                            </div>
                            <div class='column'>
                                <div class='price-column'>
                                    Quantity:
                                    <input type="number" id="tentacles" name="tentacles" min="1" max="100" />
                                </div>
                            </div>
                        </div>

                        <div class='row3'>
                            <div class='column'>
                                <div class='blue-column'>
                                    Total: 
                                </div>
                            </div>
                            <div class='column'>
                                <div class='price-column'>
                                    <button onClick={this.handleClick}>Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </ItemsList>
            </div>
        );
    }
}

export default Cart;
