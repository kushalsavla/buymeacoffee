import { Navbar, Footer, Animate, Transactions } from "./components";

const App = () => {
  return (
    <>
      <Animate />
      <div className="min-h-screen">
        <div className="gradient-bg-welcome area">
          <Navbar />
          <Transactions />
          <Footer></Footer>
        </div>
      </div>
    </>
  );
};

export default App;
