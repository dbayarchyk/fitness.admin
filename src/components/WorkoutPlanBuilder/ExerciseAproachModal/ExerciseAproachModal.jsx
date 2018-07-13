import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import EditIcon from 'material-ui/svg-icons/image/edit';
import RaisedButton from 'material-ui/RaisedButton';

import VALIDATION_CONFIG from './validationConfig';

import checkValidation from '../../../helpers/checkValidation';

import SelectExerciseModal from '../SelectExerciseModal';

class ExerciseAproachModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    viewer: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    exerciseAproach: PropTypes.shape({
      exercise: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        avatarUrl: PropTypes.string,
      }),
      count: PropTypes.number,
    }),
    onSubmit: PropTypes.func,
    onRequestClose: PropTypes.func,
  };

  static defaultProps = {
    title: 'ExerciseAproach Builder',
    open: false,
    exerciseAproach: {
      exercise: null,
      count: 0,
    },
    onSubmit: () => {},
    onRequestClose: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      isSelectExerciseModalOpen: false,

      exercise: props.exerciseAproach && props.exerciseAproach.exercise,
      count: props.exerciseAproach && props.exerciseAproach.count,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      exercise: nextProps.exerciseAproach && nextProps.exerciseAproach.exercise,
      count: nextProps.exerciseAproach && nextProps.exerciseAproach.count,
    });
  }

  submitModal = () => {
    const { isSelectExerciseModalOpen, ...data } = this.state;
    const { onSubmit } = this.props;

    this.setState({ exercise: null, count: 0 });

    onSubmit({
      ...data,
      count: Number(data.count),
    });
  };

  render() {
    const {
      title,
      open,
      viewer,
      onRequestClose,
    } = this.props;
    const {
      exercise,
      count,
      isSelectExerciseModalOpen,
    } = this.state;

    const actions = [
      <RaisedButton
        label="Cancel"
        onClick={onRequestClose}
        style={{ marginRight: 5 }}
      />,
      <RaisedButton
        label="Submit"
        primary
        onClick={this.submitModal}
        disabled={!checkValidation(this.state, VALIDATION_CONFIG)}
      />,
    ];

    const selectExerciseModalTriggerButton = (
      <IconButton
        tooltip="Select Exercise"
        onClick={() => this.setState({ isSelectExerciseModalOpen: true })}
      >
        <EditIcon />
      </IconButton>
    );

    return (
      <Dialog
        title={title}
        open={open}
        onRequestClose={onRequestClose}
        actions={actions}
      >
        <ListItem
          leftAvatar={exercise && <Avatar src={exercise.avatarUrl} />}
          primaryText={exercise ? exercise.name : 'No Exercise is Selected'}
          rightIconButton={selectExerciseModalTriggerButton}
          onClick={() => this.setState({ isSelectExerciseModalOpen: true })}
        />

        <TextField
          fullWidth
          name="count"
          type="number"
          floatingLabelText="Exercise Count"
          value={count}
          onChange={(e, value) => this.setState({ [e.target.name]: value })}
        />

        <SelectExerciseModal
          viewer={viewer}
          open={isSelectExerciseModalOpen}
          onRequestClose={() => this.setState({ isSelectExerciseModalOpen: false })}
          onSelectExercise={({ node: exerciseNode }) => this.setState({
            exercise: exerciseNode,
            isSelectExerciseModalOpen: false,
          })}
        />
      </Dialog>
    );
  }
}

export default createFragmentContainer(
  ExerciseAproachModal,
  graphql`
    fragment ExerciseAproachModal_viewer on Viewer {
      ...SelectExerciseModal_viewer
    }
  `,
);
