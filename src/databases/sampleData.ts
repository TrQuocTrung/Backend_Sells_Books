export const ADMIN_ROLE = "SUPER_ADMIN";
export const USER_ROLE = "NORMAL_USER";
export const INIT_PERMISSIONS = [
    {
        "_id": "682edf2ac4c218a511e5ccc4",
        "name": "Create new Book",
        "apiPath": "/api/v1/books",
        "method": "POST",
        "module": "BOOK",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:24:10.173Z",
        "updatedAt": "2025-05-22T08:24:10.173Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682edf31c4c218a511e5ccc9",
        "name": "Upload Book Image",
        "apiPath": "/api/v1/books/:bookId/upload-image",
        "method": "POST",
        "module": "BOOK",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:24:17.573Z",
        "updatedAt": "2025-05-22T08:24:17.573Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682edf39c4c218a511e5ccce",
        "name": "Get all Books",
        "apiPath": "/api/v1/books",
        "method": "GET",
        "module": "BOOK",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:24:25.356Z",
        "updatedAt": "2025-05-22T08:24:25.356Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682edf3fc4c218a511e5ccd3",
        "name": "Get Book by ID",
        "apiPath": "/api/v1/books/:id",
        "method": "GET",
        "module": "BOOK",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:24:31.444Z",
        "updatedAt": "2025-05-22T08:24:31.444Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682edf45c4c218a511e5ccd8",
        "name": "Update Book",
        "apiPath": "/api/v1/books/:id",
        "method": "PATCH",
        "module": "BOOK",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:24:37.926Z",
        "updatedAt": "2025-05-22T08:24:37.926Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682edf4ac4c218a511e5ccdd",
        "name": "Delete Book",
        "apiPath": "/api/v1/books/:id",
        "method": "DELETE",
        "module": "BOOK",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:24:42.772Z",
        "updatedAt": "2025-05-22T08:24:42.772Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682edfcec4c218a511e5cce2",
        "name": "Create New Category",
        "apiPath": "/api/v1/category",
        "method": "POST",
        "module": "CATEGORY",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:26:54.212Z",
        "updatedAt": "2025-05-22T08:26:54.212Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682edfd6c4c218a511e5cce7",
        "name": "Fetch all category",
        "apiPath": "/api/v1/category",
        "method": "GET",
        "module": "CATEGORY",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:27:02.837Z",
        "updatedAt": "2025-05-22T08:27:02.837Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682edfdec4c218a511e5ccec",
        "name": "Fetch category by id",
        "apiPath": "/api/v1/category/:id",
        "method": "GET",
        "module": "CATEGORY",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:27:10.079Z",
        "updatedAt": "2025-05-22T08:27:10.079Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682edfe8c4c218a511e5ccf1",
        "name": "Update Category",
        "apiPath": "/api/v1/category/:id",
        "method": "PATCH",
        "module": "CATEGORY",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:27:20.575Z",
        "updatedAt": "2025-05-22T08:27:20.575Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682edff2c4c218a511e5ccf6",
        "name": "Delete Category",
        "apiPath": "/api/v1/category/:id",
        "method": "DELETE",
        "module": "CATEGORY",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:27:30.645Z",
        "updatedAt": "2025-05-22T08:27:30.645Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee08fc4c218a511e5ccfb",
        "name": "Create New Order",
        "apiPath": "/api/v1/order",
        "method": "POST",
        "module": "ORDER",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:30:07.440Z",
        "updatedAt": "2025-05-22T08:30:07.440Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee096c4c218a511e5cd00",
        "name": "Get All Orders",
        "apiPath": "/api/v1/order",
        "method": "GET",
        "module": "ORDER",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:30:14.412Z",
        "updatedAt": "2025-05-22T08:30:14.412Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee0a0c4c218a511e5cd05",
        "name": "Get Order by ID",
        "apiPath": "/api/v1/order/:id",
        "method": "GET",
        "module": "ORDER",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:30:24.094Z",
        "updatedAt": "2025-05-22T08:30:24.094Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee0a6c4c218a511e5cd0a",
        "name": "Update Order",
        "apiPath": "/api/v1/order/:id",
        "method": "PATCH",
        "module": "ORDER",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:30:30.228Z",
        "updatedAt": "2025-05-22T08:30:30.228Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee0acc4c218a511e5cd0f",
        "name": "Delete Order",
        "apiPath": "/api/v1/order/:id",
        "method": "DELETE",
        "module": "ORDER",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:30:36.125Z",
        "updatedAt": "2025-05-22T08:30:36.125Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee0b1c4c218a511e5cd14",
        "name": "Update Order Items",
        "apiPath": "/api/v1/order/:id/items",
        "method": "PATCH",
        "module": "ORDER",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:30:41.993Z",
        "updatedAt": "2025-05-22T08:30:41.993Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee0b7c4c218a511e5cd19",
        "name": "Update Order Status",
        "apiPath": "/api/v1/order/:id/status",
        "method": "PATCH",
        "module": "ORDER",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:30:47.739Z",
        "updatedAt": "2025-05-22T08:30:47.739Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee0bcc4c218a511e5cd1e",
        "name": "Get Current User Orders",
        "apiPath": "/api/v1/order/my-orders",
        "method": "GET",
        "module": "ORDER",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:30:52.525Z",
        "updatedAt": "2025-05-22T08:30:52.525Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee0ddc4c218a511e5cd23",
        "name": "Create a new permission",
        "apiPath": "/api/v1/permission",
        "method": "POST",
        "module": "PERMISSION",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:31:25.380Z",
        "updatedAt": "2025-05-22T08:31:25.380Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee0e3c4c218a511e5cd28",
        "name": "Fetch permissions with paginate",
        "apiPath": "/api/v1/permission",
        "method": "GET",
        "module": "PERMISSION",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:31:31.197Z",
        "updatedAt": "2025-05-22T08:31:31.197Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee0ecc4c218a511e5cd2d",
        "name": "Fetch a permission by id",
        "apiPath": "/api/v1/permission/:id",
        "method": "GET",
        "module": "PERMISSION",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:31:40.162Z",
        "updatedAt": "2025-05-22T08:31:40.162Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee0f1c4c218a511e5cd32",
        "name": "Update a permission",
        "apiPath": "/api/v1/permission/:id",
        "method": "PATCH",
        "module": "PERMISSION",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:31:45.900Z",
        "updatedAt": "2025-05-22T08:31:45.900Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee0f8c4c218a511e5cd37",
        "name": "Delete a permission",
        "apiPath": "/api/v1/permission/:id",
        "method": "DELETE",
        "module": "PERMISSION",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:31:52.061Z",
        "updatedAt": "2025-05-22T08:31:52.061Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee24d68944084c3df31c2",
        "name": "Create Review For Each Book",
        "apiPath": "/api/v1/review/book/:bookId",
        "method": "POST",
        "module": "REVIEW",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:37:33.821Z",
        "updatedAt": "2025-05-22T08:37:33.821Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee25768944084c3df31c7",
        "name": "Get All Reviews (with paginate)",
        "apiPath": "/api/v1/review",
        "method": "GET",
        "module": "REVIEW",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:37:43.380Z",
        "updatedAt": "2025-05-22T08:37:43.380Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee26e68944084c3df31cc",
        "name": "Get Review by ID ",
        "apiPath": "/api/v1/review/:id",
        "method": "GET",
        "module": "REVIEW",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:38:06.013Z",
        "updatedAt": "2025-05-22T08:38:06.013Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee27968944084c3df31d1",
        "name": "Get Reviews by Book ID",
        "apiPath": "/api/v1/review/book/:bookId",
        "method": "GET",
        "module": "REVIEW",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:38:17.915Z",
        "updatedAt": "2025-05-22T08:38:17.915Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee28568944084c3df31d6",
        "name": "Update Review",
        "apiPath": "/api/v1/review/:id",
        "method": "PATCH",
        "module": "REVIEW",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:38:29.289Z",
        "updatedAt": "2025-05-22T08:38:29.289Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee28968944084c3df31db",
        "name": "Delete Review",
        "apiPath": "/api/v1/review/:id",
        "method": "DELETE",
        "module": "REVIEW",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:38:33.823Z",
        "updatedAt": "2025-05-22T08:38:33.823Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee2b268944084c3df31e0",
        "name": "Create a new role",
        "apiPath": "/api/v1/role",
        "method": "POST",
        "module": "ROLE",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:39:14.482Z",
        "updatedAt": "2025-05-22T08:39:14.482Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee2b968944084c3df31e5",
        "name": "Fetch roles with paginate",
        "apiPath": "/api/v1/role",
        "method": "GET",
        "module": "ROLE",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:39:21.172Z",
        "updatedAt": "2025-05-22T08:39:21.172Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee2be68944084c3df31ea",
        "name": "Fetch a role by id",
        "apiPath": "/api/v1/role/:id",
        "method": "GET",
        "module": "ROLE",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:39:26.224Z",
        "updatedAt": "2025-05-22T08:39:26.224Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee2c368944084c3df31ef",
        "name": "Update a role",
        "apiPath": "/api/v1/role/:id",
        "method": "PATCH",
        "module": "ROLE",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:39:31.720Z",
        "updatedAt": "2025-05-22T08:39:31.720Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee2c968944084c3df31f4",
        "name": "Delete a role",
        "apiPath": "/api/v1/role/:id",
        "method": "DELETE",
        "module": "ROLE",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:39:37.290Z",
        "updatedAt": "2025-05-22T08:39:37.290Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee30e68944084c3df31f9",
        "name": "Create a new User",
        "apiPath": "/api/v1/users",
        "method": "POST",
        "module": "USER",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:40:46.632Z",
        "updatedAt": "2025-05-22T08:40:46.632Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee31868944084c3df31fe",
        "name": "Fetch user with paginate",
        "apiPath": "/api/v1/users",
        "method": "GET",
        "module": "USER",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:40:56.000Z",
        "updatedAt": "2025-05-22T08:40:56.000Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee31c68944084c3df3203",
        "name": "Fetch user by id",
        "apiPath": "/api/v1/users/:id",
        "method": "GET",
        "module": "USER",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:41:00.806Z",
        "updatedAt": "2025-05-22T08:41:00.806Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee32168944084c3df3208",
        "name": "Update a User",
        "apiPath": "/api/v1/users/:id",
        "method": "PATCH",
        "module": "USER",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:41:05.397Z",
        "updatedAt": "2025-05-22T08:41:05.397Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "682ee32768944084c3df320d",
        "name": "Delete a User",
        "apiPath": "/api/v1/users/:id",
        "method": "DELETE",
        "module": "USER",
        "createdBy": {
            "_id": "682ed77042d5d4b50c2b8d9b",
            "email": "admin@gmail.com"
        },
        "createdAt": "2025-05-22T08:41:11.403Z",
        "updatedAt": "2025-05-22T08:41:11.403Z",
        "isDeleted": false,
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": "68386e9389a3407de75ddaf2",
        "name": "Checkout order",
        "apiPath": "/api/v1/checkout-vnpay/create-vnpay-url",
        "method": "GET",
        "module": "CHECKOUT",
        "createdBy": {
            "_id": "682eee6c9effb851a117b62f",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-29T14:26:27.056Z",
        "updatedAt": "2025-05-29T14:26:27.056Z",
        "__v": 0
    }
]