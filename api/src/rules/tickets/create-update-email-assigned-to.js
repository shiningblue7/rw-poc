/**
//import * as util from 'src/lib/util'// How to call reusable code across rules
//import { db } from 'src/lib/db'// Needed to do other CRUDs on other tables
 * Properties available to command function
| DB Action | When   | First Param                    | Second Param         |
| --------- | ------ | ------------------------------ | -------------------- |
| Create    | Before | Form input                     | `null`               |
| Create    | After  | Created record with references | `null`               |
| Read      | *      | `null`                         | `null`               |
| Update    | Before | Form input                     | Record before update |
| Update    | After  | Record after update            | Record before update |
| Delete    | Before | Record to be deleted           | `null`               |
| Delete    | After  | Record deleted                 | `null`               |
 * active dictates if this rule will run
 * order dictates the order in the list of rules this will run
 * title is used for log statements
 * when is an array of when this rule can run expects 'before', or 'after'
 * type is an array of the type of db action this runs on epxects, 'create', 'read', 'update', or 'delete'
 * file is for debugging
 * If title,order,when,type,command,active,file are missing rule will not run
 */
import mjml2html from 'mjml'
import { logger } from 'src/lib/logger'
module.exports = {
  command: async function (current, previous) {
    try {
      if (current.priority === "high") {
        const mailgun = require("mailgun-js");
        const DOMAIN = process.env.MAILGUN_DOMAIN
        const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });
        const htmlTemplate = mjml2html(`<mjml>
        <mj-body background-color="#ffffff" font-size="13px">
          <mj-section background-color="#ffffff" padding-bottom="0px" padding-top="0">
            <mj-column vertical-align="top" width="100%">
              <mj-image src="http://go.mailjet.com/tplimg/mtrq/b/ox8s/mg1rw.png" alt="" align="center" border="none" width="600px" padding-left="0px" padding-right="0px" padding-bottom="0px" padding-top="0"></mj-image>
            </mj-column>
          </mj-section>
          <mj-section background-color="#009FE3" vertical-align="top" padding-bottom="0px" padding-top="0">
            <mj-column vertical-align="top" width="100%">
              <mj-text align="left" color="#ffffff" font-size="45px" font-weight="bold" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px" padding-bottom="30px" padding-top="50px">Hello ${current.User.name}</mj-text>
            </mj-column>
          </mj-section>
          <mj-section background-color="#009fe3" padding-bottom="20px" padding-top="20px">
            <mj-column vertical-align="middle" width="100%">
              <mj-text align="left" color="#ffffff" font-size="22px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px"><span style="color:#FEEB35">${current.title} was assigned to you</span><br /><br /> Pitter patter, let’s get at ‘er.</mj-text>
              <mj-text align="left" color="#ffffff" font-size="15px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">Come on now this need to  get done!</mj-text>
              <mj-button align="left" font-size="22px" font-weight="bold" background-color="#ffffff" border-radius="10px" color="#1AA0E1" font-family="open Sans Helvetica, Arial, sans-serif" href="https://dev.tskr.io/tickets/${current.id}">Login</mj-button>
              <mj-text align="left" color="#ffffff" font-size="15px" font-family="open Sans Helvetica, Arial, sans-serif" padding-left="25px" padding-right="25px">Thanks, <br /> The Tskr Team</mj-text>
            </mj-column>
          </mj-section>
        </mj-body>
      </mjml>`);
        const data = {
          from: `Mailgun Sandbox <postmaster@${DOMAIN}>`,
          to: `${current.User.email}`,
          subject: `Hello ${current.User.name}`,
          html: htmlTemplate.html
        };
        console.log(data)
        await mg.messages().send(data, function (error, body) {
          console.log(body);
        });
      }
    } catch (e) {
      logger.error(e);
    }
  },
  active: true,
  order: 100,
  title: "Email assigned to of ticket",
  when: ["after"],
  type: ["create", "update"],
  file: __filename
}
