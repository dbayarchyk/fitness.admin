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
    viewer: PropTypes.object.isRequired,
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

    this.setState({ exercise: null, count: 0 });

    this.props.onSubmit({
      ...data,
      count: Number(data.count),
    });
  };

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        onClick={this.props.onRequestClose}
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
        title={this.props.title}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        actions={actions}
      >
        <ListItem
          leftAvatar={this.state.exercise && <Avatar src={this.state.exercise.avatarUrl} />}
          primaryText={this.state.exercise ? this.state.exercise.name : 'No Exercise is Selected'}
          rightIconButton={selectExerciseModalTriggerButton}
          onClick={() => this.setState({ isSelectExerciseModalOpen: true })}
        />

        <TextField
          fullWidth
          name="count"
          type="number"
          floatingLabelText="Exercise Count"
          value={this.state.count}
          onChange={(e, value) => this.setState({ [e.target.name]: value })}
        />

        <SelectExerciseModal
          viewer={this.props.viewer}
          open={this.state.isSelectExerciseModalOpen}
          onRequestClose={() => this.setState({ isSelectExerciseModalOpen: false })}
          onSelectExercise={({ node: exercise }) => this.setState({ exercise, isSelectExerciseModalOpen: false })}
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
