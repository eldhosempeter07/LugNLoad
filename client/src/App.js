import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateHaulPost from "./pages/postHaul/createHaulPost";
// import TripHistory from "./pages/postHaul/tripHistory";

function App() {
  return (
    <>
      <Navbar />
      <CreateHaulPost />
      {/* <TripHistory /> */}
    </>
  );
}

export default App;
