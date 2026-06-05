const context = {
  title: "Call of Duty",
  genre: "First Person shooter",
};

function gameInfo(year) {
  console.log(
    `The title of the game is ${this.title}. The genre is ${this.genre}. The game was released in ${year}.`,
  );
}

// gameInfo();

// gameInfo.call(context);

// gameInfo.call(context, "2010");

// gameInfo.call(context, "2010");
// gameInfo.apply(context, ["2010"]);
// const gameInfoBound = gameInfo.bind(context, "2010");

// gameInfoBound();
