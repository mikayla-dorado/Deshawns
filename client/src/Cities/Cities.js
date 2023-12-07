import { useEffect, useState } from "react"
import { addCity, getCities } from "../apiManager";
import "./Cities.css"
import { useNavigate } from "react-router-dom";


export const Cities = () => {
    const [cities, setCities] = useState([]);
    const [citiesArray, setCitiesArray] = useState(0);
    const [chosenName, setChosenName] = useState();


    const navigate = useNavigate();


    useEffect(() => {
        getCities().then(citiesArr => {
            setCities(citiesArr)
        })
    }, [])

    useEffect(() => {
        setCitiesArray(cities.length)
    }, [cities])


    const handleSave = async (e) => {
        e.preventDefault()

        const addACity = {
            name: chosenName
        }

        if (addACity.name == "" || addACity.name == undefined) {
            window.alert("Please continue filling out all fields");
        } else {
            await addCity(addACity);
        }

        const addedCities = [...cities, addACity];
        setCities(addedCities);

        setChosenName("")
    }


    return (
        <div className="cities-container">
            <h4>Here Are the Cities We Currently Operate In:</h4>
            {cities.map(city => {
                const cityId = city.id
                return (
                    <div className="cities-container">
                        <div className="city-list" key={city.id}>
                            {city.name}
                        </div>
                    </div>
                )
            })}
            <div className="add-city">
                <h4>Add a New City</h4>
                <form onSubmit={handleSave}>
                    <input
                        type="text"
                        id="cities"
                        name="name"
                        value={chosenName}
                        onChange={(e) => setChosenName(e.target.value)}
                    />
                </form>
            
            <button className="add-btn"
                //when clicked, the btn navigates to 'adddog' route
                //and passes the current length of the 'dogs' array as state
                onClick={handleSave}
            >Add New City:</button>
        </div>
        </div>
    )
}

//when user clicks on "cities" in navbar, they are presented w list of current cities
//when they enter a city name in the input and click 'add', then it is added to the list of cities

//?ALGORITHMIC THINKING

//to get the cities, we will need to use our 'get cities' fetch
//we will need state for cities individually and for the collection of cities

//useEffect 1 will get the list of cities from the fetch,
//once the data is retrieved it sets the state to the variable 'cities' to the array of cities
//because the dependency array is empty, the effect should only run once the components mount

//useEffect 2 is triggerd when the 'cities' state changes
//it sets the state variable 'citiesArray' to the length of the 'cities' array.
//the dependency array ensures this effect runs when the 'cities' state changes