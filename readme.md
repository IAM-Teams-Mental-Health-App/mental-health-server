# mental-health-server

## hosted server - tba

### Entities

USER

```js
id: autoincrementing
email: string!
username: string!
password: string!
dateCreated: date
```

Posts

```js
id: autoincrementing
dateCreated: date
type: string!
color: string!
content: string!
userID: number! [ref: User.id]
```

### Endpoints

#### User

| User Action | Method | Route        | Send to Server            | Server Reply     |
| ----------- | :----: | ------------ | ------------------------- | ---------------- |
| User by ID  |  GET   | /user/:id    | ---                       | {...user}        |
| Create User |  POST  | /user        | {username,email,password} | {user,token}     |
| User Login  |  POST  | /user/login  | {email,password}          | {user,token}     |
| User Logout |  POST  | /user/logout | ---                       | {message, token} |

#### Posts

| User Action | METHOD | ROUTE     | SEND TO SERVER       | SERVER REPLY |
| ----------- | ------ | --------- | -------------------- | ------------ |
| Fetch All   | GET    | /post     | ---                  | [ posts ]    |
| Get by ID   | GET    | /post/:id | ---                  | {...post}    |
| Create Post | POST   | /post     | {type,color,content} | {...post}    |
| Delete Post | DELETE | /post/:id | ---                  | { message }  |
