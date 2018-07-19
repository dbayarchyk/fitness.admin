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

import CreateFoodMutation from '../../mutations/CreateFood';
import UpdateFoodMutation from '../../mutations/UpdateFood';

import BackgroundSpinner from '../framework/BackgroundSpinner';

import FoodBuilderForm from './FoodBuilderForm';

import { url as urlRegExp } from '../../constants/regExp';

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
    const { viewer: { node } } = this.props;

    if (node && node.id) {
      this.updateFood();
    } else {
      this.createFood();
    }
  };

  createFood = () => {
    this.setState({ isLoading: true });

    const { viewer, history } = this.props;
    const { isLoading, ...data } = this.state;

    CreateFoodMutation(data, viewer)
      .then((response) => {
        this.setState({ isLoading: false });

        if (response.createFood) {
          alert('Food has been created!');
          history.push(`/food-builder/${response.createFood.createdFoodEdge.node.id}`);
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

    const { viewer } = this.props;
    const { isLoading, id, ...data } = this.state;

    UpdateFoodMutation(viewer.node.id, data, viewer)
      .then((response) => {
        this.setState({ isLoading: false });

        if (response.updateFood) {
          alert('Food has been updated!');
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
    const { viewer: { node } } = this.props;
    const {
      name,
      avatarUrl,
      category,
      calorificValue,
      proteins,
      carbohydrates,
      fats,
      isLoading,
    } = this.state;
    const isEditMode = node && node.id;

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={isEditMode ? `Food Builder: ${name}` : 'Food Builder'} />
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
          <FoodBuilderForm
            name={name}
            avatarUrl={avatarUrl}
            category={category}
            calorificValue={calorificValue}
            proteins={proteins}
            carbohydrates={carbohydrates}
            fats={fats}
            onFieldChange={this.onFieldChange}
          />
        </section>

        <BackgroundSpinner isShowing={isLoading} />
      </div>
    );
  }
}

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
