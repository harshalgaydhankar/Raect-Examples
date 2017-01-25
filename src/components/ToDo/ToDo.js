import React from 'react';
import ReactDom from 'react-dom';
import PouchDB from 'pouchdb';
import './ToDo.css';
import Popup from 'react-popup';

export default class ToDo extends React.Component{
    constructor(props){
        super(props)
        this.state = { tasks : []}
        this.db = new PouchDB('todos_v1')
        this.go = this.go.bind(this)
        this.reloadTask = this.reloadTask.bind(this)
        this.postpone = this.postpone.bind(this)
        this.removeTask = this.removeTask.bind(this)
    }

    go(){
        const taskName = this.task.value
        const deadline = this.deadline.value
        const createdDate = new Date()
        const active = true
        const deadlinecrossed = false
        const success = false
        this.db.put({
            _id: taskName,
                 deadline,
                 createdDate,
                 active,
                 deadlinecrossed,
                 success
        }).then(rsp => {
            this.reloadTask()
        }).catch(function (err) {
            console.log(err)
        });  
    }

    reloadTask(){
        this.db.allDocs({
            include_docs: true,
            attachments: true
        }).then(result =>{
            const tasks = result.rows;
            console.log("in reload")
            console.log(this.state.tasks)
            tasks.sort((a,b)=>{
                a = new Date(a.doc.deadline)
                b = new Date(b.doc.deadline)
                return a>b ? 1 : a<b ? -1 : 0
            })
            this.setState({tasks});
        }).catch(function (err) {
            console.log(err)
        })
    }

    componentDidMount(){
        this.reloadTask()
    }

    postpone(){
        //console.log("i am here in postpone")
        
        // <Popup
        //     className="mm-popup"
        //     btnClass="mm-popup__btn"
        //     closeBtn={true}
        //     closeHtml={null}
        //     defaultOk="Ok"
        //     defaultCancel="Cancel"
        //     wildClasses={false} />
        Popup.alert('Hello, look at me');
 
    }

    removeTask(event){
        const taskName = event.target.parentNode.parentNode.querySelector('.taskName').textContent;
        this.state.tasks.forEach((task)=>{
            if(task.doc._id === taskName){
                const doc = task.doc
                doc.active = false
                this.db.put(doc).then(rsp => {
                    this.reloadTask()
                }).catch(function (err) {
                    console.log(err)
                });
            }
        })

    }




    render(){
       
        const currentDate = new Date();

        const futureTask = this.state.tasks.filter((task,index) => {
            const taskDate = new Date(task.doc.deadline)
            if (taskDate > currentDate && task.doc.active === true){  
                return task
            }
        }).map((task,index) => {
            return(
                <tr key={'future'+index} className ='success'> 
                    <td className = "taskName">{task.doc._id}</td>
                    <td className = "lastDate">{task.doc.deadline}</td>
                    <td>{task.doc.createdDate.split('T')[0]}</td>
                    <td>
                        <button onClick={this.removeTask} className="btn btn-success btn-sm">Completed</button>
                        &nbsp;<button onClick={this.postpone} className="btn btn-success btn-sm">Postpone</button>
                    </td>
                </tr>
                );
        })

        const pastTask = this.state.tasks.filter((task,index) => {
            const taskDate = new Date(task.doc.deadline)
            taskDate.setHours(0, 0, 0, 0)
            currentDate.setHours(0, 0, 0, 0)
            if (taskDate < currentDate && task.doc.active === true){  
                return task
            }
        }).map((task,index) => {
            return(
                <tr key={'past'+index} className ='danger'>
                    <td className = "taskName">{task.doc._id}</td>
                    <td className = "lastDate">{task.doc.deadline}</td>
                    <td>{task.doc.createdDate.split('T')[0]}</td>
                    <td>
                        <button onClick={this.removeTask} className="btn btn-success btn-sm">Completed</button>
                        &nbsp;<button onClick={this.postpone} className="btn btn-success btn-sm">Postpone</button>
                    </td>
                </tr>
                );
        })

        const todaysTask = this.state.tasks.filter((task,index) => {
            const taskDate = new Date(task.doc.deadline)
            taskDate.setHours(0, 0, 0, 0)
            currentDate.setHours(0, 0, 0, 0)
            
            if (taskDate.toString() == currentDate.toString() && task.doc.active === true){  
                
                return task
            }
        }).map((task,index) => {
            return(
                <tr key={'today'+index} className='invalid'>
                    <td className="taskName">{task.doc._id}</td>
                    <td className="lastDate">{task.doc.deadline}</td>
                    <td>{task.doc.createdDate.split('T')[0]}</td>
                    <td>
                        <button onClick={this.removeTask} className="btn btn-success btn-sm">Completed</button>
                        &nbsp;<button onClick={this.postpone} className="btn btn-success btn-sm">Postpone</button>
                    </td>
                </tr>
                );
        })

        const commitedTask = this.state.tasks.filter((task,index) => {
            if (task.doc.active === false){  
                return task
            }
        }).map((task,index) => {
            return(
                <tr key={'commited'+index}>
                    <td className="taskName">{task.doc._id}</td>
                    <td className="lastDate">{task.doc.deadline}</td>
                    <td>{task.doc.createdDate.split('T')[0]}</td>
                </tr>
                );
        })

        return (
            
            <div>
                <div className="jumbotron">
                    <h1>ToDO Task List!</h1>
                    <p>Add your tasks in your ToDo Priority List</p>
                </div>
                <div className="divStyle"> 
                    <div>
                        <h1>New Task</h1>
                        <label>Task : </label>
                        <input ref={node => this.task = node} type="text"/>
                        <label>Deadline : </label>
                        <input ref={node => this.deadline = node} type="date"/>
                        <button className="btn btn-danger btn-xs" onClick={this.go}>Add to List</button>
                    </div>
                </div>
                <div>
                    <h3>Upcoming ToDO's</h3>
                    <table className="table table-hover table-inverse">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Task Deadline</th>
                                <th>Task Created On</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todaysTask}
                            {futureTask}  
                            {pastTask}    
                            
                        </tbody>
                    </table>

                </div>
                <div>
                    <h3>Task Done</h3>
                    <table className="table table-hover table-inverse">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Task Deadline</th>
                                <th>Task Created On</th>
                           </tr>
                        </thead>
                        <tbody>
                            {commitedTask}
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }

}