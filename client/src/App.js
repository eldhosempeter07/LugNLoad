import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateHaulPost from "./pages/postHaul/createHaulPost";
import TripHistory from "./pages/postHaul/tripHistory";
import TripHistoryList from "./pages/postHaul/tripHistoryList";
import { Route, Routes } from "react-router-dom";
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
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {/* </Router> */}
      {/* <CreateHaulPost /> */}
      {/* <TripHistory /> */}
      {/* <TripHistoryList /> */}
    </>
  );
}

export default App;
