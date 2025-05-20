export const ADMIN_ROLE = "SUPER_ADMIN";
export const USER_ROLE = "NORMAL_USER";
export const INIT_PERMISSIONS = [
    {
        "_id": "682ca4265d2d09a892bee569",
        "name": "Create User",
        "apiPath": "api/v1/users",
        "method": "POST",
        "module": "USER",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:47:50.964Z",
        "updatedAt": "2025-05-20T15:47:50.964Z",
        "__v": 0
    },
    {
        "_id": "682ca42c5d2d09a892bee56c",
        "name": "Get All Users",
        "apiPath": "api/v1/users",
        "method": "GET",
        "module": "USER",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": "2025-05-20T15:53:25.613Z",
        "createdAt": "2025-05-20T15:47:56.690Z",
        "updatedAt": "2025-05-20T15:53:25.613Z",
        "__v": 0,
        "deletedBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        }
    },
    {
        "_id": "682ca4325d2d09a892bee56f",
        "name": "Get One User",
        "apiPath": "api/v1/users/:id",
        "method": "GET",
        "module": "USER",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:48:02.015Z",
        "updatedAt": "2025-05-20T15:48:02.015Z",
        "__v": 0
    },
    {
        "_id": "682ca4375d2d09a892bee572",
        "name": "Update User",
        "apiPath": "api/v1/users/:id",
        "method": "PATCH",
        "module": "USER",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:48:07.679Z",
        "updatedAt": "2025-05-20T15:48:07.679Z",
        "__v": 0
    },
    {
        "_id": "682ca43c5d2d09a892bee575",
        "name": "Delete User",
        "apiPath": "api/v1/users/:id",
        "method": "DELETE",
        "module": "USER",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:48:12.672Z",
        "updatedAt": "2025-05-20T15:48:12.672Z",
        "__v": 0
    },
    {
        "_id": "682ca4425d2d09a892bee578",
        "name": "Create Book",
        "apiPath": "api/v1/books",
        "method": "POST",
        "module": "BOOK",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:48:18.193Z",
        "updatedAt": "2025-05-20T15:48:18.193Z",
        "__v": 0
    },
    {
        "_id": "682ca4475d2d09a892bee57b",
        "name": "Get All Books",
        "apiPath": "api/v1/books",
        "method": "GET",
        "module": "BOOK",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:48:23.408Z",
        "updatedAt": "2025-05-20T15:48:23.408Z",
        "__v": 0
    },
    {
        "_id": "682ca44c5d2d09a892bee57e",
        "name": "Get One Book",
        "apiPath": "api/v1/books/:id",
        "method": "GET",
        "module": "BOOK",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:48:28.819Z",
        "updatedAt": "2025-05-20T15:48:28.819Z",
        "__v": 0
    },
    {
        "_id": "682ca4555d2d09a892bee581",
        "name": "Update Book",
        "apiPath": "api/v1/books/:id",
        "method": "PATCH",
        "module": "BOOK",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:48:37.944Z",
        "updatedAt": "2025-05-20T15:48:37.944Z",
        "__v": 0
    },
    {
        "_id": "682ca45b5d2d09a892bee584",
        "name": "Delete Book",
        "apiPath": "api/v1/books/:id",
        "method": "DELETE",
        "module": "BOOK",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:48:43.378Z",
        "updatedAt": "2025-05-20T15:48:43.378Z",
        "__v": 0
    },
    {
        "_id": "682ca4625d2d09a892bee587",
        "name": "Create Order",
        "apiPath": "api/v1/orders",
        "method": "POST",
        "module": "ORDER",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:48:50.102Z",
        "updatedAt": "2025-05-20T15:48:50.102Z",
        "__v": 0
    },
    {
        "_id": "682ca46d5d2d09a892bee58a",
        "name": "Get All Orders",
        "apiPath": "api/v1/orders",
        "method": "GET",
        "module": "ORDER",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:49:01.191Z",
        "updatedAt": "2025-05-20T15:49:01.191Z",
        "__v": 0
    },
    {
        "_id": "682ca4755d2d09a892bee58d",
        "name": "Get One Order",
        "apiPath": "api/v1/orders/:id",
        "method": "GET",
        "module": "ORDER",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:49:09.930Z",
        "updatedAt": "2025-05-20T15:49:09.930Z",
        "__v": 0
    },
    {
        "_id": "682ca47b5d2d09a892bee590",
        "name": "Update Order",
        "apiPath": "api/v1/orders/:id",
        "method": "PATCH",
        "module": "ORDER",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:49:15.755Z",
        "updatedAt": "2025-05-20T15:49:15.755Z",
        "__v": 0
    },
    {
        "_id": "682ca4805d2d09a892bee593",
        "name": "Delete Order",
        "apiPath": "api/v1/orders/:id",
        "method": "DELETE",
        "module": "ORDER",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:49:20.758Z",
        "updatedAt": "2025-05-20T15:49:20.758Z",
        "__v": 0
    },
    {
        "_id": "682ca4875d2d09a892bee596",
        "name": "Create Cart",
        "apiPath": "api/v1/carts",
        "method": "POST",
        "module": "CART",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:49:27.240Z",
        "updatedAt": "2025-05-20T15:49:27.240Z",
        "__v": 0
    },
    {
        "_id": "682ca48c5d2d09a892bee599",
        "name": "Get All Carts",
        "apiPath": "api/v1/carts",
        "method": "GET",
        "module": "CART",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:49:32.716Z",
        "updatedAt": "2025-05-20T15:49:32.716Z",
        "__v": 0
    },
    {
        "_id": "682ca4915d2d09a892bee59c",
        "name": "Get One Cart",
        "apiPath": "api/v1/carts/:id",
        "method": "GET",
        "module": "CART",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:49:37.117Z",
        "updatedAt": "2025-05-20T15:49:37.117Z",
        "__v": 0
    },
    {
        "_id": "682ca4d45d2d09a892bee59f",
        "name": "Update Cart",
        "apiPath": "api/v1/carts/:id",
        "method": "PATCH",
        "module": "CART",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:50:44.655Z",
        "updatedAt": "2025-05-20T15:50:44.655Z",
        "__v": 0
    },
    {
        "_id": "682ca4da5d2d09a892bee5a2",
        "name": "Delete Cart",
        "apiPath": "api/v1/carts/:id",
        "method": "DELETE",
        "module": "CART",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:50:50.466Z",
        "updatedAt": "2025-05-20T15:50:50.466Z",
        "__v": 0
    },
    {
        "_id": "682ca4e65d2d09a892bee5a5",
        "name": "Create Review",
        "apiPath": "api/v1/reviews",
        "method": "POST",
        "module": "REVIEW",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:51:02.410Z",
        "updatedAt": "2025-05-20T15:51:02.410Z",
        "__v": 0
    },
    {
        "_id": "682ca4ec5d2d09a892bee5a8",
        "name": "Get All Reviews",
        "apiPath": "api/v1/reviews",
        "method": "GET",
        "module": "REVIEW",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:51:08.731Z",
        "updatedAt": "2025-05-20T15:51:08.731Z",
        "__v": 0
    },
    {
        "_id": "682ca4f15d2d09a892bee5ab",
        "name": "Get One Review",
        "apiPath": "api/v1/reviews/:id",
        "method": "GET",
        "module": "REVIEW",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:51:13.329Z",
        "updatedAt": "2025-05-20T15:51:13.329Z",
        "__v": 0
    },
    {
        "_id": "682ca4fb5d2d09a892bee5ae",
        "name": "Update Review",
        "apiPath": "api/v1/reviews/:id",
        "method": "PATCH",
        "module": "REVIEW",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:51:23.104Z",
        "updatedAt": "2025-05-20T15:51:23.104Z",
        "__v": 0
    },
    {
        "_id": "682ca5005d2d09a892bee5b1",
        "name": "Delete Review",
        "apiPath": "api/v1/reviews/:id",
        "method": "DELETE",
        "module": "REVIEW",
        "createdBy": {
            "_id": "682ca2ac5d2d09a892bee543",
            "email": "AdminAccount@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2025-05-20T15:51:28.992Z",
        "updatedAt": "2025-05-20T15:51:28.992Z",
        "__v": 0
    }
]

