import { useEffect } from "react";
import { useState } from "react"
import { useParams } from "react-router-dom";
import { getDogById } from "../apiManager";


export const DogDetails = () => {
    const [dog, setDog] = useState([]);

    const dogId = useParams().dogId;

    useEffect(() => {
        getDogById(dogId).then(data => {
            const dobObj = data;
            setDog(dobObj);
        })
    }, [dogId])

    return (
        <div className="dogs-details">
            <h3>Dog Details</h3>
            <div className="dog-info">
                <div className="dog-name">
                    Name: {dog?.name}
                </div>
                {(dog.walkerId == null) ? (
                    <div className="dog-walker"><b>No Walker Assigned</b></div>
                ) : (
                    <div className="dog-walker"><b>Walker's Name:</b> {dog?.walker?.name}</div>
                )}
                <div className="dog-city"><b>Location:</b> {dog?.city?.name}</div>
            </div>
        </div>
    )
}