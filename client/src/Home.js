import { getGreeting } from "./apiManager";
import { useEffect, useState } from "react";
import { Dogs } from "./Dogs/Dogs";

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  return (
    <div>
  <p>{greeting.message}</p>
  <Dogs />
  </div>
  )
}
