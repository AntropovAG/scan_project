import './App.css';
import Header from './components/header/header';
import Layout from './components/layout/layout';
import Footer from './components/footer/footer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={(<p>Главная</p>)} />
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
