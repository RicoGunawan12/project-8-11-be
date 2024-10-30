## User Route

#### POST
```http
/api/users/login
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**.|
| `password`      | `string` | **Required**.|

Return message and token

Return Ex:

[
  Message: "Login Success!",
  Token
]


#### GET
```http
/api/users
```
User: {
  userId,
  username,
  email,
  password,
  role
}

Return all Users

Return Ex:

[
  User1,
  User2,
  ...
]

