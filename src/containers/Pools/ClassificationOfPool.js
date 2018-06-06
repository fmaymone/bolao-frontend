import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import Users from "../Users/Users";
import User from '../../components/User/User';
import { Activity } from "rmw-shell";
import Scrollbar from "rmw-shell/lib/components/Scrollbar/Scrollbar";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import {
  FINAL_RESULT,
  TOP_SCORER
} from "../../store/actions/types";
import { Card, CardHeader } from "material-ui/Card";
import Loader from "../../components/UI/Loader";
import { calculatePoints } from "../../store/functions/general";
import TeamClassification from "../../components/Match/TeamClassification";


class ClassificationOfPool extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getUserByKey = (key) =>{
    const a = this.props.users.find(k=>k.key===key)
    return a.val;
  }

  renderClassification = allUserMatches => {
    allUserMatches.sort(compare);
    console.log(allUserMatches);
    function compare(a, b) {
      if (a.points.totalPoints < b.points.totalPoints) return 1;
      if (a.points.totalPoints > b.points.totalPoints) return -1;
      return 0;
    }
    return (
      <Card>
        <CardHeader title="Classificação" />
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{ width: "30%" }}>
                Jogador
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: "50%" }}>
                Pontos
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: "50%" }}>
                Resultado-Final
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {allUserMatches.map(user => (
              <TableRow>
                <TableRowColumn style={{ width: "30%" }}>
                  <User user = {this.getUserByKey(user.user)} />
                </TableRowColumn>
                <TableRowColumn style={{ width: "10%" }}>
                  {user.points.totalPoints}
                </TableRowColumn>
                <TableRowColumn style={{ width: "50%" }}>
              
                <TableRowColumn style={{ width: "25%" }}>
                  <TeamClassification id={user.matches.find(k=>k.group===FINAL_RESULT).first} isChip={true} position='first' />
                </TableRowColumn>
                <TableRowColumn style={{ width: "25%" }}>
                  <TeamClassification id={user.matches.find(k=>k.group===FINAL_RESULT).second}  isChip={true} position='second'/>
                </TableRowColumn>
                <TableRowColumn style={{ width: "25%" }}>
                  <TeamClassification id={user.matches.find(k=>k.group===FINAL_RESULT).third}  isChip={true} position='third'/>
                </TableRowColumn>
                <TableRowColumn style={{ width: "25%" }}>
                  <TeamClassification id={user.matches.find(k=>k.group===FINAL_RESULT).fourth}  isChip={true} position='fourth'/>
                </TableRowColumn>
          
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  };

  render() {
    const { outcomeMatches, users } = this.props;
    let allUserMatches = [];

    this.props.poolData.map(user => {
      const transformedUserMatches = Object.keys(user.matches).map(
        key => user.matches[key]
      );
      const data = calculatePoints(transformedUserMatches, outcomeMatches);
      allUserMatches.push({ user: user.key, points: data, matches: transformedUserMatches  });
    });
    console.log(allUserMatches);

    if (users !== undefined) {
      return (
        <div>
          {this.renderClassification(allUserMatches)}</div>)
     
    } else {
      return <Loader />;
    }
  }
}

const mapStateToProps = state => {};
export default connect(
  mapStateToProps,
  {}
)(injectIntl(withRouter(withFirebase(muiThemeable()(ClassificationOfPool)))));
