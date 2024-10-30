#### Get all books

```http
/api/user/login
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `usize` | **Required**.|
| `password`      | `usize` | **Required**.|

Return array of books

Return Ex:


[
  Message: "Login Success!",
  Token
]
