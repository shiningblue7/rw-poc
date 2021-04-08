# Tskr

A open source task and asset tracking tool.

## Features

<details>
  <summary>Users</summary>
  <span>Allow full user management from within the tool</span>

  - Authentication via Azure
  - [Role Based Access from database](https://redwoodjs.com/docs/authentication#roles-from-a-database)
    </details>

  <details>
  <summary>Tasks</summary>
  <span>You know, to fill forms in a standard way</span>
    - Links to Assets
    - Links to Users
  </details>

  <details>
  <summary>Asset</summary>
  <span>You know, to have things to track against</span>
    - Links to Assets
  </details>



  <details>
  <summary>Table level rules</summary>
  <span>
  Do you ever want to do some server side logic on create/update of a record?  Me too.

  Do you ever want to keep that logic in it's own file that is easy to track and debug? Me too!

  **Introducting Table level rules!**

  How does it work?  Well, we have a folder in `./api/src/` called rules that has the tables in use.

  In the appropriate services we use some magic to pull in these rules and they run in the order defined in their file. Want more logic?  Make a new rule. Want less?  Delete or deactivate a rule.

  </span>
  Status x = working

  | Status  | When   | Action | Why (example use case) |
  | ------- | ------ | ------ | ---------------------- |
  | Working | Before | Create | Verify duplicate ticket isn't logged |
  |         | Before | Read   | Remove senstive data / Logging someone tried to read sensitve records |
  |         | Before | Update | Disallow updating of specific fields |
  |         | Before | Delete | Store deleted record in temporary table to allow restore |
  | Working | After  | Create | Datalookup, e.g. assigned to availablity or Sending a email |
  |         | After  | Read   | Logging someone read a sensitve record |
  |         | After  | Update | Datalookup, e.g. assigned to availablity or Sending a email |
  |         | After  | Delete | Email that data has been purged |

  </details>