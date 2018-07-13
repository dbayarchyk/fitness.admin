import React from 'react';
import { PropTypes } from 'prop-types';
import TextField from 'material-ui/TextField';

const FoodBuilderForm = ({
  name,
  avatarUrl,
  category,
  calorificValue,
  proteins,
  carbohydrates,
  fats,
  onFieldChange,
}) => (
  <form>
    <div>
      <TextField
        name="name"
        fullWidth
        value={name}
        onChange={onFieldChange}
        floatingLabelText="Food Name"
        hintText="Enter muscle name"
      />
    </div>

    <div>
      <TextField
        name="avatarUrl"
        fullWidth
        value={avatarUrl}
        onChange={onFieldChange}
        floatingLabelText="Food Avatar URL"
        hintText="Enter food avatar url"
      />
    </div>

    <div>
      <TextField
        name="category"
        fullWidth
        value={category}
        onChange={onFieldChange}
        floatingLabelText="Food Category"
        hintText="Enter food category"
      />
    </div>

    <div>
      <TextField
        type="number"
        name="calorificValue"
        fullWidth
        value={calorificValue}
        onChange={onFieldChange}
        floatingLabelText="Food Calorific Value (kKal)"
        hintText="Enter food c alorific value"
      />
    </div>

    <div>
      <TextField
        name="proteins"
        fullWidth
        value={proteins}
        onChange={onFieldChange}
        floatingLabelText="Food Proteins (g)"
        hintText="Enter food proteins value"
      />
    </div>

    <div>
      <TextField
        type="number"
        name="carbohydrates"
        fullWidth
        value={carbohydrates}
        onChange={onFieldChange}
        floatingLabelText="Food Carbohydrates (g)"
        hintText="Enter food carbohydrates value"
      />
    </div>

    <div>
      <TextField
        type="number"
        name="fats"
        fullWidth
        value={fats}
        onChange={onFieldChange}
        floatingLabelText="Food Fats (g)"
        hintText="Enter food fats value"
      />
    </div>
  </form>
);

FoodBuilderForm.propTypes = {
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  category: PropTypes.string,
  calorificValue: PropTypes.string,
  proteins: PropTypes.string,
  carbohydrates: PropTypes.string,
  fats: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired,
};

FoodBuilderForm.defaultProps = {
  name: '',
  avatarUrl: '',
  category: '',
  calorificValue: 0,
  proteins: 0,
  carbohydrates: 0,
  fats: 0,
};

export default FoodBuilderForm;
