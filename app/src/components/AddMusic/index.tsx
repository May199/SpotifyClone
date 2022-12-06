import { FC, useContext, useEffect, useState } from 'react';
import { TPlaylist, TSong } from '../../react-app-env';
import { BsPlusCircle } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../contexts/auth';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import Button from '../Button';

import api from '../../connections/api';
import './index.css'


const AddMusic: FC = () => {
    const [Userplaylists, setUserplaylists] = useState<TPlaylist[]>([]);
    const [playlists, setPlaylists] = useState<TPlaylist[]>([]);
    const [update, setUpdate] = useState([]);
    const [name, setName] = useState('');
    const [nameURL, setNameURL] = useState('');
    const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(5);
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
        api.get('playlists').then((response) => setPlaylists(response.data))
        
        return () => {};
      }, []);

      const UpdatePlaylist = (idPlaylist: any) => {

        return idPlaylist;
      }

    return(
        <>
        <Button {...buttonProps} className="myButton">
            <BsPlusCircle 
            style={{
            width: '20px',
            height: '20px',
            color: 'white',
            }}
            />
        </Button>
        
        <div className={isOpen ? 'visible' : ''} role='menu'>
            {Userplaylists.map((list: any) => {
            return (
                <a className='PlaylistColor' {...itemProps[list.id]} onClick={UpdatePlaylist(list.id)}>{list.playlistName}</a>
            );
            })}
        </div>
        </>
    );
}
export default AddMusic;