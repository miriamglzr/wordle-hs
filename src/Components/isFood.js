import database from '../database.json';

export const isFood = wordArr => {
  let word = wordArr.map (element => element.letter).join ('');
  //console.log (word);
  let exists = false;
  database.map ((food, i) => {
    if (food.name === word) {
      return (exists = true);
    }
  });

  return exists;
};
