const PENDING = "pending";
const FINISHED = "fulfilled";
const FAILED = "rejected";
class XPromise {
  constructor(handleFinish) {
    this.__PromiseState__ = PENDING;
    this.onResolvedCallbacks = [];
    this.onRejectCallbacks = [];
    this.__PromiseResult__ = undefined;
    const resolve = (val) => {
      if(this.__PromiseState__!==PENDING) return
      this.__PromiseResult__ = val;
      this.__PromiseState__ = FINISHED;
      this.onResolvedCallbacks.forEach((item) => {
        let res = item?.(this.__PromiseResult__);
        // if (res) this.__PromiseResult__ = res;
      });
    };
    const reject = (val) => {
      if(this.__PromiseState__!==PENDING) return
      this.__PromiseResult__ = val;
      this.__PromiseState__ = FAILED;
      this.onRejectCallbacks.forEach(item => item?.(this.__PromiseResult__));
    };
    try {
      handleFinish?.(resolve, reject);
    } catch (error) {
      reject?.(error);
    }
  }
  then(onFulfilled, onReject) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onReject = typeof onReject === "function" ? onReject: err=> {throw err;};
    return new XPromise((resolve, reject) => {
      if (this.__PromiseState__ === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(()=>{
            try {
              let x = onFulfilled(this.__PromiseResult__);
              x instanceof XPromise ? x.then(resolve, reject) : resolve(x);
            } catch (error) {
              reject(error)
            }
          })
        });
        this.onRejectCallbacks.push(() => {
          setTimeout(()=>{
            try {
              let x = onReject(this.__PromiseResult__);
              x instanceof XPromise ? x.then(resolve, reject) : resolve(x);
            } catch (error) {
              reject(error)
            }
          })
        });
      } else if (this.__PromiseState__ === FINISHED) {
        setTimeout(()=>{
          try {
            let x = onFulfilled(this.__PromiseResult__);
            if(typeof x === 'function' || (typeof x === 'object' && x !== null)){
              x.then(resolve,reject)
            }else{
               x instanceof XPromise ? x.then(resolve, reject) : resolve(x);
            }
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.__PromiseState__ === FAILED) {
        setTimeout(()=>{
          try {
            let x = onReject(this.__PromiseResult__);
            if(typeof x === 'function' || (typeof x === 'object' && x !== null)){
              x.then(resolve,reject)
            }else{
              x instanceof XPromise ? x.then((resolve)=>{x.then(resolve, reject)}) : resolve(x);
            }
            // x instanceof XPromise ? x.then(resolve, reject) : resolve(x);
          } catch (error) {
            reject(error)
          }
        })
      }
    });
  }
  catch(fun) {
    return this.then(undefined, fun);
  }
}
// var promisesAplusTests = require("promises-aplus-tests");

XPromise.deferred=function(){
  try {
    let result={}
    result.promise=new XPromise((resolve,reject)=>{
      result.resolve=resolve
      result.reject=reject
    })
    return result 
  } catch (error) {
    console.log(error)
  }
}

module.exports=XPromise