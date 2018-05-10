import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const SaveAsTemplateModal = ({
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
        label="Save"
        primary
        onClick={onSubmit}
      />,
    ]}
  >
    <TextField
      fullWidth
      floatingLabelText="Template Name"
    />
  </Dialog>
);

SaveAsTemplateModal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

SaveAsTemplateModal.defaultProps = {
  title: 'Save Item as Template',
  open: false,
};

export default SaveAsTemplateModal;
