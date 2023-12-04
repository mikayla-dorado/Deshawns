//issue 1: display all dogs on the homepage

import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getDogs } from "../apiManager"
import "./Dogs.css"


export const Dogs = () => {
    const [dogs, setDogs] = useState([])
    const [dogsArray, setDogsArray] = useState(0)

    const navigate = useNavigate();

    useEffect(() => {
        getDogs().then(dogsArr => {
            setDogs(dogsArr)
        })
    }, [])

    useEffect(() => {
        setDogsArray(dogs.length)
    }, [dogs])


    return (
        <div className="dog-list">
            {dogs.map(dog => {
                const dogId = dog.id
                return (
                    <div className="details-btn"  onClick={() => { navigate(`dog-details/${dog.id}`) }}>
                        {dog?.name}
                           
                        
                    </div>
                )
            })}
        </div>
    )
}