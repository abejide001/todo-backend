# Todo

Todo is an application that allows you keep track of your schedules

## Introduction

Welcome to version 1 of Todo API. Below you will find a current list of available methods on different endpoints.

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

To work with this project you need to have the following installed on your local machine

1. [NodeJS](https://nodejs.org)
2. [Git](https://git-scm.com/downloads)
3. [Postman](https://www.postman.com/)
4. [MongoDB](mongodb.com)

## Install and run locally

```bash
$ git clone https://github.com/abejide001/natour.git
$ cd todo_backend
# rename .env.sample to .env, and set your environment variables

$ npm i
$ npm run start:dev

## API Usage

API BASE URL http://todolisapp.herokuapp.com/api/v1. It's recommended to attach a `authorization` Header containing the generated `token` from `/api/v1/auth/sign-in` to all access all requests.

### Todos endpoints `/api/v1/todos`

| method | route                                              | description                              |
| ------ | -------------------------------------------------- | -----------------------------------------|
| GET    | /                                                  | Get all todos                            |
| GET    | /:todoId                                           | Get a todo                               |
| POST   | /                                                  | Create a todo                            |
| PATCH  | /:todoId                                           | Update a todo                            |
| DELETE | /:todoId                                           | Delete a todo                            |  

### Auth endpoints `/api/v1/auth`
| method | route                                              | description                              |
| ------ | -------------------------------------------------- | -----------------------------------------|
| POST   | /sign-in                                           | Login                                    |
| POST   | /sign-up                                           | Register                                 |
