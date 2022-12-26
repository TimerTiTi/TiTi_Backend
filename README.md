# TiTi_Backend API (v0.2)

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
- 207 : upload dailys success but something wrong

### 400

- 400 : client error
- 401 : unauthorized
- 404 : not found
- 409 : conflict

### 500

- 500 : server error

# Error

```json
207 : { error: "[281,282]" }
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

![ERD](erd2.png "ERD")

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

### syncLog

```javascript
export const SyncLog = sequelize.define("syncLog", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  dailysCount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  uploadCount: {
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
SyncLog.belongsTo(User);
```

### recordTime

```javascript
export const RecordTime = sequelize.define("recordTime", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  settedTimerTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  settedGoalTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  savedSumTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  savedTimerTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  savedStopwatchTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  savedGoalTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recordingMode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recordTask: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recordTaskFromTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recording: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  recordStartAt: {
    type: DataTypes.DATE,
    get() {
      return (
        moment(this.getDataValue("recordStartAt"))
          .utc()
          .format("YYYY-MM-DDTHH:mm:ss") + "Z"
      );
    },
  },
  recordStartTimeline: {
    type: DataTypes.JSON,
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
RecordTime.belongsTo(User);
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

### POST /dailys/upload?gmt=32400 (with Token)

gmt: 국가별 GMT seconds (한국: +9\*3600 = +32400)

<details>
<summary>request</summary>
<pre language="json"><code class="language-json">param : [gmt: 32400], body : 
[
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
<pre language="json"><code class="language-json">(statusCode : 200) or
(statusCode : 207)
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

## /syncLog

### GET /syncLog (with Token)

<details>
<summary>response</summary>
<pre language="json"><code class="language-json">{
    "createdAt": "2022-12-26T06:52:10Z",
    "updatedAt": "2022-12-26T06:52:10Z",
    "id": 4,
    "dailysCount": 284,
    "uploadCount": 7,
    "userId": 1
}
</code></pre></details>

## /recordTime

### POST /recordTime (with Token)

<details>
<summary>request</summary>
<pre language="json"><code class="language-json">{
  "recordingMode" : 2,
  "recordStartTimeline" : [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    600,
    3205,
    0,
    0,
    0,
    2870,
    3438,
    2668,
    3290,
    748,
    0,
    0,
    0,
    0,
    0
  ],
  "recordTaskFromTime" : 24237,
  "savedSumTime" : 24237,
  "settedTimerTime" : 120,
  "savedTimerTime" : 120,
  "savedGoalTime" : -9837,
  "savedStopwatchTime" : 24237,
  "recordTask" : "TiTi 개발",
  "settedGoalTime" : 14400,
  "recording" : false,
  "recordStartAt" : "2022-12-23T13:10:06Z"
}
</code></pre></details>
<br/>
<details>
<summary>response</summary>
<pre language="json"><code class="language-json">(statusCode : 200) or
(statusCode : 201)
</code></pre></details>

### GET /recordTime (with Token)

<details>
<summary>response</summary>
<pre language="json"><code class="language-json">{
    "recordStartAt": "2022-12-23T13:10:06Z",
    "createdAt": "2022-12-26T12:01:53Z",
    "updatedAt": "2022-12-26T12:13:28Z",
    "id": 1,
    "settedTimerTime": 120,
    "settedGoalTime": 14400,
    "savedSumTime": 24237,
    "savedTimerTime": 120,
    "savedStopwatchTime": 24237,
    "savedGoalTime": -9837,
    "recordingMode": 2,
    "recordTask": "TiTi 개발",
    "recordTaskFromTime": 24237,
    "recording": false,
    "recordStartTimeline": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        600,
        3205,
        0,
        0,
        0,
        2870,
        3438,
        2668,
        3290,
        748,
        0,
        0,
        0,
        0,
        0
    ],
    "userId": 1
}
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

<br/>

# upload Dailys 로직

for daily in dailys

1. class Dailys 생성
2. daily.id 값 null 여부 확인
3. null 인 경우
4. 같은 날짜의 Daily 존재 여부 확인
5. 같은 날짜의 Daily 가 없는 경우 -> create, continue
6. 같은 날짜의 Daily 가 있는 경우 -> totalTime 값이 높은 daily 판별 -> update Daily, continue
7. daily.status 값 확인
8. daily.status == uploaded 인 경우 -> continue
9. DB -> get daily by (id, userId)
10. DB daily 값이 없는 경우 -> success = false, errorIds: id 추가 -> continue
11. update daily
12. update timeline
13. delete tasks
14. create tasks
15. 총 Daily 개수, update 및 create 된 Daily 개수 -> create syncLog, continue

<br/>

# iso8601 같은날 Daily 분별 로직

daily.day 시각은 그리니치 천문대 기준 절대시각 값이다 (GMT 값 제거된)
TiTi 를 사용하는 이용자의 시간대에 따라 날짜 범위가 달라진다.
따라서 절대시각과 GMT 값을 통해 날짜를 계산하는 로직.
API 사용시 기기내에서 GMT 값을 계산하여 보낸 후 Server 내에서 계산하는 식.

예시: 한국 기준 `2022-12-26 00:15:00` 시각 -> 12/26 날짜 구하는 로직

1. daily.day :절대시각 (`2022-12-25T15:15:00Z`)
2. localDate = daily.day + GMT (한국: +32400) :국가 상대시각 (`2022-12-26T00:15:00Z`)
3. localZeroDate = localDate 에서 시, 분, 초 제거 :국가 상대시각 (`2022-12-26T00:00:00Z`)
4. startDate = localZeroDate - GMT (한국: +32400) :절대시각 (`2022-12-25T15:00:00Z`)
5. endDate = startDate + 1일 :절대시각 (`2022-12-26T15:00:00Z`)
   최종적으로 DB 내에서 `date < endDate and date >= startDate` 쿼리를 통해 같은날의 기록을 검색할 수 있다.
