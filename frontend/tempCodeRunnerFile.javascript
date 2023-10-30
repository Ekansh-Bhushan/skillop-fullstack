const obj1 = {
    0 : "aman",
    1 : "anjali"
}
const obj2 = {
    0 : "raman",
    1 : "karna"
}

let x = 0;

let obj3 = {};

for(let i in obj1) {
    obj3[x] = obj1[i]
    x=x+1;
}

for(let i in obj2) {
    obj3[x] = obj2[i]
    x=x+1;
}

console.log(obj3);