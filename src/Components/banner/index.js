import './banner.css';
import { CiSearch } from 'react-icons/ci';

const Banner = () => {
  return (
    <div>
      <header className="Banner">
        <img src=".\Banner.jpeg" alt="Banner" />
        <ul className="banner-first-navegation">
          <li>Home</li>
          <li>Series</li>
          <li>Movies</li>
        </ul>
        <div className="second-navegation">
          <button className="search-btn">
            <CiSearch color="white" size="30px" />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Banner;
