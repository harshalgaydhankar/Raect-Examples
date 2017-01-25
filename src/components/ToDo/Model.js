import React from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

export default class Model extends React.Component{

    render(){
        if(this.props.isOpen){
            return (
              <ReactCSSTransitionGroup transitionName={this.props.transitionName} transitionEnterTimeout={200}
      transitionAppearTimeout={200}
      transitionLeaveTimeout={150} transitionAppear>
                <div className="modal">
                  {this.props.children}
                </div>
              </ReactCSSTransitionGroup>
            );
        } else {
            return   <ReactCSSTransitionGroup transitionName={this.props.transitionName} transitionEnterTimeout={200}
      transitionAppearTimeout={200}
      transitionLeaveTimeout={150} transitionAppear>
                <div className="modal">
                  {this.props.children}
                </div>
              </ReactCSSTransitionGroup>
        }
    }

}