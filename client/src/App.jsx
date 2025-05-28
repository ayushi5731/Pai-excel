// import { Routes, Route } from "react-router-dom"
// import Navbar from "./components/Navbar"
// import Footer from "./components/Footer"
// import AboutUs from "./components/AboutUs"
// import Homepage from "./pages/Homepage"
// import MediaCoverage from "./pages/MediaCoverage"
// import Coursedetails from "./components/Coursedetails"
// import Events from "./components/Events"

// function App() {
//   return (
//     <div className="font-sans">
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Homepage />} />
//         <Route path="/media-coverage" element={<MediaCoverage />} />
//         <Route path="/course-details" element={<Coursedetails />} />
//         <Route path="/events" element={<Events />} />
//         <Route path="/about" element={<AboutUs />} />
//       </Routes>
//       <Footer />
//     </div>
//   )
// }

// export default App








import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";
import Homepage from "./pages/Homepage";
import MediaCoverage from "./pages/MediaCoverage";
import Coursedetails from "./components/Coursedetails";
import Events from "./components/Events";
import { useTheme } from "./context/ThemeProvider"; // <-- Import useTheme

function App() {
  const { theme } = useTheme(); // <-- Access current theme

  return (
    <div
      className="font-sans"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        transition: "all 0.3s ease",
        minHeight: "100vh"
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/media-coverage" element={<MediaCoverage />} />
        <Route path="/course-details" element={<Coursedetails />} />
        <Route path="/events" element={<Events />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
