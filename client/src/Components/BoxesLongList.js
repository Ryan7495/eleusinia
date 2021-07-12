import React from 'react';
import MyTable from './Table.js';
import "./css/Boxes.css";
import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const SearchLabel = styled.div`
`;

export const Cards = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Card = styled.article`
    flex: 0 1 50%;
    width: 300px;
  align-items:center;
`;

export default class BoxesLongList extends React.Component {
    constructor(){
        super();
        this.state={
            data_first:'',
            query: '',
            results: {},
            loading: false,
            message: '',
            value: '',
            database: '',
            display: '',
        }
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getDataInitial().then(response => { });
    }

    async getDataInitial(){
        const url = 'http://localhost:1337/boxes/';
        console.log(url)
        let data_initial = await fetch(url, { method: 'GET', mode:'cors', headers: {
                'Content-Type': 'application/json'
            }
        });
        // console.log(data);
        data_initial = await data_initial.json();
        this.setState({ data_first: data_initial });
    };

    async getData(req){
        console.log('test');
        console.log(req);

        const url = 'http://localhost:1337/boxes/' + req;
        console.log(url)
        let data = await fetch(url, { method: 'GET', mode:'cors', headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(data)
        data = await data.json();
        this.setState({ database: data });
    };

    handleOnInputChange = (event) => {
        console.log(this.state.value);
        this.getData(this.state.value).then(response => { console.log("") });
        event.preventDefault();
    };


    handleChange(event) {
        console.log(event.target.value)
        this.setState({value: event.target.value});
    };

    displayTable() {
        if(!this.state.database)
            return (<MyTable data={this.state.data_first} />);
        else
            return (<MyTable data={this.state.database} />);
    };


    render() {
        return (
            <div style={{marginRight: "auto", marginLeft: "auto"}}>
                <SearchLabel style={{width: "100%"}} className="search-label" htmlFor="search-input">
                    <form class="form" onSubmit={this.handleOnInputChange}>
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                        <input type="submit" value="Search" />
                    </form>
                    <i className="fa fa-search search-icon"/>
                </SearchLabel>
                <Card style={{marginRight: "auto", marginLeft: "auto"}}>
                    {this.displayTable()}
                </Card>
            </div>
        )
    }
}