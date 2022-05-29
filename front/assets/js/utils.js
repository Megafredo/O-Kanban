const utils = {
  /**
         * Convert RGB to Hexadecimal
         * @param {*} color in RGB => ex: rgb(255, 159, 128)
         * @returns 
         */
  convertColor(color) {
    let a = color.split(",");
    let b = a.map(function(element) {
      //For each array element
      element = parseInt(element).toString(16); //Convert to a base16 string
      return element.length == 1 ? "0" + element : element; //Add zero if we get only one character
    });
    return (b = "#" + b.join(""));
  },

  // Vérifie si c'est bien un nombre HEX
  isValidHexadecimalColor(color) {
    return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color);
  }
};

export { utils };
