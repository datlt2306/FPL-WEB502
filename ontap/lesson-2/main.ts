const myChildren: string[] = ['Kiên', 'Trung'];

const myName: string | number = 10
// data type string
// generic array
const myProfile: {
    name: string;
    age: number;
    address: string
} = {
    name: 'Lê Trọng Đạt',
    age: 39,
    address: "Thái Bình",
}
console.log(myChildren, myProfile);


const products = [
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
    { id: 3, name: "Product 3", price: 300 },
]

function deleteProduct(id: number | string) {
    console.log(typeof id);
}