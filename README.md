#### User Route

```http
POST\n
/api/users/login
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**.|
| `password`      | `string` | **Required**.|

Return message and token

Return Ex:


[
  Message: "Login Success!",\n
  Token
]


```http
GET\n
/api/users
```
User: {\n
  userId,\n
  username,\n
  email,\n
  password,\n
  role\n
}

Return all Users

Return Ex:


[
  User1,\n
  User2,\n
  ...
]

