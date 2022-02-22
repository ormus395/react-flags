import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Container from "./layout/Container";

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
