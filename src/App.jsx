import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import UserDetails from './components/UserDetails'
import './index.css'

const App = () => (
    <HashRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/user/:id' element={<UserDetails />} />
        </Routes>
    </HashRouter>
)

export default App