import { FC, useEffect, useState } from 'react';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';
import './index.css';

interface AudioPlayerProps {
  songURL: string;
  title: string;
  author: string;
}

const AudioPlayer: FC<AudioPlayerProps> = ({ title, author, songURL }) => {
  const [playing, setPlaying] = useState(false);
  const [song] = useState(new Audio(songURL));
  const [elapsed, setElapsed] = useState('00:00');
  const [buttonIcon, setButtonIcon] = useState(
    <BsPlayFill style={{ width: '30px', height: '30px', color: 'white' }} />
  );

  useEffect(() => {
    playing ? song.play() : song.pause();

    setButtonIcon(() =>
      playing ? (
        <BsPauseFill
          style={{ width: '30px', height: '30px', color: 'white' }}
        />
      ) : (
        <BsPlayFill style={{ width: '30px', height: '30px', color: 'white' }} />
      )
    );

    return () => {
      song.pause();
    };
  }, [playing, song]);

  useEffect(() => {
    song.addEventListener('ended', () => setPlaying(false));

    return () => {
      song.removeEventListener('ended', () => setPlaying(false));
    };
  }, [song]);

  useEffect(() => {
    song.addEventListener('timeupdate', () => {
      let m: number = 0;
      let s: number = 0;
      let currT = parseInt(song.currentTime.toString());

      s = currT % 60;
      m = Math.floor(currT / 60) % 60;
      setElapsed(`${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}`);
    });

    return () => {
      song.removeEventListener('timeupdate', () => {});
    };
  }, [song]);

  useEffect(() => {}, [playing]);

  function togglePlay() {
    setPlaying(!playing);
  }

  return (
    <div>
      <div 
      className={'AudioPlayer ' + (playing ? 'selected' : '')}
      onClick={togglePlay}>

        <button>{buttonIcon}</button>
        <span>
          {author} - {title}
        </span>
        <span>{elapsed}</span>
      </div>
    </div>
  );
};

export default AudioPlayer;
