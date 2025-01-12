import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import UsersList from './components/users/UsersList';
import UserForm from './components/users/UserForm';
import DriversList from './components/drivers/DriverList';
import DriverForm from './components/drivers/DriverForm';
import DriverDetails from './components/drivers/DriverDetails';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/new" element={<UserForm />} />
            <Route path="/users/edit/:id" element={<UserForm />} />
            <Route path="/drivers" element={<DriversList />} />
            <Route path="/drivers/new" element={<DriverForm />} />
            <Route path="/drivers/edit/:id" element={<DriverForm />} />
            <Route path="/drivers/:id" element={<DriverDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
