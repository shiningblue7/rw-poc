import * as util from 'src/lib/util'
import { logger } from 'src/lib/logger'
module.exports = {
  command: function (current) {
    try {
      if (current.userId === 2) {
        current.title += ' - Jace ';
        var d= new Date();

        current.title += `${d.toLocaleDateString()} ${d.toLocaleTimeString()} `
        current.title += Intl.DateTimeFormat().resolvedOptions().timeZone
      }
    } catch (e) {
      logger.error(e);
    }
    return current;
  },
  active: true,
  order: 10,
  title: "make jace's name correct",
  when: "before",
  file: __filename
}