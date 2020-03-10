const { Pokemon, Move } = require("./models");

const main = async () => {
  await Pokemon.destroy({
    where: {}
  });

  await Move.destroy({
    where: {}
  });

  const pokemon1 = await Pokemon.create({
    name: "Bulbasaur",
    frontImage:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    backImage:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
    health: 300
  });

  const pokemon2 = await Pokemon.create({
    name: "Charmander",
    frontImage:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    backImage:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png",
    health: 300
  });

  const pokemon3 = await Pokemon.create({
    name: "Squirtle",
    frontImage:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    backImage:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/7.png",
    health: 300
  });

  const move1 = await Move.create({
    name: "Tackle",
    damage: 35
  });

  const move2 = await Move.create({
    name: "Hyper Beam",
    damage: 120
  });

  const move3 = await Move.create({
    name: "Slash",
    damage: 90
  });

  await pokemon1.addMove(move1);
  await pokemon2.addMove(move2);
  await pokemon3.addMove(move3);


  process.exit();
};

main();
