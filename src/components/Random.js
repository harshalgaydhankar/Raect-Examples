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
      const numType = this.type.value;
      console.log(numType);
      //https://qrng.anu.edu.au/API/jsonI.php?length=10&type=uint8
      Axios.get(`https://qrng.anu.edu.au/API/jsonI.php?length=${num}&type=${numType}`)
        .then( (response) => {
            const data = response.data.data;
            this.setState({data});
            console.log(response);
        })
        .catch( (error) => {
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
        
        <select ref={node1 => this.type = node1} >
            <option value="uint8">uint8</option>
            <option value="uint16">uint16</option>
            <option value="hex16">hex16</option>
            
        </select>
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