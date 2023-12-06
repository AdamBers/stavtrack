import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import ResponsiveAppBar from "./components/AppBar/AppBar";
import HomePage from "./pages/HomePage/HomePage";
import Accounts from "./pages/Accounts/Accounts";
import DeviceList from "./pages/DeviceList/DeviceList";
import Users from "./pages/Users/Users";
import "./App.css";

function App() {
  return (
    <>
      <ResponsiveAppBar />
      <Container maxWidth="xl" sx={{ my: 5 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/devices" element={<DeviceList />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
