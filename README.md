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
| `id`      | `string` | **Required**. User id|

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
| `Bearer Token` | `string` | **Required**. Admin token |

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
| `id`      | `string` | **Required**. Category Id|

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `category`      | `string` | **Required**.|

| Auth           | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `Bearer Token` | `string` | **Required**. Admin token |

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
| `id`      | `string` | **Required**. Category Id|

| Auth           | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `Bearer Token` | `string` | **Required**. Admin token |

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
| `Bearer Token` | `string` | **Required**. Admin token |



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

### Get All Product (GET)
```http
/api/products
```

Product Model

Return all products

Return Ex:

[

    {
        "productId": "a62b06d3-ac8c-49f7-bf46-9ad33aee90a5",
        "productName": "test123",
        "productDescription": "",
        "product_category": {
            "productCategoryName": "xzczxc"
        },
        "product_variants": [
            {
                "productVariantId": "855e71a4-faed-4cde-9501-6294b0d3232d",
                "sku": "asads",
                "productPrice": 1000,
                "productStock": 50,
                "productImage": "/assets/test123/1730216714559-test123.png"
            },
            {
                "productVariantId": "8a575132-806e-46ab-893f-c79576e1822c",
                "sku": "asads",
                "productPrice": 1200,
                "productStock": 30,
                "productImage": "/assets/test123/1730216714558-test123.png"
            },
            {
                "productVariantId": "a7fc22d9-9366-4cc6-ac85-c3313eb88083",
                "sku": "asads",
                "productPrice": 1200,
                "productStock": 30,
                "productImage": "/assets/test123/1730216714556-test123.png"
            }
        ]
    },
    ...
    
]


### Get Product By ID (GET)
```http
/api/products/:id
```
| Parameter      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Product Id|

Return product by ID

Return Ex:

[

    {
        "productId": "a62b06d3-ac8c-49f7-bf46-9ad33aee90a5",
        "productName": "test123",
        "productDescription": "",
        "product_category": {
            "productCategoryName": "xzczxc"
        },
        "product_variants": [
            {
                "productVariantId": "855e71a4-faed-4cde-9501-6294b0d3232d",
                "sku": "asads",
                "productPrice": 1000,
                "productStock": 50,
                "productImage": "/assets/test123/1730216714559-test123.png"
            },
            {
                "productVariantId": "8a575132-806e-46ab-893f-c79576e1822c",
                "sku": "asads",
                "productPrice": 1200,
                "productStock": 30,
                "productImage": "/assets/test123/1730216714558-test123.png"
            },
            {
                "productVariantId": "a7fc22d9-9366-4cc6-ac85-c3313eb88083",
                "sku": "asads",
                "productPrice": 1200,
                "productStock": 30,
                "productImage": "/assets/test123/1730216714556-test123.png"
            }
        ]
    },
    ...
    
]


### Delete Product (DELETE)
```http
/api/products/:id
```

| Parameter      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Product Id|

| Auth           | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `Bearer Token` | `string` | **Required**. Admin token |

Return success message and deleted product

Return Ex:

[
  
    message,
    
    deletedProduct: {
    
        "productId": "a62b06d3-ac8c-49f7-bf46-9ad33aee90a5",
        "productName": "test123",
        "productDescription": "",
    
    }
  
]


## Cart Route


### Create Cart Item (POST)
```http
/api/carts
```

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `productVariantId`      | `string` | **Required**.|
| `quantity`      | `int` | **Required**.|

| Auth           | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `Bearer Token` | `string` | **Required**. User token |

Return success message and deleted product

Return Ex:

[
  
    message,
    
    cartItem: {

        cartItemId,
        cartId,
        productVariantId,
        quantity,
    
    }
  
]


### Get Cart Item (GET)
```http
/api/carts
```

| Auth           | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `Bearer Token` | `string` | **Required**. User token |

Return all the cart item in user (get user from the bearer token)

Return Ex:

[

    {
        "cartItemId": "b8fead0e-1ee7-4671-a0a2-dc126fb7a025",
        "productVariantId": "855e71a4-faed-4cde-9501-6294b0d3232d",
        "product_variant": {
            "productVariantId": "855e71a4-faed-4cde-9501-6294b0d3232d",
            "productId": "a62b06d3-ac8c-49f7-bf46-9ad33aee90a5",
            "productColor": "Red",
            "productSize": null,
            "sku": "asads",
            "productImage": "/assets/test123/1730216714559-test123.png",
            "productPrice": 1000,
            "productWeight": 2.5,
            "productStock": 50,
            "productPromo": 0,
            "productPromoExpiry": null,
            "ref_product_id": "a62b06d3-ac8c-49f7-bf46-9ad33aee90a5"
        }
    },
    ...
    
]



### Remove Product from Cart (DELETE)
```http
/api/carts/:id
```

| Parameter      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Cart item Id|

| Auth           | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `Bearer Token` | `string` | **Required**. User token |

Return success message

Return Ex:

[
  
    message,
    
    deletedProduct: {
    
        "productId": "a62b06d3-ac8c-49f7-bf46-9ad33aee90a5",
        "productName": "test123",
        "productDescription": "",
    
    }
  
]


### Update Product in Cart (PUT)
```http
/api/carts/:id
```

| Parameter      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Cart item Id|


| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `quantity`      | `int` | **Required**.|

| Auth           | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `Bearer Token` | `string` | **Required**. User token |

Return success message

Return Ex:

[
  
    message
  
]




## Transaction Route


### Get All Transactions (GET)
```http
/api/transactions
```

| Auth           | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `Bearer Token` | `string` | **Required**. Admin token |

Return success message

Return Ex:

[
  
    message,
    transactions
  
]


### Get Transactions By User (GET)
```http
/api/transactions/user
```

| Auth           | Type     | Description                       |
| :------------- | :------- | :-------------------------------- |
| `Bearer Token` | `string` | **Required**. User token |

Return success message

Return Ex:

[
  
    message,
    transactions
  
]
