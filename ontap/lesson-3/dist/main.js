function sum(a, b) {
    console.log(a + b);
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
function login(username, password) {
    if (username !== 'admin' && password !== '123456') {
        return { success: false, error: 'Sai mật khẩu hoặc username' };
    }
    return { success: true, userId: 1 };
}
login("admin", "123456");
const fetchProduct = async () => {
    const response = await fetch('http://localhost:3000/products');
    const data = await response.json();
    return data;
};
fetchProduct();
const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
];
const showProducts = (data) => {
};
showProducts(products);
export {};
//# sourceMappingURL=main.js.map