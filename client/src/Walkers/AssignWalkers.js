import { useEffect, useState } from "react"
import "./Walkers.css"
import { addWalkerToDog, getDogs, getWalkersById } from "../apiManager";
import { useLocation, useNavigate } from "react-router-dom";

export const AssignWalkers = () => {
    const [dogs, setDogs] = useState([]);
    const [availableDogs, setAvailableDogs] = useState([]);
    const [currentWalker, setCurrentWalker] = useState([]);

    const location = useLocation();
    const walkerId = location.state?.walkerId;
    const navigate = useNavigate();

    console.log(dogs)

    //fetches the list of dogs
    useEffect(() => {
        getDogs().then(array => {
            setDogs(array)
            console.log(array)
        });
    }, [])


    //fetches info about the current walker based on the provided walkerId
    useEffect(() => {
        getWalkersById(walkerId).then(obj => {
            setCurrentWalker(obj)
            //console.log(walkerId)
        })
    }, [walkerId])


    //filters available dogs that arenot walked by the current walker
    //and are in the same cities
    useEffect(() => {
        const dogsNotWalkedByWalker = dogs.filter(dog => dog.walkerId === null);
        console.log("dogsNotWalkedByWalker", dogsNotWalkedByWalker)
        if (currentWalker.cities) {
            const citiesArray = currentWalker.cities.map(city => city.id);
            //filter dogs based on whether they are in the same cities as the walker

            const dogsArray = dogsNotWalkedByWalker.filter(dog =>
                citiesArray.includes(dog.cityId));
            //update the state variable with the available dogs
            setAvailableDogs(dogsArray)
        }
    }, [dogs, walkerId, currentWalker])


    const handleClick = (dog, e) => {
        e.preventDefault();

        //object with updated info for the dog
        const dogUpdate = {
            id: dog.id,
            name: dog.name,
            walkerId,
            cityId: dog.cityId
        }

        //call the addWalkerToDog function to update the dog with the new walker
        addWalkerToDog(dog.id, dogUpdate).then(navigate(`/dog-details/${dog.id}`))
    }

    return (
        <div>
            <div className="dogs-walkers-container">
                <h4>Assign {currentWalker.name} to One of the Dogs Available</h4>
                {availableDogs.map(dog => (
                    <div
                        className="dog-walker"
                        key={dog.id}
                        onClick={(e) => { handleClick(dog, e) }}
                    >{dog.name}</div>
                ))}
            </div>
        </div>
    )
}