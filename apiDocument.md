# Mô tả API

## Format response trả về có dạng:

```
{
    success: true/false,
    data: {},
    error: {
        message: ''
    }
}
```

- success: true nếu request gửi lên đúng, không có lỗi với dữ liệu; false nếu có lỗi với dữ liệu (ví dụ: không tồn tại user)

- data: lưu dữ liệu trả về

- error: lưu message nếu success = false

## Các API cần xây dựng

### POST /api/auth

- request:
    
    - username: string

    - password: string
    
- response.data:
    
    - token: string

    - type: string nhận các giá trị: student, lecturer, partner, admin
        
        