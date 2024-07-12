const asciiArtDict = {
    "Garrett Strange": [
        <pre>  _____                 __  __    ______                        </pre>,
        <pre> / ___/__ ____________ / /_/ /_  / __/ /________ ____  ___ ____ </pre>,
        <pre>/ (_\/ _ `/ __/ __/ -_) __/ __/ _\ \/ __/ __/ _ `/ _ \/ _ `/ -_)</pre>,
        <pre>\___/\_,_/_/ /_/  \__/\__/\__/ /___/\__/_/  \_,_/_//_/\_, /\__/ </pre>,
        <pre>                                                      /__/      </pre>,
    ],
    // Add more keys and their respective ASCII art here
  };
  
  export const getAsciiArt = (key) => {
    return asciiArtDict[key] || null;
  };