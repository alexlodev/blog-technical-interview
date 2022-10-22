

## Technical interview full stack | Alexis Lo

> **Some comments about then chanllenge:** It's a great challenge, I know I'm applying for a front-end role, but I wanted to take advantage and do some back-end work as well to show what I can do. Within this small documentation, it details a list of possible things that could have been better and that, for reasons of time, were not carried out. If you have any questions about the reasons for some of the implementations or any other questions, do not hesitate to contact me: alexislo15@hotmail.es


### Build with: 
- Next Js Typescript
- Graphql
- Mongoose
- MongoDB


## Requierments: 
- mongodb ( Create local conection or remote)
- node 16+ 


First, run the development server:

```bash
yarn # install dependecies
# or
yarn dev # run server =
```

Open web client [http://localhost:3000](http://localhost:3000) 

Open graphql client [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) 


## Features:
- API Graphql 
- Connection with real database


### As an unauthenticated user.
- I can see blog posts available in the site ✅
- I can see the full detail of each blog ✅
- I can search for a post. ✅
- When making a post a favorite I should be able to see a sign-up/sign-in modal ✅

### As an authenticated user

- I can save a post (mark as favorite) ✅
- I can see all my favorites posts ✅
- I can search a previously saved post. ✅
- I can remove a post from my favorites ✅
- As a user I can create and edit posts ✅


## Things i assumed

- Given the figma, I assumed that it should not be pixel perfect since the design did not respect certain spacing.
- Certain behaviors not detailed in the task but shown in figma were omitted.


## Possible improvements and things I would have liked to do

- I would have liked to improve the readability of some variable names
- I would have liked to add unit tests
- I would have liked to dockerize the project
- I think that it still needs to improve the handling of the typing of the components and logics
- I think there is much to improve also with the styles, there are styles that are repeated.
- Components could be further broken down.
- Auth system with some provider.
- Delete blog option.
- Improve the blog and edit options. 
- Improve error handling 
- Improve UX with status messages