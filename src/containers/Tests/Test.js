import React, { Component } from 'react';

class Test extends Component {

    componentWillMount() {
        console.log('Test will mount-----------------------------');
        
    }
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <h1>Test</h1> )
    }
}
 
export default Test;