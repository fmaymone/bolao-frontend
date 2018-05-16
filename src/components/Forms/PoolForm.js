import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { Avatar } from 'rmw-shell/lib/containers/Avatar';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions';
import { ImageCropDialog } from 'rmw-shell/lib/containers/ImageCropDialog';
import { withRouter } from 'react-router-dom';
import muiThemeable from 'material-ui/styles/muiThemeable';
import PropTypes from 'prop-types';



class Form extends Component {

  handlePhotoUploadSuccess = (snapshot) => {
    const { setDialogIsOpen, change } = this.props;
    change('photoURL', snapshot.downloadURL);
    setDialogIsOpen('new_pool_photo', undefined);
  }

  render() {
    const {
      handleSubmit,
      intl,
      initialized,
      setDialogIsOpen,
      dialogs,
      match,
      users
    } = this.props;

    const uid = match.params.uid;
    let userSource = []

    if (users) {
      userSource = users.map(user => {
        return { id: user.key, name: user.val.displayName }
      })
    }
    
    

    return (
      <form onSubmit={handleSubmit} style={{
        height: '100%',
        alignItems: 'strech',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button type="submit" style={{ display: 'none' }} />

        <div style={{ margin: 15, display: 'flex', flexDirection: 'column' }}>

          <div>
            <Field
              name="photoURL"
              size={120}
              component={Avatar}
              icon={
                <FontIcon
                  className="material-icons">
                  business
              </FontIcon>
              }
              ref="photoURL"
              withRef
            />
          </div>


          <FlatButton
            onClick={() => {
              setDialogIsOpen('new_pool_photo', true)
            }}
            disabled={uid === undefined || !initialized}
            containerElement='label'
            primary={true}
            icon={
              <FontIcon
                className="material-icons">
                photo_camera
            </FontIcon>
            }
          />
        </div>

        <div>
          <div>
            <Field
              name="name"
              disabled={!initialized}
              component={TextField}
              hintText={intl.formatMessage({ id: 'name_hint' })}
              floatingLabelText={intl.formatMessage({ id: 'name_label' })}
              ref="name"
              withRef
            />
          </div>

          {/* <div>
            <Field
              name="full_name"
              disabled={!initialized}
              component={TextField}
              hintText={intl.formatMessage({ id: 'full_name_hint' })}
              floatingLabelText={intl.formatMessage({ id: 'full_name_label' })}
              ref="full_name"
              withRef
            />
          </div> */}

          {/* <div>
            <Field
              name="vat"
              disabled={!initialized}
              component={TextField}
              hintText={intl.formatMessage({ id: 'vat_hint' })}
              floatingLabelText={intl.formatMessage({ id: 'vat_label' })}
              ref="vat"
              withRef
            />
          </div> */}


          <div>
            <Field
              name="secret_word"
              disabled={!initialized}
              component={TextField}
              multiLine={true}
              rows={2}
              hintText={intl.formatMessage({ id: 'secret_word' })}
              floatingLabelText={intl.formatMessage({ id: 'secret_label' })}
              ref="description"
              withRef
            />
          </div>

          <ImageCropDialog
            path={`pools/${uid}`}
            fileName={`photoURL`}
            onUploadSuccess={(s) => { this.handlePhotoUploadSuccess(s) }}
            open={dialogs.new_pool_photo !== undefined}
            src={dialogs.new_pool_photo}
            handleClose={() => { setDialogIsOpen('new_pool_photo', undefined) }}
            title={intl.formatMessage({ id: 'change_photo' })}
          />
        </div>

      </form>
    );
  }
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  initialized: PropTypes.bool.isRequired,
  setDialogIsOpen: PropTypes.func.isRequired,
  dialogs: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};


Form = reduxForm({ form: 'pool' })(Form);
const selector = formValueSelector('pool')

const mapStateToProps = state => {
  const { intl, vehicleTypes, users, dialogs, auth } = state;

  return {
    auth,
    intl,
    vehicleTypes,
    users,
    dialogs,
    photoURL: selector(state, 'photoURL')
  };
};

export default connect(
  mapStateToProps, { setDialogIsOpen }
)(injectIntl(withRouter(muiThemeable()(Form))));
