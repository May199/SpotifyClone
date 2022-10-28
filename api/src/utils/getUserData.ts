import fs from 'fs';

export default async function getUserData() {
  let users: TUser[];
  let lastId: number = 0;
  let newId: number = 0;
  let userBuff = fs.readFileSync(__dirname + '/../data/userData.json');
  users = JSON.parse(userBuff.toString());

  if (users.length > 0)
    users.map((user) => {
      lastId = user.id;
      newId = lastId + 1 ;
    });
  return { users, lastId, newId };
}
