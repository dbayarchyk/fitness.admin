import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

const DeleteModal = ({
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
        label="Delete"
        secondary
        onClick={onSubmit}
      />,
    ]}
  >
    {description}
  </Dialog>
);

DeleteModal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  onRequestClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  description: PropTypes.node,
};

DeleteModal.defaultProps = {
  title: 'Wow, delete this item?',
  open: false,
  description: 'Are you sure you want to delete this item? This action cannot be undone.',
};

export default DeleteModal;
