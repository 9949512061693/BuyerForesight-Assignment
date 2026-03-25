import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './index.css'

const Header = () => (
    <div className='header-bg'>
        <Link to="/">
            <div className='d-flex flex-row d-flex align-items-center'>
                <img src={logo} alt='dashboard logo' className='logo-style' />
                <h4 className='heading'>User Directory Dashboard</h4>
            </div>
        </Link>
    </div>
)

export default Header