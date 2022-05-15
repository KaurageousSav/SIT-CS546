const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const restaurants = data.restaurants;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();

  var regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

  let date = new Date()
  let day = date.getDate();
  let month = date.getMonth()+1;
  let year = date.getFullYear();
  let fullDate = `${month}/${day}/${year}`;

  const olivebistro = await restaurants.create('The Olive Bistro', 'New York', '123-456-7890', 'http://www.olivebistro.com', '$$$$', ["Cuban", "Italian"], {dineIn: true, takeOut: true, delivery: false});
  console.log(olivebistro)

  const olivebistroreview = await reviews.create(olivebistro._id, 'This place was great!', 'scaredycat', 5, fullDate, 'This place was great! the staff is top notch and the food was delicious!  They really know how to treat their customers')
  console.log(olivebistroreview)


  
  const saffronlounge = await restaurants.create('The Saffron Lounge', 'New York', '123-456-7890', 'http://www.saffronlounge.com', '$$$$', ["Cuban", "Italian"], {dineIn: true, takeOut: true, delivery: false});
  console.log(saffronlounge)

  const saffronloungeReview = await reviews.create(saffronlounge._id, 'This place was great!', 'savleen', 5, fullDate, 'This place was great! the staff is top notch and the food was delicious!  They really know how to treat their customers')
  console.log(saffronloungeReview)



  const pizzahub = await restaurants.create('The pizzahub', 'New York', '123-456-7890', 'http://www.pizzahub.com', '$$$$', ["Cuban", "Italian"], {dineIn: true, takeOut: true, delivery: false});
  console.log(pizzahub)

  const pizzahubReview = await reviews.create(pizzahubReview._id, 'This place was great!', 'scaredycat', 3, fullDate, 'This place was great!')
  console.log(pizzahubReview)



  const tacobell = await restaurants.create('The Taco Bell', 'New Jersey', '123-456-7890', 'http://www.tacobell.com', '$$$$', ["Cuban"], {dineIn: true, takeOut: true, delivery: false});
  console.log(tacobell)

  const tacobellReview = await reviews.create(tacobellReview._id, 'This place was great!', 'snuffytheDog', 2, fullDate, 'This place was great!')
  console.log(tacobellReview)



  const PunjabiAffair = await restaurants.create('The Punjabi Affair', 'Hyderabad', '123-456-7890', 'http://www.PunjabiAffair.com', '$$$$', ["Cuban", "Italian"], {dineIn: true, takeOut: true, delivery: false});
  console.log(PunjabiAffair)

  const PunjabiAffairReview = await reviews.create(PunjabiAffairReview._id, 'This place was amazing!', 'secretVampire', 5, fullDate, 'This place was great!')
  console.log(PunjabiAffairReview)



  const ChaiBar = await restaurants.create('The Chai Bar', 'New York', '123-456-7890', 'http://www.thechaibar.com', '$$$$', ["Cuban", "Italian"], {dineIn: true, takeOut: true, delivery: false});
  console.log(ChaiBar)

  const ChaiBarReview = await reviews.create(ChaiBar._id, 'This place was great!', 'scaredycat', 5, fullDate, 'This place was great!')
  console.log(ChaiBarReview)



  const McDonalds = await restaurants.create('The McDonalds', 'New York', '123-456-7890', 'http://www.theMcDonalds.com', '$$$$', ["Cuban", "Italian"], {dineIn: true, takeOut: true, delivery: false});
  console.log(McDonalds)

  const McDonaldsReview = await reviews.create(olivebistro._id, 'This place was great!', 'scaredycat', 3, fullDate, 'This place was great!')
  console.log(McDonaldsReview)



  const TheKasha = await restaurants.create('The Kasha', 'New York', '123-456-7890', 'http://www.TheKasha.com', '$$$$', ["Cuban", "Italian"], {dineIn: true, takeOut: true, delivery: false});
  console.log(TheKasha)

  const TheKashaReview = await reviews.create(TheKasha._id, 'This place was great!', 'scaredycat', 4, fullDate, 'This place was great!')
  console.log(TheKashaReview)



  const ThaiKingdom = await restaurants.create('The ThaiKingdom', 'New York', '123-456-7890', 'http://www.ThaiKingdom.com', '$$$$', ["Cuban", "Italian"], {dineIn: true, takeOut: true, delivery: false});
  console.log(ThaiKingdom)

  const ThaiKingdomReview = await reviews.create(ThaiKingdom._id, 'This place was great!', 'scaredycat', 5, fullDate, 'This place was great!')
  console.log(ThaiKingdomReview)



  const MuffinWorld = await restaurants.create('The Muffin World', 'New York', '123-456-7890', 'http://www.MuffinWorld.com', '$$$$', ["Cuban", "Italian"], {dineIn: true, takeOut: true, delivery: false});
  console.log(MuffinWorld)

  const MuffinWorldReview = await reviews.create(MuffinWorld._id, 'This place was great!', 'scaredycat', 5, fullDate, 'This place was great! the staff is top notch and the food was delicious!  They really know how to treat their customers')
  console.log(MuffinWorldReview)


  console.log('Done seeding database');

  await db.serverConfig.close();
}

main()