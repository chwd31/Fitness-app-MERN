import React, { useState, useEffect } from "react";

const WeeklyStatsPage = () => {
    const [weeklyWorkouts, setWeeklyWorkouts] = useState([]);   
    const [totalWorkouts, setTotalWorkouts] = useState(0);  
    const [totalExerciseTime, setTotalExerciseTime] = useState(0);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
            const response = await fetch('/api/workouts');
            if (response.ok) {
                const data = await response.json();
                setWeeklyWorkouts(data);
            } else {
                console.log('Error occurred fetching workouts', response.status);
            }
        } catch (error) {
            console.log('Error occurred fetching workouts', error);
        }   
        };
        fetchWorkouts();
    }, []);

    useEffect(() => {
        const calculateTotals = () => {
            let totalWorkouts = 0;
            let totalExerciseTime = 0;

            weeklyWorkouts.forEach((workout) => {
                totalWorkouts += workout.count;
                totalExerciseTime += workout.minutes;
            });

            setTotalWorkouts(totalWorkouts);
            setTotalExerciseTime(totalExerciseTime);
        };
        calculateTotals();
    }, [weeklyWorkouts]);

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
                        <tr key={workout.id}>
                            <td>{workout.exercise}</td>
                            <td>{workout.count}</td>
                            <td>{workout.minutes}</td>
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

