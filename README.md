# Blog

This repo contains Blog admin panel code

---

## Requirements

For development, you will need Node.js latest version and a node global package installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

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
