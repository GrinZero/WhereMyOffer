/**
 * https://leetcode-cn.com/problems/two-sum/
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let tmp = {};
  for (let index = 0; index < nums.length; index++) {
      const element = nums[index];
      if(tmp[target-element]){
          return [tmp[target-element],index]
      }else{
          tmp[element]=index
      }
  }
  return []
//   nums.forEach((item, index) => {
//     if (!tmp[item]) {
//       tmp[item] = {
//         target: target - item,
//         indexs: [index],
//       };
//     } else tmp[item].indexs.push(index);
//   });
//   let res = [];
//   for (let index = 0; index < nums.length; index++) {
//     const item = nums[index];
//     if (tmp[target - item]) {
//       if (target - item === item && tmp[item].indexs.length === 1) continue;
//       if (target - item === item && tmp[item].indexs.length > 1)
//         res = [tmp[item].indexs[0], tmp[item].indexs[1]];
//       else res = [index, tmp[target - item].indexs[0]];
//       break;
//     }
//   }
//   return res;
};

function test() {
  let nums =[2,7,11,15],
    target = 9;
  let res = twoSum(nums, target);
  console.log(res[0], res[1]);
}
test();
