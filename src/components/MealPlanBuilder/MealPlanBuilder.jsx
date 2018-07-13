import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import { createFragmentContainer, graphql } from 'react-relay';

import BackgroundSpinner from '../framework/BackgroundSpinner';
import CreateMealPlanMutation from '../../mutations/CreateMealPlan';
import FeedModal from './FeedModal';
import MealListGroupByDay from './MealListGroupByDay';
import UpdateMealPlanMutation from '../../mutations/UpdateMealPlan';
import VALIDATION_CONFIG from './validationConfig';
import checkValidation from '../../helpers/checkValidation';
import mealPlanBuilderService from '../../services/meal-plan-builder.service';

class MealPlanBuilder extends Component {
  feedMealDate = null;

  static propTypes = {
    viewer: PropTypes.shape({
      node: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string,
      }),
      mealPlanTemplate: PropTypes.shape({
        meals: PropTypes.arrayOf(
          PropTypes.shape({
            edges: PropTypes.arrayOf(
              PropTypes.object,
            ),
          }),
        ),
      }),
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      meals: props.viewer.mealPlanTemplate ? props.viewer.mealPlanTemplate.meals : {
        edges: [],
      },
      ...props.viewer.node,

      editabledFeed: null,
      isFeedModalOpen: false,
      editableMealDate: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    window.onbeforeunload = () => 'Changes that you made may not be saved.';

    const { viewer: { node }, history } = this.props;

    if (!node && !mealPlanBuilderService.isPresetStepComplitted) {
      history.push('/meal-plan-builder');
    }
  }

  componentWillUnmount() {
    mealPlanBuilderService.resetPresetStep();

    window.onbeforeunload = null;
  }

  onFieldChange = (e, value) => this.setState({ [e.target.name]: value });

  onFeedModalSubmitted = (feed) => {
    this.setState(
      prevState => ({
        isFeedModalOpen: false,
        meals: prevState.editabledFeed
          ? mealPlanBuilderService.updateFeedByIndexMealByDate(
            prevState.meals,
            this.feedMealDate,
            feed,
            this.editabledFeedIndex,
          )
          : mealPlanBuilderService.addFeedToMealByDate(prevState.meals, this.feedMealDate, feed),
      }),
      () => {
        this.feedMealDate = null;
        this.editabledFeedIndex = null;
      },
    );
  };

  onDeleteFeedByIndexAndMealDate = (mealDate, feedIndex) => {
    this.setState(prevState => ({
      meals: mealPlanBuilderService.filterOutFeedByIndexAndMealDate(
        prevState.meals,
        mealDate,
        feedIndex,
      ),
    }));
  };

  changeMealTimeByDate = (event, newDate) => {
    this.setState(prevState => ({
      meals: mealPlanBuilderService.updateMealDateByOldDate(
        prevState.meals,
        prevState.editableMealDate,
        newDate,
      ),
      editableMealDate: null,
    }));
  };

  openMealTimeTimePicker = (date) => {
    this.setState({ editableMealDate: date }, () => {
      document.getElementById('time-picker').click();
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
      ...data
    } = this.state;
    const { viewer } = this.props;

    UpdateMealPlanMutation(viewer.node.id, mealPlanBuilderService.mapDataForRequest(data), viewer)
      .then((response) => {
        this.setState({ isLoading: false });

        if (response.updateMealPlan) {
          alert('Meal Plan has been updated!');
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
  };

  deleteMealByDate = (date) => {
    this.setState(prevState => ({
      meals: mealPlanBuilderService.filterOutMealByDate(prevState.meals, date),
    }));
  };

  createMealPlan = () => {
    this.setState({ isLoading: true });

    const {
      isLoading,
      editabledFeed,
      isFeedModalOpen,
      editableMealDate,
      ...data
    } = this.state;
    const { viewer, history } = this.props;

    CreateMealPlanMutation(mealPlanBuilderService.mapDataForRequest(data), viewer)
      .then((response) => {
        this.setState({ isLoading: false });

        if (response.createMealPlan) {
          alert('Meal Plan has been created!');
          history.push(`/meal-plan-builder/creator/${response.createMealPlan.createdMealPlanEdge.node.id}`);
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

  submitChanges = () => {
    const { viewer: { node } } = this.props;

    if (node && node.id) {
      this.updateMealPlan();
    } else {
      this.createMealPlan();
    }
  };

  openFeedModal = (mealDate, editabledFeed, feedIndex) => {
    this.setState({
      isFeedModalOpen: true,
      editabledFeed,
    });

    this.feedMealDate = mealDate;
    this.editabledFeedIndex = feedIndex;
  };


  closeFeedModal = () => this.setState({ isFeedModalOpen: false });

  addNextDayMeal = () => {
    this.setState(prevState => ({
      meals: mealPlanBuilderService.addNextDayMeal(prevState.meals),
    }));
  };

  render() {
    const { viewer } = this.props;
    const {
      name,
      avatarUrl,
      meals,
      isLoading,
      isFeedModalOpen,
      editabledFeed,
      editableMealDate,
    } = this.state;
    const isEditMode = viewer.node && viewer.node.id;

    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={isEditMode ? `Meal Plan Builder: ${name}` : 'Meal Plan Builder'} />
          </ToolbarGroup>

          <ToolbarGroup>
            <RaisedButton
              primary
              label={isEditMode ? 'Save Changes' : 'Create Meal Plan'}
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
              floatingLabelText="Meal Plan Name"
              hintText="Enter muscle name"
            />
          </div>

          <div>
            <TextField
              name="avatarUrl"
              fullWidth
              value={avatarUrl}
              onChange={this.onFieldChange}
              floatingLabelText="Meal Plan Avatar URL"
              hintText="Enter meal plan avatar url"
            />
          </div>

          <div>
            <h3>Meals</h3>

            <MealListGroupByDay
              meals={meals}
              addMealByDate={this.addMealByDate}
              deleteMealByDate={this.deleteMealByDate}
              changeMealTimeByDate={this.openMealTimeTimePicker}
              onDeleteFeedByIndexAndMealDate={this.onDeleteFeedByIndexAndMealDate}
              addFeedToMeal={this.openFeedModal}
              updateFeedByIndexMealDate={this.openFeedModal}
            />

            {
              mealPlanBuilderService.isNewDayAvailable(meals) && (
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

        <BackgroundSpinner isShowing={isLoading} />

        <FeedModal
          viewer={viewer}
          open={isFeedModalOpen}
          onRequestClose={this.closeFeedModal}
          onSubmit={this.onFeedModalSubmitted}
          feed={editabledFeed}
        />

        <TimePicker
          style={{ display: 'none' }}
          id="time-picker"
          value={new Date(editableMealDate)}
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
      mealPlanTemplateId: { type: "ID!" },
      skipFetchMealPlan: { type: "Boolean!" }
      skipFetchMealPlanTemplate: { type: "Boolean!" }
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
      mealPlanTemplate(id: $mealPlanTemplateId) @skip(if: $skipFetchMealPlanTemplate) {
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
      ...FeedModal_viewer
    }
  `,
);
