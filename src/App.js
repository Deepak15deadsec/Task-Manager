import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/SignInAndSignUp/SignInPage';
import SignUp from './Pages/SignInAndSignUp/SignUpPage';
import './App.css';
import DashboardPage from './Pages/Dashboard/DashboardPage';
import BoardPage from './Pages/Board/BoardPage';
import AnalyticsPage from './Pages/Analytics/AnalyticsPage';
import SettingPage from './Pages/Settings/SettingPage';
import TaskPage from './Pages/Task/TaskPage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignIn/>}/>
      <Route path="/login" element={<SignIn/>}/>
      <Route path="/register" element={<SignUp/>}/>
      <Route path="/dashboard/*" element={<DashboardPage/>}>
        <Route path="board" element={<BoardPage/>}/>
        <Route path='analytics' element={<AnalyticsPage/>}/>
        <Route path="setting" element={<SettingPage/>}/>
      </Route>
      <Route path='/task/:taskId' element={<TaskPage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
