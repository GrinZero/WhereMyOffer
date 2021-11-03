/**
 * https://leetcode-cn.com/problems/3sum/
 */
 var threeSum = function(nums) {
    nums.sort((a,b)=>a-b)
    
    

    return nums
};

function test(){
    let nums=[-1,0,1,2,-1,-4]
    let res=threeSum(nums)
    console.log(res)
}
test()