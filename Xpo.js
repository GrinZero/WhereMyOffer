const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class myPromise {
  constructor(executor) {
    let self = this;
    self.status = PENDING;
    self.value = undefined;
    self.reason = undefined;
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (self.status === PENDING) {
        self.status = FULFILLED;
        self.value = value;
        self.onResolvedCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (self.status === PENDING) {
        self.status = REJECTED;
        self.reason = reason;
        self.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    //处理then里面不是回调函数情况
    //Promise/A+ 2.2.1 / Promise/A+ 2.2.5 / Promise/A+ 2.2.7.3 / Promise/A+ 2.2.7.4
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    let self = this;
    return new myPromise((resolve, reject) => {
      if (self.status === "fulfilled") {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value);
            x instanceof myPromise ? x.then(resolve, reject) : resolve(x);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }
      if (self.status === "rejected") {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason);
            x instanceof myPromise ? x.then(resolve, reject) : resolve(x);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }
      if (self.status === "pending") {
        self.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            let x = onFulfilled(self.value);
            x instanceof myPromise ? x.then(resolve, reject) : resolve(x);
          }, 0);
        });
        self.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            let x = onRejected(self.reason);
            x instanceof myPromise ? x.then(resolve, reject) : resolve(x);
          }, 0);
        });
      }
    });
  }
}
