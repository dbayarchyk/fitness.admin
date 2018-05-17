import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TimePicker from 'material-ui/TimePicker';

import * as GENDER from '../../constants/gender';

import VALIDATION_CONFIG from './validationConfig';

import workoutPlanBuilderService from '../../services/workout-plan-builder.service';

import checkValidation from '../../helpers/checkValidation';

import CreateWorkoutPlanMutation from '../../mutations/CreateWorkoutPlan';
import UpdateWorkoutPlanMutation from '../../mutations/UpdateWorkoutPlan';

import WorkoutListGroupByDay from './WorkoutListGroupByDay';
import ExerciseAproachModal from './ExerciseAproachModal';

import BackgroundSpinner from '../framework/BackgroundSpinner';

class WorkoutPlanBuilder extends Component {
  static propTypes = {
    viewer: PropTypes.shape({
      node: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      gender: GENDER.ALL.value,
      workouts: props.viewer.workoutPlanTemplate ? props.viewer.workoutPlanTemplate.workouts : {
        edges: []
      },
      ...props.viewer.node,

      editabledExerciseAproach: null,
      isExerciseAproachModalOpen: false,
      editableWorkoutDate: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    window.onbeforeunload = () => 'Changes that you made may not be saved.';

    if (!this.props.viewer.node && !workoutPlanBuilderService.isPresetStepComplitted) {
      this.props.history.push('/workout-plan-builder');
    }
  }

  componentWillUnmount() {
    workoutPlanBuilderService.resetPresetStep();

    window.onbeforeunload = null;
  }
  
  feedWorkoutDate = null;

  onFieldChange = (e, value) => this.setState({ [e.target.name]: value });

  submitChanges = () => {
    if (this.props.viewer.node && this.props.viewer.node.id) {
      this.updateWorkoutPlan();
    } else {
      this.createWorkoutPlan();
    }
  };

  createWorkoutPlan = () => {
    this.setState({ isLoading: true });

    const {
      isLoading,
      editabledExerciseAproach,
      isExerciseAproachModalOpen,
      editableWorkoutDate,

      ...data
    } = this.state;

    CreateWorkoutPlanMutation(workoutPlanBuilderService.mapDataForRequest(data), this.props.viewer)
      .then((response, errors) => {
        this.setState({ isLoading: false });
  
        if (response.createWorkoutPlan) {
          alert('WorkoutPlan has been created!');
          this.props.history.push(`/workout-plan-builder/${response.createWorkoutPlan.createdWorkoutPlanEdge.node.id}`);
        } else {
          alert('Oops, something went wrong!')
        }
      })
      .catch((errors) => {
        if (errors && errors.length) {
          errors.forEach(error => alert(error.message));
        } else {
          alert('Oops, something went wrong!');
        }

        this.setState({ isLoading: false });
      });
  };

  updateWorkoutPlan = () => {
    this.setState({ isLoading: true });

    const {
      isLoading,
      editabledExerciseAproach,
      isExerciseAproachModalOpen,
      editableWorkoutDate,

      id,

      ...data
    } = this.state;

    UpdateWorkoutPlanMutation(this.props.viewer.node.id, workoutPlanBuilderService.mapDataForRequest(data), this.props.viewer)
      .then((response, errors) => {
        this.setState({ isLoading: false });
  
        if (response.updateWorkoutPlan) {
          alert('WorkoutPlan has been updated!');
        } else {
          alert('Oops, something went wrong!')
        }
      })
      .catch((errors) => {
        this.setState({ isLoading: false });

        if (errors && errors.length) {
          errors.forEach(error => alert(error.message));
        } else {
          alert('Oops, something went wrong!');
        }
      });
  };

  deleteWorkoutByDate = (date) => {
    this.setState(prevState => ({
      workouts: workoutPlanBuilderService.filterOutWorkoutByDate(prevState.workouts, date),
    }));
  };

  deleteAllWorkoutsByDate = (date) => {
    this.setState(prevState => ({
      workouts: workoutPlanBuilderService.filterOutAllWorkoutsByDate(prevState.workouts, date),
    }));
  };

  addWorkoutByDate = (date) => {
    this.setState(prevState => ({
      workouts: workoutPlanBuilderService.addWorkoutByDate(prevState.workouts, date),
    }));
  };

  openWorkoutTimeTimePicker = (date) => {
    this.setState({ editableWorkoutDate: date }, () => {
      document.getElementById('time-picker').click();
    });
  };

  changeWorkoutTimeByDate = (event, newDate) => {
    this.setState(prevState => ({
      workouts: workoutPlanBuilderService.updateWorkoutDateByOldDate(prevState.workouts, prevState.editableWorkoutDate, newDate),
      editableWorkoutDate: null,
    }));
  };

  onDeleteExerciseAproachByIndexAndWorkoutDate = (workoutDate, feedIndex) => {
    this.setState(prevState => ({
      workouts: workoutPlanBuilderService.filterOutExerciseAproachByIndexAndWorkoutDate(prevState.workouts, workoutDate, feedIndex),
    }));
  };

  openExerciseAproachModal = (workoutDate, editabledExerciseAproach, feedIndex) => {
    this.setState({
      isExerciseAproachModalOpen: true,
      editabledExerciseAproach,
    });

    this.feedWorkoutDate = workoutDate;
    this.editabledExerciseAproachIndex = feedIndex;
  };

  onExerciseAproachModalSubmitted = (exerciseAproach) => {
    this.setState(
      prevState => ({
        isExerciseAproachModalOpen: false,
        workouts: prevState.editabledExerciseAproach
          ? workoutPlanBuilderService.updateExerciseAproachByIndexWorkoutByDate(prevState.workouts, this.feedWorkoutDate, exerciseAproach, this.editabledExerciseAproachIndex)
          : workoutPlanBuilderService.addExerciseAproachToWorkoutByDate(prevState.workouts, this.feedWorkoutDate, exerciseAproach),
      }),
      () => {
        this.feedWorkoutDate = null;
        this.editabledExerciseAproachIndex = null;
      }
    );
  };

  closeExerciseAproachModal = (exerciseAproach) => this.setState({ isExerciseAproachModalOpen: false });

  addNextDayWorkout = () => {
    this.setState(prevState => ({
      workouts: workoutPlanBuilderService.addNextDayWorkout(prevState.workouts),
    }));
  };

  render() {
    const isEditMode = this.props.viewer.node && this.props.viewer.node.id;

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={isEditMode ? `Workout Plan Builder: ${this.state.name}` : 'Workout Plan Builder'} />
          </ToolbarGroup>

          <ToolbarGroup>
            <RaisedButton
              primary
              label={isEditMode ? 'Save Changes' : 'Create Workout Plan'}
              onClick={this.submitChanges}
              disabled={!checkValidation(this.state, VALIDATION_CONFIG)}
            />
          </ToolbarGroup>
        </Toolbar>

        <section>
          <div>
            <TextField
              name="name"
              fullWidth
              value={this.state.name}
              onChange={this.onFieldChange}
              floatingLabelText="Workout Plan Name"
              hintText="Enter muscle name"
            />
          </div>

          <div>
            <TextField
              name="avatarUrl"
              fullWidth
              value={this.state.avatarUrl}
              onChange={this.onFieldChange}
              floatingLabelText="Workout Plan Avatar URL"
              hintText="Enter workout plan avatar url"
            />
          </div>

          <div>
            <SelectField
              fullWidth
              value={this.state.gender}
              floatingLabelText="Gender"
              onChange={(event, index, gender) => this.setState({ gender })}
            >
              {_.values(GENDER).map(gender => <MenuItem key={gender.value} value={gender.value} primaryText={gender.title} />)}
            </SelectField>
          </div>

          <div>
            <h3>Workouts</h3>

            <WorkoutListGroupByDay
              workouts={this.state.workouts}
              addWorkoutByDate={this.addWorkoutByDate}
              deleteAllWorkoutsByDate={this.deleteAllWorkoutsByDate}
              deleteWorkoutByDate={this.deleteWorkoutByDate}
              changeWorkoutTimeByDate={this.openWorkoutTimeTimePicker}
              onDeleteExerciseAproachByIndexAndWorkoutDate={this.onDeleteExerciseAproachByIndexAndWorkoutDate}
              addExerciseAproachToWorkout={this.openExerciseAproachModal}
              updateExerciseAproachByIndexWorkoutDate={this.openExerciseAproachModal}
            />

            {
              workoutPlanBuilderService.isNewDayAvailable(this.state.workouts) && (
                <RaisedButton
                  label="Next Day"
                  fullWidth
                  primary
                  onClick={this.addNextDayWorkout}
                />
              )
            }
          </div>
        </section>

        <BackgroundSpinner isShowing={this.state.isLoading} />

        <ExerciseAproachModal
          viewer={this.props.viewer}
          open={this.state.isExerciseAproachModalOpen}
          onRequestClose={this.closeExerciseAproachModal}
          onSubmit={this.onExerciseAproachModalSubmitted}
          exerciseAproach={this.state.editabledExerciseAproach}
        />

        <TimePicker
          style={{ display: 'none' }}
          id="time-picker"
          value={new Date(this.state.editableWorkoutDate)}
          onChange={this.changeWorkoutTimeByDate}
        />
      </div>
    );
  }
}

export default createFragmentContainer(
  withRouter(WorkoutPlanBuilder),
  graphql`
    fragment WorkoutPlanBuilder_viewer on Viewer
    @argumentDefinitions(
      workoutPlanId: { type: "ID!" },
      workoutPlanTemplateId: { type: "ID!" },
      skipFetchWorkoutPlan: { type: "Boolean!" }
      skipFetchWorkoutPlanTemplate: { type: "Boolean!" }
    ) {
      node(id: $workoutPlanId) @skip(if: $skipFetchWorkoutPlan) {
        id
        ... on WorkoutPlan {
          name
          avatarUrl
          workouts {
            edges {
              node {
                date,
                exerciseAproaches {
                  edges {
                    node {
                      exercise {
                        id
                        name
                        avatarUrl
                      }
                      count
                    }
                  }
                }
              }
            }
          }
        }
      }
      workoutPlanTemplate(id: $workoutPlanTemplateId) @skip(if: $skipFetchWorkoutPlanTemplate) {
        workouts {
          edges {
            node {
              date,
              exerciseAproaches {
                edges {
                  node {
                    exercise {
                      id
                      name
                      avatarUrl
                    }
                    count
                  }
                }
              }
            }
          }
        }
      }
      ...ExerciseAproachModal_viewer
    }
  `,
);
