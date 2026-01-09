function sum(a, b) {
    return a + b;
}
const result = sum(10, 20);
console.log(result);
const add = (a, b) => {
    return a + b;
};
const result2 = add(10, 20);
console.log(result2);
const profile = {
    name: "John",
    age: 38,
    address: {
        city: "New York",
        country: "USA"
    }
};
const showProfile = (user) => {
    console.log(`${user.name} is ${user.age} years old and lives in ${user.address.city}, ${user.address.country}`);
};
showProfile(profile);
export {};
//# sourceMappingURL=main.js.map