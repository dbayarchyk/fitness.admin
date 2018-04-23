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
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import checkValidation from '../../helpers/checkValidation';

import CreateExerciseMutation from '../../mutations/CreateExercise';
import UpdateExerciseMutation from '../../mutations/UpdateExercise';

import BackgroundSpinner from '../framework/BackgroundSpinner';

import * as MUSCLE_GROUP from '../../constants/muscleGroup';

import { url as urlRegExp } from '../../constants/regExp';

import ExerciseMuscleList from './ExerciseMuscleList';
import SelectMuscleModal from './SelectMuscleModal';

class ExerciseBuilder extends Component {
  static propTypes = {
    viewer: PropTypes.shape({
      node: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string,
        photos: PropTypes.shape({
          edges: PropTypes.arrayOf(
            PropTypes.shape({
              node: PropTypes.string.isRequired,
            })
          )
        }).isRequired,
        photos: PropTypes.shape({
          edges: PropTypes.arrayOf(
            PropTypes.shape({
              node: PropTypes.string.isRequired,
            })
          ).isRequired,
        }).isRequired,
        description: PropTypes.string,
        complexity: PropTypes.number,
        videoUrl: PropTypes.string,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      muscles: {
        edges: []
      },
      ...props.viewer.node,

      isLoading: false,
      isSelectMuscleModalOpen: false,
    };
  }

  onFieldChange = (e, value) => this.setState({ [e.target.name]: value });

  submitChanges = () => {
    if (this.props.viewer.node && this.props.viewer.node.id) {
      this.updateExercise();
    } else {
      this.createExercise();
    }
  };

  createExercise = () => {
    this.setState({ isLoading: true });

    const { isLoading, isSelectMuscleModalOpen, muscles, ...data } = this.state;

    data.muscles = _.map(muscles.edges, 'node.id');

    CreateExerciseMutation(data, this.props.viewer)
      .then((response, errors) => {
        this.setState({ isLoading: false });
  
        if (response.createExercise) {
          alert('Exercise has been created!');
          this.props.history.push(`/exercise-builder/${response.createExercise.createdExerciseEdge.node.id}`);
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

  updateExercise = () => {
    this.setState({ isLoading: true });

    const { isLoading, id, isSelectMuscleModalOpen, muscles, ...data } = this.state;

    data.muscles = _.map(muscles.edges, 'node.id');

    UpdateExerciseMutation(this.props.viewer.node.id, data, this.props.viewer)
      .then((response, errors) => {
        this.setState({ isLoading: false });
  
        if (response.updateExercise) {
          alert('Exercise has been updated!');
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
  }

  isDataValid = () => checkValidation(this.state, validationConfig);

  closeSelectMuscleModal = () => this.setState({ isSelectMuscleModalOpen: false });

  addMuscle = (muscle) => {
    this.setState(prevState => ({
      muscles: {
        ...prevState,
        edges: [
          ...prevState.muscles.edges,
          muscle
        ],
      },
    }));

    this.closeSelectMuscleModal();
  };

  removeMuscleById = (id) => {
    this.setState(prevState => ({
      muscles: {
        ...prevState,
        edges: _.filter(prevState.muscles.edges, ({ node }) => node.id !== id),
      },
    }));
  }

  render() {
    const isEditMode = this.props.viewer.node && this.props.viewer.node.id;

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={isEditMode ? `Exercise Builder: ${this.state.name}` : 'Exercise Builder'} />
          </ToolbarGroup>

          <ToolbarGroup>
            <RaisedButton
              primary
              label={isEditMode ? 'Save Changes' : 'Create Exercise'}
              onClick={this.submitChanges}
              disabled={!this.isDataValid()}
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
              floatingLabelText="Exercise Name"
              hintText="Enter muscle name"
            />
          </div>

          <div>
            <TextField
              name="avatarUrl"
              fullWidth
              value={this.state.avatarUrl}
              onChange={this.onFieldChange}
              floatingLabelText="Exercise Avatar URL"
              hintText="Enter exercise avatar url"
            />
          </div>

          <div>
            <h3>Photos</h3>
          </div>

          <div>
            <h3>Exercise Muscles</h3>

            <ExerciseMuscleList
              muscles={this.state.muscles}
              onAddMuscleClick={() => this.setState({ isSelectMuscleModalOpen: true })}
              onRemoveMuslceClick={this.removeMuscleById}
            />
          </div>

          <div>
            <TextField
              name="description"
              fullWidth
              multiLine
              rowsMax={5}
              value={this.state.description}
              onChange={this.onFieldChange}
              floatingLabelText="Exercise Description"
              hintText="Enter exercise description"
            />
          </div>

          <div>
            <h3>Exercise Complexity</h3>

            <RadioButtonGroup
              name="complexity"
              valueSelected={this.state.complexity}
              onChange={this.onFieldChange}
            >
              <RadioButton value={1} label="Simple" />
              <RadioButton value={2} label="Medium" />
              <RadioButton value={3} label="Hard" />
            </RadioButtonGroup>
          </div>

          <div>
            <TextField
              name="video"
              fullWidth
              value={this.state.video}
              onChange={this.onFieldChange}
              floatingLabelText="Exercise Video URL"
              hintText="Enter exercise video url"
            />
          </div>
        </section>

        <BackgroundSpinner isShowing={this.state.isLoading} />

        <SelectMuscleModal
          open={this.state.isSelectMuscleModalOpen}
          viewer={this.props.viewer}
          onSelectMuslce={this.addMuscle}
          onRequestClose={this.closeSelectMuscleModal}
        />
      </div>
    );
  }
}

const validationConfig = {
  name: {
    isValid: value => value && value.length,
  },
  avatarUrl: {
    isValid: value => urlRegExp.test(value) || !value,
  },
  video: {
    isValid: value => urlRegExp.test(value) || !value,
  },
  muscles: {
    isValid: muscles => muscles && muscles.edges && muscles.edges.length,
  },
  complexity: {
    isValid: value => value && _.isNumber(value),
  },
};

export default createFragmentContainer(
  withRouter(ExerciseBuilder),
  graphql`
    fragment ExerciseBuilder_viewer on Viewer
    @argumentDefinitions(
      exerciseId: { type: "ID!" },
      skipFetchExercise: { type: "Boolean!" }
    ) {
      node(id: $exerciseId) @skip(if: $skipFetchExercise) {
        id
        ... on Exercise {
          name
          avatarUrl
          photos {
            edges {
              node
            }
          }
          muscles {
            edges {
              node {
                id
                name
              }
            }
          }
          description
          complexity
          videoUrl
        }
      }
      ...SelectMuscleModal_viewer
    }
  `,
);
