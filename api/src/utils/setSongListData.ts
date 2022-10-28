import fs from 'fs';

export default async function setSongListData(newSong: TNewPlaylistSong) {
  const path = __dirname + '/../data/songListData.json'
  let list: TSongList[];
  let listBuff = fs.readFileSync(path);
  let response: TSetResponse = {} as TSetResponse

  list = JSON.parse(listBuff.toString());

  const listToUpdate = list.filter( 
    slist => slist.playlistId === newSong.playlistId
  )[0];

  if(listToUpdate) {
    const { songList } = listToUpdate 
    const { author, path, title} = newSong
    let id = listToUpdate.songList[listToUpdate.songList.length - 1].id + 1;

    songList.push({ id, title, path, author })

    list.map( sl => {
      if(sl.playlistId === listToUpdate.playlistId) {
        sl.songList = songList
      }
    })

  } else {
    const { author, path, title} = newSong
    list.push({ 
      playlistId: newSong.playlistId, 
      songList: [{
        id: 0,
        title,
        path,
        author
      }] 
    })
  }

  fs.writeFileSync(path, JSON.stringify(list, null, 2));

  response.message = 'Playlist successfully created!'
  response.status = 200
  return response;
}