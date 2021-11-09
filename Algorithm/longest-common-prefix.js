/**
 * @param {string[]} strs
 * @return {string}
 */
 var longestCommonPrefix = function(strs) {
    let obj={};
    let index=0
    while(true){
        let strStartMatch=strs[0].substr(0,index)
        for(let i=0;i<strs.length;i++){
            let strStart=strs[i].substr(0,index)
            if(obj[strStart]==undefined&&strStartMatch===strStart) obj[strStart]=0
            else if(strStartMatch!==strStart) break
            ++obj[strStartMatch]
        }
        if(obj[strStartMatch]!==strs.length) {
            --index
            break
        }
        ++index;
    }
    return strs[0].substr(0,index)
};
(function test(){
    let strs=["flower","flower","flower"]
    console.log(longestCommonPrefix(strs))
})()