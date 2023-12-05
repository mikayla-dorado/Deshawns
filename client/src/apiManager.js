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
  const res = await fetch(`/api/cities/${id}`)
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
