## User Route


### Register User (POST)
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



### Login User (POST)
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


### Get All User (GET)
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



### Get User By Id (GET)
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

### Create Category (POST)
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


### Get All Category (GET)
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


### Update Category (PUT)
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


### Delete Category (DELETE)
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

## Product Route


### Create Product (POST)
```http
/api/products
```

#### Request Body (Get Request Body Using Form Data)
| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productName`      | `string` | **Required**.|
| `productDescription`      | `string` | **Optional**.|
| `productCategoryName`      | `string` | **Required**.|
| `productVariants`      | `array of Variant` | **Required**. Parse the json to string and insert to form data|
| `productImage`      | `array of image files` | **Required**. Change the product image name to `productName - productSize - productColor`|


#### Variant Model

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productColor`      | `string` | **Optional**.|
| `productSize`      | `string` | **Optional**.|
| `sku`      | `string` | **Optional**.|
| `productPrice`      | `float` | **Required**.|
| `productWeight`      | `float` | **Required**.|
| `productStock`      | `int` | **Required**.|

#### Authorization
| Auth           | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `Bearer Token` | `string` | **Required**.|



Request Body Example:

{

    productName: "test",
    productDescription: "",
    productCategoryName: "test",
    productVariants: [

        {
            productColor: "Red",
            productSize: "Big",
            productPrice: 5.5,
            productWeight: 1.2,
            productStock: 23
        },
        {
            productColor: "White",
            productSize: "Big",
            productPrice: 5.5,
            productWeight: 1.2,
            productStock: 23
        },
        {
            productColor: "Red",
            productSize: "Small",
            productPrice: 5.5,
            productWeight: 1.2,
            productStock: 23
        }{
            productColor: "White",
            productSize: "Small",
            productPrice: 5.5,
            productWeight: 1.2,
            productStock: 23
        }
    
    ]
    
}


Return success message and Product

Return Ex:

[

    message,
    product: {
  
        productName,
        productDescription,
        productCategoryName
    
    }
  
]
