import React from 'react';
import Axios from 'axios';
import PouchDB from 'pouchdb';



export default class Movies extends React.Component{
  constructor(props){
    super(props);
    this.db = new PouchDB('movies');
    this.state = {results: [] , movies: []};
    this.go = this.go.bind(this);
    this.add = this.add.bind(this);
  }
 

componentDidMount(){
    this.db.allDocs({
      include_docs: true,
      attachments: true
    }).then(result =>{
      const movies = result.rows;
      this.setState({movies});
    }).catch(function (err) {
      console.log(err);
    });
  }



 add(event){
    const title = event.target.parentNode.parentNode.querySelector('.title').textContent;
    const year = event.target.parentNode.parentNode.querySelector('.year').textContent;
    const poster = event.target.parentNode.parentNode.querySelector('.poster').getAttribute("src");

    this.db.put({
      _id: title,
      year,
      poster
    }).then(rsp => {
      console.log('rsp', rsp);
    }).catch(function (err) {
      console.log(err);
    });
  }

  go(){
     
        const movie = this.movie.value;
        const url = `http://www.omdbapi.com/?s=${movie}&page=1`;
        const that = this;
        Axios.get(url)
        .then(response => {
           
            const results = response.data.Search;
            that.setState({results});
            console.log(response.data.Search);
        })
    
       console.log("i clicked")
  }

  render(){
        var divStyle = {
          background: "#eee",
           padding: "20px",
             margin: "20px"
        };
        
        var clr = {color: "#FFFFFF"};
    return (
      <div>
        <div class="jumbotron" style={clr}>
          <h1>Movies Watch List!</h1>
          <p>Search your movies and add them to the movies watched list</p>
        </div>
        <div style={divStyle}> 
            <div>
                <h1>Search Movies</h1>
                <input ref={node => this.movie = node} type="text"/>
                <button className="btn btn-danger btn-xs" onClick={this.go}>Search</button>
                <div />
            </div>
            <div>
                <table className="table table-striped "> 
                    <thead className="thead-inverse">
                        <tr>
                            <th>Add</th>
                            <th>IMDB ID </th>
                            <th>Title</th>    
                            <th>Type</th>                    
                            <th>Year</th>
                            <th>Poster</th>
                        </tr>
                    </thead>
                    <tbody>
                        {                                                                             
                            this.state.results.map((r,i)=>{
                                console.log(r.Title);
                                return(
                            
                                    <tr key={i} >
                                        <td><button onClick={this.add} className="btn btn-success btn-sm">Add</button></td>
                                        <td className="imdbID">{r.imdbID}</td>
                                        <td className="title">{r.Title}</td>
                                        <td className="type">{r.Type}</td>
                                        <td className="year">{r.Year}</td>
                                        <td><img className="poster" height="100px" width="80px" src={r.Poster}/></td>
                                    </tr>
                                );
                            })                          
                        }
                    </tbody>

                </table>

                
                <h1> Movies you have already selected </h1>
                <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Poster</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.movies.map((r, i) => {
                      return (
                        <tr key={i}>
                          <td>{r.doc._id}</td>
                          <td>{r.doc.year}</td>
                          <td><img height="100px" width="80px" src={r.doc.poster}/></td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>

            </div>
        </div>
    </div>
    );
  }
}