import Banner from './Components/banner';
import { RenderMovies, RenderSeries } from './Components/RenderMidia';
import './App.css';
import Footer from './Components/footer';
import ModalMidia from './Components/modalMidiaInfo';

function App() {
  return (
    <div className="App">
      <Banner />
      <div className="Movies">
        <h1>Top Movies</h1>
        <RenderMovies />
      </div>
      <div className="Series">
        <h1>Top Series</h1>
        <RenderSeries />
      </div>
      <Footer />
    </div>
  );
}

export default App;
