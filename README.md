# Tskr

Tskr is a open source, task and asset tracking application built on [RedwoodJS](https://redwoodjs.com).  Imagine a low-cost task and asset tracking system where you define complex rules to execute the business needs you have — that's **Tskr**.

Because RedwoodJS is the base of this project I'd be remiss if I didn't share the current disclaimer on their project here.

> WARNING: RedwoodJS software has not reached a stable version 1.0 and should not be considered suitable for production use. In the "make it work; make it right; make it fast" paradigm, Redwood is in the later stages of the "make it work" phase. That said, your input can have a huge impact during this period, and we welcome your feedback and ideas! Check out the Redwood Community Forum to join in.

We are an opinionated system.  We make the decisions so you don't have to.

This project will use the following features.

- Azure Active Directory for Authentication
- Role Based Access Control within Tskr
- Postgres (at your choice of provider)

## Features

### Users
  <details>
    <summary>Allow full user management from within the tool</summary>

  - Authentication via Azure
  - Roles that disctate access

| Role        | Operations                                        |
| ----------- | ------------------------------------------------- |
| Admin       | Create, Read, Update, Delete all                  |
| Task Doer   | Create, Read all the Tasks, Update open Tasks     |
| Task Admin  | Update solved Tasks, Delete all the Tasks         |
| Asset Doer  | Create, Read all the Assets, Update active Assets |
| Asset Admin | Create, Read, Update, Delete all the Assets       |

(see ./api/src/lib/roles.js)
```js
export const matrix = {
  ticket:   {
    create: ['task_doer', 'task_admin',                                            'admin'],
    read:   ['task_doer', 'task_admin', 'asset_doer', 'asset_admin',               'admin'],
    update: ['task_doer', 'task_admin',                                            'admin'],
    delete: [             'task_admin',                                            'admin']
  },
  asset: {
    create: [                           'asset_doer', 'asset_admin',               'admin'],
    read:   [                           'asset_doer', 'asset_admin',               'admin'],
    update: [                           'asset_doer', 'asset_admin',               'admin'],
    delete: [                                         'asset_admin',               'admin']
  },
  user: {
    create: [                                                        'user_admin', 'admin'],
    read:   ['task_doer', 'task_admin', 'asset_doer', 'asset_admin', 'user_admin', 'admin'],
    update: [                                                        'user_admin', 'admin'],
    delete: [                                                        'user_admin', 'admin']
  },
  userRole: {
    create: [                                                        'user_admin', 'admin'],
    read:   ['task_doer', 'task_admin', 'asset_doer', 'asset_admin', 'user_admin', 'admin'],
    update: [                                                        'user_admin', 'admin'],
    delete: [                                                        'user_admin', 'admin']
  }
}
```


Implement the Roles/Personas from the above.
  - [Role Based Access from database](https://redwoodjs.com/docs/authentication#roles-from-a-database)
  </details>

### Tasks

  <details>
    <summary>You know, to fill forms in a standard way</summary>

  - Links to Assets
  - Links to Users
  </details>

### Assets
You know, to have things to track against

### Table level rules
  <details>
  <summary>What is this?</summary>
  <span>
  Do you ever want to do some server side logic on create/update of a record?  Me too.

  Do you ever want to keep that logic in it's own file that is easy to track and debug? Me too!

  **Introducting Table level rules!**

  How does it work?  Well, we have a folder in `./api/src/` called rules that has the tables in use.

  In the appropriate services we use some magic to pull in these rules and they run in the order defined in their file. Want more logic?  Make a new rule. Want less?  Delete or deactivate a rule.

  </span>

  | Status  | When   | Action | Why (example use case)                                                |
  | ------- | ------ | ------ | --------------------------------------------------------------------- |
  | Working | Before | Create | Verify duplicate ticket isn't logged                                  |
  |         | Before | Read   | Remove senstive data / Logging someone tried to read sensitve records |
  |         | Before | Update | Disallow updating of specific fields                                  |
  |         | Before | Delete | Store deleted record in temporary table to allow restore              |
  | Working | After  | Create | Datalookup, e.g. assigned to availablity or Sending a email           |
  |         | After  | Read   | Logging someone read a sensitve record                                |
  |         | After  | Update | Datalookup, e.g. assigned to availablity or Sending a email           |
  |         | After  | Delete | Email that data has been purged                                       |

  </details>

## Set up

1.  Installing the repo

Because this is uses the following you'll need to configure them.

1.  Postgres
2.  Azure

### Postgres for Data

This should include site that we use, seed command, env variable set up

#### Seeding the database

`yarn rw prisma db seed` will load the 7 users and 10 tasks.

### Azure for Authentication

Because we use Azure for auth you'll need to create or connect to your own.

1.  Login to https://portal.azure.com
2.  Navigate to *Azure Active Directory*
3.  On the left is *App Registrations*
4.  Click the *New registration* on this page
    1.  I named mine RW-POC
    2.  I picked Single Tenant
    3.  Set Redirect URI to http://localhost:8910
    4.  Create it, note the following
        -  Application (client) ID
        -  Directory (tenant) ID
5.  Update `./env`
    ```
    AZURE_ACTIVE_DIRECTORY_CLIENT_ID=<client>
    AZURE_ACTIVE_DIRECTORY_AUTHORITY=https://login.microsoftonline.com/<tenant>
    AZURE_ACTIVE_DIRECTORY_REDIRECT_URI=http://localhost:8910
    AZURE_ACTIVE_DIRECTORY_LOGOUT_REDIRECT_URI=http://localhost:8910
    ```
6. Back in Azure on the Azure Active Directory App, there's a *Authentication* link.
   1. Goto that and click *Add a platform*
   2. Pick Single Page Application
   3. Set redirect URI to http://localhost:8910
