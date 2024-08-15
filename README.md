# Exchange Recipes (PERN stack Application):

## 1. PROJECT OVERVIEW:

• It is a user-specific application
where users can browse for recipes
and also share their recipes with
others.

• Key features: authentication, and search
functionality based on six
categories.

## 2. APPLICATION SETUP AND RUN:

### 2.1. Clone Repository
```
git clone https://github.com/eswar7981/exchangeRecipesPERN.git
```
### 2.2 Move to the Directory
Open two terminals or use split terminal and move to the following directory in both terminals
```
cd exchangeRecipesPERN
```

### 2.3 Setup
2.3.1 Client

```
cd client
```
install required packages
```
npm install
```
2.3.2 Server

```
cd server
```
install required packages
```
npm install
```
### 2.4 Running Application

2.4.1 Client
```
npm start
```
2.4.2 Server
```
npm run dev
```
## 3. PostgreSQL Database Schema:
![Screenshot (29)](https://github.com/user-attachments/assets/8a33b950-d56c-4889-9b0a-0e51c17c3e74)

## 4. Technologies and Tools:

### Frontend : React <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/>, Material UI <img src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/materialui/materialui-plain.svg" width="40" height="40"/>

### Backend  : Express <img src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/express/express-original-wordmark.svg" width="40" height="40"/>, mongoDB <img src="https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/mongodb/mongodb-plain.svg"  width="40" height="40" />  , Node <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> , supabase client


## Deployment:


### Frontend : Render

### Backend : Render

## 3. API End Points

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
