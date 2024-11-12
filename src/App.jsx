import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Question_form from './components/Question_form';
import FormBuilder from './components/Question';

function App() {
  return (
    <div className="app">
      {/* <Router>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Question_form />
              </>
            }
          />
        </Routes>
      </Router> */}
      <FormBuilder/>
    </div>
  );
}

export default App;


