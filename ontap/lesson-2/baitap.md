# Bài tập TypeScript cơ bản (Array • Object • Tuple • Union) 

## Bài 1 — Array (Danh sách)

**Đề bài**

1. Khai báo một mảng `students` chứa tên sinh viên.

-   Mỗi phần tử là `string`.
-   Ví dụ dữ liệu: `['Kiên', 'Trung', 'Hà']`

2. Viết hàm `printStudents` nhận vào mảng đó và in ra từng tên (mỗi tên một dòng).

**Khung code gợi ý**

```ts
const students: string[] = ["Kiên", "Trung", "Hà"];

function printStudents(list: string[]) {
    // TODO
}

printStudents(students);
```

**Yêu cầu**

-   Không dùng `any`.
-   Hàm nhận đúng type `string[]`.

---

## Bài 2 — Object (Thực thể)

**Đề bài**

1. Tạo `type User` gồm:

-   `id`: number
-   `name`: string
-   `isActive`: boolean

2. Tạo biến `user` theo `User`.

3. Viết hàm `printUser(user: User)` in ra đúng định dạng:

> Kiên (ID: 1) – Active

-   Nếu `isActive` là `false` thì in: `Inactive`.

**Khung code gợi ý**

```ts
type User = {
    id: number;
    name: string;
    isActive: boolean;
};

const user: User = {
    id: 1,
    name: "Kiên",
    isActive: true,
};

function printUser(u: User) {
    // TODO
}

printUser(user);
```

**Yêu cầu**

-   Không dùng `any`.
-   Dùng đúng type `User`.

---

## Bài 3 — Tuple + Union (Kết quả API)

**Bối cảnh**
API trả về kết quả theo dạng mảng 2 phần tử, ví dụ:

-   `[true, 'Login success']`
-   `[false, 'Wrong password']`

### Phần A — Tuple cơ bản

1. Tạo type `ApiResult` cho cấu trúc trên.
2. Viết hàm `handleResult(result: ApiResult)` in ra message.

-   Nếu `result[0] === true` thì in thêm: `✅ ` trước message.
-   Nếu `false` thì in thêm: `❌ ` trước message.

**Khung code gợi ý**

```ts
type ApiResult = [boolean, string];

function handleResult(result: ApiResult) {
    // TODO
}

handleResult([true, "Login success"]);
handleResult([false, "Wrong password"]);
```

### Phần B — Union để “khóa” trạng thái (nâng cao nhẹ)

Thay `boolean` bằng union của string literal:

-   `Status = 'success' | 'error'`

1. Tạo lại type `ApiResult` theo dạng `[Status, string]`.
2. Cập nhật `handleResult` để check `'success' | 'error'`.

**Khung code gợi ý**

```ts
type Status = "success" | "error";

type ApiResult2 = [Status, string];

function handleResult2(result: ApiResult2) {
    // TODO
}

handleResult2(["success", "Login success"]);
handleResult2(["error", "Wrong password"]);
```

---

## Gợi ý chấm nhanh (dành cho giảng viên)

-   **Array**: hiểu `string[]` là danh sách cùng type.
-   **Object**: hiểu `type` mô tả cấu trúc thực thể.
-   **Tuple**: đúng **số lượng + thứ tự + type theo vị trí**.
-   **Union**: giới hạn giá trị hợp lệ (vd: `'success' | 'error'`).

## Bonus (tùy chọn)

-   Bắt lỗi compile khi truyền sai tuple (thiếu phần tử / sai thứ tự).
-   Bắt lỗi compile khi truyền sai union (vd: `'pending'`).
