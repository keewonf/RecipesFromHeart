# API

This document summarizes the current HTTP contract of the backend.

## General conventions

- Successful single-resource responses use `{ recipe }` or `{ user }` when the route returns one entity.
- List responses use `{ recipes, pagination }`.
- Error responses use a `message` field.
- Missing recipes in `GET /recipes/:id`, `PATCH /recipes/:id`, and `DELETE /recipes/:id` return `404`.

## Authentication

### `POST /sessions`

Creates a session and returns a JWT.

Response:

```json
{
  "token": "...",
  "user": {
    "id": "...",
    "name": "...",
    "email": "..."
  }
}
```

## Users

### `POST /users`

Creates a user.

### `GET /users/me`

Returns the authenticated user.

Response:

```json
{
  "user": {
    "id": "...",
    "name": "...",
    "email": "..."
  }
}
```

## Recipes

### `POST /recipes`

Creates a recipe.

Response:

```json
{
  "recipe": {
    "id": "...",
    "title": "...",
    "resume": "...",
    "preparationTime": 30,
    "portions": 4,
    "preparationMethod": "...",
    "isPublic": true,
    "imageUrl": "...",
    "imageKey": "...",
    "ingredients": []
  }
}
```

### `GET /recipes/me`

Lists recipes belonging to the authenticated user.

Query params:

- `name`
- `page`
- `perPage`

Response:

```json
{
  "recipes": [],
  "pagination": {
    "page": 1,
    "perPage": 10,
    "totalRecords": 0,
    "totalPages": 1
  }
}
```

### `GET /recipes`

Lists public recipes from the community.

Query params:

- `name`
- `page`
- `perPage`

Response:

```json
{
  "recipes": [],
  "pagination": {
    "page": 1,
    "perPage": 10,
    "totalRecords": 0,
    "totalPages": 1
  }
}
```

### `GET /recipes/:id`

Returns one recipe.

Response:

```json
{
  "recipe": {
    "id": "...",
    "title": "..."
  }
}
```

### `PATCH /recipes/:id`

Updates a recipe.

### `DELETE /recipes/:id`

Deletes a recipe.

## Uploads

### `POST /uploads/recipes`

Uploads an image for a recipe.

### `POST /uploads/profile`

Uploads an image for a profile.

Response:

```json
{
  "imageUrl": "...",
  "imageKey": "...",
  "originalFilename": "..."
}
```
