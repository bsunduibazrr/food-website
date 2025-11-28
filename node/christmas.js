import chalk from "chalk";
import figlet from "figlet";

const treeArt = `
       ${chalk.green("🎄")}
            ${chalk.green("🎄")}${chalk.yellow("✨")}${chalk.green("🎄")}
           ${chalk.green("🎄")}${chalk.red("🎁")}${chalk.green(
  "🎄"
)}${chalk.yellow("✨")}${chalk.green("🎄")}
          ${chalk.green("🎄")}${chalk.yellow("✨")}${chalk.green(
  "🎄"
)}${chalk.red("🎁")}${chalk.green("🎄")}${chalk.yellow("✨")}
         ${chalk.green("🎄")}${chalk.yellow("✨")}${chalk.green(
  "🎄"
)}${chalk.yellow("✨")}${chalk.green("🎄")}${chalk.red("🎁")}${chalk.green(
  "🎄"
)}
        ${chalk.red("🎁")}${chalk.green("🎄")}${chalk.yellow(
  "✨"
)}${chalk.green("🎄")}${chalk.yellow("✨")}${chalk.green("🎄")}${chalk.red(
  "🎁"
)}${chalk.green("🎄")}
       ${chalk.green("🎄")}${chalk.yellow("✨")}${chalk.green("🎄")}${chalk.red(
  "🎁"
)}${chalk.green("🎄")}${chalk.yellow("✨")}${chalk.green("🎄")}${chalk.yellow(
  "✨"
)}${chalk.green("🎄")}
      ${chalk.yellow("✨")}${chalk.green("🎄")}${chalk.yellow(
  "✨"
)}${chalk.green("🎄")}${chalk.red("🎁")}${chalk.green("🎄")}${chalk.yellow(
  "✨"
)}${chalk.green("🎄")}${chalk.yellow("✨")}${chalk.red("🎁")}
             ${chalk.white("|||")}
             ${chalk.white("|||")}
           ${chalk.white("[_____]")}
`;

const lyrics = [
  "I don't want a lot for Christmas",
  "There is just one thing I need",
  "I don't care about the presents",
  "Underneath the Christmas tree",
  "",
  "I just want you for my own",
  "More than you could ever know",
  "Make my wish come true",
  "All i want for christmas is you!",
];

figlet("Merry Christmas!", (err, data) => {
  if (err) {
    console.error("Figlet error:", err);
    return;
  }

  console.clear();
  console.log(chalk.cyan(data));
  console.log(treeArt);

  function typeWriter(text, delay = 100) {
    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        process.stdout.write(text[i]);
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          process.stdout.write("\n");
          resolve();
        }
      }, delay);
    });
  }

  (async () => {
    for (const line of lyrics) {
      await typeWriter(chalk.yellow("🎵 " + line), 50);
      await new Promise((r) => setTimeout(r, 2000));
    }

    console.log(chalk.green.bold("\n🎄🎁 Шинэ жилийн баяр боллоо! 🎁🎄"));
  })();
});
