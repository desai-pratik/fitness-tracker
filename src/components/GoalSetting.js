import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoalSetting = () => {
    const [goal, setGoal] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('goal', goal);
        toast.success('Goal set successfully!');
        navigate('/dashboard');
    };

    return (
        <div className="bg-gray-100 p-10 min-h-screen">
            <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg">
                <h2 className="text-2xl text-center mb-6">Set Fitness Goal</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Set Weekly/Monthly Goal"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Set Goal
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GoalSetting;
