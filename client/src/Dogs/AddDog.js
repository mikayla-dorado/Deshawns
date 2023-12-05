// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { addDog, getCities, getDogs } from "../apiManager";


// export const AddDog = () => {
//     const [selectedCity, setSelctedCity] = useState("")
//     const [cities, setCities] = useState([])
//     const [chosenName, setChosenName] = useState("")
//     const [dogs, setDogs] = useState([])

//     useEffect(() => {
//         getCities().then(citiesArray => setCities(citiesArray))
//     }, [])

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!chosenName || !selectedCity) {
//             window.alert("Please continue filling out all fields");
//             return;
//         }

//         const newDog = {
//             name: chosenName,
//             cityId: selectedCity
//         };
//         try {
//             await addDog(newDog);
//             // Optionally, you can handle success, clear the form, or navigate to a different page
//             //onDogAdded();
//         } catch (error) {
//             console.error("Error adding dog:", error.message);
//             // Handle the error as needed
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Dog's Name:
//                 <input className="add-dog-input"
//                 type="text"
//                 value={chosenName}
//                 onChange={(e) => setChosenName(e.target.value)}
//                 />
//             </label>
//             <br />
//             <label>
//                 City:
//                 <select className="add-dog-city"
//                 value={selectedCity}
//                 onChange={(e) => setSelctedCity(e.target.value)}
//                 >
//                     <option value="">Select a city</option>
//                     {cities.map((city) => (
//                         <option key={city.id} value={city.id}>
//                             {city.name}
//                         </option>
//                     ))}
//                 </select>
//             </label>
//             <br />
//             <button type="submit">Add Dog</button>
//         </form>
//     )
// }

import { useEffect, useState } from "react"
import { addDog, getCities } from "../apiManager";
import { useLocation, useNavigate } from "react-router-dom";

export const AddDog = ({ route }) => {
    const [cities, setCities] = useState([]);
    const [chosenName, setChosenName] = useState("");
    const [chosenCityId, setChosenCityId] = useState(0);
    const [newDogId, setNewDogId] = useState(null)

    const navigate = useNavigate();
    //gets the current location object
    const location = useLocation();
    //desructures the 'state' property from the location object
    const { state } = location;
    //retrieves the length of the dogs array from the location state or sets it to 0 if not available
    const dogsArrLength = state ? state.dogsArrLength : 0;


    //fetch cities from the API when the component mounts
    //updates the 'cities' state with the result
    useEffect(() => {
        getCities().then(citiesArr => setCities(citiesArr))
    }, [])


    useEffect(() => {
        setNewDogId(dogsArrLength + 1)
    }, [dogsArrLength])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const parsedCityId = parseInt(chosenCityId);

        //creates new dog object
        const newDog = {
            name: chosenName,
            cityId: parsedCityId
        }
        if (newDog.name == "" || isNaN(newDog.cityId) || newDog.cityId == 0) {
            window.alert("Please fill out all fields");
        } else {
            //uses the addDog function t add the dog to the API
            //then it navigates to the details page for the newly added dog
            //const newDogId = dogsArrLength + 1;
                const createdDog = await addDog(newDog)
                navigate(`/dog-details/${createdDog.id}`)
            //addDog(newDog).then(() => navigate(`/dog-details/${newDogId}`));

    }
}

    return (
        <div className="newdog-container">
            <h4>Add New Dog</h4>
            <div className="newdog-info">
                Name:
                <input
                    name="name"
                    size="50"
                    className="newdog-input"
                    onChange={e => setChosenName(e.target.value)}
                />
            </div>
            <div className="newdog-info">
                City:
                <select
                    name="cityId"
                    id="cities"
                    value={chosenCityId}
                    onChange={e => {
                        if (e.target.value === 0) {
                            setChosenCityId(null)
                        } else {
                            setChosenCityId(e.target.value)
                        }
                    }}>
                    <option className="newdog-city" value="0">Choose a City</option>
                    {cities.map(city => {
                        return (
                            <option
                                className="newdog-city"
                                key={city.Id}
                                value={city.id}
                            >
                                {city.name}
                            </option>
                        )
                    })}
                </select>
            </div>
            <button className="newdog-add-btn" onClick={handleSubmit}>Submit</button>
        </div>
    )
}