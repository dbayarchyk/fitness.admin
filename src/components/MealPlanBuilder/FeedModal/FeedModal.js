import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import EditIcon from 'material-ui/svg-icons/image/edit';
import RaisedButton from 'material-ui/RaisedButton';

import VALIDATION_CONFIG from './validationConfig';

import checkValidation from '../../../helpers/checkValidation';

import SelectFoodModal from '../SelectFoodModal';

class FeedModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    viewer: PropTypes.object.isRequired,
    feed: PropTypes.shape({
      food: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string,
        avatarUrl: PropTypes.string,
      }),
      weight: PropTypes.number,
    }),
    onSubmit: PropTypes.func,
    onRequestClose: PropTypes.func,
  };

  static defaultProps = {
    title: 'Feed Builder',
    open: false,
    feed: {
      food: null,
      weight: 0,
    },
    onSubmit: () => {},
    onRequestClose: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      isSelectFoodModalOpen: false,

      food: props.feed && props.feed.food,
      weight: props.feed && props.feed.weight,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      food: nextProps.feed && nextProps.feed.food,
      weight: nextProps.feed && nextProps.feed.weight,
    });
  }

  submitModal = () => {
    const { isSelectFoodModalOpen, ...data } = this.state;

    this.setState({ food: null, weight: 0 });

    this.props.onSubmit({
      ...data,
      weight: Number(data.weight),
    });
  };

  render() {
    const actions = [
      <RaisedButton
        label="Cancel"
        onClick={this.props.onRequestClose}
        style={{ marginRight: 5 }}
      />,
      <RaisedButton
        label="Submit"
        primary
        onClick={this.submitModal}
        disabled={!checkValidation(this.state, VALIDATION_CONFIG)}
      />,
    ];
    
    const selectFoodModalTriggerButton = (
      <IconButton
        tooltip="Select Food"
        onClick={() => this.setState({ isSelectFoodModalOpen: true })}
      >
        <EditIcon />
      </IconButton>
    );

    return (
      <Dialog
        title={this.props.title}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}
        actions={actions}
      >
        <ListItem
          leftAvatar={this.state.food && <Avatar src={this.state.food.avatarUrl} />}
          primaryText={this.state.food ? this.state.food.name : 'No Food is Selected'}
          rightIconButton={selectFoodModalTriggerButton}
          onClick={() => this.setState({ isSelectFoodModalOpen: true })}
        />

        <TextField
          fullWidth
          name="weight"
          type="number"
          floatingLabelText="Food Weight (g)"
          value={this.state.weight}
          onChange={(e, value) => this.setState({ [e.target.name]: value })}
        />

        <SelectFoodModal
          viewer={this.props.viewer}
          open={this.state.isSelectFoodModalOpen}
          onRequestClose={() => this.setState({ isSelectFoodModalOpen: false })}
          onSelectFood={({ node: food }) => this.setState({ food, isSelectFoodModalOpen: false })}
        />
      </Dialog>
    );
  }
}

export default createFragmentContainer(
  FeedModal,
  graphql`
    fragment FeedModal_viewer on Viewer {
      ...SelectFoodModal_viewer
    }
  `,
);
