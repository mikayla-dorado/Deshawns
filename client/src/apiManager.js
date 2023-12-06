export const getGreeting = async () => {
  const res = await fetch("/api/hello");
  return res.json();
};

export const getDogs = async () => {
  const res = await fetch("/api/dogs");
  return res.json();
};

export const getDogById = async (id) => {
  const res = await fetch(`/api/dogs/${id}`);
  return res.json();
};

export const getCities = async () => {
  const res = await fetch("/api/cities");
  return res.json();
}

export const getCityById = async (id) => {
  console.log(id)
  const res = await fetch(`/api/cities/${id}`);
  return res.json();
}

export const getWalkers = async () => {
  const res = await fetch("/api/walkers");
  return res.json();
}

export const getWalkersById = async (id) => {
  const res = await fetch(`/api/walkers/${id}`)
  return res.json();
}

export const addDog = async (dog) => {
   const res = await fetch(`/api/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dog)
  })
  return res.json();
}

export const addWalkerToDog = async (id, dogObj) => {
  const res = await fetch(`/api/dogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dogObj)
  })
  return res.json();
}