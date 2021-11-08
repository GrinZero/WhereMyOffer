let obj = {}
var fib = function (n) {
    let fibna = (m) => {
        if (m == 0) return 0
        else if (m == 1) return 1
        if (obj[m - 1] == undefined) obj[m - 1] = fib(m - 1)
        if (obj[m - 2] == undefined) obj[m - 2] = fib(m - 2)
        return obj[m - 1] + obj[m - 2]
    }
    return fibna(n) % (1e9 + 7)
};