import fs from 'fs';

export default async function getMusicsData() {
  let lists: TMusicsList[];
  
  let listBuff = fs.readFileSync(__dirname + '/../data/musicsData.json');
  lists = JSON.parse(listBuff.toString());
  
  return lists;
}
