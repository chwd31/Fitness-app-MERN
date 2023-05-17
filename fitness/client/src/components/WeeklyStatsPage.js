import React, { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { GET_EXERCISES } from '../queries';

const WeeklyStatsPage = () => {
    const { loading, error, data } = useQuery(GET_EXERCISES);
    const [weeklyWorkouts, setWeeklyWorkouts] = useState([]);   
    const [totalWorkouts, setTotalWorkouts] = useState(0);  
    const [totalExerciseTime, setTotalExerciseTime] = useState(0);

    useEffect(() => {
        if (!loading && data && data.exercises) {
            setWeeklyWorkouts(data.exercises);
        }
    }, [loading, data]);

    useEffect(() => {
        const calculateTotals = () => {
            let totalWorkouts = 0;
            let totalExerciseTime = 0;

            weeklyWorkouts.forEach((workout) => {
                totalWorkouts += 1;
                totalExerciseTime += workout.exerciseTime;
            });

            setTotalWorkouts(totalWorkouts);
            setTotalExerciseTime(totalExerciseTime);
        };
        calculateTotals();
    }, [weeklyWorkouts]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occurred while fetching weekly stats</p>;

    return (
        <div>
            <h2>Weekly Stats</h2>
            <table>
                <thead>
                    <tr>
                        <th>Exercise Type</th>
                        <th>Exercise Time</th>
                        <th>minutes</th>
                    </tr>
                </thead>
                <tbody>
                    {weeklyWorkouts.map((workout) => (
                        <tr key={workout._id}>
                            <td>{workout.exerciseType}</td>
                            <td>{workout.exerciseTime}</td>
                            <td>{workout.exerciseDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Total Workouts: {totalWorkouts}</p>  
            <p>Total Exercise Time: {totalExerciseTime}</p> 
        </div>
    );
};

export default WeeklyStatsPage;
