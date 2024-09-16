# Задание Реализуйте API:

- GET /api/user/login   страница с формой входа / регистрации
- GET /api/user/me      страница профиля
- POST /api/user/login
- POST /api/user/signup

Настройте локальную аутентификацию с помощью PassportJS


## Запуск приложеня docker
```docker-compose up```

### Образы
- [psswd-mongo](https://hub.docker.com/repository/docker/shulaevivan/psswd-mongo/general)
- [MONGO DB](https://hub.docker.com/r/mongodb/mongodb-community-server)

## Requirequirements (local)
    "express"
    "mongoose"
    "mongo DB"


```sudo systemctl start mongod npm run start```