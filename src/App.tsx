import './App.css';
import Header from './components/header/header';
import Layout from './components/layout/layout';
import Home from './components/home/home';
import LoginForm from './components/loginForm/loginForm';
import SearchForm from './components/searchForm/searchForm';
import Footer from './components/footer/footer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<LoginForm />}/>
          <Route path="search" element={<SearchForm />} />
          <Route path="tariffs" element={(<p>Тут будет подробная информация о тарифах</p>)} />
          <Route path="faq" element={(<p>Тут будет раздел с часто задаваемыми вопросами</p>)} />
          <Route path="*" element={(<p>Простите, страницы не существует</p>)} />
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
