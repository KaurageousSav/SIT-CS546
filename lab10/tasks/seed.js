const { users } = require('../config/mongoCollections');
const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const userstest = data.users;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  const user1 = await userstest.createUser('Muffin', 'muffin@7');
  console.log(user1, 'user1')

  const checkuser1 = await userstest.checkUser('Muffin', 'muffin@7');
  console.log(checkuser1);

//   const user2 = await userstest.createUser('Snuffy','snuffy@25')
//   console.log(user2)


  console.log('Done seeding database');

  await db.serverConfig.close();
}

main()