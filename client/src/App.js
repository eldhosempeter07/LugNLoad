import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import HaulPostList from "./pages/driver/postHaul/haulPostList";
import TripHistoryList from "./pages/user/postHaul/tripHistoryList";
import CreateHaulPost from "./pages/user/postHaul/createHaulPost";
import TripHistory from "./pages/user/postHaul/tripHistory";
import TripRequestList from "./pages/user/requestHaul/tripRequestList";
import TripRequest from "./pages/user/requestHaul/tripRequest";
import FindTrip from "./pages/user/requestHaul/findTrip";
function App() {
  return (
    <>
      <Navbar />
      {/* <Router> */}
      <Routes>
        <Route path="/" element={<TripHistoryList />} />
        <Route path="/haul">
          <Route index element={<TripHistoryList />} />
          <Route path="create" element={<CreateHaulPost />} />
          <Route path=":id" element={<TripHistory />} />
        </Route>

        <Route path="/requests">
          <Route index element={<TripRequestList />} />
          <Route path="find" element={<FindTrip />} />
          <Route path=":id" element={<TripRequest />} />
        </Route>
        <Route path="/drivers">
          <Route index element={<HaulPostList />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
