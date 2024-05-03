import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ResponsiveDrawer from './navigation';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page */}
        <Route path="/" element={<ResponsiveDrawer />} />
      </Routes>
    </Router>
  );
}

export default App;
