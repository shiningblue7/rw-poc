import { Link, routes } from '@redwoodjs/router'


const HomePage = () => {
  return (<>
    <h1>What is Tskr</h1>
    <p>
      Tskr is a open source, task and asset tracking application built on <a href="https://redwoodjs.com">RedwoodJS</a>. Imagine a low-cost task and asset tracking system where you define complex rules to execute the business needs you have — that's Tskr.
    We are an opinionated system. We make the decisions so you don't have to.
    </p>
    <h2>What Tskr is built on</h2>
    <ul>
      <li>RedwoodJS (React, Prisma, GraphQL, and Postgres)</li>
      <li>Azure Active Directory for Authentication</li>
      <li>Simple Role Based Access Control managed within Tskr</li>
      <li>Code is code here.  No code found in our database.</li>
    </ul>
    <h2>Try it out!</h2>
    <details>
      <summary>Logins here</summary>
      <table>
        <thead>
          <tr>
            <td>Persona</td>
            <td>Name</td>
            <td>Email</td>
            <td>Password</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Task Doer</td>
            <td>Tom Doer Tillamook</td>
            <td>demotaskdoer@tskr.io</td>
            <td>Task0001</td>
          </tr>
          <tr>
            <td>Task Admin</td>
            <td>Tory Admin Taylor</td>
            <td>demotaskadmin@tskr.io</td>
            <td>Task0002</td>
          </tr>
          <tr>
            <td>Asset Doer</td>
            <td>Adam Doer Anderson</td>
            <td>demoassetdoer@tskr.io</td>
            <td>Task0003</td>
          </tr>
          <tr>
            <td>Asset Admin</td>
            <td>Anna Admin Abbott</td>
            <td>demoassetadmin@tskr.io</td>
            <td>Task0004</td>
          </tr>
          <tr>
            <td>Admin</td>
            <td>Ali Admin Armstrong</td>
            <td>demoadmin@tskr.io</td>
            <td>Task0005</td>
          </tr>
        </tbody>
      </table>
    </details>
    <h2>Features</h2>
    <ul>
      <li><p>Simple Role Based Access.  What does that mean?  There's a lot of places you have to secure to ensure a safe system.  We've abstracted that down to one file.  If you want to change what roles have access to parts of Tskr, you only need to edit <a href="https://github.com/jacebenson/rw-poc/blob/main/api/src/lib/roles.js">./api/src/lib/roles.js</a></p></li>
      <li>Logic Rules.  What are rules?  Rules are bits of code that can execute to make outbound calls, update records, or modify what was submitted.  Here are the default ones on ticket.
        <ul>
          <li><a href="https://github.com/jacebenson/rw-poc/blob/main/api/src/rules/tickets/create-update-calculate-priority.js">Calculate Priority</a></li>
          <li><a href="https://github.com/jacebenson/rw-poc/blob/main/api/src/rules/tickets/create-update-email-assigned-to.js">Email Assigned to</a></li>
          <li><a href="https://github.com/jacebenson/rw-poc/blob/main/api/src/rules/tickets/create-update-on-high-priority-assign-to-jace.js">Assign High Priorities to Jace</a></li>
          <li><a href="https://github.com/jacebenson/rw-poc/blob/main/api/src/rules/tickets/delete-ticket-log.js">Log when something is deleted</a></li>
          <li><a href="https://github.com/jacebenson/rw-poc/blob/main/api/src/rules/tickets/update-title-to-solved.js">Update title to append [Solved]</a></li>

        </ul>
      </li>
      <li>Responsive Email templating via <a href="https://mjml.io">MJML</a> </li>
      <li>Mailgun integrated as the email service provider.</li>
      <li><p>Created with the <a href="https://www.netlify.com/jamstack/">JAMStack</a> in mind, this is a great way to spin up something that has low risk, low cost, and a lot of potiental upsides.</p></li>
    </ul>
    <h2>I'm in, where do I start?</h2>
    <p>You'll need the following</p>
    <details>
      <summary>Azure Active Directory<sup>(free for up to 50k records)</sup></summary>
      <ol>
        <li><a href="https://azure.microsoft.com/en-us/services/active-directory/">Sign up for this here</a></li>
        <li>Once you've signed up you'll need to <a href="https://portal.azure.com">login to portal.azure.com</a>.</li>
        <li>Then you'll need to create a New App Registration.</li>
        <li>The App Regirstion should be single tenant, redirect uri should point to each url you might run this.  Mine for instance has http://localhost:8910 and https://dev.tskr.io</li>
        <li>Take note of the Application (client) ID, and the Directory (tenant) ID</li>
        <li>Users here will be able to authenticate into your application.</li>
      </ol>
    </details>
    <details>
      <summary>Postgres database</summary>
      <ol>
        <li>Set up a <a href="https://railway.app/">Postgres</a> database.</li>
        <li>Take note the connection string.</li>
      </ol>
    </details>
    <details>
      <summary>This repository</summary>
      <ol>
        <li>Click this, and follow the prompts.
              <a href="https://app.netlify.com/start/deploy?repository=https://github.com/jacebenson/rw-poc">
            <img src="https://www.netlify.com/img/deploy/button.svg" title="Deploy to Netlify" />
          </a>
        </li>
        <li>
          Cancel the build once it starts.
            </li>
        <li>
          <p>
            Set the environment variables under the Site Build & Deploy to the following.
              </p>
          <code>
            DATABASE_URL=insertPostGresDBConnectionStringHereFromStepTwo
            AZURE_ACTIVE_DIRECTORY_CLIENT_ID=AzureClientIdFromStepFive
            AZURE_ACTIVE_DIRECTORY_AUTHORITY=https://login.microsoftonline.com/AzureDirectoryIdFromStepFive
            AZURE_ACTIVE_DIRECTORY_REDIRECT_URI=ReplaceMe.netlify.app
            AZURE_ACTIVE_DIRECTORY_LOGOUT_REDIRECT_URI=ReplaceMe.netlify.app
              </code>
        </li>
        <li>Trigger a build</li>
        <li>That will create the tables in Postgres, and will seed some users, userRoles, ticktes, and assets.  You'll want to update the users to your users in postgres, as my seed data is not going to match yours</li>
      </ol>
    </details>
  </>)
}

export default HomePage
