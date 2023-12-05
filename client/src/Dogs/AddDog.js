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

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const dogsArrLength = state ? state.dogsArrLength : 0;


    useEffect(() => {
        getCities().then(citiesArr => setCities(citiesArr))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        const parsedCityId = parseInt(chosenCityId);

        const newDog = {
            name: chosenName,
            cityId: parsedCityId
        }

        if (newDog.name == "" || newDog.cityId == null || newDog.cityId == 0) {
            window.alert("Please fill out all fields");
        } else {

            const newDogId = dogsArrLength + 1;
            addDog(newDog).then(() => navigate(`/dog-details/${newDogId}`));
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