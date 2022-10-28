import './index.css';

interface CardListProps {
  gallery?: boolean;
}

const CardList: React.FC<CardListProps> = ({ gallery, ...props }) => {
  return (
    <div {...props} className={`CardList ${gallery ? 'Gallery' : ''}`}>
      {props.children}
    </div>
  );
};

export default CardList;
