// eslint-disable-next-line
import { FC, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TPlaylist } from '../../react-app-env';
import CardList from '../../components/CardList';
import Card from '../../components/Card';
import AuthContext from '../../contexts/auth';

import './index.css';
import api from '../../connections/api';

const Musics: FC = () => {
    const [playlists, setPlaylists] = useState<TPlaylist[]>([]);
    const [Userplaylists, setUserplaylists] = useState<TPlaylist[]>([]);
    const [name, setName] = useState('');
    const [nameURL, setNameURL] = useState('');
    const { session } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        api
          .get(`playlists?userId=${session.user.id}`)
          .then((response) => setUserplaylists(response.data));
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

    useEffect(() => {
        api.get('playlists').then((response) => setPlaylists(response.data));
    
        return () => {};
      }, []);


    return(
        <>
            <div className='Musics'>
                <h1>Aproveite todas as Músicas</h1>
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

            <div className='Playlists'>
                <h1>Suas PlayLists</h1>

                <CardList gallery>
                    {Userplaylists.map((list: any) => {
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

                </CardList>
            </div>
        </>
    );
}

export default Musics;