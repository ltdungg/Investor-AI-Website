import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import ContactButton from "./components/UtilButton/ContactButton/ContactButton";
import ToTopButton from "./components/UtilButton/ToTopButton/ToTopButton";
import UtilButtonContainer from "./components/UtilButton/UtilButtonContainer";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="content">
                <Home />
            </div>
            <Footer />
            <UtilButtonContainer>
                <ToTopButton />
                <ContactButton />
            </UtilButtonContainer>
        </div>
    );
}

export default App;
