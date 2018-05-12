import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import * as TOOLBAR_ACTIONS from '../../constants/manage/toolbarActions';
import CATEGORY from '../../constants/manage/category';

import manageService from '../../services/manage.service';

import Manage from './Manage';
import DeleteModal from './DeleteModal';
import RenameModal from './RenameModal';
import SaveAsTemplateModal from './SaveAsTemplateModal';

class ManageContainer extends Component {
  static propTypes = {
    relay: PropTypes.shape({
      refetch: PropTypes.func.isRequired,
    }).isRequired,
    category: PropTypes.string.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    viewer: PropTypes.object.isRequired,
    defaultSort: PropTypes.shape({
      name: PropTypes.string,
      direction: PropTypes.string,
    }),
  };

  static defaultProps = {
    defaultSort: {
      name: null,
      direction: 'asc',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      sort: props.defaultSort || {
        name: null,
        direction: 'asc',
      },
      selectedItemId: null,
      isDeleteModalOpen: false,
      searchValue: '',
      isRenameModalOpen: false,
      isSaveAsTemplateModalOpen: false,
    };
  }

  changeSort = ({ name, defaultDirection, sortDisabled }) => {
    if (sortDisabled) {
      return;
    }

    this.setState(
      prevState => ({
        sort: {
          name,
          direction: prevState.sort.name === name 
            ? prevState.sort.direction === 'asc'
              ? 'desc'
              : 'asc'
            : defaultDirection || 'asc',
        },
      }),
      () => {
        manageService.saveSortToLavalStorage(this.props.category, this.state.sort);
        this.props.relay.refetch({
          name: this.state.searchValue,
          sort: manageService.getSortValue(this.state.sort)
        });
      }
    );
  };

  actionClickHandler = (action) => {
    if (_.isFunction(this[action])) {
      this[action](this.state.selectedItemId);
    } else {
      throw `There is no handler specified for ${action}`;
    }
  };

  onSearchSubmit = (searchValue) => {
    this.setState({ searchValue });
    this.props.relay.refetch({ name: searchValue });
  };

  [TOOLBAR_ACTIONS.EDIT.action] = (itemId) => {
    let link = null;

    switch(this.props.category) {
      case CATEGORY.MUSCLES.type:
        link = `/muscle-builder/${itemId}`;
        break;
      case CATEGORY.EXERCISES.type:
        link = `/exercise-builder/${itemId}`;
        break;
      case CATEGORY.FOODS.type:
        link = `/food-builder/${itemId}`;
        break;
      case CATEGORY.MEAL_PLANS.type:
        link = `/meal-plan-builder/${itemId}`;
        break;
      case CATEGORY.WORKOUT_PLANS.type:
        link = `/workout-plan-builder/${itemId}`;
        break;
    }

    this.props.history.push(link);
  };

  [TOOLBAR_ACTIONS.DELETE.action] = (itemdId) => {
    this.setState({ isDeleteModalOpen: true });
  };

  [TOOLBAR_ACTIONS.RENAME.action] = (itemdId) => {
    this.setState({ isRenameModalOpen: true });
  };

  [TOOLBAR_ACTIONS.SAVE_AS_TEMPLATE.action] = (itemdId) => {
    this.setState({ isSaveAsTemplateModalOpen: true });
  };

  [TOOLBAR_ACTIONS.DUPLICATE.action] = (itemdId) => {
    alert(`Need to implement ${TOOLBAR_ACTIONS.DUPLICATE.action} action mutation`);
  };

  onDeleteSubmit = () => {
    this.setState({ isDeleteModalOpen: false });

    manageService.removeItemById(this.props.category, this.state.selectedItemId, this.props.viewer);
  };

  onRenameSubmit = (name) => {
    this.setState({ isRenameModalOpen: false });

    let item = manageService.getItemById(this.props.category, this.props.viewer, this.state.selectedItemId);

    manageService.updateItemById(this.props.category, this.state.selectedItemId, { name }, this.props.viewer);
  };

  onSaveAsTemplateSubmit = () => {
    this.setState({ isSaveAsTemplateModalOpen: false });
    alert(`Need to implement ${TOOLBAR_ACTIONS.DUPLICATE.action} action mutation`);
  };

  create = () => {
    let link = null;

    switch(this.props.category) {
      case CATEGORY.MUSCLES.type:
        link = '/muscle-builder';
        break;
      case CATEGORY.EXERCISES.type:
        link = '/exercise-builder';
        break;
      case CATEGORY.FOODS.type:
        link = '/food-builder';
        break;
      case CATEGORY.MEAL_PLANS.type:
        link = '/meal-plan-builder';
        break;
      case CATEGORY.WORKOUT_PLANS.type:
        link = '/workout-plan-builder';
        break;
    }

    this.props.history.push(link);
  };

  onItemClick = (selectedRowsIndexes) => {
    let selectedItemId = null;

    if (selectedRowsIndexes.length) {
      const items = manageService.getItems(this.props.category, this.props.viewer);
      const { id } = items.edges[selectedRowsIndexes[0]].node;

      selectedItemId = id;
    }

    this.setState({ selectedItemId });
  };

  render() {
    const { category, viewer } = this.props;
    const selectedItem = manageService.getItemById(category, viewer, this.state.selectedItemId);

    return [
      <Manage
        key="view"
        toolbarTitle={manageService.getToolbarTitle(category)}
        toolbarActions={manageService.getToolbarActions(category)}
        columns={manageService.getColumns(category)}
        items={manageService.getItems(category, viewer)}
        sort={this.state.sort}
        selectedItemId={this.state.selectedItemId}

        onItemClick={this.onItemClick}
        onCreateClick={this.create}
        onChangeSort={this.changeSort}
        actionClickHandler={this.actionClickHandler}

        onSearchSubmit={this.onSearchSubmit}
        searchValue={this.state.searchValue}
      />,
      <DeleteModal
        key="delete-modal"
        open={this.state.isDeleteModalOpen}
        onRequestClose={() => this.setState({ isDeleteModalOpen: false })}
        onSubmit={this.onDeleteSubmit}
      />,
      <RenameModal
        key="rename-modal"
        name={selectedItem ? selectedItem.name : ''}
        open={this.state.isRenameModalOpen}
        onRequestClose={() => this.setState({ isRenameModalOpen: false })}
        onSubmit={this.onRenameSubmit}
      />,
      <SaveAsTemplateModal
        key="save-as-template-modal"
        open={this.state.isSaveAsTemplateModalOpen}
        onRequestClose={() => this.setState({ isSaveAsTemplateModalOpen: false })}
        onSubmit={this.onSaveAsTemplateSubmit}
      />
    ];
  }
}

export default withRouter(ManageContainer);
