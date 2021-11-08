/**
 * @param {number} x
 * @return {boolean}
 */
 var isPalindrome = function(x) {
    let strNum=x+""
    let reverse=[...strNum].reverse().join("")
    return strNum===reverse
};