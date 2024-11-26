import React from 'react';
import './modalMidia.css';
import { CiStar } from 'react-icons/ci';

const ModalMidia = ({
  id,
  onClose,
  name,
  release_date,
  vote_average,
  overview,
}) => {
  const maxOverviewLength = 150;

  return (
    <div className="Modal-Wrapper">
      <div className="Modal-Content" id={id}>
        <h2>{name}</h2>
        <p>{release_date}</p>
        <p>{overview.slice(0, maxOverviewLength)}...</p>
        <div className="star-rating">
          <CiStar color="yellow" fontSize={20} />
          <span>{vote_average}</span>
        </div>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default ModalMidia;
