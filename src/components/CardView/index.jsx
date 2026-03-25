import { useNavigate } from "react-router-dom";
import "./index.css";

const CardView = ({ eachUserData }) => {
    const { id, name, phoneNumber, email, companyName } = eachUserData;
    const navigate = useNavigate();

    return (
        <li
            className="card-container"
            onClick={() => navigate(`/user/${id}`)}
        >
            <div className="card-left">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profile-img"
                />
                <div>
                    <h3 className="user-name">{name}</h3>
                    <p className="user-email">{email}</p>
                </div>
            </div>

            <div className="card-right">
                <p className="user-phone">Phone Number: {phoneNumber}</p>
                <p className="user-company">Company Name: {companyName}</p>
            </div>
        </li>
    );
};

export default CardView;