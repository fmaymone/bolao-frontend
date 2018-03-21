import React, { Component } from "react";
import Paper from "material-ui/Paper";
//import Flag from "react-flags";
import Team from "./Team";
import { Field, reduxForm, formValueSelector } from 'redux-form';

import PropTypes from "prop-types";
import { Grid, Row, Col } from 'react-flexbox-grid';

class Match extends Component {
  constructor(props) {
    super(props);
    this.state = {
      away_team: "0",
      home_team: "0",
      away_score: "0",
      home_score: "0"
    };

  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  render() {

    return (

      <Grid fluid>
        <form onSubmit={this.handleSubmit}>
          <Col xs={6} md={3}>
            <Team team={this.props.home} home={true} />
          </Col>
          <Col xs={6} md={3}>
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </Col>
          <Col xs={6} md={3}>
            <div><Team team={this.props.away} home={false} /></div>
          </Col>
          <input type="submit" value="Submit" />
        </form>

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
