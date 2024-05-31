import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateHaulPost from "./pages/postHaul/createHaulPost";
import TripHistory from "./pages/postHaul/tripHistory";
import TripHistoryList from "./pages/postHaul/tripHistoryList";

function App() {
  return (
    <>
      <Navbar />
      {/* <CreateHaulPost /> */}
      {/* <TripHistory /> */}
      <TripHistoryList />
    </>
  );
}

export default App;
