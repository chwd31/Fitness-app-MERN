import React from "react";
import { useQuery, gql } from '@apollo/client';

const GET_WEEKLY_STATS = gql`
  query GetWeeklyStats {
    weeklyStats {
      weekStartDate
      exerciseCounts {
        exerciseType
        count
      }
      totalExerciseTime
    }
  }
`;

const WeeklyStatsPage = () => {
  const { loading, error, data } = useQuery(GET_WEEKLY_STATS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error occurred while fetching weekly stats</p>;

  const { weekStartDate, exerciseCounts, totalExerciseTime } = data.weeklyStats;

  return (
    <div>
      <h2>Weekly Stats</h2>
      <p>Week Start Date: {weekStartDate}</p>

      <h3>Exercise Counts</h3>
      <table>
        <thead>
          <tr>
            <th>Exercise Type</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {exerciseCounts.map(({ exerciseType, count }) => (
            <tr key={exerciseType}>
              <td>{exerciseType}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>Total Exercise Time: {totalExerciseTime} minutes</p>
    </div>
  );
};

export default WeeklyStatsPage;
