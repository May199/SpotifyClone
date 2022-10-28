import fs from 'fs';

export default async function setPlaylistData(newPlaylist: TNewUserPlaylist) {
  const path = __dirname + '/../data/playlistData.json'
  let playlists: TPlaylist[];
  let playlistBuff = fs.readFileSync(path);
  let response: TSetResponse = {} as TSetResponse

  playlists = JSON.parse(playlistBuff.toString());

  let newPlaylistId = playlists[playlists.length - 1].id + 1

  playlists.push({ id: newPlaylistId, ...newPlaylist });

  fs.writeFileSync(path, JSON.stringify(playlists, null, 2));

  response.message = 'Playlist successfully created!'
  response.status = 200
  return response;
}