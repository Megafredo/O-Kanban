// Fonction qui permet de vérifié le format HEX
function isValidHexadecimalColor(color) {
    return /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(color);
  }

export { isValidHexadecimalColor };

