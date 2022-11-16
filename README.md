## Session Management Implementation using Express.js + MySQL + Redis (session store)

### Setup Instructions

1. Create a .env file inside root directory with following contents:

```
# Session server secret (random sequence of characters)
SSN_SECRET=<>

# MySQL instance username and password
SQL_USER=<>
SQL_PASS=<>
```

2. Spin up a Redis instance on your local machine (localhost, port 6379 (default))

3. Start node.js server on port 3000 using 'npm run dev'

### High Level Architecture Diagram

![ChatIO UML](https://user-images.githubusercontent.com/61842142/202096891-b406b1c8-e5a7-4e23-a8f4-a57feeb9401e.png)

### 🍻 Cheers!
