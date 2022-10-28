
import fs from 'fs';

export default async function getSongListData() {
  let lists: TSongList[];
  
  let listBuff = fs.readFileSync(__dirname + '/../data/songListData.json');
  lists = JSON.parse(listBuff.toString());
  
  return lists;
}
