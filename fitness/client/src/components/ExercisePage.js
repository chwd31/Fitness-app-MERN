import e from 'express';
import { set } from 'mongoose';
import React, { useState } from 'react';

const ExercisePage = () => {
    const [exerciseType, setExerciseType] = useState('');
    const [exerciseTime, setExerciseTime] = useState('');
    const [exerciseDate, setExerciseDate] = useState('');

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
            const response = await fetch('/api/exercise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ exerciseType, exerciseTime, exerciseDate }),
            });

            if (response.ok) {
                alert('Exercise Saved!');
                setExerciseType('');
                setExerciseTime('');
                setExerciseDate('');
            } else {
                console.log('Error occurred saving exercise', response.status);
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
                        <option value = "">Select Exercise Type</option>
                        <option value = "Running">Running</option>
                        <option value = "Walking">Walking</option>
                        <option value = "Calisthenics">Calisthenics</option>
                        <option value = "Weight Lifting">Weight Lifting</option>
                        <option value = "Yoga">Yoga</option>
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

