import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class SaveAsTemplateModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    title: 'Save as Template',
    open: false,
  };

  state = {
    name: '',
  };

  onRequestClose = () => {
    const { onRequestClose } = this.props;

    this.setState({ name: '' });
    onRequestClose();
  }

  onSubmit = () => {
    const { onSubmit } = this.props;
    const { name } = this.state;

    this.setState({ name: '' });
    onSubmit(name);
  }

  render() {
    const {
      title,
      open,
    } = this.props;
    const { name } = this.name;

    return (
      <Dialog
        title={title}
        open={open}
        onRequestClose={this.onRequestClose}
        actions={[
          <RaisedButton
            label="Cancel"
            onClick={this.onRequestClose}
            style={{ marginRight: 5 }}
          />,
          <RaisedButton
            label="Save"
            primary
            onClick={this.onSubmit}
            disabled={!(name && name.length)}
          />,
        ]}
      >
        <TextField
          fullWidth
          floatingLabelText="Template Name"
          value={name}
          onChange={(event, newValue) => this.setState({ name: newValue })}
        />
      </Dialog>
    );
  }
}

export default SaveAsTemplateModal;
