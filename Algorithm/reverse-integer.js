/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let strNum = x + "";
  let head="";
  if (strNum[0] === "-") {
    head = "-";
    strNum=strNum.replace("-","")
  }
  let res=+(head+[...strNum].reverse().join(""))
  if (res>2147483647 || res<-2147483648) res=0
  return isNaN(res)?0:res
};
function test() {
  let str = 1534236469;
  let res=reverse(str)
  console.log(res)
}
test();
