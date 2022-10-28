import { ChangeEvent, FC, SyntheticEvent, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';
import ErrorBox from '../../components/ErrorBox';

import api from '../../connections/api';

import AuthContext from '../../contexts/auth';

import './index.css';

const AddPlaylist: FC = () => {
  const { session } = useContext(AuthContext);
  const history = useHistory();

  const [playlistName, setPlaylistName] = useState('');
  const [cover, setCover] = useState<File>();

  const [errors, setErrors] = useState<JSX.Element[]>([]);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setErrors([]);
    window.scrollTo(0, 0);

    const formData = new FormData();
    formData.append('playlistName', playlistName);
    formData.append('userId', session.user.id.toString(10));
    if (cover) formData.append('cover', cover);

    try {
      const response = await api.post('playlists/create', formData);

      history.push({
        pathname: `/profile/${session.userURL}`,
        state: {
          success: response.status === 200,
          message: response.data.message,
        },
      });
    } catch (error: any) {
      const { validation, message } = error.response.data;
      if (validation) {
        validation.body.keys.forEach((el: string, i: number) => {
          setErrors((prev) => [
            ...prev,
            <ErrorBox key={el}>
              {validation.body.message[i].replace(/\[.*\]/, 'equal to email!')}
            </ErrorBox>,
          ]);
        });
      }

      if (message) {
        setErrors((prev) => [
          ...prev,
          <ErrorBox key={prev.length}>{message}</ErrorBox>,
        ]);
      }
    }
  }

  function handleFileUpload(ev: ChangeEvent<HTMLInputElement>) {
    const fileList = ev.target.files;

    if (!fileList) return;

    setCover(fileList[0]);
  }

  return (
    <div className="AddPlaylist">
      <h1>Inscrever-se com seu endereço de e-mail</h1>
      {errors.map((err) => err)}
      <form action="#" onSubmit={handleSubmit}>
        <input
          autoFocus
          name="playlistName"
          type="text"
          placeholder="Nome da Playlist"
          onChange={(e) => setPlaylistName(e.target.value)}
          value={playlistName}
        />

        <label htmlFor="cover">Capa da Playlist</label>
        <input
          name="cover"
          type="file"
          multiple={false}
          onChange={handleFileUpload}
        />

        <Button tag="button" green md circle>
          Adicionar
        </Button>
      </form>
    </div>
  );
};

export default AddPlaylist;
