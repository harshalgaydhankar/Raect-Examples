import React from 'react';
import Axios from 'axios';
import Jsonp from 'jsonp'

export default class CurrencyConvertor extends React.Component{
  constructor(props){
    super(props);
    this.state = {result : 0};
    this.state = {ratio : 0};
    this.state = {currency: []}
    this.go = this.go.bind(this);
  }
  componentDidMount(){
        Jsonp(`http://api.fixer.io/latest`, null, (err, data) => {
        if (err) {
          console.error(err.message);
        } else {
            
            const currency = data.rates;
            this.setState({currency});
          
        }
      });
  }

  go(){
      
      const to = this.to.value;
      const from = this.from.value;
      const input = +this.number.value;
      console.log(`conversion from ${from} to ${to} `)
      
      Jsonp(`http://api.fixer.io/latest?base=${from}`, null, (err, data) => {
        if (err) {
          console.error(err.message);
        } else {
            console.log(data.rates)
            for(var key in data.rates) {
              if(key == to){
                var ratio = data.rates[key];
                const result = input * ratio;
                this.setState({ratio});
                this.setState({result});
                break;

              }
            }
        }
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
        <h1>Currency Convertor</h1>
        
        From :
       
            {
               <select ref={from => this.from = from} >
              {Object.keys(this.state.currency).map((t,i) => <option key={i} value={t}>{t}</option>)};
              </select>
              
            }
        

        To : 
        <select ref={to => this.to = to} >
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="AUD">AUD</option>
            <option value="BGN">BGN</option>
            <option value="BRL">BRL</option>
            <option value="CAD">CAD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
            <option value="CZK">CZK</option>            
        </select>
        <input ref={node => this.number = node} type="number"/>
        <button className="btn btn-danger btn-xs" onClick={this.go}>Go..!</button>
        <div />
        <div>
            The Ratio is {this.state.ratio} 
        </div>  
        <div>
            The Converted Currency is {this.state.result} 
        </div>    
        
      </div>
    );
  }
}