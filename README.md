## User Route


#### Register User (POST)
```http
/api/users/register
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**.|
| `email`      | `string` | **Required**.|
| `password`      | `string` | **Required**.|

Return success message and username

Return Ex:

[
  message: "Register Success!",
  user
]



#### Login User (POST)
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
  message: "Login Success!",
  Token
]


#### Get All User (GET)
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



#### Get User By Id (GET)
```http
/api/users/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**.|

User: {
  userId,
  username,
  email,
  password,
  role
}

Return User

Return Ex:

[
  User
]



## Product Category Route

#### Create Category (POST)
```http
/api/categories
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`      | `string` | **Required**.|

| Auth           | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `Bearer Token` | `string` | **Required**.|

Return success message

Return Ex:

[
  message
]


#### Get All Category (GET)
```http
/api/categories
```

Category: {
  productCategoryId,
  productCategoryName
}

Return all categories

Return Ex:

[
  Category 1,
  Category 2,
  ...
]


#### Update Category (PUT)
```http
/api/categories/:id
```

| Parameter      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**.|

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`      | `string` | **Required**.|

| Auth           | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `Bearer Token` | `string` | **Required**.|

Return success message

Return Ex:

[
  message
]


#### Delete Category (DELETE)
```http
/api/categories/:id
```

| Parameter      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**.|

| Auth           | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `Bearer Token` | `string` | **Required**.|

Return success message

Return Ex:

[
  message
]
