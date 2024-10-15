import React, { useContext, useEffect, useState } from 'react';
import { WorkoutContext } from '../context/WorkoutContext';
import { AuthContext } from '../context/AuthContext';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaBurn, FaClock } from 'react-icons/fa';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const { workouts } = useContext(WorkoutContext);
    const { user } = useContext(AuthContext);
    const [goal, setGoal] = useState('');

    useEffect(() => {
        const savedGoal = localStorage.getItem('goal');
        if (savedGoal) {
            setGoal(savedGoal);
        }
    }, []);

    const calculateTotalCalories = () => {
        return workouts.reduce((total, workout) => total + parseInt(workout.calories), 0);
    };

    const calculateTotalDuration = () => {
        return workouts.reduce((total, workout) => total + parseInt(workout.duration), 0);
    };

    const chartData = {
        labels: workouts.map(workout => workout.activity),
        datasets: [
            {
                label: 'Calories Burned',
                data: workouts.map(workout => workout.calories),
                backgroundColor: 'rgb(27, 216, 216)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                barThickness: 30,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto p-6 ">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl text-gray-800">Welcome, {user?.email || 'User'}!</h2>
                    <div>
                        <h3 className="text-xl text-gray-700">Your Weekly Goal:</h3>
                        <p className="text-xl text-green-600 ">{goal ? goal : "no goal specified!"}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Recent Workouts:</h3>
                        {workouts.length > 0 ? (
                            <ul className="space-y-4 scrollable-list">
                                {workouts.slice(-5).map((workout, index) => (
                                    <li key={index} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center transition duration-200 ease-in-out hover:bg-gray-200">
                                        <div>
                                            <h4 className="text-gray-800 font-medium">{workout.activity}</h4>
                                            <p className="text-gray-600">{workout.duration} mins, {workout.calories} cal</p>
                                        </div>
                                        <span className="text-gray-500 text-sm">{workout.date}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No workouts logged yet.</p>
                        )}
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-gray-700">Workout Statistics</h3>
                        {workouts.length ? <Bar data={chartData} options={options} /> : <p className="text-gray-600 mt-3">No workouts logged yet.</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-white p-4 rounded-lg shadow flex items-center">
                        <FaClock className="text-4xl text-blue-500 mr-4" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Duration:</h3>
                            <p className="text-2xl font-semibold text-gray-800">{calculateTotalDuration()} mins</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow flex items-center">
                        <FaBurn className="text-4xl text-red-500 mr-4" />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Total Calories Burned:</h3>
                            <p className="text-2xl font-semibold text-gray-800">{calculateTotalCalories()} cal</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
