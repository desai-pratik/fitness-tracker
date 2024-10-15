import React, { useContext } from 'react';
import { WorkoutContext } from '../context/WorkoutContext';

const Statistics = () => {
    const { workouts, removeWorkout } = useContext(WorkoutContext);

    const handleDelete = (index) => {
        if (window.confirm('Are you sure you want to delete this workout?')) {
            removeWorkout(index);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-[100vh]">
            <div className="container mx-auto">
                <h2 className="text-2xl mb-4 text-center">Workout Statistics</h2>
                <ul className="space-y-2">
                    {workouts.length > 0 ? (
                        workouts.map((workout, index) => (
                            <li key={index} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                                <div className="flex justify-between">
                                    <div className="text-gray-600">
                                        <p className=" ">{workout.activity}</p>
                                        <span className="text-gray-500 text-sm "> {workout.duration} mins, {workout.calories} cal</span>
                                    </div>
                                    <div className="text-gray-600">
                                        <p>{workout.date}</p>
                                        <button
                                            className="bg-red-500 text-end text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                                            onClick={() => handleDelete(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li className="bg-white p-4 rounded-lg shadow text-center">
                            <span className="text-gray-600">No workouts logged yet.</span>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Statistics;
