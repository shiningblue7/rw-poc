import * as util from 'src/lib/util'
import { db } from 'src/lib/db'

module.exports = {
  command: async function (current) {
    try {
      if (current.userId === 2) {
        util.log('Running from an after rule' + current.number + '-' + current.title)
        await db.ticket.create({
          data: {
            number: current.number + '.5',
            title: current.title + ' DUPLICATE ',
            userId: current.userId
          },
        })
      }
    } catch (e) {
      util.log(e);
    }
  },
  active: true,
  order: 10,
  title: "test after rule",
  when: "after",
  file: __filename
}
