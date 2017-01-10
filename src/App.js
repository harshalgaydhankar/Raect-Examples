import React, { Component } from 'react';
import Nav from './Nav';

class App extends Component {
  render() {
    var backStyle={background: "#7F8C8D"}
    
    return (
      <div>
        <Nav/>
        <div className="container">
          <div className="row">
            <div className="col-xs-12" style={backStyle}>
              {this.props.children}
            </div> 
          </div>
        </div>
      </div>
    );
  }
}

export default App;
