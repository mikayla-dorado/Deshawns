import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editWalker, getCities, getWalkersById } from "../apiManager";

export const EditWalkerCities = () => {
  const [cities, setCities] = useState([]);
  const [walker, setWalker] = useState({});
  const [chosenName, setChosenName] = useState("");

  const walkerId = useParams().walkerId;
  const navigate = useNavigate();


    //gets the cities & the walker Ids
    //fetches walker details by ID, sets them in the component state
    //sets the chosenName state
  useEffect(() => {
    getCities().then(setCities);
    getWalkersById(walkerId).then((obj) => {
        setWalker(obj);
        setChosenName(obj.name)
    });
  }, [walkerId]);

  //this updates the walker state when the input value changes
  const handleInputChange = (e) => {
    //'setWalker' function used to update the state of the 'walker' variable
    //takes a callback function as argument
    setWalker((prevWalker) => ({
        //spread operator creates a shallow copy of the previous state 'prevWalker'
        //this avoids directly mutating the state
      ...prevWalker,
      //this updates a specific property of the copied state (name)
      //the 'e.target.value' is the new value of the input field
      [e.target.name]: e.target.value,
    }));
  };

  //this updates the walker state based on city checkbox changes
  const handleCityChange = (cityId) => {
    //'setWalker' function updates state of 'walker' variable
    setWalker((prevWalker) => {
        //this finds the index of the city w the given cityId in the array of cities (prevWalker.cities) in the previous state.
        //the 'findIndex' function returns the index of the first element
        //that satisfies the provided testing function
      const index = prevWalker.cities.findIndex((city) => city.id === cityId);
      //this creates a shallow copy of the array of cities from the previous state using the spread operator
      const updatedCities = [...prevWalker.cities];

      //this checks whether the city with the given 'cityId' is already present in the array of cities
      if (index !== -1) {
        //if the city is already present (index is not -1)
        //it removes the city from the 'updatedCities' array using splice method
        updatedCities.splice(index, 1);
      } else {
        //if city is not present, it finds the city w the given 'cityId' from a source called 'cities'
        //(assuming its an array of all available cities)
        const cityToAdd = cities.find((city) => city.id === cityId);
        //adds the found city to the 'updatedCities' array
        updatedCities.push(cityToAdd);
      }

      //returns a new state object by spreading the previous stae('prevWalker')
      //and updating the 'cities' property with the modified 'updatedCities' array
      return { ...prevWalker, cities: updatedCities };
    });
  };

  //handles the form submision, creates a 'walkerToUpdate' object
  //calling 'editWalker' to update the walker
  const handleUpdate = (e) => {
    e.preventDefault();

    const walkerToUpdate = {
      id: walker.id,
      name: walker.name,
      cities: walker.cities,
    };

    editWalker(walkerId, walkerToUpdate).then(() => navigate(`/walkers`));
  };

  return (
    <div className="edit-walker-container">
      <h4>Edit {walker.name}'s Details</h4>

      <div className="edit-walker-name">
        Name:
        <input
          name="name"
          //value is bound to 'chosenName' state variable, if null or undefined, an empty string
          value={chosenName || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="edit-walker-cities">
        {cities.map((city) => (
          <div className="edit-walker-city" key={city.id}>
            <input
            //makes checkboxes
              type="checkbox"
              //each checkbox corresponds to a city, id attribute is set to a unique value based on the city's 'id'
              id={`city-${city.id}`}
              //the checked attribute determines whether the checkbox should be checked or not
              //checks whether current city is present in the 'walker.cities' array using the 'some' method
              //the 'walker.cities' array presumably contains the cities selected by the user
              checked={walker.cities?.some((wc) => wc.id === city.id)}
              //this executes the 'handleCityChange' with the 'id' of the current city
              //indicating that the user has selected or deselected this city
              onChange={() => handleCityChange(city.id)}
            />
            {/* a label element asociated with the checkboxes
            htmlFor is set to the corresponding checkbox's 'id'. the label displays the name of the city */}
            <label htmlFor={`city-${city.id}`}>{city.name}</label>
          </div>
        ))}
      </div>
      <button className="update-walker-btn" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};