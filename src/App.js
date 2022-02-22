import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Container from "./layout/Container";
import CountryList from "./pages/CountryList";

function App() {
  return (
    <div>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
