import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

interface ButtonProps extends HTMLAttributes<HTMLOrSVGElement> {
  green?: Boolean;
  gray?: Boolean;
  sm?: Boolean;
  md?: Boolean;
  lg?: Boolean;
  circle?: Boolean;
  square?: Boolean;
  noBg?: Boolean;
  noBorder?: Boolean;
  to?: string;
  tag?: keyof JSX.IntrinsicElements | JSX.Element;
}

const Button: React.FC<ButtonProps> = ({
  green,
  gray,
  sm,
  md,
  lg,
  circle,
  square,
  noBg,
  noBorder,
  to,
  tag,
  children,
  ...props
}) => {
  const As = (tag as keyof JSX.IntrinsicElements) || Link;

  function classes() {
    let c = '';

    if (green) c += ' green';
    if (gray) c += ' gray';
    if (sm) c += ' sm';
    if (md) c += ' md';
    if (lg) c += ' lg';
    if (circle) c += ' circle';
    if (square) c += ' square';
    if (noBg) c += ' noBg';
    if (noBorder) c += ' noBorder';

    return c;
  }
  return (
    <As to={to || '#'} className={'Button ' + classes()} {...props}>
      {children}
    </As>
  );
};

export default Button;
