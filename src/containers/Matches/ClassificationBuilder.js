import React, { Component } from "react";
import TestList from "../../components/Match/TestList";
import BetForm from "../../components/Forms/BetForm";
import { Activity } from "rmw-shell";
import Classification from "../../components/Match/Classification";
import firebase from "firebase";
import { withFirebase } from "firekit-provider";
import { connect } from "react-redux";
import { injectIntl, intlShape } from "react-intl";
import {
  GROUPS_STAGE,
  KNOCKOUT_STAGE,
  ROUND_16
} from "../../store/actions/types";
import {
  updateClassification,
  updateMatch
} from "../../store/actions/bolaoActions";

class ClassificationBuilder extends Component {
  componentDidMount() {
    const { firebaseApp, auth, watchList } = this.props;
    //firebaseApp.database().ref(`/users/${auth.uid}/matches`);
    let ref = firebaseApp.database().ref(`/users/${auth.uid}/matches`);
    watchList(ref, "listMatches"); //Here we started watching a list
  }

  updateKnockoutStage = async teams => {
    const stage = this.props.stage;
    try {
      if (stage.currentPhase === KNOCKOUT_STAGE) {
        await this.updateKnockoutPhase(teams);
      } else {
        await this.updateGroupsPhase(teams);
      }
    } catch (err) {
      console.error(err);
    }
  };

  updateKnockoutPhase = async () => {
    console.log("KnockoutPhase");
  };

  updateGroupsPhase = async teams => {
    await this.update16Phase(teams);
    await this.updateClassificationDb(teams);
  };

  updateClassificationDb = async teams => {
    const group = this.props.stage.currentGroup;
    this.props.updateClassification(group, teams, this.props.pool);
  };

  update16Phase = async teams => {
    const group = this.props.stage.currentGroup;
    console.log(teams);
    let firstOfGroup = teams[0];
    let secondOfGroup = teams[1];
    let homeMatchToUpdate = 0;
    let awayMatchToUpdate = 0;
    let actualMatches = this.props.referenceMatches;
    const matchesToUpdate = this.props.worldCupData.knockout_crossings.ROUND_16.find(
      k => k.id == group
    );
    let firstMatch = actualMatches.find(k => k.key == matchesToUpdate.homeTeam);
    let secondMatch = actualMatches.find(
      k => k.key == matchesToUpdate.awayTeam
    );
   // if (!firstMatch === undefined && !secondMatch === undefined) {
      firstMatch.home_team = firstOfGroup.id;
      secondMatch.away_team = secondOfGroup.id;
      this.props.updateMatch(firstMatch, this.props.pool);
      this.props.updateMatch(secondMatch, this.props.pool);
    //}
  };

  fillClassificationGroups = matches => {
    let classification = [];

    for (let match of matches) {
      if (!classification.find(k => k.id == match.away_team)) {
        let element = {
          id: match.away_team,
          points: 0,
          win: 0,
          lost: 0,
          draw: 0,
          gc: 0,
          gp: 0
        };
        classification.push(element);
      }
      if (!classification.find(k => k.id == match.home_team)) {
        let element = {
          id: match.home_team,
          points: 0,
          win: 0,
          lost: 0,
          draw: 0,
          gc: 0,
          gp: 0
        };
        classification.push(element);
      }
    }
    for (let match of matches) {
      let teamHome = classification.find(k => k.id == match.home_team);
      let teamAway = classification.find(k => k.id == match.away_team);

      let home_result = parseInt(match.home_result);
      let away_result = parseInt(match.away_result);

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
    return classification.sort(compare);

    function compare(a, b) {
      if (a.points < b.points) return 1;
      if (a.points > b.points) return -1;
      //if number points is equal, go to the diference btw gp and gc
      if (a.points == b.points) {
        if (a.gp - a.gc > b.gp - b.gc) {
          return -1;
        }
        if (a.gp - a.gc < b.gp - b.gc) {
          return 1;
        }
        //if gp-gc its equal, check if gp its bigger
        if (a.gp - a.gc == b.gp - b.gc) {
          if (a.gp > b.gp) {
            return -1;
          }
          if (a.gp < b.gp) {
            return 1;
          }
        }
      }
      return 0;
    }
  };

  render() {
    console.log(this.props.matches);
    const matches = this.props.matches;
    let sortedList = [];

    if (this.props.stage.currentPhase === KNOCKOUT_STAGE) {
      return <div />;
    } else {
      sortedList = this.fillClassificationGroups(matches);
      this.updateKnockoutStage(sortedList);
      return <Classification classification={sortedList} />;
    }
  }
}

const mapStateToProps = state => {
  const { intl, dialogs, auth, lists, player, worldCupData } = state;

  return {
    intl,
    dialogs,
    auth,
    worldCupData,
    userMatches: lists.listMatches
  };
};

export default connect(mapStateToProps, { updateClassification, updateMatch })(
  withFirebase(ClassificationBuilder)
);
