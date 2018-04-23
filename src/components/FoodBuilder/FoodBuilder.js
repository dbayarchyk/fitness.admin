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

import checkValidation from '../../helpers/checkValidation';

import CreateFoodMutation from '../../mutations/CreateFood';
import UpdateFoodMutation from '../../mutations/UpdateFood';

import BackgroundSpinner from '../framework/BackgroundSpinner';

import { url as urlRegExp } from '../../constants/regExp';

class FoodBuilder extends Component {
  static propTypes = {
    viewer: PropTypes.shape({
      node: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string,
        category: PropTypes.string.isRequired,
        calorificValue: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        fats: PropTypes.number.isRequired,
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

  onFieldChange = (e, value) => this.setState({ [e.target.name]: value });

  submitChanges = () => {
    if (this.props.viewer.node && this.props.viewer.node.id) {
      this.updateFood();
    } else {
      this.createFood();
    }
  };

  createFood = () => {
    this.setState({ isLoading: true });

    const { isLoading, ...data } = this.state;

    CreateFoodMutation(data, this.props.viewer)
      .then((response, errors) => {
        this.setState({ isLoading: false });
  
        if (response.createFood) {
          alert('Food has been created!');
          this.props.history.push(`/food-builder/${response.createFood.createdFoodEdge.node.id}`);
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

  updateFood = () => {
    this.setState({ isLoading: true });

    const { isLoading, id, ...data } = this.state;

    UpdateFoodMutation(this.props.viewer.node.id, data, this.props.viewer)
      .then((response, errors) => {
        this.setState({ isLoading: false });
  
        if (response.updateFood) {
          alert('Food has been updated!');
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
            <ToolbarTitle text={isEditMode ? `Food Builder: ${this.state.name}` : 'Food Builder'} />
          </ToolbarGroup>

          <ToolbarGroup>
            <RaisedButton
              primary
              label={isEditMode ? 'Save Changes' : 'Create Food'}
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
              floatingLabelText="Food Name"
              hintText="Enter muscle name"
            />
          </div>

          <div>
            <TextField
              name="avatarUrl"
              fullWidth
              value={this.state.avatarUrl}
              onChange={this.onFieldChange}
              floatingLabelText="Food Avatar URL"
              hintText="Enter food avatar url"
            />
          </div>

          <div>
            <TextField
              name="category"
              fullWidth
              value={this.state.category}
              onChange={this.onFieldChange}
              floatingLabelText="Food Category"
              hintText="Enter food category"
            />
          </div>

          <div>
            <TextField
              type="number"
              name="calorificValue"
              fullWidth
              value={this.state.calorificValue}
              onChange={this.onFieldChange}
              floatingLabelText="Food Calorific Value (kKal)"
              hintText="Enter food c alorific value"
            />
          </div>

          <div>
            <TextField
              name="proteins"
              fullWidth
              value={this.state.proteins}
              onChange={this.onFieldChange}
              floatingLabelText="Food Proteins (g)"
              hintText="Enter food proteins value"
            />
          </div>

          <div>
            <TextField
              type="number"
              name="carbohydrates"
              fullWidth
              value={this.state.carbohydrates}
              onChange={this.onFieldChange}
              floatingLabelText="Food Carbohydrates (g)"
              hintText="Enter food carbohydrates value"
            />
          </div>

          <div>
            <TextField
              type="number"
              name="fats"
              fullWidth
              value={this.state.fats}
              onChange={this.onFieldChange}
              floatingLabelText="Food Fats (g)"
              hintText="Enter food fats value"
            />
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
  avatarUrl: {
    isValid: value => urlRegExp.test(value) || !value,
  },
  category: {
    isValid: value => value && value.length,
  },
  calorificValue: {
    isValid: value => value && Number(value),
  },
  proteins: {
    isValid: value => value && Number(value),
  },
  carbohydrates: {
    isValid: value => value && Number(value),
  },
  fats: {
    isValid: value => value && Number(value),
  },
};

export default createFragmentContainer(
  withRouter(FoodBuilder),
  graphql`
    fragment FoodBuilder_viewer on Viewer
    @argumentDefinitions(
      foodId: { type: "ID!" },
      skipFetchFood: { type: "Boolean!" }
    ) {
      node(id: $foodId) @skip(if: $skipFetchFood) {
        id
        ... on Food {
          name
          avatarUrl
          category
          calorificValue
          proteins
          carbohydrates
          fats
        }
      }
    }
  `,
);
