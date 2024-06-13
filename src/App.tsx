import './App.css';
import Header from './components/header/header';
import Layout from './components/layout/layout';
import Home from './components/home/home';
import LoginForm from './components/loginForm/loginForm';
import SearchForm from './components/searchForm/searchForm';
import SearchResult from './components/searchResult/searchResult';
import Footer from './components/footer/footer';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import { useAppSelector, useAppDispatch } from './utils/hooks';
import { useEffect } from 'react';
import { checkUserAuthorization } from './redux/userSlice';

function App() {
  const { isAuthorized, isFirstLoad } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuthorization());
  }, [dispatch]);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<LoginForm />} />
          <Route path="search" element={
            <ProtectedRoute isLoggedIn={isAuthorized} isLoading={isFirstLoad}>
              <SearchForm />
            </ProtectedRoute>
          } />
          <Route path="result" element={
            <ProtectedRoute isLoggedIn={isAuthorized} isLoading={isFirstLoad}>
              <SearchResult />
            </ProtectedRoute>
          } />
          <Route path="tariffs" element={
            <ProtectedRoute isLoggedIn={isAuthorized} isLoading={isFirstLoad}>
              (<p>Тут будет подробная информация о тарифах</p>)
            </ProtectedRoute>
          } />
          <Route path="faq" element={
            <ProtectedRoute isLoggedIn={isAuthorized} isLoading={isFirstLoad}>
              (<p>Тут будет раздел с часто задаваемыми вопросами</p>)
            </ProtectedRoute>} />
          <Route path="*" element={(<p>Простите, страницы не существует</p>)} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
