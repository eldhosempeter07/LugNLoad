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
import Login from "./pages/driver/register/HaulerLogin";
import Register from "./pages/user/register/Register";
import HaulerRegister from "./pages/driver/register/HaulerRegister";
import HaulLogin from "./pages/driver/register/HaulerLogin";
import UserLogin from "./pages/user/register/UserLogin";
import HaulerProfile from "./pages/driver/register/HaulerProfile";
import UserProfile from "./pages/user/register/UserProfile";
import RouteComponent from "./components/routeComponent";
import HaulerProtectedRoute from "./utils/haulerProtectedRoute";
import BaseRoute from "./utils/baseRoute";
import NonAuthRoute from "./utils/nonAuthRoute";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BaseRoute />} />
        <Route
          path="/hauler-login"
          element={<NonAuthRoute element={<HaulLogin />} />}
        />
        <Route
          path="/login"
          element={<NonAuthRoute element={<UserLogin />} />}
        />

        <Route
          path="/register"
          element={<NonAuthRoute element={<Register />} />}
        />
        <Route
          path="/hauler-register"
          element={<NonAuthRoute element={<HaulerRegister />} />}
        />
        <Route path="/haul">
          <Route
            path="create"
            element={<RouteComponent element={<CreateHaulPost />} />}
          />
          <Route
            path="posts"
            element={<RouteComponent element={<TripHistoryList />} />}
          />
          <Route
            path="profile"
            element={<RouteComponent element={<UserProfile />} />}
          />
          <Route
            path=":id"
            element={<RouteComponent element={<TripHistory />} />}
          />
        </Route>

        {/* Requests Routes */}
        <Route path="/requests">
          <Route
            index
            element={<RouteComponent element={<TripRequestList />} />}
          />
          <Route
            path="find"
            element={<RouteComponent element={<FindTrip />} />}
          />
          <Route
            path="haulers/posts"
            element={<RouteComponent element={<HaulersPosts />} />}
          />
          <Route
            path=":id"
            element={<RouteComponent element={<TripRequest />} />}
          />
        </Route>

        <Route path="/hauler">
          <Route
            index
            element={<HaulerProtectedRoute element={<HaulerPostList />} />}
          />
          <Route
            path=":id"
            element={<HaulerProtectedRoute element={<HaulerTripHistory />} />}
          />
          <Route
            path="create"
            element={<HaulerProtectedRoute element={<CreateHaulerPost />} />}
          />
          <Route
            path="profile"
            element={<HaulerProtectedRoute element={<HaulerProfile />} />}
          />
          <Route
            path="users/find"
            element={<HaulerProtectedRoute element={<FindUsers />} />}
          />
          <Route
            path="haul/posts"
            element={<HaulerProtectedRoute element={<UsersPostList />} />}
          />
          <Route
            path="requests"
            element={
              <HaulerProtectedRoute element={<HaulerTripRequestList />} />
            }
          />
          <Route
            path="find"
            element={<HaulerProtectedRoute element={<FindTrip />} />}
          />
          <Route
            path="request/:id"
            element={<HaulerProtectedRoute element={<HaulerTripRequest />} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
