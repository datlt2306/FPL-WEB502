function sum(a: number, b: number): void {
    console.log(a + b);
}
const result = sum(10, 20);

console.log(result);

const add = (a: number, b: number): number => {
    return a + b;
}
const result2 = add(10, 20);

console.log(result2);
/* ======== Ví dụ ========= */
// Định nghĩa type
interface TProfile {
    name: string;
    age: number;
    address: {
        city: string;
        country: string;
    }
}
const profile: TProfile = {
    name: "John",
    age: 38,
    address: {
        city: "New York",
        country: "USA"
    }
}

/* ======== Ví dụ ========= */
type TUser = {
    name: string;
    age: number;
    address: {
        city: string;
        country: string;
    }
}
const showProfile = (user: TUser) => {
    console.log(`${user.name} is ${user.age} years old and lives in ${user.address.city}, ${user.address.country}`);
}
showProfile(profile);

/* ======== Ví dụ ========= */
// Định nghĩa type
type LoginResult =
    // Sử dụng union
    { success: boolean; error: string }
    | { success: boolean; userId: number; }

function login(username: string, password: string): LoginResult {
    if (username !== 'admin' && password !== '123456') {
        return { success: false, error: 'Sai mật khẩu hoặc username' }
    }
    return { success: true, userId: 1 }
}

login("admin", "123456");

type TProduct = {
    id: number
    name: string,
    price: number
}
/* ======== Ví dụ ========= */
type ApiResponse<T> = {
    ok: true; data: T
} | {
    ok: false, error: string
}

const fetchProduct = async (): Promise<ApiResponse<TProduct[]>> => {
    const response = await fetch('http://localhost:3000/products')
    const data = await response.json();
    return data;
}
fetchProduct();


/* ======== Ví dụ ========= */

interface IProduct {
    id: number,
    name: string,
    price: number
}
const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
];
const showProducts = (data: IProduct[]) => {
}
showProducts(products);