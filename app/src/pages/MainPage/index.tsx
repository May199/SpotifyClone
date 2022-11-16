import { FC, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TPlaylist } from '../../react-app-env';
import Button from '../../components/Button';
import CardList from '../../components/CardList';
import Card from '../../components/Card';
import SuccessBox from '../../components/SuccessBox';
import AuthContext from '../../contexts/auth';

import api from '../../connections/api';

import './index.css';

interface LocationProps {
  success: boolean;
  message: string;
}

const MainPage: FC = () => {
  const [playlists, setPlaylists] = useState<TPlaylist[]>([]);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [MainPageControls, setMainPageControls] = useState(<></>);
  const { signOut, session } = useContext(AuthContext);

  const location = useLocation<LocationProps>();

  useEffect(() => {
    api.get('playlists').then((response) => setPlaylists(response.data));

    return () => {};
  }, []);

  useEffect(() => {
    if (location.state) {
      setSuccess(location.state.success);
      setMessage(location.state.message);
    }

    window.history.replaceState({}, document.title);
  }, [location]);

  useEffect(() => {
    setMainPageControls(
      session.authenticated ? (
        <>
        <h1>Bem-Vindo ao Spotify</h1>
        <Button gray sm lg circle to="/Musics">
          Abrir o Web Player
        </Button>
        </>
      ) : (
        <>
        <h1>Vá de premium. E seja feliz</h1>
        <Button to="/register" green lg circle>
            obter spotify premium
        </Button>
        <div className='Divcenter'>
        <Button
          id="termos"
          to="#"
          style={{
            fontSize: '0.9rem',
            textDecoration: 'underline',
            textTransform: 'none',
          }}>
          *Sujeito a termos e condições.
        </Button>
        </div>
        </>
      )
    );
  }, [session]);

  return (
    <>
      <SuccessBox success={success}>{message}</SuccessBox>
      <div className="MainPage">
        <div className="container">
          {MainPageControls}
        </div>
      </div>

      <div className="SubPage">
        <h1>É música que você quer?</h1>
        <p>Escute uma de nossas playlists gratuitas.</p>

        <CardList>
          {playlists.map((list: any) => {
            return (
              <Card
                key={list.id}
                to={`/playlist/${list.id}`}
                title={list.playlistName}
                cover={'http://localhost:3333/' + list.cover}
                width="300px"
                height="300px"
              />
            );
          })}
        </CardList>
      </div>
    </>
  );
};

export default MainPage;
