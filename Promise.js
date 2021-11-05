const PENDING = "pending";
const FINISHED = "fulfilled";
const FAILED = "rejected";
class XPromise {
  constructor(handleFinish, handleError) {
    let __PromiseState__ = PENDING;
    this.onResolvedCallbacks = [];
    this.onRejectCallback = handleError;
    this.__PromiseResult__ = undefined;
    const resolve = (val) => {
      this.__PromiseResult__ = val;
      this.__PromiseState__ = FINISHED;
    };
    const reject = (val) => {
      this.__PromiseResult__ = val;
      this.__PromiseState__ = FAILED;
    };
    this.reject = reject;
    Object.defineProperties(this, {
      __PromiseState__: {
        set(e) {
          __PromiseState__ = e;
          if (e === FINISHED) {
            try {
              this.onResolvedCallbacks.forEach((item) =>
                item?.(this.__PromiseResult__)
              );
            } catch (error) {
              reject(error);
            }
          } else if (e === FAILED) {
            this.onRejectCallback?.(this.__PromiseResult__);
          }
        },
        get() {
          return __PromiseState__;
        },
      },
    });
    try {
      handleFinish?.(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then(fun) {
    try {
      if (this.__PromiseState__ === PENDING) this.onResolvedCallbacks.push(fun);
      else if (this.__PromiseState__ === FINISHED) {
        let res = fun?.(this.__PromiseResult__);
        if (res) this.__PromiseResult__ = res;
      }
    } catch (error) {
      this.reject(error);
    }
    return this;
  }
  catch(fun) {
    if (this.__PromiseState__ === PENDING) this.onRejectCallback = fun;
    else if (this.__PromiseState__ === FAILED) {
      fun?.(this.__PromiseResult__);
    }
    return this;
  }
}
function test() {
  let p = new XPromise((rs, rj) => {
    setTimeout(() => {
      rs(2021);
    }, 1000);
  });
  console.log(p)
}
test();
