# Exchange Recipes (PERN stack Application):

## PostgreSQL Database Schema:
![Screenshot (29)](https://github.com/user-attachments/assets/8a33b950-d56c-4889-9b0a-0e51c17c3e74)

## API End Points

### Authentication

```
POST | authentication/user/login

POST | authentication/user/sign-up

POST | authentication/admin/login

POST | authentication/admin/sign-up
```
### without Login

```
GET | authentication/search

POST | authentication/search

GET | authentication/search/details
```

### Verified User

```
POST | user/create-recipe

POST | user/review

GET | user/favourites

POST | user/add-favourite

GET | user/my-recipes

POST | user/follow-author

GET | user/following

GET | user/followers

GET | user/get-collections

POST | user/add-recipe-collection

POST | user/add-collection

GET | user/get-collection-details

```

### Verified Admin 

```
POST | admin/delete-recipe

POST | admin/remove-user

```
