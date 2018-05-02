// import React, { Component } from "react";
// import { Activity } from "rmw-shell";
// import { injectIntl } from "react-intl";
// import { withRouter } from "react-router-dom";
// import { withFirebase } from "firekit-provider";
// import { connect } from "react-redux";
// import muiThemeable from "material-ui/styles/muiThemeable";
// import GroupsBuilder from "./GroupsBuilder";
// import KnockoutBuilder from './KnockoutBuilder';
// import { GROUPS_STAGE, KNOCKOUT_STAGE, ROUND_16 } from "../../store/actions/types";
// import MatchList from "../../components/Match/MatchList";
// import { matchesFetch, changeStage } from "../../store/actions/bolaoActions";
// import FlatButton from "material-ui/FlatButton";
// import { Container, Row, Col } from "react-grid-system";


// const groups = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// class WelcomeBuilder extends Component {
 
//   render() {
   

//     return (
//       <Activity>
//         <Container>
//           <Row>
//               <h1>Bem-Vindo ao Bolão dos Bebados</h1>
//            </Row>
//         </Container>
//       </Activity>
//     )
//   }
// }

// const mapStateToProps = state => {
//   const { intl, dialogs, auth, playerDataReducer, lists } = state;

//   return {
//     intl,
//     dialogs,
//     auth,
//     playerDataReducer: playerDataReducer,
//     matches: lists.listMatches
//   };
// };

// export default connect(mapStateToProps, { matchesFetch, changeStage })(
//   injectIntl(withRouter(withFirebase(muiThemeable()(WelcomeBuilder))))
// );
