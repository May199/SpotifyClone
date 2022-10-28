
import fs from 'fs';

export default async function getPlaylistsData() {
  let lists: TPlaylist[];
  
  let listBuff = fs.readFileSync(__dirname + '/../data/playlistData.json');
  lists = JSON.parse(listBuff.toString());
  
  return lists;
}
