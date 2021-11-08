/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  let romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let res = 0;
  for (let index =  0; index < s.length; index++) {
    if (romanMap[s[index]] >= (romanMap[s[index + 1]]??0))
      res += romanMap[s[index]];
    else res -= romanMap[s[index]];
  }
  return res;
};
(function test() {
  let x = "IV";
  console.log(romanToInt(x));
})();
