import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class RenameModal extends Component {
  static propTypes = {
    name: PropTypes.string,
    title: PropTypes.string,
    open: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };
  
  static defaultProps = {
    name: '',
    title: 'Rename Item',
    open: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ name: nextProps.name });
  }

  render () {
    const {
      title,
      open,
      onRequestClose,
      onSubmit,
    } = this.props;

    return (
      <Dialog
        title={title}
        open={open}
        onRequestClose={onRequestClose}
        actions={[
          <RaisedButton
            label="Cancel"
            onClick={onRequestClose}
            style={{ marginRight: 5 }}
          />,
          <RaisedButton
            label="Rename"
            primary
            onClick={() => onSubmit(this.state.name)}
            disabled={!(this.state.name && this.state.name.length)}
          />,
        ]}
      >
        <TextField
          fullWidth
          floatingLabelText="Name"
          value={this.state.name}
          onChange={(event, newValue) => this.setState({ name: newValue })}
        />
      </Dialog>
    ); 
  }
}

export default RenameModal;
