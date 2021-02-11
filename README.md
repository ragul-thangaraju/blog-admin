# Blog Admin Panel

This repo contains Blog admin panel code

---
      npm install (to install dependencies)
      npm start (to run project)
      
# Folder Structure

```
app
├── public
├── src
│   └── actions
│       └── commentAction.js
│       └── loginInAction.js
│       └── postAction.js
│       └── types.js
│       └── usersAction.js
│   └── assets
│       └── css
│       └── media
│   └── components
│       └── auth
│           └── Login.js
│       └── comments
│           └── Approve.js
│           └── Content.js
│           └── index.js
│           └── Reject.js
│           └── Tab.js
│       └── common
│           └── Header.js
│           └── Layout.js
│           └── Navigator.js
│           └── Paperbase.js
│       └── post
│           └── Content.js
│           └── DeletePost.js
│           └── index.js
│           └── Tab.js
│       └── users
│           └── Content.js
│           └── DeleteUsers.js
│           └── index.js
│           └── Tab.js
│       └── App.js
│   └── config
│       └── index.js
│       └── routes.js
│   └── reducers
│       └── commentReducer.js
│       └── index.js
│       └── loginReducer.js
│       └── postReducer.js
│       └── userReducer.js
│   └── theme
│       └── shadow.js
│       └── index.js
│       └── typography.js
│   └── utils
│       └── axiosInstance.js
│       └── utility.js
│       └── validations.js
├── package.json
└── index.js
```
