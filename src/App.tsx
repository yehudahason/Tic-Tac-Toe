import {  Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Page2 from './pages/Page2'
import Page3 from './pages/Page3'
import NotFound from './pages/notFound'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
