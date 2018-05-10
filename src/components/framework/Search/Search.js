import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search';

import './styles.css';

class Search extends Component {
  static propTypes = {
    value: PropTypes.string,
    hintText: PropTypes.string,
    disabled: PropTypes.bool,
    enableEmptyValue: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
  };
  
  static defaultProps = {
    value: '',
    hintText: 'Search',
    disabled: false,
    enableEmptyValue: true,
    onChange: () => {},
    onSubmit: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  onChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  
  onKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  };

  onSubmit = () => {
    if (!this.isSubmitAvailable()) {
      return;
    }

    const searchValue = this.state.value.toString().trim();

    if (!this.props.enableEmptyValue && searchValue && searchValue.length) {
      return;
    }

    this.props.onSubmit(searchValue);
  };

  isSubmitAvailable() {
    return this.props.enableEmptyValue ? true : (this.state.value && this.state.value.length);
  }
  
  render() {
    const { disabled, enableEmptyValue, ...textFieldProps } = this.props;

    return  (
      <div className="search-field">
        <TextField
          {...textFieldProps}
          value={this.state.value}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
        />

        <IconButton disabled={!this.isSubmitAvailable() || disabled} onClick={this.onSubmit}>
          <SearchIcon />
        </IconButton>
      </div>
    );
  }
}

export default Search;
