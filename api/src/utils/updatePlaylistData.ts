import fs from 'fs';

const updatePlaylistData = async (id: number, data: TPlaylistUpdate) => {
  const path = __dirname + '/../data/playlistData.json';
  let playlists: TPlaylist[];
  let playlistBuff = fs.readFileSync(path);
  let response: TSetResponse = {} as TSetResponse;

  playlists = JSON.parse(playlistBuff.toString());

  const matchedPlaylist = playlists.filter((p) => p.id === id)[0];

  if (!matchedPlaylist) {
    response.error = 'Theres a problem in your request!';
    response.status = 401;
    return response;
  }

  const updatedUsers = playlists.map((p) => {
    if (p.id === id) {
      p.cover = data.cover || p.cover;
      p.playlistName = data.playlistName || p.playlistName;
    }

    return p;
  });

  fs.writeFileSync(path, JSON.stringify(updatedUsers, null, 2));

  response.message = 'Updated successfully!';
  response.status = 200;
  return response;
}

export default updatePlaylistData