import React, { Component } from 'react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import { createFragmentContainer, graphql } from 'react-relay';
import { withRouter } from 'react-router-dom';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';

import * as GENDER from '../../constants/gender';

import BackgroundSpinner from '../framework/BackgroundSpinner';
import CreateWorkoutPlanMutation from '../../mutations/CreateWorkoutPlan';
import ExerciseAproachModal from './ExerciseAproachModal';
import UpdateWorkoutPlanMutation from '../../mutations/UpdateWorkoutPlan';
import VALIDATION_CONFIG from './validationConfig';
import WorkoutListGroupByDay from './WorkoutListGroupByDay';
import checkValidation from '../../helpers/checkValidation';

import workoutPlanBuilderService from '../../services/workout-plan-builder.service';

class WorkoutPlanBuilder extends Component {
  feedWorkoutDate = null;

  static propTypes = {
    viewer: PropTypes.shape({
      node: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string,
      }),
      workoutPlanTemplate: PropTypes.shape({
        workouts: PropTypes.shape({
          edges: PropTypes.arrayOf(
            PropTypes.shape({
              node: PropTypes.shape({

              }).isRequired,
            }),
          ),
        }),
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
        edges: [],
      },
      ...props.viewer.node,

      editabledExerciseAproach: null,
      isExerciseAproachModalOpen: false,
      editableWorkoutDate: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    const { viewer, history } = this.props;

    window.onbeforeunload = () => 'Changes that you made may not be saved.';

    if (!viewer.node && !workoutPlanBuilderService.isPresetStepComplitted) {
      history.push('/workout-plan-builder');
    }
  }

  componentWillUnmount() {
    workoutPlanBuilderService.resetPresetStep();

    window.onbeforeunload = null;
  }

  onFieldChange = (e, value) => this.setState({ [e.target.name]: value });

  onExerciseAproachModalSubmitted = (exerciseAproach) => {
    this.setState(
      prevState => ({
        isExerciseAproachModalOpen: false,
        workouts: prevState.editabledExerciseAproach
          ? workoutPlanBuilderService.updateExerciseAproachByIndexWorkoutByDate(
            prevState.workouts,
            this.feedWorkoutDate,
            exerciseAproach,
            this.editabledExerciseAproachIndex,
          )
          : workoutPlanBuilderService.addExerciseAproachToWorkoutByDate(
            prevState.workouts,
            this.feedWorkoutDate,
            exerciseAproach,
          ),
      }),
      () => {
        this.feedWorkoutDate = null;
        this.editabledExerciseAproachIndex = null;
      },
    );
  };

  onDeleteExerciseAproachByIndexAndWorkoutDate = (workoutDate, feedIndex) => {
    this.setState(prevState => ({
      workouts: workoutPlanBuilderService.filterOutExerciseAproachByIndexAndWorkoutDate(
        prevState.workouts,
        workoutDate,
        feedIndex,
      ),
    }));
  };

  submitChanges = () => {
    const { viewer: { node } } = this.props;

    if (node && node.id) {
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
    const { viewer, history } = this.props;

    CreateWorkoutPlanMutation(workoutPlanBuilderService.mapDataForRequest(data), viewer)
      .then((response) => {
        this.setState({ isLoading: false });

        if (response.createWorkoutPlan) {
          alert('WorkoutPlan has been created!');
          history.push(`/workout-plan-builder/creator/${response.createWorkoutPlan.createdWorkoutPlanEdge.node.id}`);
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
    const {
      viewer,
    } = this.props;

    UpdateWorkoutPlanMutation(
      viewer.node.id,
      workoutPlanBuilderService.mapDataForRequest(data),
      viewer,
    )
      .then((response) => {
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
      workouts: workoutPlanBuilderService.updateWorkoutDateByOldDate(
        prevState.workouts,
        prevState.editableWorkoutDate,
        newDate,
      ),
      editableWorkoutDate: null,
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

  closeExerciseAproachModal = () => this.setState({ isExerciseAproachModalOpen: false });

  addNextDayWorkout = () => {
    this.setState(prevState => ({
      workouts: workoutPlanBuilderService.addNextDayWorkout(prevState.workouts),
    }));
  };

  render() {
    const {
      viewer,
    } = this.props;
    const {
      name,
      avatarUrl,
      gender,
      workouts,
      isLoading,
      isExerciseAproachModalOpen,
      editabledExerciseAproach,
      editableWorkoutDate,
    } = this.state;
    const isEditMode = viewer.node && viewer.node.id;

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={isEditMode ? `Workout Plan Builder: ${name}` : 'Workout Plan Builder'} />
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
              value={name}
              onChange={this.onFieldChange}
              floatingLabelText="Workout Plan Name"
              hintText="Enter muscle name"
            />
          </div>

          <div>
            <TextField
              name="avatarUrl"
              fullWidth
              value={avatarUrl}
              onChange={this.onFieldChange}
              floatingLabelText="Workout Plan Avatar URL"
              hintText="Enter workout plan avatar url"
            />
          </div>

          <div>
            <SelectField
              fullWidth
              value={gender}
              floatingLabelText="Gender"
              onChange={(event, index, genderValue) => this.setState({ gender: genderValue })}
            >
              {
                Object.values(GENDER).map(genderObject => (
                  <MenuItem
                    key={genderObject.value}
                    value={genderObject.value}
                    primaryText={genderObject.title}
                  />
                ))
              }
            </SelectField>
          </div>

          <div>
            <h3>Workouts</h3>

            <WorkoutListGroupByDay
              workouts={workouts}
              addWorkoutByDate={this.addWorkoutByDate}
              deleteAllWorkoutsByDate={this.deleteAllWorkoutsByDate}
              deleteWorkoutByDate={this.deleteWorkoutByDate}
              changeWorkoutTimeByDate={this.openWorkoutTimeTimePicker}
              // eslint-disable-next-line max-len
              onDeleteExerciseAproachByIndexAndWorkoutDate={this.onDeleteExerciseAproachByIndexAndWorkoutDate}
              addExerciseAproachToWorkout={this.openExerciseAproachModal}
              updateExerciseAproachByIndexWorkoutDate={this.openExerciseAproachModal}
            />

            {
              workoutPlanBuilderService.isNewDayAvailable(workouts) && (
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

        <BackgroundSpinner isShowing={isLoading} />

        <ExerciseAproachModal
          viewer={viewer}
          open={isExerciseAproachModalOpen}
          onRequestClose={this.closeExerciseAproachModal}
          onSubmit={this.onExerciseAproachModalSubmitted}
          exerciseAproach={editabledExerciseAproach}
        />

        <TimePicker
          style={{ display: 'none' }}
          id="time-picker"
          value={new Date(editableWorkoutDate)}
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
