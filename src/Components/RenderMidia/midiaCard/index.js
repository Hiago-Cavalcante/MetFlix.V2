import './midiaCard.css';

const MidiaCard = props => {
  return (
    <div className="Midia-Card">
      <div className="Midia-Content" data-movie-id={props.id}>
        <img src={props.img} alt={props.img} />
      </div>
    </div>
  );
};

export default MidiaCard;
