import React, { Component } from "react";
import { injectIntl } from "react-intl";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import { isMobile } from "../../device";

import User from "../../components/User/User";

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from "material-ui/Table";
import { FINAL_RESULT } from "../../store/actions/types";
import { Card, CardHeader } from "material-ui/Card";
import Loader from "../../components/UI/Loader";
import { calculatePoints } from "../../store/functions/general";
import TeamClassification from "../../components/Match/TeamClassification";
import FlatButton from "material-ui/FlatButton";
import {
  addUserToPool,
  fetchUserData,
  removeUserOfPool,
  addUserPools,
  removeUserPools,
} from "../../store/actions/bolaoActions";

class ClassificationOfPool extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick = (user) => {
    this.props.history.push({
      pathname: `/matches/show/${user.user}`,
      state: {
        user: user,
        outcomeMatches: this.props.outcomeMatches,
        profile: this.getUserByKey(user.user),
      },
    });
    //this.props.removeUserOfPool(user.user, this.props.match.params.uid);
  };

  getUserByKey = (key) => {
    return this.props.users[key];
  };

  renderClassification = (allUserMatches) => {
    allUserMatches.sort(compare);

    function compare(a, b) {
      if (a.points.totalPoints === b.points.totalPoints) {
        if (Number.isInteger(a.matches[64].first)) {
          return -1;
        } else {
          return 1;
        }
      }
      if (a.points.totalPoints < b.points.totalPoints) return 1;
      if (a.points.totalPoints > b.points.totalPoints) return -1;
      return 0;
    }
    if (!isMobile()) {
      return (
        <Card>
          <CardHeader title="Classificação" />
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={{ width: "10%" }}>
                  Apostas
                </TableHeaderColumn>
                <TableHeaderColumn style={{ width: "10%" }}>
                  Colocação
                </TableHeaderColumn>
                <TableHeaderColumn style={{ width: "30%" }}>
                  Jogador
                </TableHeaderColumn>
                <TableHeaderColumn style={{ width: "10%" }}>
                  Pontos
                </TableHeaderColumn>
                <TableHeaderColumn style={{ width: "50%" }}>
                  Resultado-Final
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {allUserMatches.map((user, index) => (
                <TableRow>
                  <TableRowColumn style={{ width: "10%" }}>
                    <FlatButton
                      label="Ver"
                      type="submit"
                      primary
                      onClick={() => {
                        this.handleClick(user);
                      }}
                    />
                  </TableRowColumn>
                  <TableRowColumn style={{ width: "10%" }}>
                    <h2>{index + 1}</h2>
                  </TableRowColumn>
                  <TableRowColumn style={{ width: "30%" }}>
                    <User user={this.getUserByKey(user.user)} />
                  </TableRowColumn>
                  <TableRowColumn style={{ width: "10%" }}>
                    {user.points.totalPoints}
                  </TableRowColumn>
                  <TableRowColumn style={{ width: "50%" }}>
                    <TableRowColumn>
                      <TeamClassification
                        id={
                          user.matches.find((k) => k.group === FINAL_RESULT)
                            .first
                        }
                        isChip={true}
                        position="first"
                      />
                    </TableRowColumn>
                    <TableRowColumn>
                      <TeamClassification
                        id={
                          user.matches.find((k) => k.group === FINAL_RESULT)
                            .second
                        }
                        isChip={true}
                        position="second"
                      />
                    </TableRowColumn>
                    <TableRowColumn>
                      <TeamClassification
                        id={
                          user.matches.find((k) => k.group === FINAL_RESULT)
                            .third
                        }
                        isChip={true}
                        position="third"
                      />
                    </TableRowColumn>
                    <TableRowColumn>
                      <TeamClassification
                        id={
                          user.matches.find((k) => k.group === FINAL_RESULT)
                            .fourth
                        }
                        isChip={true}
                        position="fourth"
                      />
                    </TableRowColumn>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      );
    } else {
      return (
        <Card>
          <CardHeader title="Classificação" />
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={{ width: "70%" }}>
                  Jogador
                </TableHeaderColumn>
                <TableHeaderColumn style={{ width: "30%" }}>
                  Pontos
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {allUserMatches.map((user) => (
                <TableRow>
                  <TableRowColumn style={{ width: "70%" }}>
                    <User user={this.getUserByKey(user.user)} />
                  </TableRowColumn>
                  <TableRowColumn style={{ width: "30%" }}>
                    {user.points.totalPoints}
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      );
    }
  };

  render() {
    const { outcomeMatches, users, status } = this.props;
    let allUserMatches = [];

    this.props.poolData.map((user) => {
      const transformedUserMatches = Object.keys(user.matches).map(
        (key) => user.matches[key]
      );
      const data = calculatePoints(
        transformedUserMatches,
        outcomeMatches,
        status
      );
      allUserMatches.push({
        user: user.key,
        points: data,
        matches: transformedUserMatches,
      });
    });

    if (users !== undefined) {
      return <div>{this.renderClassification(allUserMatches)}</div>;
    } else {
      return <Loader />;
    }
  }
}

const mapStateToProps = (state) => {};
export default connect(mapStateToProps, { removeUserOfPool })(
  injectIntl(withRouter(withFirebase(muiThemeable()(ClassificationOfPool))))
);
