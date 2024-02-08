<h1 align='center'>XP MOVIES</h1>

<p align='center'>Express api for saving favorites movies</p>

## Database diagram

![Database](./xp-movie-CURRENT.webp)

## API Reference

### Create new user

```http
  POST /register
```

Body:

```json
  {
    "name": string,
    "email": string,
    "password": string
  }
```

### Login

```http
  POST /login
```

Body:

```json
  {
    "email": string,
    "password": string
  }
```

### Add new favorite movie

```http
  POST /user/favorites
```

Header:

```json
  Authorization = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Body:

```json
  {
    "imdbId": string,
    "categoryId": string,
    "title": string
  }
```

### Get all user favorite movies

```http
  GET /user/favorites
```

Header:

```json
  Authorization = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Delete one user favorite movie

```http
  DEL /user/favorites/1
```

Header:

```json
  Authorization = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Refresh access token

```http
  GET /token/refresh
```

Header:

```json
  refreshToken = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

TODO:

- [ ] swagger docs
- [ ] redis cache
- [ ] kubernetes pods
- [ ] lambda crons
- [ ] free and paid user features
- [ ] GraphQL
- [ ] WebSocket
