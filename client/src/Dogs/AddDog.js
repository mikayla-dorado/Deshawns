import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addDog, getCities } from "../apiManager";


export const AddDog = ({onDogAdded}) => {
    const [selectedCity, setSelctedCity] = useState("")
    const [cities, setCities] = useState([])
    const [chosenName, setChosenName] = useState("")

    useEffect(() => {
        getCities().then(citiesArray => setCities(citiesArray))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!chosenName || !selectedCity) {
            window.alert("Please continue filling out all fields");
            return;
        }

        const newDog = {
            name: chosenName,
            cityId: selectedCity
        };
        try {
            await addDog(newDog);
            // Optionally, you can handle success, clear the form, or navigate to a different page
            onDogAdded();
        } catch (error) {
            console.error("Error adding dog:", error.message);
            // Handle the error as needed
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Dog's Name:
                <input className="add-dog-input"
                type="text"
                value={chosenName}
                onChange={(e) => setChosenName(e.target.value)}
                />
            </label>
            <br />
            <label>
                City:
                <select className="add-dog-city"
                value={selectedCity}
                onChange={(e) => setSelctedCity(e.target.value)}
                >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <button type="submit">Add Dog</button>
        </form>
    )
}