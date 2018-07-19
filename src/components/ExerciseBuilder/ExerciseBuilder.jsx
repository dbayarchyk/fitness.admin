import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import { withRouter } from 'react-router-dom';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';

import RaisedButton from 'material-ui/RaisedButton';

import checkValidation from '../../helpers/checkValidation';

import CreateExerciseMutation from '../../mutations/CreateExercise';
import UpdateExerciseMutation from '../../mutations/UpdateExercise';

import BackgroundSpinner from '../framework/BackgroundSpinner';

import { url as urlRegExp } from '../../constants/regExp';

import SelectMuscleModal from './SelectMuscleModal';
import ExerciseBuilderForm from './ExerciseBuilderForm';

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
    isValid: value => value && typeof value === 'number',
  },
};

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
            }),
          ),
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
        edges: [],
      },
      ...props.viewer.node,

      isLoading: false,
      isSelectMuscleModalOpen: false,
    };
  }

  onFieldChange = (e, value) => this.setState({ [e.target.name]: value });

  submitChanges = () => {
    const { viewer: { node } } = this.props;

    if (node && node.id) {
      this.updateExercise();
    } else {
      this.createExercise();
    }
  };

  createExercise = () => {
    this.setState({ isLoading: true });

    const {
      isLoading,
      isSelectMuscleModalOpen,
      muscles,
      ...data
    } = this.state;
    const { viewer, history } = this.props;

    data.muscles = muscles.edges.map(({ node }) => node.id);

    CreateExerciseMutation(data, viewer)
      .then((response) => {
        this.setState({ isLoading: false });

        if (response.createExercise) {
          alert('Exercise has been created!');
          history.push(`/exercise-builder/${response.createExercise.createdExerciseEdge.node.id}`);
        } else {
          alert('Oops, something went wrong!');
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

    const {
      isLoading,
      id,
      isSelectMuscleModalOpen,
      muscles,
      ...data
    } = this.state;
    const { viewer } = this.props;

    data.muscles = muscles.edges.map(({ node }) => node.id);

    UpdateExerciseMutation(viewer.node.id, data, viewer)
      .then((response) => {
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
          muscle,
        ],
      },
    }));

    this.closeSelectMuscleModal();
  };

  removeMuscleById = (id) => {
    this.setState(prevState => ({
      muscles: {
        ...prevState,
        edges: prevState.muscles.edges.filter(({ node }) => node.id !== id),
      },
    }));
  }

  render() {
    const { viewer } = this.props;
    const {
      name,
      avatarUrl,
      muscles,
      description,
      complexity,
      video,
      isSelectMuscleModalOpen,
      isLoading,
    } = this.state;
    const isEditMode = viewer.wer.node.id;

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={isEditMode ? `Exercise Builder: ${name}` : 'Exercise Builder'} />
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
          <ExerciseBuilderForm
            name={name}
            avatarUrl={avatarUrl}
            muscles={muscles}
            description={description}
            complexity={complexity}
            video={video}
            onFieldChange={this.onFieldChange}
            onAddMuscleClick={() => this.setState({ isSelectMuscleModalOpen: true })}
            onRemoveMuslceClick={this.removeMuscleById}
          />
        </section>

        <BackgroundSpinner isShowing={isLoading} />

        <SelectMuscleModal
          open={isSelectMuscleModalOpen}
          viewer={viewer}
          onSelectMuslce={this.addMuscle}
          onRequestClose={this.closeSelectMuscleModal}
        />
      </div>
    );
  }
}

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
