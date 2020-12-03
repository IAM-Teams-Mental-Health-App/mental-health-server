# mental-health-server

## hosted server - tba

### Entities

USER

```js
id: autoincrementing;
email: string;
username: string;
password: string;
dateCreated: timestamp / date;
```

Posts

```js
id: autoincrementing
dateCreated: timestamp/date
type: string
color: string
content: string
userID: number [ref: User.id]
```

## Endpoints
