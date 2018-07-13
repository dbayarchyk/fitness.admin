import './styles.css';

import {
  Card,
  CardMedia,
  CardTitle
} from 'material-ui/Card';
import React, { Component } from 'react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import { createFragmentContainer, graphql } from 'react-relay';

import PropTypes from 'prop-types';
import SelectMealPlanTemplateModal from './SelectMealPlanTemplateModal';
import mealPlanBuilderService from '../../services/meal-plan-builder.service';
import { withRouter } from 'react-router-dom';

class MealPlanBuilderPreset extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    isSelectTemplateModalOpen: false,
  };

  goWithBlankTemplate = () => {
    mealPlanBuilderService.complitePresetStep();
    this.props.history.push('/meal-plan-builder/creator');
  };

  closeSelectTemplateModal = () => {
    this.setState({ isSelectTemplateModalOpen: false });
  }

  onSelectMealPlanTemplate = ({ node: template }) => {
    mealPlanBuilderService.complitePresetStep(template.id);
    this.setState({ isSelectTemplateModalOpen: false });
    this.props.history.push('/meal-plan-builder/creator');
  }

  render() {
    return (
      <div className="meal-plan-builder-preset">
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text="Meal Plan Builder" />
          </ToolbarGroup>
        </Toolbar>

        <div className="meal-plan-builder-preset__cards">
          <Card
            className="meal-plan-builder-preset__card"
            onClick={this.goWithBlankTemplate}
          >
            <CardMedia>
              <CardMedia>
                <img alt="Blank Plan logo" src="https://digwp.com/wp-content/uploads/2017/01/wp-theme-blank.gif" />
              </CardMedia>
            </CardMedia>

            <CardTitle title="Blank Plan" subtitle="Create plan from scratch" />
          </Card>

          <Card className="meal-plan-builder-preset__card" onClick={() => this.setState({ isSelectTemplateModalOpen: true })}>
            <CardMedia>
              <img  alt="Templates Plan logo" src="https://previews.123rf.com/images/karandaev/karandaev1412/karandaev141200122/34357136-Dumbells-tape-measure-and-healthy-food-Fitness-and-health-Stock-Photo.jpg" />
            </CardMedia>

            <CardTitle title="Plan From Template" subtitle="Create plan from template" />
          </Card>
        </div>

        <SelectMealPlanTemplateModal
          viewer={this.props.viewer}
          open={this.state.isSelectTemplateModalOpen}
          onRequestClose={this.closeSelectTemplateModal}
          onSelectMealPlanTemplate={this.onSelectMealPlanTemplate}
        />
      </div>
    );
  }
}

export default createFragmentContainer(
  withRouter(MealPlanBuilderPreset),
  graphql`
    fragment MealPlanBuilderPreset_viewer on Viewer {
      ...SelectMealPlanTemplateModal_viewer
    }
  `,
);
