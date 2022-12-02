# TiTi_Backend API

`Node.js` `express` `MySQL` `sequlize`

# .env

### Security

- JWT_SECRET : Password 암호화용

### Configurability

- JWT_EXPIRES_SEC : Token 만료기간
- BCRYPT_SALT_ROUNDS : 암호화용 salt 값

### HOST

- PORT : 포트번호

### DB

- DB_HOST : DB 호스트
- DB_USER
- DB_DATABASE : 데이터베이스명
- DB_PASSWORD : 데이터베이스 비밀번호

# Status code

### 200

- 200 : ok
- 201 : create
- 204 : no content (delete)

### 400

- 400 : client error
- 401 : unauthorized
- 404 : not found
- 409 : conflict

### 500

- 500 : server error

# Error

```json
400 : { error: `Invalid ${errors.array()[0].param}` }
400 : { error: `${errorIds}` }
401 : { error: "Authentication Error" }
401 : { error: "Invalid Auth" }
404 : { error: "Not Found" }
409 : { error: "user infos must be unique" }
500 : { error: "Internal Server Error" }
```

# Format

### Token

Bearer Token

### JSON Format

Date : iso8601 (00Z)

```json
"2022-11-30T06:53:17Z"
```

### Request size

limit : 50mb

# Schema

![ERD](erd.png "ERD")

### user

```javascript
export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    get() {
      return (
        moment(this.getDataValue("createdAt"))
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss") + "Z"
      );
    },
  },
  updatedAt: {
    type: DataTypes.DATE,
    get() {
      return (
        moment(this.getDataValue("updatedAt"))
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss") + "Z"
      );
    },
  },
});
```

### daily

```javascript
export const Daily = sequelize.define("daily", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  day: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return (
        moment(this.getDataValue("day")).utc().format("YYYY-MM-DDTHH:mm:ss") +
        "Z"
      );
    },
  },
  maxTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  timeline: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  tasks: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  taskHistorys: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  status: {
    // uploaded, edited, created
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    get() {
      return (
        moment(this.getDataValue("createdAt"))
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss") + "Z"
      );
    },
  },
  updatedAt: {
    type: DataTypes.DATE,
    get() {
      return (
        moment(this.getDataValue("updatedAt"))
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss") + "Z"
      );
    },
  },
});
Daily.belongsTo(User);
```

### timeline

```javascript
export const Timeline = sequelize.define("timeline", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  time0: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time3: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time4: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time5: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time6: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time7: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time8: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time9: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time10: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time11: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time12: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time13: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time14: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time15: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time16: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time17: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time18: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time19: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time20: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time21: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time22: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time23: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    get() {
      return (
        moment(this.getDataValue("createdAt"))
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss") + "Z"
      );
    },
  },
  updatedAt: {
    type: DataTypes.DATE,
    get() {
      return (
        moment(this.getDataValue("updatedAt"))
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss") + "Z"
      );
    },
  },
});
Timeline.belongsTo(User);
Timeline.belongsTo(Daily);
```

### task

```javascript
export const Task = sequelize.define("task", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  taskName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taskTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    get() {
      return (
        moment(this.getDataValue("createdAt"))
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss") + "Z"
      );
    },
  },
  updatedAt: {
    type: DataTypes.DATE,
    get() {
      return (
        moment(this.getDataValue("updatedAt"))
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss") + "Z"
      );
    },
  },
});
Task.belongsTo(User);
Task.belongsTo(Daily);
```

# API

## /auth

### POST /auth/signup

<details>
<summary>request</summary>
<pre language="json"><code class="language-json">{
    "username": "minsang",
    "password": "12345",
    "email": "freedeveloper97@gmail.com"
}
</code></pre></details>
<br/>
<details>
<summary>response</summary>
<pre language="json"><code class="language-json">{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5OTYyMTM3LCJleHAiOjE2NzA1NjY5Mzd9.OpNejy6briTyb-ogBNvQ4Dim1xfrUjtuhLDl4YTsEVc",
    "id": 1,
    "username": "minsang",
    "email": "freedeveloper97@gmail.com"
}
</code></pre></details>

### POST /auth/login

<details>
<summary>request</summary>
<pre language="json"><code class="language-json">{
    "username": "minsang",
    "password": "12345"
}
</code></pre></details>
<br/>
<details>
<summary>response</summary>
<pre language="json"><code class="language-json">{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjY5OTYyMzUwLCJleHAiOjE2NzA1NjcxNTB9.oibOGnFiz4tPQxfAaPFzvmUMrhSGx1JXjn9fqS1XDVg",
    "id": 1,
    "username": "minsang",
    "email": "freedeveloper97@gmail.com"
}
</code></pre></details>

## /dailys

### POST /dailys/create (with Token)

<details>
<summary>request</summary>
<pre language="json"><code class="language-json">[
  {
    "timeline" : [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2400,
      2700,
      2460,
      1500,
      2100,
      2400,
      1800,
      3600,
      60,
      2100
    ],
    "maxTime" : 5460,
    "day" : "2021-06-26T15:00:00Z",
    "tasks" : {
      "TiTi Programming" : 17640,
      "TiTi update" : 5460
    },
    "taskHistorys" : {
      "TiTi Programming" : [
        {
          "endDate" : "2021-06-27T05:40:00Z",
          "startDate" : "2021-06-27T05:00:00Z"
        },
        {
          "endDate" : "2021-06-27T06:45:00Z",
          "startDate" : "2021-06-27T06:00:00Z"
        },
        {
          "endDate" : "2021-06-27T07:41:00Z",
          "startDate" : "2021-06-27T07:00:00Z"
        },
        {
          "endDate" : "2021-06-27T08:25:00Z",
          "startDate" : "2021-06-27T08:00:00Z"
        },
        {
          "endDate" : "2021-06-27T09:35:00Z",
          "startDate" : "2021-06-27T09:00:00Z"
        },
        {
          "endDate" : "2021-06-27T10:40:00Z",
          "startDate" : "2021-06-27T10:00:00Z"
        },
        {
          "endDate" : "2021-06-27T13:35:00Z",
          "startDate" : "2021-06-27T13:02:00Z"
        },
        {
          "endDate" : "2021-06-27T14:35:00Z",
          "startDate" : "2021-06-27T14:00:00Z"
        }
      ],
      "TiTi update" : [
        {
          "endDate" : "2021-06-27T13:01:00Z",
          "startDate" : "2021-06-27T11:30:00Z"
        }
      ]
    }
  },
  {
    "timeline" : [
      1369,
      806,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      2905,
      1753,
      885,
      2280,
      0,
      2591,
      0,
      0,
      1901,
      3397,
      2311,
      1849
    ],
    "maxTime" : 4990,
    "day" : "2021-06-29T00:55:04Z",
    "tasks" : {
      "This is CodingTest" : 1476,
      "TiTi Programming" : 10110,
      "Swift Algorithm" : 10458
    }
  }
]
</code></pre></details>
<br/>
<details>
<summary>response</summary>
<pre language="json"><code class="language-json">created (statusCode : 201)
</code></pre></details>

### POST /dailys/upload (with Token)

<details>
<summary>request</summary>
<pre language="json"><code class="language-json">[
    {
        "day": "2021-06-26T15:00:00Z",
        "id": 1,
        "maxTime": 5460,
        "timeline": [
            3600,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            2400,
            2700,
            2460,
            1500,
            2100,
            2400,
            1800,
            3600,
            60,
            2100
        ],
        "tasks": {
            "TiTi update": 5460,
            "TiTi Programming": 20000
        },
        "taskHistorys": {
            "TiTi update": [
                {
                    "endDate": "2021-06-27T13:01:00Z",
                    "startDate": "2021-06-27T11:30:00Z"
                }
            ],
            "TiTi Programming": [
                {
                    "endDate": "2021-06-27T05:40:00Z",
                    "startDate": "2021-06-27T05:00:00Z"
                },
                {
                    "endDate": "2021-06-27T06:45:00Z",
                    "startDate": "2021-06-27T06:00:00Z"
                },
                {
                    "endDate": "2021-06-27T07:41:00Z",
                    "startDate": "2021-06-27T07:00:00Z"
                },
                {
                    "endDate": "2021-06-27T08:25:00Z",
                    "startDate": "2021-06-27T08:00:00Z"
                },
                {
                    "endDate": "2021-06-27T09:35:00Z",
                    "startDate": "2021-06-27T09:00:00Z"
                },
                {
                    "endDate": "2021-06-27T10:40:00Z",
                    "startDate": "2021-06-27T10:00:00Z"
                },
                {
                    "endDate": "2021-06-27T13:35:00Z",
                    "startDate": "2021-06-27T13:02:00Z"
                },
                {
                    "endDate": "2021-06-27T14:35:00Z",
                    "startDate": "2021-06-27T14:00:00Z"
                }
            ]
        },
        "status": "edited",
        "userId": 1
    },
    {
        "day": "2021-07-01T00:55:04Z",
        "maxTime": 4990,
        "timeline": [
            1369,
            806,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            2905,
            1753,
            885,
            2280,
            0,
            2591,
            0,
            0,
            1901,
            3397,
            2311,
            1849
        ],
        "tasks": {
            "Swift Algorithm": 10458,
            "TiTi Programming": 10110,
            "This is CodingTest": 1476
        },
        "taskHistorys": null,
        "status": "created",
        "userId": 1
    }
]
</code></pre></details>
<br/>
<details>
<summary>response</summary>
<pre language="json"><code class="language-json">ok (statusCode : 200)
</code></pre></details>

### GET /dailys (with Token)

<details>
<summary>response</summary>
<pre language="json"><code class="language-json">[
    {
        "day": "2021-06-26T15:00:00Z",
        "createdAt": "2022-12-02T06:28:27Z",
        "updatedAt": "2022-12-02T06:28:27Z",
        "id": 1,
        "maxTime": 5460,
        "timeline": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            2400,
            2700,
            2460,
            1500,
            2100,
            2400,
            1800,
            3600,
            60,
            2100
        ],
        "tasks": {
            "TiTi update": 5460,
            "TiTi Programming": 17640
        },
        "taskHistorys": {
            "TiTi update": [
                {
                    "endDate": "2021-06-27T13:01:00Z",
                    "startDate": "2021-06-27T11:30:00Z"
                }
            ],
            "TiTi Programming": [
                {
                    "endDate": "2021-06-27T05:40:00Z",
                    "startDate": "2021-06-27T05:00:00Z"
                },
                {
                    "endDate": "2021-06-27T06:45:00Z",
                    "startDate": "2021-06-27T06:00:00Z"
                },
                {
                    "endDate": "2021-06-27T07:41:00Z",
                    "startDate": "2021-06-27T07:00:00Z"
                },
                {
                    "endDate": "2021-06-27T08:25:00Z",
                    "startDate": "2021-06-27T08:00:00Z"
                },
                {
                    "endDate": "2021-06-27T09:35:00Z",
                    "startDate": "2021-06-27T09:00:00Z"
                },
                {
                    "endDate": "2021-06-27T10:40:00Z",
                    "startDate": "2021-06-27T10:00:00Z"
                },
                {
                    "endDate": "2021-06-27T13:35:00Z",
                    "startDate": "2021-06-27T13:02:00Z"
                },
                {
                    "endDate": "2021-06-27T14:35:00Z",
                    "startDate": "2021-06-27T14:00:00Z"
                }
            ]
        },
        "status": "uploaded",
        "userId": 1
    },
    {
        "day": "2021-06-29T00:55:04Z",
        "createdAt": "2022-12-02T06:28:27Z",
        "updatedAt": "2022-12-02T06:28:27Z",
        "id": 2,
        "maxTime": 4990,
        "timeline": [
            1369,
            806,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            2905,
            1753,
            885,
            2280,
            0,
            2591,
            0,
            0,
            1901,
            3397,
            2311,
            1849
        ],
        "tasks": {
            "Swift Algorithm": 10458,
            "TiTi Programming": 10110,
            "This is CodingTest": 1476
        },
        "taskHistorys": null,
        "status": "uploaded",
        "userId": 1
    }
]
</code></pre></details>

## /timelines

### GET /timelines (with Token)

<details>
<summary>response</summary>
<pre language="json"><code class="language-json">[
    {
        "createdAt": "2022-12-02T06:28:27Z",
        "updatedAt": "2022-12-02T06:44:12Z",
        "id": 1,
        "time0": 3600,
        "time1": 0,
        "time2": 0,
        "time3": 0,
        "time4": 0,
        "time5": 0,
        "time6": 0,
        "time7": 0,
        "time8": 0,
        "time9": 0,
        "time10": 0,
        "time11": 0,
        "time12": 0,
        "time13": 0,
        "time14": 2400,
        "time15": 2700,
        "time16": 2460,
        "time17": 1500,
        "time18": 2100,
        "time19": 2400,
        "time20": 1800,
        "time21": 3600,
        "time22": 60,
        "time23": 2100,
        "userId": 1,
        "dailyId": 1
    },
    {
        "createdAt": "2022-12-02T06:28:27Z",
        "updatedAt": "2022-12-02T06:28:27Z",
        "id": 2,
        "time0": 1369,
        "time1": 806,
        "time2": 0,
        "time3": 0,
        "time4": 0,
        "time5": 0,
        "time6": 0,
        "time7": 0,
        "time8": 0,
        "time9": 0,
        "time10": 1,
        "time11": 0,
        "time12": 2905,
        "time13": 1753,
        "time14": 885,
        "time15": 2280,
        "time16": 0,
        "time17": 2591,
        "time18": 0,
        "time19": 0,
        "time20": 1901,
        "time21": 3397,
        "time22": 2311,
        "time23": 1849,
        "userId": 1,
        "dailyId": 2
    },
    {
        "createdAt": "2022-12-02T06:44:12Z",
        "updatedAt": "2022-12-02T06:44:12Z",
        "id": 3,
        "time0": 1369,
        "time1": 806,
        "time2": 0,
        "time3": 0,
        "time4": 0,
        "time5": 0,
        "time6": 0,
        "time7": 0,
        "time8": 0,
        "time9": 0,
        "time10": 1,
        "time11": 0,
        "time12": 2905,
        "time13": 1753,
        "time14": 885,
        "time15": 2280,
        "time16": 0,
        "time17": 2591,
        "time18": 0,
        "time19": 0,
        "time20": 1901,
        "time21": 3397,
        "time22": 2311,
        "time23": 1849,
        "userId": 1,
        "dailyId": 3
    }
]
</code></pre></details>

## /tasks

### GET /tasks (with Token)

<details>
<summary>response</summary>
<pre language="json"><code class="language-json">[
    {
        "createdAt": "2022-12-02T06:28:27Z",
        "updatedAt": "2022-12-02T06:28:27Z",
        "id": 3,
        "taskName": "This is CodingTest",
        "taskTime": 1476,
        "userId": 1,
        "dailyId": 2
    },
    {
        "createdAt": "2022-12-02T06:28:27Z",
        "updatedAt": "2022-12-02T06:28:27Z",
        "id": 4,
        "taskName": "TiTi Programming",
        "taskTime": 10110,
        "userId": 1,
        "dailyId": 2
    },
    {
        "createdAt": "2022-12-02T06:28:27Z",
        "updatedAt": "2022-12-02T06:28:27Z",
        "id": 5,
        "taskName": "Swift Algorithm",
        "taskTime": 10458,
        "userId": 1,
        "dailyId": 2
    },
    {
        "createdAt": "2022-12-02T06:44:12Z",
        "updatedAt": "2022-12-02T06:44:12Z",
        "id": 6,
        "taskName": "TiTi update",
        "taskTime": 5460,
        "userId": 1,
        "dailyId": 1
    },
    {
        "createdAt": "2022-12-02T06:44:12Z",
        "updatedAt": "2022-12-02T06:44:12Z",
        "id": 7,
        "taskName": "TiTi Programming",
        "taskTime": 20000,
        "userId": 1,
        "dailyId": 1
    },
    {
        "createdAt": "2022-12-02T06:44:12Z",
        "updatedAt": "2022-12-02T06:44:12Z",
        "id": 8,
        "taskName": "Swift Algorithm",
        "taskTime": 10458,
        "userId": 1,
        "dailyId": 3
    },
    {
        "createdAt": "2022-12-02T06:44:12Z",
        "updatedAt": "2022-12-02T06:44:12Z",
        "id": 9,
        "taskName": "TiTi Programming",
        "taskTime": 10110,
        "userId": 1,
        "dailyId": 3
    },
    {
        "createdAt": "2022-12-02T06:44:12Z",
        "updatedAt": "2022-12-02T06:44:12Z",
        "id": 10,
        "taskName": "This is CodingTest",
        "taskTime": 1476,
        "userId": 1,
        "dailyId": 3
    }
]
</code></pre></details>
