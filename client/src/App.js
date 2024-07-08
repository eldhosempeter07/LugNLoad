import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import HaulerPostList from "./pages/driver/postHaul/haulerPostList";
import TripHistoryList from "./pages/user/postHaul/tripHistoryList";
import CreateHaulPost from "./pages/user/postHaul/createHaulPost";
import TripHistory from "./pages/user/postHaul/tripHistory";
import TripRequestList from "./pages/user/requestHaul/tripRequestList";
import TripRequest from "./pages/user/requestHaul/tripRequest";
import FindTrip from "./pages/user/requestHaul/findTrip";
import CreateHaulerPost from "./pages/driver/postHaul/createHaulerPost";
import FindUsers from "./pages/driver/requestHauler/findUsers";
import UsersPostList from "./pages/driver/requestHauler/UsersPostList";
import HaulersPosts from "./pages/user/requestHaul/haulerPosts";
import HaulerTripRequest from "./pages/driver/requestHauler/haulertripRequest";
import HaulerTripRequestList from "./pages/driver/requestHauler/HaulerTripRequestList";
import HaulerTripHistory from "./pages/driver/postHaul/haulertripHistory";
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
          <Route path="haulers/posts" element={<HaulersPosts />} />
          <Route path=":id" element={<TripRequest />} />
        </Route>

        <Route path="/hauler">
          <Route index element={<HaulerPostList />} />
          <Route path=":id" element={<HaulerTripHistory />} />
          <Route path="create" element={<CreateHaulerPost />} />
          <Route path="users/find" element={<FindUsers />} />
          <Route path="haul/posts" element={<UsersPostList />} />
          <Route path="requests" element={<HaulerTripRequestList />} />
          <Route path="find" element={<FindTrip />} />
          <Route path="request/:id" element={<HaulerTripRequest />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
