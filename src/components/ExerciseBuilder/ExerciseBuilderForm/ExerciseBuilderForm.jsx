import React from 'react';
import { PropTypes } from 'prop-types';
import TextField from 'material-ui/TextField';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import ExerciseMuscleList from '../ExerciseMuscleList';

const ExerciseBuilderForm = ({
  name,
  avatarUrl,
  muscles,
  description,
  complexity,
  video,
  onFieldChange,
  onAddMuscleClick,
  onRemoveMuslceClick,
}) => (
  <form>
    <div>
      <TextField
        name="name"
        fullWidth
        value={name}
        onChange={onFieldChange}
        floatingLabelText="Exercise Name"
        hintText="Enter muscle name"
      />
    </div>

    <div>
      <TextField
        name="avatarUrl"
        fullWidth
        value={avatarUrl}
        onChange={onFieldChange}
        floatingLabelText="Exercise Avatar URL"
        hintText="Enter exercise avatar url"
      />
    </div>

    <div>
      <h3>Photos</h3>
    </div>

    <div>
      <h3>Exercise Muscles</h3>

      <ExerciseMuscleList
        muscles={muscles}
        onAddMuscleClick={onAddMuscleClick}
        onRemoveMuslceClick={onRemoveMuslceClick}
      />
    </div>

    <div>
      <TextField
        name="description"
        fullWidth
        multiLine
        rowsMax={5}
        value={description}
        onChange={onFieldChange}
        floatingLabelText="Exercise Description"
        hintText="Enter exercise description"
      />
    </div>

    <div>
      <h3>Exercise Complexity</h3>

      <RadioButtonGroup
        name="complexity"
        valueSelected={complexity}
        onChange={onFieldChange}
      >
        <RadioButton value={1} label="Simple" />
        <RadioButton value={2} label="Medium" />
        <RadioButton value={3} label="Hard" />
      </RadioButtonGroup>
    </div>

    <div>
      <TextField
        name="video"
        fullWidth
        value={video}
        onChange={onFieldChange}
        floatingLabelText="Exercise Video URL"
        hintText="Enter exercise video url"
      />
    </div>
  </form>
);

ExerciseBuilderForm.propTypes = {
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  muscles: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
      }),
    ).isRequired,
  }),
  description: PropTypes.string,
  complexity: PropTypes.number,
  video: PropTypes.string,
  onFieldChange: PropTypes.func.isRequired,
  onAddMuscleClick: PropTypes.func.isRequired,
  onRemoveMuslceClick: PropTypes.func.isRequired,
};

ExerciseBuilderForm.defaultProps = {
  name: '',
  avatarUrl: '',
  muscles: [],
  description: '',
  complexity: 0,
  video: PropTypes.string,
};

export default ExerciseBuilderForm;
