## Technical interview full stack | Alexis Lo 👋🏼
### Build with:

- Next Js Typescript
- Graphql
- Mongoose
- MongoDB

## Requierments:

- mongodb ( Create local conection or remote)
- node 16+

First, run the development server: ⚡️

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



## Folder structure 📁
```
├── README.md
├── globals.css
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── pages
│   ├── \_app.tsx
│   ├── api
│   │   ├── auth
│   │   │   └── [...nextauth].tsx
│   │   └── graphql.ts
│   ├── article
│   │   └── [id].tsx
│   ├── favorites.tsx
│   └── index.tsx
├── postcss.config.js
├── public
│   └── favicon.ico
├── src
│   ├── assets
│   │   ├── Logo.png
│   │   ├── auth-modal.png
│   │   ├── empty-state.png
│   │   ├── icons
│   │   │   ├── face.png
│   │   │   ├── insta.png
│   │   │   └── twitter.png
│   │   └── wave-card.svg
│   ├── components
│   │   ├── authModal.tsx
│   │   ├── blogList.tsx
│   │   ├── blogModal.tsx
│   │   ├── cardBlog.tsx
│   │   ├── emptyState.tsx
│   │   ├── footer.tsx
│   │   ├── motion.div.tsx
│   │   ├── navbar.tsx
│   │   ├── overlayLoading.tsx
│   │   ├── searchBar.tsx
│   │   └── wrapper.tsx
│   ├── constants
│   │   └── enums
│   │   └── modal-auth-types.ts
│   ├── db
│   │   ├── config.ts
│   │   ├── mock-blog-data.json
│   │   ├── mockBlogs.ts
│   │   └── models
│   │   ├── blog.ts
│   │   └── user.ts
│   ├── graphql
│   │   ├── client.ts
│   │   ├── queries.ts
│   │   ├── resolvers.ts
│   │   └── shema.ts
│   └── hooks
│   ├── useCheckIfBlogIsFavorite.tsx
│   ├── useEscapeKey.tsx
│   └── useSaveFavoriteBlog.tsx
├── tailwind.config.js
├── tsconfig.json
└── yarn.lock

```
