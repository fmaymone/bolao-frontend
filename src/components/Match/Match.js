import React, { Component } from "react";
import { connect } from "react-redux";
import muiThemeable from "material-ui/styles/muiThemeable";
import { setDialogIsOpen } from "rmw-shell/lib/store/dialogs/actions";
import { withRouter } from "react-router-dom";
import { withFirebase } from "firekit-provider";
import { change, submit } from "redux-form";
import isGranted from "rmw-shell/lib/utils/auth";
import KnockoutMatch from "./KnockoutMatch";
import GroupMatch from "./GroupMatch";

class Match extends Component {
  render() {
    const {
      game,
    } = this.props;

    if (game.type === "group") {
      return (
        <GroupMatch
          game={game}
          handleChangedResult={this.props.handleChangedResult}
          finishedTimeToBet={this.props.finishedTimeToBet}
          user={this.props.user}
        />
      );
    } else {
      return (
        <KnockoutMatch
          game={game}
          pool={this.props.pool}
          chooseDrawWinnerHandler={this.props.chooseDrawWinnerHandler}
          handleChangedResult={this.props.handleChangedResult}
          finishedTimeToBet={this.props.finishedTimeToBet}
          user={this.props.user}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  const { intl, dialogs, auth, worldCupData } = state;

  return {
    intl,
    dialogs,
    auth,
    worldCupData,
    isGranted: grant => isGranted(state, grant)
  };
};

export default connect(mapStateToProps, {
  setDialogIsOpen,
  change,
  submit,
  
})(withRouter(withFirebase(muiThemeable()(Match))));

