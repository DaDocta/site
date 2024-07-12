const garrettStrangeArt = 
  "  _____                 __  __    ______                                " + "\n" +
  " / ___/__ ____________ / /_/ /_  / __/ /________ ____  ___ ____         " + "\n" +
  "/ (_\\/ _ `/ __/ __/ -_) __/ __/ _\\ \\/ __/ __/ _ `/ _ \\/ _ `/ -_)    " + "\n" +
  "\\___/\\_,_/_/ /_/  \\__/\\__/\\__/ /___/\\__/_/  \\_,_/_//_/\\_, /\\__/" + "\n" +
  "                                                      /__/              ";

const asciiArtDict = {
  "Garrett Strange": [
    <pre key="garrett-strange">{garrettStrangeArt}</pre>,
  ],
  // https://patorjk.com/software/taag/#p=display&f=Small%20Slant&t=Garrett%20Strange
};

export const getAsciiArt = (key) => {
  return asciiArtDict[key] || null;
};