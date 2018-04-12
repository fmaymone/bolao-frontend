import React, { Component } from "react";
import TestList from "../../components/Match/TestList";
import BetForm from "../../components/Forms/BetForm";
import { Activity } from "rmw-shell";
import Classification from '../../components/Match/Classification'
import firebase from "firebase";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import { injectIntl, intlShape } from "react-intl";


class ClassificationBuilder extends Component {

  render() {
    console.log(this.props.matches);
    const matches = this.props.matches;
    const classification = []


    for (let match of matches) {
      if (!classification.find(k => k.id == match.val.away_team)) {
        let element = { id: match.val.away_team, points: 0, win: 0, lost: 0, draw: 0, gc: 0, gp: 0 }
        classification.push(element);
      }
      if (!classification.find(k => k.id == match.val.home_team)) {
        let element = { id: match.val.home_team, points: 0, win: 0, lost: 0, draw: 0, gc: 0, gp: 0 }
        classification.push(element);
      }
    }
    for (let match of matches) {

      let teamHome = classification.find(k => k.id == match.val.home_team);
      let teamAway = classification.find(k => k.id == match.val.away_team);

      let home_result = parseInt(match.val.home_result);
      let away_result = parseInt(match.val.away_result);

      teamHome.gp += home_result;
      teamHome.gc += away_result;
      teamAway.gp += away_result;
      teamAway.gc += home_result;

      if (home_result > away_result) {
        teamHome.win += 1;
        teamHome.points += 3;
        teamAway.lost += 1;
      }
      if (home_result == away_result) {
        teamHome.draw += 1;
        teamAway.draw += 1;
        teamHome.points += 1;
        teamAway.points += 1;
      }
      if (home_result < away_result) {
        teamHome.lost += 1;
        teamAway.win += 1;
        teamAway.points += 3;
      }

    }
    function compare(a, b) {
      if (a.points < b.points)
        return 1;
      if (a.points > b.points)
        return -1;
      //if number points is equal, go to the diference btw gp and gc
      if (a.points == b.points) {
        if ((a.gp - a.gc) > (b.gp - b.gc)) {
          return 1;
        }
        if ((a.gp - a.gc) < (b.gp - b.gc)) {
          return -1;
        }
        //if gp-gc its equal, check if gp its bigger
        if ((a.gp - a.gc) == (b.gp - b.gc)) {
          if (a.gp > b.gp) {
            return 1
          }
          if (a.gp < b.gp) {
            return -1
          }
        }

      }
      return 0;
    }
    console.log(classification);
    const sortedList = classification.sort(compare);
    console.log(sortedList);
    return (
      // <GroupsMatchList matches={this.props.matches} />
      <Classification classification={sortedList}/>
    );
  }
}

const mapStateToProps = state => {
  const { intl, dialogs, auth } = state;

  return {
    intl,
    dialogs,
    auth,

  };
};

export default connect(mapStateToProps)(withFirebase(ClassificationBuilder));