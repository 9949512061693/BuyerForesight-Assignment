import './index.css'

const FailureView = ({ retry }) => (
    <div className="failure-cont text-center">
        <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png" className="failure-image" alt="failure view" />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-description">We are having trouble completing your request.</p>
        <button type="button" onClick={retry} className="btn btn-primary">Retry</button>
    </div>
)

export default FailureView