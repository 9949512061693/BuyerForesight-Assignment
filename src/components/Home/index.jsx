import { useEffect, useState } from "react";
import FailureView from "../FailureView";
import LoadingView from "../LoadingView";
import CardView from "../CardView";
import './index.css'

const apiStatus = {
    initial: "INITIAL",
    success: "SUCCESS",
    failure: 'FAILURE'
}

const Home = () => {
    const [userData, setUserData] = useState([]);
    const [userValue, setUserValue] = useState('');
    const [order, setOrder] = useState('asc');
    const [apiInitialStatus, setApiStatus] = useState(apiStatus.initial);

    useEffect(() => {
        setApiStatus(apiStatus.initial);
        getTheUserData();
    }, [])

    const getTheUserData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        if (response.ok) {
            const updatedData = data.map(eachObj => ({
                id: eachObj.id,
                name: eachObj.name,
                phoneNumber: eachObj.phone,
                email: eachObj.email,
                companyName: eachObj.company.name,
            }))
            setUserData(updatedData)
            setApiStatus((apiStatus.success));
        } else {
            setApiStatus(apiStatus.failure);
        }
    }

    const changeUserValue = (event) => {
        setUserValue(event.target.value);
    }

    const changeOrderValue = (event) => {
        setOrder(event.target.value)
    }

    const renderInputContainer = () => (
        <div className="input-cont">
            <h2 className="search-heading">Search and Sort Users</h2>
            <section className="d-flex flex-row align-items-center">
                <input type='text' placeholder="Name/Email" value={userValue} onChange={changeUserValue} className="input-element p-1" />
                <select value={order} onChange={changeOrderValue} className="select-option-element">
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>
            </section>
        </div>
    )

    const filteredData = userData.filter(eachObj =>
        eachObj.name.toLowerCase().includes(userValue.toLowerCase()) ||
        eachObj.email.toLowerCase().includes(userValue.toLowerCase()));
    let sortedData = [...filteredData].sort((a, b) => {
        if (order === "asc") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });

    const renderSuccessView = () => (
        <ul className="cards-cont">
            {
                sortedData.map(eachObj => (
                    <CardView key={eachObj.id} eachUserData={eachObj} />
                ))
            }
        </ul>
    )


    const renderTheCards = () => {
        switch (apiInitialStatus) {
            case apiStatus.initial:
                return <LoadingView />
            case apiStatus.success:
                return renderSuccessView()
            case apiStatus.failure:
                return <FailureView retry={getTheUserData} />
            default:
                return null
        }
    }

    return (
        <div className="user-data-cont">
            {renderInputContainer()}
            {renderTheCards()}
        </div>

    )
}

export default Home