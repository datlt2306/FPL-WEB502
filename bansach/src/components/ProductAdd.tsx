import { Button, Form, InputNumber } from "antd";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import type { IProduct } from "../interfaces/IProduct";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { add } from "../services/products.services";

const ProductAdd = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: async (product: IProduct) => await add(product),
        // nếu xóa thành công
        onSuccess: () => {
            // gọi lại API để lấy dữ liệu mới nhất
            queryClient.invalidateQueries({
                queryKey: ["BOOKS"],
            });
        },
    });
    const onFinish = (values: IProduct) => {
        mutate(values);
    };
    return (
        <div>
            <Title level={2}>Thêm sách</Title>

            <Form
                name="form"
                onFinish={onFinish}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
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
                        Thêm sách
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductAdd;
