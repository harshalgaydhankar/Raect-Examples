import React from 'react';
import Axios from 'axios';

export default class Random extends React.Component{
  constructor(props){
    super(props);
    this.state = {numbers: 0};
     this.state = {data: []};
    this.go = this.go.bind(this);
  }


  go(){
      const num = +this.number.value; // + eill mrk string into numbers
      //https://qrng.anu.edu.au/API/jsonI.php?length=10&type=uint8
      Axios.get(`https://qrng.anu.edu.au/API/jsonI.php?length=${num}&type=uint8`)
        .then( (response) => {
            const data = response.data.data;
            this.setState({data});
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

      console.log("i clicked")
  }

  render(){
        var divStyle = {
          background: "#eee",
           padding: "20px",
             margin: "20px"
        };
    return (

      <div style={divStyle}> 
        <h1>Random Number Generator</h1>
        <input ref={node => this.number = node} type="number"/>
        <button className="btn btn-danger btn-xs" onClick={this.go}>Go..!</button>
        <div />
            <ul>
            {
            this.state.data.map((num, index) => <li key={index}>{num}</li>)
            }
            </ul>
        
      </div>
    );
  }
}