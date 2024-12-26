import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Albums from './Components/Albums';
import DarkToggler from './Components/DarkToggler';
import NavBar from './Components/NavBar';
import MainPage from './Components/MainPage';
import Profile from './Components/Profile';
import PostList from './Components/PostList';
import Todos from './Components/Todos';
import SearchBar from './Components/SearchBar';
import PostForm from './Components/PostForm';
import { useTheme } from './Context/ThemeContext';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const { darkMode } = useTheme();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleUserIdChange = (id: string) => {
    setUserId(id);
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  return (
    <div className='app'>
      <NavBar userId={userId} />
      <DarkToggler />
      <SearchBar onSearch={handleSearch} />
      <Routes>
        <Route path='/' element={<MainPage onUserIdChange={handleUserIdChange} />} />
        <Route path='/profile/:userId' element={<Profile />} />
        <Route path='/posts/:userId' element={<PostList searchQuery={searchQuery}/>} />
        <Route path='/create-post/:userId' element={<PostForm />} />
        <Route path='/edit-post/:postId/:userId' element={<PostForm />} />
        <Route path='/todos/:userId' element={<Todos searchQuery={searchQuery} />} />
        <Route path='/albums/:userId' element={<Albums searchQuery={searchQuery} />} />
      </Routes>
    </div>
  );
}

export default App;
