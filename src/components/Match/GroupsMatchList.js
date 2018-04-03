import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import muiThemeable from "material-ui/styles/muiThemeable";
import { injectIntl } from "react-intl";
import { Activity } from "rmw-shell";
import { List, ListItem } from "material-ui/List";
import Divider from "material-ui/Divider";
import FontIcon from "material-ui/FontIcon";
import IconButton from "material-ui/IconButton";
import TextField from "material-ui/TextField";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { withRouter } from "react-router-dom";
import Avatar from "material-ui/Avatar";
import { withFirebase } from "firekit-provider";
import isGranted from "rmw-shell/lib/utils/auth";
import Scrollbar from "rmw-shell/lib/components/Scrollbar/Scrollbar";
import FlatButton from "material-ui/FlatButton";
import FireForm from "fireform";
import BetForm from "../../components/Forms/BetForm";
import firebase from "firebase";
import { change, submit } from "redux-form";
import Match from "./Match";
import { Container, Row, Col } from "react-grid-system";
import Classification from './Classification'

const path = "/bets/";
const form_name = "bets";

class GroupsMatchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGroup: "a",
      matches: {}
    };
  }
  
  groupMatchesTest = [
    {id: 1,away_team: "1",
      home_team: "2",
      away_score: "1",
      home_score: "2"},
    
    {id: 2, 
      away_team: "3",
      home_team: "4",
      away_score: "1",
      home_score: "1"
    },
    {id: 3, 
      away_team: "1",
      home_team: "3",
      away_score: "3",
      home_score: "2"
    },
    {id: 4,away_team: "2",
      home_team: "4",
      away_score: "1",
      home_score: "2"
    }
  
  
  ]
  
// componentWillMount() {
//   console.log("oi");
//   this.handleUpdateMatch();
// }

nextGroup = currentGroup => {
  switch (currentGroup) {
    case "a":
      this.setState({ currentGroup: "b" });
      break;
    case "b":
      this.setState({ currentGroup: "c" });
      break;
    case "c":
      this.setState({ currentGroup: "d" });
      break;
    case "d":
      this.setState({ currentGroup: "e" });
      break;
    case "e":
      this.setState({ currentGroup: "f" });
      break;
    case "f":
      this.setState({ currentGroup: "g" });
      break;
    case "g":
      this.setState({ currentGroup: "h" });
      break;
    case "h":
      this.setState({ currentGroup: "h" });
      break;

    default:
      this.setState({ currentGroup: "a" });
      break;
  }
};

prevGroup = currentGroup => {
  switch (currentGroup) {
    case "a":
      this.setState({ currentGroup: "a" });
      break;
    case "b":
      this.setState({ currentGroup: "a" });
      break;
    case "c":
      this.setState({ currentGroup: "b" });
      break;
    case "d":
      this.setState({ currentGroup: "c" });
      break;
    case "e":
      this.setState({ currentGroup: "d" });
      break;
    case "f":
      this.setState({ currentGroup: "e" });
      break;
    case "g":
      this.setState({ currentGroup: "f" });
      break;
    case "h":
      this.setState({ currentGroup: "g" });
      break;

    default:
      this.setState({ currentGroup: "a" });
      break;
  }
};

// getMatchesFromDb = async (match) => {

//  const {  firebaseApp, auth } = this.props
//  let  ref =  await firebaseApp.database().ref('/users/' + auth.uid + '/bets/'+ match)
//  await ref.on('value', (dataSnapshot) => {

//     if(dataSnapshot.val()){
//       console.log(dataSnapshot.val());
//       this.setState({matches:dataSnapshot.val().name, match:dataSnapshot.val()})
//     }


//   });
// }

// handleUpdateMatch = () =>{
//   this.getMatchesFromDb(1);
// }

render() {
  const {
      history,
    intl,
    setDialogIsOpen,
    dialogs,
    match,
    submit,
    muiTheme,
    isGranted,
    firebaseApp
    } = this.props;
  const uid = this.props.auth.uid;

  const matches = this.props.worldCupData.groups.find(
    item => item.id === this.state.currentGroup
  );

  if (uid) {
    return (
      <Container fluid style={styles.matchesContainer}>
        <h1>Grupo {this.state.currentGroup.toUpperCase()} </h1>

        {matches.matches.map(match => (
          <div key={match.name}>
            <Match game={match} />
          </div>
        ))}

        <FlatButton
          label={"< Anterior"}
          primary={true}
          onClick={this.prevGroup.bind(this, this.state.currentGroup)}
        />
        <FlatButton
          label={"Proximo >"}
          primary={true}
          onClick={this.nextGroup.bind(this, this.state.currentGroup)}
        />
         <Classification matches = {this.groupMatchesTest} />
      </Container>

    );
  } else {
    return "Oi";
  }
}
}
const mapStateToProps = state => {
  const { auth, browser, lists, worldCupData } = state;

  return {
    auth,
    browser,
    isGranted: grant => isGranted(state, grant),
    worldCupData: worldCupData
  };
};

export default connect(mapStateToProps, { change, submit })(
  injectIntl(muiThemeable()(withRouter(withFirebase(GroupsMatchList))))
);

const styles = {
  matchesContainer: {
    overflow: "hidden",
    display: "flex",
    left: 20,
    flexDirection: "column"
  }
};