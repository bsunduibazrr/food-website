import chalk from "chalk";
import figlet from "figlet";
import { faker } from "@faker-js/faker";
// import { pokemon } from "pokemon";
// import { generate, count } from "random-words";
// import { qr } from "qr-image";
import fs from "fs";
// console.log(chalk.blue("Hello world!"));
// async function doStuff() {
//   const text = await figlet.text("HI SUNDUI BNA!!");
//   console.log(text);
// }

// doStuff();

// console.log(
//   faker.helpers.fake(
//     "Hello {{person.prefix}} {{person.lastName}}, how are you today?"
//   )
// );

// faker.seed(123);

// const firstRandom = faker.number.int();

// // Setting the seed again resets the sequence.
// faker.seed(12);

// const secondRandom = faker.number.int();

// console.log(firstRandom === secondRandom);

// const pokemon = require("pokemon");

// pokemon.all();
// //=> ['Bulbasaur', …]

// pokemon.random();
// //=> 'Snorlax'

// pokemon.getName(147);
// //=> 'Dratini'

// pokemon.getId("Dratini");
// //=> 147
// console.log(generate.({ minLength: 2 }));
// console.log(generate({ exactly: 5, wordsPerString: 2, separator: "-" }));

// var qr_svg = qr.image("I love QR!", { type: "svg" });
// qr_svg.pipe(require("fs").createWriteStream("i_love_qr.svg"));

// var svg_string = qr.imageSync("I love QR!", { type: "svg" });
// var qr = require("qr-image");

// var qr_svg = qr.image("I love QR!", { type: "svg" });
// qr_svg.pipe(require("fs").createWriteStream("i_love_qr.svg"));

// var svg_string = qr.imageSync("I love QR!", { type: "svg" });
// console.log(svg_string);

fs.readFileSync("data.txt");
console.log(data.txt);
