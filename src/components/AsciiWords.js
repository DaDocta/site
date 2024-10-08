import React from 'react';
import '../styles/AsciiWords.css';

const garrettStrangeArt = 
  String.raw`  _____                 __  __    ______                        ` + "\n" +
  String.raw` / ___/__ ____________ / /_/ /_  / __/ /________ ____  ___ ____ ` + "\n" +
  String.raw`/ (_\/ _ '/ __/ __/ -_) __/ __/ _\ \/ __/ __/ _ '/ _ \/ _ '/ -_)` + "\n" +
  String.raw`\___/\_,_/_/ /_/  \__/\__/\__/ /___/\__/_/  \_,_/_//_/\_, /\__/ ` + "\n" +
  String.raw`                                                      /__/      `;

const garrettArt = 
  String.raw`  _____                 __  __ ` + "\n" +
  String.raw` / ___/__ ____________ / /_/ /_` + "\n" +
  String.raw`/ (_\/ _ '/ __/ __/ -_) __/ __/` + "\n" +
  String.raw`\___/\_,_/_/ /_/  \__/\__/\__/ `;

  const strangeArt = 
  String.raw`   ______                        ` + "\n" +
  String.raw`  / __/ /________ ____  ___ ____ ` + "\n" +
  String.raw` _\ \/ __/ __/ _ '/ _ \/ _ '/ -_)` + "\n" +
  String.raw`/___/\__/_/  \_,_/_//_/\_, /\__/ ` + "\n" +
  String.raw`                       /__/      `;

const asciiArtDict = {
  "Garrett Strange": garrettStrangeArt,
  "Garrett": garrettArt,
  "Strange": strangeArt,
  // https://patorjk.com/software/taag/#p=display&f=Small%20Slant&t=Garrett%20Strange
};

const AsciiWords = ({ keyName, className }) => {
  return (
    <pre className={"word " + className}>{asciiArtDict[keyName]}</pre>
  );
};

export default AsciiWords;
