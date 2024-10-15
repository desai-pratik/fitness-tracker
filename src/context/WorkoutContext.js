import React, { createContext, useState, useEffect } from 'react';

export const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
    const [workouts, setWorkouts] = useState([]);

    const dummyWorkouts = [
        { activity: 'Running', duration: 30, calories: 300, date: '2024-10-10' },
        { activity: 'Cycling', duration: 45, calories: 400, date: '2024-10-12' },
        { activity: 'Swimming', duration: 60, calories: 500, date: '2024-10-13' },
        { activity: 'Yoga', duration: 40, calories: 200, date: '2024-10-14' },
        { activity: 'Weightlifting', duration: 50, calories: 350, date: '2024-10-15' },
    ];

    useEffect(() => {
         const savedWorkouts = localStorage.getItem('workouts');
        if (savedWorkouts) {
            setWorkouts(JSON.parse(savedWorkouts));
        } else {
            localStorage.setItem('workouts', JSON.stringify(dummyWorkouts));
            setWorkouts(dummyWorkouts);
        }
    }, []);

    const addWorkout = (workout) => {
        const newWorkouts = [...workouts, workout];
        setWorkouts(newWorkouts);
        localStorage.setItem('workouts', JSON.stringify(newWorkouts));
    };

    const removeWorkout = (index) => {
        const newWorkouts = workouts.filter((_, i) => i !== index);
        setWorkouts(newWorkouts);
        localStorage.setItem('workouts', JSON.stringify(newWorkouts));
    };

    return (
        <WorkoutContext.Provider value={{ workouts, addWorkout, removeWorkout }}>
            {children}
        </WorkoutContext.Provider>
    );
};
