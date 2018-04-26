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
import TimePicker from 'material-ui/TimePicker';

import VALIDATION_CONFIG from './validationConfig';

import mealPlanBuilderService from '../../services/meal-plan-builder.service';

import checkValidation from '../../helpers/checkValidation';

import CreateMealPlanMutation from '../../mutations/CreateMealPlan';
import UpdateMealPlanMutation from '../../mutations/UpdateMealPlan';

import MealListGroupByDay from './MealListGroupByDay';
import FeedModal from './FeedModal';

import BackgroundSpinner from '../framework/BackgroundSpinner';

class MealPlanBuilder extends Component {
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
      meals: {
        edges: []
      },
      ...props.viewer.node,

      editabledFeed: null,
      isFeedModalOpen: false,
      editableMealDate: null,
      isLoading: false,
    };
  }
  
  feedMealDate = null;

  onFieldChange = (e, value) => this.setState({ [e.target.name]: value });

  submitChanges = () => {
    if (this.props.viewer.node && this.props.viewer.node.id) {
      this.updateMealPlan();
    } else {
      this.createMealPlan();
    }
  };

  createMealPlan = () => {
    this.setState({ isLoading: true });

    const {
      isLoading,
      editabledFeed,
      isFeedModalOpen,
      editableMealDate,

      ...data,
    } = this.state;

    CreateMealPlanMutation(mealPlanBuilderService.mapDataForRequest(data), this.props.viewer)
      .then((response, errors) => {
        this.setState({ isLoading: false });
  
        if (response.createMealPlan) {
          alert('MealPlan has been created!');
          this.props.history.push(`/mealPlan-builder/${response.createMealPlan.createdMealPlanEdge.node.id}`);
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

  updateMealPlan = () => {
    this.setState({ isLoading: true });

    const {
      isLoading,
      editabledFeed,
      isFeedModalOpen,
      editableMealDate,

      id,

      ...data,
    } = this.state;

    UpdateMealPlanMutation(this.props.viewer.node.id, mealPlanBuilderService.mapDataForRequest(data), this.props.viewer)
      .then((response, errors) => {
        this.setState({ isLoading: false });
  
        if (response.updateMealPlan) {
          alert('MealPlan has been updated!');
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

  deleteMealByDate = (date) => {
    this.setState(prevState => ({
      meals: mealPlanBuilderService.filterOutMealByDate(prevState.meals, date),
    }));
  };

  addMealByDate = (date) => {
    this.setState(prevState => ({
      meals: mealPlanBuilderService.addMealByDate(prevState.meals, date),
    }));
  };

  openMealTimeTimePicker = (date) => {
    this.setState({ editableMealDate: date }, () => {
      document.getElementById('time-picker').click();
    });
  };

  changeMealTimeByDate = (event, newDate) => {
    this.setState(prevState => ({
      meals: mealPlanBuilderService.updateMealDateByOldDate(prevState.meals, prevState.editableMealDate, newDate),
      editableMealDate: null,
    }));
  };

  onDeleteFeedByIndexAndMealDate = (mealDate, feedIndex) => {
    this.setState(prevState => ({
      meals: mealPlanBuilderService.filterOutFeedByIndexAndMealDate(prevState.meals, mealDate, feedIndex),
    }));
  };

  openFeedModal = (mealDate, editabledFeed, feedIndex) => {
    this.setState({
      isFeedModalOpen: true,
      editabledFeed,
    });

    this.feedMealDate = mealDate;
    this.editabledFeedIndex = feedIndex;
  };

  onFeedModalSubmitted = (feed) => {
    this.setState(
      prevState => ({
        isFeedModalOpen: false,
        meals: prevState.editabledFeed
          ? mealPlanBuilderService.updateFeedByIndexMealByDate(prevState.meals, this.feedMealDate, feed, this.editabledFeedIndex)
          : mealPlanBuilderService.addFeedToMealByDate(prevState.meals, this.feedMealDate, feed),
      }),
      () => {
        this.feedMealDate = null;
        this.editabledFeedIndex = null;
      }
    );
  };

  closeFeedModal = (feed) => this.setState({ isFeedModalOpen: false });

  addNextDayMeal = () => {
    this.setState(prevState => ({
      meals: mealPlanBuilderService.addNextDayMeal(prevState.meals),
    }));
  };

  render() {
    const isEditMode = this.props.viewer.node && this.props.viewer.node.id;

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={isEditMode ? `MealPlan Builder: ${this.state.name}` : 'MealPlan Builder'} />
          </ToolbarGroup>

          <ToolbarGroup>
            <RaisedButton
              primary
              label={isEditMode ? 'Save Changes' : 'Create MealPlan'}
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
              floatingLabelText="MealPlan Name"
              hintText="Enter muscle name"
            />
          </div>

          <div>
            <TextField
              name="avatarUrl"
              fullWidth
              value={this.state.avatarUrl}
              onChange={this.onFieldChange}
              floatingLabelText="MealPlan Avatar URL"
              hintText="Enter mealPlan avatar url"
            />
          </div>

          <div>
            <h3>Meals</h3>

            <MealListGroupByDay
              meals={this.state.meals}
              addMealByDate={this.addMealByDate}
              deleteMealByDate={this.deleteMealByDate}
              changeMealTimeByDate={this.openMealTimeTimePicker}
              onDeleteFeedByIndexAndMealDate={this.onDeleteFeedByIndexAndMealDate}
              addFeedToMeal={this.openFeedModal}
              updateFeedByIndexMealDate={this.openFeedModal}
            />

            {
              mealPlanBuilderService.isNewDayAvailable(this.state.meals) && (
                <RaisedButton
                  label="Next Day"
                  fullWidth
                  primary
                  onClick={this.addNextDayMeal}
                />
              )
            }
          </div>
        </section>

        <BackgroundSpinner isShowing={this.state.isLoading} />

        <FeedModal
          viewer={this.props.viewer}
          open={this.state.isFeedModalOpen}
          onRequestClose={this.closeFeedModal}
          onSubmit={this.onFeedModalSubmitted}
          feed={this.state.editabledFeed}
        />

        <TimePicker
          style={{ display: 'none' }}
          id="time-picker"
          value={new Date(this.state.editableMealDate)}
          onChange={this.changeMealTimeByDate}
        />
      </div>
    );
  }
}

export default createFragmentContainer(
  withRouter(MealPlanBuilder),
  graphql`
    fragment MealPlanBuilder_viewer on Viewer
    @argumentDefinitions(
      mealPlanId: { type: "ID!" },
      skipFetchMealPlan: { type: "Boolean!" }
    ) {
      node(id: $mealPlanId) @skip(if: $skipFetchMealPlan) {
        id
        ... on MealPlan {
          name
          avatarUrl
          meals {
            edges {
              node {
                date,
                feeds {
                  edges {
                    node {
                      food {
                        id
                        name
                        avatarUrl
                      }
                      weight
                    }
                  }
                }
              }
            }
          }
        }
      }
      ...FeedModal_viewer
    }
  `,
);
