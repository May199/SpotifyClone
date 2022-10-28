import { FC, useEffect, useState } from 'react';

import { TPlaylist, TSong } from '../../react-app-env';

import AudioPlayer from '../../components/AudioPlayer';
import api from '../../connections/api';

import './index.css';

interface IPlaylist {
  id: number;
}

const PlayList: FC<IPlaylist> = ({ id }) => {
  const [list, setList] = useState<TSong[]>([]);
  const [playlistInfo, setPlaylistInfo] = useState<TPlaylist>({
    cover: '',
    id: 0,
    playlistName: '',
  });

  const baseURL = 'http://localhost:3333/';

  useEffect(() => {
    api.get(`songs/${id}`).then(({ data }) => setList(data));
    api.get(`playlists/${id}`).then(({ data }) => setPlaylistInfo(data));
  }, [id]);

  return (
    <>
      <div
        className="bg-image"
        style={{
          backgroundImage: `url(${baseURL + playlistInfo!.cover})`,
        }}></div>

      <div className="PlayList">
        <h1>{playlistInfo!.playlistName}</h1>

        <div className="player-box">
          <img src={baseURL + playlistInfo!.cover} alt="" />
          <ul>
            {list.map((el) => {
              const url = baseURL + el.path;
              return (
                <li key={el.id}>
                  {/* <audio controls src={url}></audio>  */}
                  <AudioPlayer
                    author={el.author}
                    songURL={url}
                    title={el.title}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default PlayList;
