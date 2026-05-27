# API

This file describes the backend endpoints and their responses.

## Conventions

- Successful single-resource responses use `{ recipe }` or `{ user }` when the route returns one entity.
- List return `{ recipes, pagination }`.
- Errors always returns `message`.
- Not found returns `404` for missing recipes or unauthorized access.

## Auth

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

Creates a new user.

### `GET /users/me`

Returns the authenticated user.

Response:

```json
{
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "role": "USER",
    "profileImageUrl": null,
    "profileImageKey": null
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

This route is public and does not require authentication.

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
