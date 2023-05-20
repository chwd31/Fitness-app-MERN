import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { addExercise } from '../schemas/typeDefs';

const ExercisePage = () => {
  const [exerciseType, setExerciseType] = useState('');
  const [exerciseTime, setExerciseTime] = useState('');
  const [exerciseDate, setExerciseDate] = useState('');

  const [addExercise] = useMutation(ADD_EXERCISE);

  const handleExerciseTypeChange = (event) => {
    setExerciseType(event.target.value);
  };

  const handleExerciseTimeChange = (event) => {
    setExerciseTime(event.target.value);
  };

  const handleExerciseDateChange = (event) => {
    setExerciseDate(event.target.value);
  };

  const handleSaveExercise = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addExercise({
        variables: { input: { name: exerciseType, description: exerciseTime } }, // Update variables
      });

      if (data.addExercise) {
        alert('Exercise Saved!');
        setExerciseType('');
        setExerciseTime('');
        setExerciseDate('');
      }
    } catch (error) {
      console.log('Error occurred saving exercise', error);
    }
  };

  return (
    <div>
      <h1>Exercise Log</h1>
      <form>
        <label>
          Exercise Type:
          <select value={exerciseType} onChange={handleExerciseTypeChange}>
            <option value="">Select Exercise Type</option>
            <option value="Running">Running</option>
            <option value="Walking">Walking</option>
            <option value="Calisthenics">Calisthenics</option>
            <option value="Weight Lifting">Weight Lifting</option>
            <option value="Yoga">Yoga</option>
          </select>
        </label>
        <br />
        <label>
          Exercise Time (in minutes):
          <input type="text" value={exerciseTime} onChange={handleExerciseTimeChange} />
        </label>
        <br />
        <button type="submit" onClick={handleSaveExercise}>
          Save Exercise
        </button>
      </form>
    </div>
  );
};

export default ExercisePage;
