function isNumber(n){
  return isNaN(n) ? NaN : n;
}

module.exports = {
  isNumber: isNumber
};