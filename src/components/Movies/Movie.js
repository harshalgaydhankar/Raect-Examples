import React from 'react';
import './box.css';

export default class Box extends React.Component{
  constructor(props){
    super(props);
    this.state = {r: 0, g: 0, b: 0, a: 0};
  }

  componentDidMount(){
    
  }

  render(){
    const str = `rgba(${this.state.r}, ${this.state.g}, ${this.state.b}, ${this.state.a})`;
    return (
        <div style={{backgroundColor: str}} className="box">
            Movie : {props.name}
            
        </div>);
  }
};