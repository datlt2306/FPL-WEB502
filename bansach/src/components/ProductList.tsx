import { Table } from "antd";
import Title from "antd/es/typography/Title";

const ProductList = () => {
    const data = [
        {
            key: "1",
            name: "Mike",
            age: 32,
            address: "10 Downing Street",
        },
        {
            key: "2",
            name: "John",
            age: 42,
            address: "10 Downing Street",
        },
        {
            key: "3",
            name: "Anna",
            age: 28,
            address: "123 Lê Lợi, Quận 1",
        },
        {
            key: "4",
            name: "Bình",
            age: 35,
            address: "456 Nguyễn Huệ, Quận 1",
        },
        {
            key: "5",
            name: "Cường",
            age: 24,
            address: "789 Trần Hưng Đạo, Quận 5",
        },
        {
            key: "6",
            name: "Dương",
            age: 30,
            address: "321 Hai Bà Trưng, Quận 3",
        },
        {
            key: "7",
            name: "Hà",
            age: 27,
            address: "654 Lý Tự Trọng, Quận 1",
        },
        {
            key: "8",
            name: "Khánh",
            age: 40,
            address: "987 Phạm Ngũ Lão, Quận 1",
        },
        {
            key: "9",
            name: "Lan",
            age: 22,
            address: "159 Nguyễn Thị Minh Khai, Quận 3",
        },
        {
            key: "10",
            name: "Minh",
            age: 38,
            address: "753 Võ Văn Tần, Quận 3",
        },
        {
            key: "11",
            name: "Ngọc",
            age: 26,
            address: "852 Điện Biên Phủ, Quận Bình Thạnh",
        },
    ];
    return (
        <div>
            <Title level={2}>Danh sách sách</Title>
            <Table dataSource={data}>
                <Table.Column title="Tên sách" dataIndex="name" key="name" />
                <Table.Column title="Tuổi" dataIndex="age" key="age" />
                <Table.Column title="Địa chỉ" dataIndex="address" key="address" />
            </Table>
        </div>
    );
};

export default ProductList;
