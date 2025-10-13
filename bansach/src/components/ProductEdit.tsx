import { Button, Form, InputNumber, Skeleton } from "antd";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useParams } from "react-router-dom";
import { useOne } from "../hooks/useOne";
import { useUpdate } from "../hooks/useUpdate";
import type { IProduct } from "../interfaces/IProduct";

const ProductEdit = () => {
    const { id } = useParams();
    // const router = useNavigate();
    const { data, isLoading, error } = useOne({ resource: "books", id: id! });
    const { mutate } = useUpdate({ resource: "books", id: id! });
    const onFinish = (values: IProduct) => {
        mutate(values);
    };
    if (error) return <div>Error: {error.message}</div>;
    return (
        <div>
            <Title level={2}>Cập nhật sách</Title>
            <Skeleton style={{ width: 600 }} loading={isLoading}>
                <Form
                    name="form"
                    onFinish={onFinish}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={data}
                >
                    <Form.Item
                        label="Tên sách"
                        name="tenSach"
                        rules={[
                            {
                                required: true,
                                message: "Tên sách không được để trống",
                            },
                            {
                                min: 3,
                                message: "Tên sách phải có ít nhất 3 ký tự",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="moTa">
                        <TextArea rows={10} />
                    </Form.Item>
                    <Form.Item label="Năm xuất bản" name="namXuatBan">
                        <InputNumber />
                    </Form.Item>
                    <Form.Item label="Nhà xuất bản" name="nhaXuatBan">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tác giả" name="tacGia">
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Cập nhật sách
                        </Button>
                    </Form.Item>
                </Form>
            </Skeleton>
        </div>
    );
};

export default ProductEdit;

/**
 * Bước 1: Tạo component ProductEdit
 * Bước 2: Tạo route để truy cập vào component ProductEdit
 * Bước 3: Tạo form để cập nhật sách
 * Bước 4: Lấy ID trên url
 * Bước 5: Call API để lấy dữ liệu sách theo ID
 * Bước 6: Fill dữ liệu vào form
 * Bước 7: Xử lý khi người dùng nhấn nút submit
 * Bước 8: Redirect về trang ProductList nếu thành công
 *
 */
