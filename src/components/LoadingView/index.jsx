import { ThreeCircles } from 'react-loader-spinner';
import './index.css'

const LoadingView = () => (
    <div className="loader-container">
        <ThreeCircles color="#3a3030" height="50" width="50" />
    </div>
)

export default LoadingView