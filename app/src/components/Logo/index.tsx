import { FC } from 'react';
import { Link } from 'react-router-dom'
import logo from '../../assets/spotify.png';

import './index.css'

const Logo: FC = () => {
  return (
    <>
      <Link className="Logo" to="/">
        <img src={logo} alt="logo spotify" />
        <h1>Spotify</h1>
      </Link>
    </>
  );
}

export default Logo;