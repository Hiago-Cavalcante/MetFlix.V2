import './midiaCard.css';
import ModalMidia from '../../modalMidiaInfo';
import { useState } from 'react';

const MidiaCard = props => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true); // Abre o modal
    console.log(props.release_date);
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Fecha o modal
  };

  return (
    <div className="Midia-Card" style={{ position: 'relative' }}>
      <div className="Midia-Content" data-movie-id={props.id}>
        <img
          onClick={handleOpenModal} // Abre o modal ao clicar na imagem
          style={{ cursor: 'pointer' }}
          src={props.img}
          alt={`Mídia ${props.id}`}
        />
      </div>

      {/* Renderiza o modal apenas para o card correspondente */}
      {openModal && (
        <ModalMidia
          id={props.id}
          onClose={handleCloseModal}
          name={props.name}
          vote_average={props.vote_average}
          overview={props.overview}
          release_date={props.release_date}
        />
      )}
    </div>
  );
};

export default MidiaCard;
