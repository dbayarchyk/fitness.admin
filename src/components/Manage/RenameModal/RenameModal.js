import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const RenameModal = ({
  title,
  open,
  onRequestClose,
  onSubmit,
  description,
}) => (
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
        onClick={onSubmit}
      />,
    ]}
  >
    <TextField
      fullWidth
      floatingLabelText="Name"
    />
  </Dialog>
);

RenameModal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

RenameModal.defaultProps = {
  title: 'Rename Item',
  open: false,
};

export default RenameModal;
