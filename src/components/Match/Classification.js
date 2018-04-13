import React, { Component } from "react";
import { injectIntl, intlShape } from "react-intl";
import isGranted from "rmw-shell/lib/utils/auth";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import muiThemeable from "material-ui/styles/muiThemeable";
import { Container, Row, Col } from "react-grid-system";
import TeamPosition from './TeamPosition';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


class Classification extends Component {



  render() {
    const classification = this.props.classification;

    return (
      <Table>
        <TableHeader adjustForCheckbox={false} displaySelectAll={false} >
          <TableRow>
            <TableHeaderColumn style={{width: '30%'}}>Time</TableHeaderColumn>
            <TableHeaderColumn>P</TableHeaderColumn>
            <TableHeaderColumn>V</TableHeaderColumn>
            <TableHeaderColumn>D</TableHeaderColumn>
            <TableHeaderColumn>E</TableHeaderColumn>
            <TableHeaderColumn>SG</TableHeaderColumn>
            <TableHeaderColumn>GP</TableHeaderColumn>
            <TableHeaderColumn>GC</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {classification.map(team => (
            <TeamPosition team={team} />
          ))}
        </TableBody>
      </Table>
    )
  }
}
const mapStateToProps = state => {
  const { intl, dialogs, auth, worldCupData } = state;

  return {
    intl,
    dialogs,
    auth,
    isGranted: grant => isGranted(state, grant),
    worldCupData: worldCupData
  };
};
export default connect(mapStateToProps, {

})(injectIntl(withRouter(withFirebase(muiThemeable()(Classification)))));
