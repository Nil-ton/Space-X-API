# Overview

This is the challenge [Fullstack Challenge 🏅 Space X API](./FullstackChallenge.md) part 1 - backend.
Frontend [here](https://github.com/Nil-ton/Space-X-API)

# Technologies

- NodeJS: ^18.16.0
- MongoDB: ^5.8.1

## Dependencies

```json
"dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/config": "^3.0.1",
    "@nestjs/core": "^10.0.0",
    "@nestjs/mapped-types": "*",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/schedule": "^3.0.3",
    "@nestjs/typeorm": "^10.0.0",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "mongodb": "^5.8.1",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.1",
    "typeorm": "^0.3.17"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/express": "^4.17.17",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "dotenv": "^16.3.1",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "source-map-support": "^0.5.21",
    "supertest": "^6.3.3",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3"
  },
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Project Structure

## Config Folder

- `src/config/db.config.service.ts`: TypeORM configuration.

## Launches Folder

- `src/launches/dto`: All Data Transfer Object (DTO) used in application related to launch.
- `src/launches/launch.entity.ts`: Launch entity.
- `/launches/launches.controller.ts`: All drivers of all related to launch.
- `src/launches/launches.module.ts`: Nest modules related to lanch.
- `src/launches/launches.service.ts`: Service responsible for managing the repository.

## Endpoints

`GET`: `/`
```json
{
	"message": "Fullstack Challenge 🏅 - Space X API"
}
```

`GET`: `/launches`
You can search for any result key example: 

`/launches?name=crew&page=1&limit=5`

`obs`: logo and rocket fields do not carry out the search.
```json
{
	"results": [
		{
			"_id": "62dd70d5202306255024d139",
			"flight_number": 187,
			"logo": {
				"small": "https://images2.imgbox.com/eb/d8/D1Yywp0w_o.png",
				"large": "https://images2.imgbox.com/33/2e/k6VE4iYl_o.png"
			},
			"name": "Crew-5",
			"success": true,
			"date_utc": "2022-10-05T16:00:00.000Z",
            "webcast": "https://www.youtube.com/watch?v=2i-nIMGEEg0",
			"rocket": {
				"name": "Falcon 9",
				"type": "rocket",
				"active": true,
				"stages": 2,
				"boosters": 0,
				"cost_per_launch": 50000000,
				"success_rate_pct": 98,
				"first_flight": "2010-06-04",
				"country": "United States",
				"company": "SpaceX",
				"wikipedia": "https://en.wikipedia.org/wiki/Falcon_9",
				"description": "Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit."
			}
		},
        // ...
	],
	"totalDocs": 186,
	"page": 1,
	"totalPages": 19,
	"hasNext": true,
	"hasPrev": false
}
```

`GET`: `/launches/stats/pie`

```json
[
	{
		"name": "Falcon 9",
		"success": 176,
		"fail": 2,
		"color": "rgb(115,168,41)"
	},
	{
		"name": "Falcon Heavy",
		"success": 3,
		"fail": 0,
		"color": "rgb(153,23,122)"
	},
	{
		"name": "Falcon 1",
		"success": 2,
		"fail": 3,
		"color": "rgb(147,58,236)"
	}
]
```

`GET`: `/launches/stats/bar`

```json
{
	"labels": [
		"2006",
		"2007",
		"2008",
		"2009",
		"2010",
		"2012",
		"2013",
		"2014",
		"2015",
		"2016",
		"2017",
		"2018",
		"2019",
		"2020",
		"2021",
		"2022"
	],
	"datasets": [
		{
			"label": "Falcon 9",
			"data": [0, 0, 0, 0, 2, 2, 3, 6, 7, 9, 18, 20, 11, 26, 31, 43],
			"backgroundColor": [
				"rgb(115,168,41)",
				"rgb(115,168,41)",
				"rgb(115,168,41)",
				"rgb(115,168,41)",
				"rgb(115,168,41)",
				"rgb(115,168,41)",
				"rgb(115,168,41)",
				"rgb(115,168,41)",
				"rgb(115,168,41)",
				"rgb(115,168,41)",
				"rgb(115,168,41)",
				"rgb(115,168,41)",
				"rgb(115,168,41)",
				"rgb(115,168,41)",
				"rgb(115,168,41)",
				"rgb(115,168,41)"
			]
		},
		{
			"label": "Falcon Heavy",
			"data": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0],
			"backgroundColor": [
				"rgb(153,23,122)",
				"rgb(153,23,122)",
				"rgb(153,23,122)",
				"rgb(153,23,122)",
				"rgb(153,23,122)",
				"rgb(153,23,122)",
				"rgb(153,23,122)",
				"rgb(153,23,122)",
				"rgb(153,23,122)",
				"rgb(153,23,122)",
				"rgb(153,23,122)",
				"rgb(153,23,122)",
				"rgb(153,23,122)",
				"rgb(153,23,122)",
				"rgb(153,23,122)",
				"rgb(153,23,122)"
			]
		},
		{
			"label": "Falcon 1",
			"data": [1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			"backgroundColor": [
				"rgb(147,58,236)",
				"rgb(147,58,236)",
				"rgb(147,58,236)",
				"rgb(147,58,236)",
				"rgb(147,58,236)",
				"rgb(147,58,236)",
				"rgb(147,58,236)",
				"rgb(147,58,236)",
				"rgb(147,58,236)",
				"rgb(147,58,236)",
				"rgb(147,58,236)",
				"rgb(147,58,236)",
				"rgb(147,58,236)",
				"rgb(147,58,236)",
				"rgb(147,58,236)",
				"rgb(147,58,236)"
			]
		}
	]
}
```

## License

[MIT licensed](./LICENSE).
