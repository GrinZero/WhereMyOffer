
Function.prototype.bind=function(obj){
    return ()=>{
        this.call(obj,arguments)
    }
}

function test(){
    function hello(){
        console.log(this.a)
    }
    let obj={
        a:"hello"
    }
    hello.bind(obj)()
}
test()