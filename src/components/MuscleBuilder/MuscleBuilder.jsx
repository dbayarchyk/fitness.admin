import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createFragmentContainer, graphql } from 'react-relay';
import { withRouter } from 'react-router-dom';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import checkValidation from '../../helpers/checkValidation';

import CreateMuscleMutation from '../../mutations/CreateMuscle';
import UpdateMuscleMutation from '../../mutations/UpdateMuscle';

import BackgroundSpinner from '../framework/BackgroundSpinner';

import * as MUSCLE_GROUP from '../../constants/muscleGroup';

const validationConfig = {
  name: {
    isValid: value => value && value.length,
  },
  group: {
    isValid: value => value && value.length,
  },
};

class MuscleBuilder extends Component {
  static propTypes = {
    viewer: PropTypes.shape({
      node: PropTypes.shape({
        name: PropTypes.string.isRequired,
        group: PropTypes.string.isRequired,
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...props.viewer.node,

      isLoading: false,
    };
  }

  onFieldChange = (name, value) => this.setState({ [name]: value });

  submitChanges = () => {
    const { viewer: { node } } = this.props;

    if (node && node.id) {
      this.updateMuscle();
    } else {
      this.createMuscle();
    }
  };

  createMuscle = () => {
    this.setState({ isLoading: true });

    const { history, viewer } = this.props;
    const { isLoading, ...data } = this.state;

    CreateMuscleMutation(data, viewer)
      .then((response) => {
        this.setState({ isLoading: false });

        if (response.createMuscle) {
          alert('Muscle has been created!');
          history.push(`/muscle-builder/${response.createMuscle.createdMuscleEdge.node.id}`);
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

  updateMuscle = () => {
    this.setState({ isLoading: true });

    const { viewer } = this.props;
    const { isLoading, id, ...data } = this.state;

    UpdateMuscleMutation(viewer.node.id, data, viewer)
      .then((response) => {
        this.setState({ isLoading: false });

        if (response.updateMuscle) {
          alert('Muscle has been updated!');
        } else {
          alert('Oops, something went wrong!');
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

  render() {
    const {
      name,
      group,
      isLoading,
    } = this.state;
    const { viewer: { node } } = this.props;
    const isEditMode = node && node.id;

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={isEditMode ? `Muscle Builder: ${name}` : 'Muscle Builder'} />
          </ToolbarGroup>

          <ToolbarGroup>
            <RaisedButton
              primary
              label={isEditMode ? 'Save Changes' : 'Create Muscle'}
              onClick={this.submitChanges}
              disabled={!this.isDataValid()}
            />
          </ToolbarGroup>
        </Toolbar>

        <section>
          <div>
            <TextField
              fullWidth
              value={name}
              onChange={(e, value) => this.onFieldChange('name', value)}
              floatingLabelText="Muscle Name"
              hintText="Enter muscle name"
            />
          </div>

          <div>
            <SelectField
              fullWidth
              value={group}
              onChange={(e, index, value) => this.onFieldChange('group', value)}
              floatingLabelText="Muscle Group"
              hintText="Select a muscle group"
            >
              {
                Object.values(MUSCLE_GROUP).map(groupObject => (
                  <MenuItem
                    key={groupObject.value}
                    value={groupObject.value}
                    primaryText={groupObject.title}
                  />
                ))
              }
            </SelectField>
          </div>
        </section>

        <BackgroundSpinner isShowing={isLoading} />
      </div>
    );
  }
}

export default createFragmentContainer(
  withRouter(MuscleBuilder),
  graphql`
    fragment MuscleBuilder_viewer on Viewer
    @argumentDefinitions(
      muscleId: { type: "ID!" },
      skipFetchMuscle: { type: "Boolean!" }
    ) {
      node(id: $muscleId) @skip(if: $skipFetchMuscle) {
        id
        ... on Muscle {
          name
          group
        }
      }
    }
  `,
);
