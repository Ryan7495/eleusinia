import React from 'react';
import image1 from '../img/1.jpg';
import image2 from '../img/2.jpg';
import image3 from '../img/3.png';
import image4 from '../img/4.jpg';
import image5 from '../img/5.JPG';
import image6 from '../img/6.jpg';
import image7 from '../img/7.jpg';
import image8 from '../img/8.png';
import image9 from '../img/9.jpg';
import "./css/Boxes.css";
//import {SearchLabel} from "./BoxesLongList";


class MyTable extends React.Component {

    createTable = () => {
        let ul = [];

        var image = [image1, image2, image3, image4, image5, image6, image7, image8, image9];
        // Outer loop to create parent
        for (let i = 0; i < this.props.data.length; i++) {

            var id = this.props.data[i]["BoxID"];
            //Inner loop to create children
            // ul.push(<li>{this.props.data[i]["BoxID"]}</li>);
            // ul.push(<li>{this.props.data[i]["DateCreated"]}</li>);
            ul.push(<li><h1>{this.props.data[i]["Name"]}</h1></li>);
            ul.push(<li>{this.props.data[i]["Description"]}</li>);
            ul.push(<li><i>{this.props.data[i]["Price"]}</i></li>);
            ul.push(<li>Produced By: {this.props.data[i]["Producer"]}</li>);
            // ul.push(<li>{this.props.data[i]["Quantity"]}</li>);
            ul.push(<img src ={image[id-1]} alt="No img sorry"/>);
            // <SearchLabel style={{width: "100%"}} className="search-label" htmlFor="search-input">
            ul.push(<button onSubmit={this.handleCart(id)}> Add to cart </button>);

            //ul.push(<p>___________________________________________________________________________________________________________</p>);
        }
        return ul
    };

    handleCart(id_box) {
        //var cart = id_box;
    }


    render() {
        return(
            <div classname="tableContainer">
                {this.createTable()}
            </div>
        )
    }

}export default MyTable;