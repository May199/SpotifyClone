import { Link } from 'react-router-dom';

import './index.css';

interface CardProps {
  to: string;
  title?: string;
  cover?: string;
  height: string;
  width: string;
  add?: boolean;
}

const Card: React.FC<CardProps> = ({
  to,
  title,
  cover,
  height,
  width,
  ...props
}) => {
  const cardContent = (
    <>
      <div>
        <span>{title}</span>
        <img src={cover} alt={title} />
      </div>
    </>
  );
  return (
    <Link
      to={to}
      className={`Card ${props.add ? 'add' : ''}`}
      style={{ width, height }}>
      {props.add ? props.children : cardContent}
    </Link>
  );
};

export default Card;
