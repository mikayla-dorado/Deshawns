//issue 1: display all dogs on the homepage

import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteDog, getDogs } from "../apiManager"
import "./Dogs.css"


export const Dogs = () => {
    const [dogs, setDogs] = useState([])
    const [dogsArray, setDogsArray] = useState(0)

    const navigate = useNavigate();


    //this fetches the list of dogs from the API
    //the fetched dogs are thens stored in the 'dogs' state
    useEffect(() => {
        getDogs().then(dogsArr => {
            setDogs(dogsArr)
        })
    }, [])


    //updates the 'dogsArray' state with the length of the 'dogs' array
    //whenever the 'dogs' array changes
    useEffect(() => {
        setDogsArray(dogs.length)
    }, [dogs])


    //handles the delete functionality for the dogs
    //then calls the list of dogs and re sets that array without the dog deleted
    const handleDelete = (e, dogId) => {
        e.preventDefault();
        deleteDog(dogId).then(() => {
            getDogs().then(array => setDogs(array))
        })
    }

    return (
        <div className="dog-list-container">
            {dogs.map((dog) => {
                const dogId = dog.id;
                return (
                    <div className="dog-list" key={dog.id}>
                        <div className="dogs">
                            {/* when clicked, navigates to 'dog-details' route
                      with specific dogs Id */}
                            <div
                                className="details-btn"
                                onClick={() => {
                                    navigate(`dog-details/${dogId}`);
                                }}
                            >
                                {dog?.name}
                            </div>
                        </div>
                        <div className="">
                            {/* Use a closure to capture the correct dogId */}
                            <button className="delete-dog-btn" onClick={(e) => handleDelete(e, dogId)}>Remove Dog</button>
                        </div>
                    </div>
                );
            })}
            <button
                className="add-btn"
                // when clicked, the button navigates to 'adddog' route
                // and passes the current length of the 'dogs' array as state
                onClick={() => {
                    navigate(`adddog`, { state: { dogsArray } });
                }}
            >
                Add New Dog
            </button>
        </div>
    );
}
