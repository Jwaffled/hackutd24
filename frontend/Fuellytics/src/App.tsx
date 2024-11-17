import React from "react";
import "./App.css";
import Header from "./components/Header"; // Import the new Header component

function App() {
  const handleNavigation = (section: string) => {
    alert(`You clicked on ${section}`);
    // Add navigation or logic here
  };

  return (
    <div className="App">
      {/* Header Section */}
      <Header onNavigate={handleNavigation} /> {/* Use the Header component */}

      {/* Main Content Section */}
      <main className="main">
        <div className="car-image">Car Image</div>
      </main>
    </div>
  );
}

export default App;
