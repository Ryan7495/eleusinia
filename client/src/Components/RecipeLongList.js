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
    align-items: center;
`;

export const Card = styled.article`
    flex: 0 1 24%;
    width: 300px;
    align-content: center;
`;

export const Heading2 = styled.h2`
  font-weight: normal;
`;

export default class RecipeLongList extends React.Component {
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
        const url = 'http://localhost:1337/recipes/';
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
        //this.getData()
        console.log(this.state.recipes)
        return(
            this.state.recipes!=null &&
            <MainContainer>
                <Cards>
                        { this.state.recipes.map((recipe, idx) => {
                            return (
                                <Card key={recipe.id}>
                                    <Heading2>{recipe.title}</Heading2>
                                    <img src={recipe.image} alt={recipe.title} width="300px" height="200px" />
                                    <p>{this.truncate(recipe.summary)}</p>
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