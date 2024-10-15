import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useContext(AuthContext);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl ">Fitness Tracker</h1>
                <button className="md:hidden" onClick={toggleMenu}>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                <nav className={`md:flex ${isOpen ? 'block' : 'hidden'} absolute md:relative bg-blue-500 w-full md:w-auto`}>
                    <ul className="flex flex-col md:flex-row md:space-x-4 p-4 md:p-0">
                        <li>
                            <Link to="/dashboard" className="block md:inline-block py-2 hover:text-blue-200">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/workout-log" className="block md:inline-block py-2 hover:text-blue-200">Log Workout</Link>
                        </li>
                        <li>
                            <Link to="/goal-setting" className="block md:inline-block py-2 hover:text-blue-200">Set Goals</Link>
                        </li>
                        <li>
                            <Link to="/statistics" className="block md:inline-block py-2 hover:text-blue-200">Statistics</Link>
                        </li>
                        <li>
                            <button onClick={() => logout()} className="block md:inline-block py-2 hover:text-blue-200">Logout</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
