const typeOf=param=>Object.prototype.toString.call(param)


function test() {
  let data = [1, 0, -12, 8, 30, -1];
  console.log(typeOf(data))
}
test();