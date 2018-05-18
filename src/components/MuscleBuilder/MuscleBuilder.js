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
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import checkValidation from '../../helpers/checkValidation';

import CreateMuscleMutation from '../../mutations/CreateMuscle';
import UpdateMuscleMutation from '../../mutations/UpdateMuscle';

import BackgroundSpinner from '../framework/BackgroundSpinner';

import * as MUSCLE_GROUP from '../../constants/muscleGroup';

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

  static defaultProps = {
    node: {},
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
    if (this.props.viewer.node && this.props.viewer.node.id) {
      this.updateMuscle();
    } else {
      this.createMuscle();
    }
  };

  createMuscle = () => {
    this.setState({ isLoading: true });

    const { isLoading, ...data } = this.state;

    CreateMuscleMutation(data, this.props.viewer)
      .then((response, errors) => {
        this.setState({ isLoading: false });
  
        if (response.createMuscle) {
          alert('Muscle has been created!');
          this.props.history.push(`/muscle-builder/${response.createMuscle.createdMuscleEdge.node.id}`);
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

  updateMuscle = () => {
    this.setState({ isLoading: true });

    const { isLoading, id, ...data } = this.state;

    UpdateMuscleMutation(this.props.viewer.node.id, data, this.props.viewer)
      .then((response, errors) => {
        this.setState({ isLoading: false });
  
        if (response.updateMuscle) {
          alert('Muscle has been updated!');
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

  render() {
    const isEditMode = this.props.viewer.node && this.props.viewer.node.id;

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={isEditMode ? `Muscle Builder: ${this.state.name}` : 'Muscle Builder'} />
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
              value={this.state.name}
              onChange={(e, name) => this.onFieldChange('name', name)}
              floatingLabelText="Muscle Name"
              hintText="Enter muscle name"
            />
          </div>

          <div>
            <SelectField
              fullWidth
              value={this.state.group}
              onChange={(e, index, group) => this.onFieldChange('group', group)}
              floatingLabelText="Muscle Group"
              hintText="Select a muscle group"
            >
              {_.values(MUSCLE_GROUP).map(group => <MenuItem key={group.value} value={group.value} primaryText={group.title} />)}
            </SelectField>
          </div>
        </section>

        <BackgroundSpinner isShowing={this.state.isLoading} />
      </div>
    );
  }
}

const validationConfig = {
  name: {
    isValid: value => value && value.length,
  },
  group: {
    isValid: value => value && value.length,
  },
};

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
