import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import WorkoutLog from './components/WorkoutLog';
import Statistics from './components/Statistics';
import GoalSetting from './components/GoalSetting';
import Dashboard from './components/Dashboard';
import { WorkoutProvider } from './context/WorkoutContext';
import Header from './components/Header';
import { useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
            <Route path="/workout-log" element={<ProtectedRoute component={WorkoutLog} />} />
            <Route path="/statistics" element={<ProtectedRoute component={Statistics} />} />
            <Route path="/goal-setting" element={<ProtectedRoute component={GoalSetting} />} />
          </Routes>
        </Router>
        <ToastContainer />
      </WorkoutProvider>
    </AuthProvider>
  );
}

const ProtectedRoute = ({ component: Component }) => {
  const { user } = useContext(AuthContext);
  return user ? <Component /> : <Login />;
};

export default App;
