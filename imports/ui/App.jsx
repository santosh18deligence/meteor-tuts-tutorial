import React from 'react';
import PropTypes from 'prop-types';

export default class App extends React.Component {
    render(){
        return(
            <div className="app-container" id="app-container">
                {this.props.children }
            </div>
        );
    }
}
App.propTypes = {
    children: PropTypes.array,
}