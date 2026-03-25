import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import LoadingView from "../LoadingView";
import FailureView from "../FailureView";
import './index.css'

const apiStatus = {
    initial: "INITIAL",
    success: "SUCCESS",
    failure: 'FAILURE'
}

const UserDetails = () => {
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState();
    const [apiInitialStatus, setApiStatus] = useState(apiStatus.initial);

    useEffect(() => {
        setApiStatus(apiStatus.initial);
        getUserDetails();
    }, [])

    const getUserDetails = async () => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

        if (response.ok) {
            const data = await response.json();
            const formatedData = {
                name: data.name,
                email: data.email,
                username: data.username,
                phoneNumber: data.phone,
                companyName: data.company.name,
                website: data.website,
                companyCatchPhrase: data.company.catchPhrase,
                companyBs: data.company.bs,
                address: `${data.address.street}, ${data.address.suite}, ${data.address.city} - ${data.address.zipcode}`
            }
            setApiStatus(apiStatus.success);
            setUserDetails(formatedData);
        } else {
            setApiStatus(apiStatus.failure);
        }
    }

    const renderSuccessView = () => {
        if (!userDetails) return null;

        const {
            name,
            username,
            email,
            companyName,
            phoneNumber,
            website,
            companyCatchPhrase,
            companyBs,
            address
        } = userDetails;

        return (
            <div className="details-card">
                <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    className="profile"
                    alt="profile"
                />
                <h3 className="name">{name}</h3>
                <p className="username">{username}</p>

                <a href={`https://${website}`} target="_blank" rel="noreferrer" className="webiste">
                    {website}
                </a>

                <p className="message">{email}</p>
                <p className="message">{phoneNumber}</p>

                <h4 className="title">Company</h4>
                <p className="message">{companyName}</p>
                <p className="message">{companyCatchPhrase}</p>
                <p className="message">{companyBs}</p>

                <h4 className="title">Address</h4>
                <p className="message">{address}</p>
            </div>
        );
    };

    const renderUserDetails = () => {
        switch (apiInitialStatus) {
            case apiStatus.initial:
                return <LoadingView />;
            case apiStatus.success:
                return renderSuccessView();
            case apiStatus.failure:
                return <FailureView retry={getUserDetails} />;
            default:
                return null;
        }
    }

    return (
        <div className="user-details-cont">
            {renderUserDetails()}
        </div>
    )
}
export default UserDetails