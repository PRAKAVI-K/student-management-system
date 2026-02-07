import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Layout from './layout/Layout';

import Home from './pages/Home';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/students" element={<UserList />} />
            <Route path="/students/add" element={<UserForm />} />
            <Route path="/students/edit/:id" element={<UserForm />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
