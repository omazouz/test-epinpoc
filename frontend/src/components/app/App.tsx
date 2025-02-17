import './App.css';
import { QuizList } from '../QuizList';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes, redirect, Navigate } from 'react-router-dom';
import { Quiz } from '../Quiz';
function App() {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className='app'>
          <div className='header'>
            <h1>Quiz app</h1>
          </div>
          <div className='content'>
            <Routes>
              <Route path="/quiz/:id" element={<Quiz />} />
              <Route path="/" element={<QuizList />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>

    </QueryClientProvider>
  );
}

export default App;
