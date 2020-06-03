# w-logger

## setup
run `npm install` in root and in client folders


## development / testing
create config folder in the root and inside it create `default.json` like this:
`{
  "mongoURI": "your_mongo_uri",
  "port": 8000,
  "jwtSecret": "your_secret",
  "accessSecret": "your_another_secret",
  "refreshSecret": "one_more"
}`

run `npm run dev` in root and `npm start` in client to get both ends up and running.

