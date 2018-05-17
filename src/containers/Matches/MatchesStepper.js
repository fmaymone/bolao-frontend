import React from "react";
import { Step, Stepper, StepLabel, StepContent } from "material-ui/Stepper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {
  FIRST_PHASE_STARTED,
  FIRST_PHASE_COMPLETE,
  SECOND_PHASE_STARTED,
  SECOND_PHASE_FINISHED
} from "../../store/actions/types";

class MatchesStepper extends React.Component {
  // state = {
  //     finished: false,
  //     stepIndex: 0,
  //   };

  //   handleNext = () => {
  //     const {stepIndex} = this.state;
  //     this.setState({
  //       stepIndex: stepIndex + 1,
  //       finished: stepIndex >= 2,
  //     });
  //   };

  //   handlePrev = () => {
  //     const {stepIndex} = this.state;
  //     if (stepIndex > 0) {
  //       this.setState({stepIndex: stepIndex - 1});
  //     }
  //   };

  getStepContent(bettingStatus) {
    switch (bettingStatus) {
      case FIRST_PHASE_STARTED:
        return 0;
      case FIRST_PHASE_COMPLETE:
        return 1;
      case SECOND_PHASE_STARTED:
        return 1;
      case SECOND_PHASE_FINISHED:
        return 3;

      default:
        return 0;
    }
  }

  render() {
    const { finished, bettingStatus } = this.props;

    let textFinishing = 'Finalizando Apostas';
    
    if (bettingStatus === SECOND_PHASE_FINISHED){
        textFinishing = 'Apostas Finalizadas'
    }

    return (
      <div style={{ width: "100%", maxWidth: 700, margin: "auto" }}>
        <Stepper activeStep={this.getStepContent(bettingStatus)}>
          <Step>
            <StepLabel>Primeira-Fase de Apostas</StepLabel>
          </Step>
          <Step>
            <StepLabel> Segunda-Fase de Apostas</StepLabel>
          </Step>
          <Step>
            <StepLabel>{textFinishing}</StepLabel>
          </Step>
        </Stepper>
        {/* <div style={contentStyle}>
              {finished ? (
                <p>
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      this.setState({stepIndex: 0, finished: false});
                    }}
                  >
                    Click here
                  </a> to reset the example.
                </p>
              ) : (
                <div>
                  <p>{this.getStepContent(bettingStatus)}</p>
                  <div style={{marginTop: 12}}>
                    <FlatButton
                      label="Back"
                      disabled={bettingStatus === 0}
                      onClick={this.handlePrev}
                      style={{marginRight: 12}}
                    />
                    <RaisedButton
                      label={bettingStatus === 2 ? 'Finish' : 'Next'}
                      primary={true}
                      onClick={this.handleNext}
                    />
                  </div>
                </div>
              )}
            </div> */}
      </div>
    );
  }
}

export default MatchesStepper;
