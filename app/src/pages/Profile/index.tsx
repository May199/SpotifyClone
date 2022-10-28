import { FC, useContext, useEffect, useState } from 'react';
import { BsPencilSquare, BsPlusCircle } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { TPlaylist } from '../../react-app-env';

import Button from '../../components/Button';
import Card from '../../components/Card';

import CardList from '../../components/CardList';

import AuthContext from '../../contexts/auth';

import api from '../../connections/api';

import './index.css';

const Profile: FC = () => {
  const { session } = useContext(AuthContext);
  const history = useHistory();

  const [playlists, setPlaylists] = useState<TPlaylist[]>([]);
  const [name, setName] = useState('');
  const [nameURL, setNameURL] = useState('');

  useEffect(() => {
    api
      .get(`playlists?userId=${session.user.id}`)
      .then((response) => setPlaylists(response.data));
  }, [session]);

  useEffect(() => {
    if (!session.authenticated) {
      history.push('/login');
    }
  });

  useEffect(() => {
    if (session.authenticated) {
      setName(session.user.name);
      setNameURL(session.userURL);
    }
  }, [session]);

  return (
    <div className="Profile">
      <div className="profile-title">
        <h1>{name}</h1>
        <Button to={`/profile/update/${nameURL}`} green md circle>
          <BsPencilSquare
            style={{
              width: '20px',
              height: '20px',
              color: 'white',
              marginRight: '5px',
            }}
          />
          Editar perfil
        </Button>
      </div>

      <h2>Playlists de {name}</h2>
      <CardList gallery>
        {playlists.map((list: any) => {
          return (
            <Card
              key={list.id}
              to={`/playlist/${list.id}`}
              title={list.playlistName}
              cover={'http://localhost:3333/' + list.cover}
              width="200px"
              height="200px"
            />
          );
        })}
        <Card add to="/profile/playlist/add" width="200px" height="200px">
          <BsPlusCircle style={{ width: '40px', height: '40px' }} />
        </Card>
      </CardList>
    </div>
  );
};

export default Profile;
