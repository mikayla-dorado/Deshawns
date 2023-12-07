import { useEffect } from "react";
import { useState } from "react"
import { getCities, getCityById, getWalkers } from "../apiManager";
import "./Walkers.css"
import { useNavigate } from "react-router-dom";


export const Walkers = () => {
    const [walkers, setWalkers] = useState([]);
    const [filteredWalkers, setFilteredWalkers] = useState([]);
    const [cities, setCities] = useState([]);
    const [chosenCityId, setChosenCityId] = useState(0);

    const navigate = useNavigate();


    useEffect(() => {
        //call the getWalkers function to fetch list of walkers
        getWalkers().then(walkersArray => {
            setWalkers(walkersArray);
        })
    }, [])

    useEffect(() => {
        //call the getCities function to fetch the list of cities
        getCities().then(citiesArray => {
            setCities(citiesArray);
        })
    }, [])

    useEffect(() => {

        if (chosenCityId != "0") {
            getCityById(chosenCityId).then(array => setFilteredWalkers(array.walkers));
        } else {
            setFilteredWalkers(walkers);
        }
    }, [chosenCityId, walkers])


    return (
        <div className="walkers-container">
            <div className="filter-cities">
                Filter by City:
                <div className="city-select">
                    <select
                        name="cityId"
                        id="cities"
                        value={chosenCityId}
                        onChange={e => {
                            // if (e.target.value === 0) {
                            //     setChosenCityId(null)
                            // } else {
                            //     setChosenCityId(parseInt(e.target.value))
                            // }
                            setChosenCityId(e.target.value === "0" ? null : parseInt(e.target.value));
                        }}>
                        <option value="0">Choose a City:</option>
                        {cities.map(city => {
                            return (
                                <option
                                    key={city.Id}
                                    value={city.id}
                                >
                                    {city.name}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="filter-walkers">
                {filteredWalkers.map(walker => {
                    const walkerId = walker.id;
                    return (
                        <div key={walker.id}>
                            <div className="walker-name">
                                {walker.name}
                            </div>
                            <button
                                className="walker-add-dog-btn"
                                onClick={() => { navigate(`/assignwalkers`, { state: { walkerId } }) }}
                            >Add Dog</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
