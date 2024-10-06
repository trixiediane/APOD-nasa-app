import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function App() {
  // Declare state variables
  const [data, setData] = useState(null);  // Holds the fetched NASA API data
  const [loading, setLoading] = useState(false);  // Loading state (can be used later if needed)
  const [showModal, setShowModal] = useState(false);  // Tracks if the sidebar/modal is visible

  // Function to toggle the sidebar/modal visibility
  function handleToggleModal() {
    setShowModal(!showModal);
  }

  // useEffect hook that runs when the page first loads (empty dependency array)
  useEffect(() => {
    async function fetchAPIData() {
      const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;  // NASA API key from environment variables

      const url = 'https://api.nasa.gov/planetary/apod' +
        `?api_key=${NASA_KEY}`;  // NASA API endpoint for the Astronomy Picture of the Day (APOD)

      const today = (new Date()).toDateString();  // Get today's date as a string
      const localKey = `NASA-${today}`;  // Key to store and retrieve today's data from localStorage

      // Check if today's data is already in localStorage to avoid multiple API calls
      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));  // Parse data from localStorage
        setData(apiData);  // Update the state with cached data
        console.log('Fetched from cache today.');
        return;  // Exit the function early if data is in localStorage
      }

      localStorage.clear();  // Clear any old data in localStorage

      // If data isn't in localStorage, fetch it from the NASA API
      try {
        const response = await fetch(url);  // Fetch data from NASA API
        const apiData = await response.json();  // Parse the response into JSON
        localStorage.setItem(localKey, JSON.stringify(apiData));  // Store the data in localStorage
        setData(apiData);  // Update the state with the fetched data
        console.log('Fetched from API today.');
      } catch (err) {
        console.log(err.message);  // Log any errors if the fetch fails
      }
    }
    fetchAPIData();  // Call the function to fetch data when the page loads
  }, []);  // Empty dependency array means this only runs once when the component mounts

  return (
    <>
      {/* If data is available, show the Main component, otherwise show a loading state */}
      {data ? (<Main data={data} />) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>  {/* Loading icon */}
        </div>
      )}

      {/* Show the SideBar component if the modal is visible */}
      {showModal && (<SideBar data={data} handleToggleModal={handleToggleModal} />)}

      {/* Always show the Footer component if data is available */}
      {data && (<Footer data={data} handleToggleModal={handleToggleModal} />)}
    </>
  );
}

export default App;
