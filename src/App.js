import Banner from './Components/banner';
import { RenderMovies, RenderSeries } from './Components/films&series';
import './App.css';
import Footer from './Components/footer';

function App() {
  return (
    <div className="App">
      <Banner />
      <div className="Movies">
        <h2>Movies</h2>
        <RenderMovies />
      </div>
      <div className="Series">
        <h2>TV Shows</h2>
        <RenderSeries />
      </div>
      <Footer />
    </div>
  );
}

export default App;