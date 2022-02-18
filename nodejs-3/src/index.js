const sumSync = (num1, num2) => {
    return num1 + num2;
}

const sumAsync = (num1, num2, callback) => {
    setTimeout(() => {
        const result = num1 + num2;
        callback(result);
    }, 2000);
}

sumAsync(1, 2, (result) => {
    console.log("start async");
    console.log(result)
    console.log("end async");
})

console.log("start sync");
console.log(sumSync(1, 2));
console.log("end sync");




