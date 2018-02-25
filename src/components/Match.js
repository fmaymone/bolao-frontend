import React, { Component } from "react";
import Paper from "material-ui/Paper";
//import Flag from "react-flags";
import Team from "./Team";

import PropTypes from "prop-types";
import { Grid, Row, Col } from 'react-flexbox-grid';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    
      
    
    
    return (
      
      <Grid fluid>
        <Row>
          <Col xs={6} md={3}>
              <Team team={this.props.home} home={true} />
          </Col>
          <Col xs={6} md={3}>
           <div><Team team={this.props.away} home={false} /></div> 
          </Col>
        </Row>
      </Grid>
    );
  }
}

const styles = {
  matchContainer: {
    
    flexDirection: 'column',
    backgroundColor: "green"
    
  },
  
};

export default Match;

Match.propTypes = {
  // name: PropTypes.string,
  // code: PropTypes.string,
  // home: PropTypes.boolean
};
