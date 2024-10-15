import React, { useState, useContext } from 'react';
import { WorkoutContext } from '../context/WorkoutContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const WorkoutLog = () => {
    const { addWorkout } = useContext(WorkoutContext);
    const [activity, setActivity] = useState('');
    const [duration, setDuration] = useState('');
    const [calories, setCalories] = useState('');
    const [date, setDate] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = {};

        if (!activity) {
            newErrors.activity = 'Activity type is required.';
        }
        if (!duration) {
            newErrors.duration = 'Duration is required.';
        } else if (duration <= 0) {
            newErrors.duration = 'Duration must be a positive number.';
        }
        if (!calories) {
            newErrors.calories = 'Calories burned is required.';
        } else if (calories <= 0) {
            newErrors.calories = 'Calories must be a positive number.';
        }
        if (!date) {
            newErrors.date = 'Date is required.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        addWorkout({ activity, duration, calories, date });
        toast.success('Workout logged successfully!');
        setActivity('');
        setDuration('');
        setCalories('');
        setDate('');
        navigate('/dashboard');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Log Your Workout</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Activity Type</label>
                        <input
                            type="text"
                            placeholder="Enter Activity"
                            value={activity}
                            onChange={(e) => setActivity(e.target.value)}
                            className={`mt-1 block w-full border ${
                                errors.activity ? 'border-red-500' : 'border-gray-300'
                            } rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500`}
                        />
                        {errors.activity && (
                            <p className="text-red-500 text-sm">{errors.activity}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700">Duration (minutes)</label>
                        <input
                            type="number"
                            placeholder="Enter Duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className={`mt-1 block w-full border ${
                                errors.duration ? 'border-red-500' : 'border-gray-300'
                            } rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500`}
                        />
                        {errors.duration && (
                            <p className="text-red-500 text-sm">{errors.duration}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700">Calories Burned</label>
                        <input
                            type="number"
                            placeholder="Enter Calories Burned"
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            className={`mt-1 block w-full border ${
                                errors.calories ? 'border-red-500' : 'border-gray-300'
                            } rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500`}
                        />
                        {errors.calories && (
                            <p className="text-red-500 text-sm">{errors.calories}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={`mt-1 block w-full border ${
                                errors.date ? 'border-red-500' : 'border-gray-300'
                            } rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500`}
                        />
                        {errors.date && (
                            <p className="text-red-500 text-sm">{errors.date}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold rounded-md py-2 hover:bg-blue-600 transition duration-200"
                    >
                        Log Workout
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WorkoutLog;
