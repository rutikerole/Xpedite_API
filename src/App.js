import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage.js';
import Dashboard from './pages/Dashboard.js';
import { CollectionProvider } from './collectionContext.js';

function App() {
  return (
    <CollectionProvider>
     <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </CollectionProvider>
  );
}

export default App;
