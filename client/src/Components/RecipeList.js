import React from 'react';
import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Cards = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const Card = styled.article`
    flex: 0 1 24%;
    outline: grey 1px solid;
    align-content: center;
`;

export const Heading2 = styled.h2`
    font-weight: normal;
    text-align: center;
    &:hover {
        color: #FF5A5F;
    }
`;

export default class RecipeList extends React.Component {
    constructor(){
        super();
        this.state={
            recipes:[]
        }
    }

    componentDidMount(){
        this.getData();
        console.log(this.state.recipes);
    }

    async getData(){
        const url = 'http://localhost:1337/home/';
        console.log(url)
        let data = await fetch(url, { method: 'GET', mode:'cors', headers: {
                'Content-Type': 'application/json'
            }
        });
        
        //this.state.recipes = await data.json();
        console.log(this.state.recipes)
        this.setState({recipes: await data.json()})
        //data = await data.json();
    };

    render(){
        return(
            this.state.recipes!=null &&
            <MainContainer>
                <Cards>
                        { this.state.recipes.map((recipe, idx) => {
                            return (
                                <Card key={recipe.id}>
                                    <a href={recipe.spoonacularSourceUrl} style={{textDecoration: "none", color: "black"}}>
                                        <Heading2>{recipe.title}</Heading2>
                                    </a>
                                    <img src={recipe.image} alt={recipe.title} style={{display: "block", marginLeft: "auto", marginRight: "auto"}} width="300px" height="200px" />
                                    <p style={{textAlign: "center"}} >{this.truncate(recipe.summary)}</p>
                                </Card>
                            );
                        })}
                </Cards>
            </MainContainer>
        );
    }

    //truncate function intended for shortening summary
    truncate(str) {
        return str.length > 10 ? str.substring(0, 80) + "..." : str;
    }
}