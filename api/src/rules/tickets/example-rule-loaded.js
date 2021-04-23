import * as util from 'src/lib/util'
import { logger } from 'src/lib/logger'
module.exports = {
  command: function (input) {
    try {
      if (input.title.toLowerCase().includes('jace')) {
        input.title = input.title.replace(/jace/gmi, 'Jace');
      }
    } catch (e) {
      logger.error(e);
    }
    return input;
  },
  active: true,
  order: 10,
  title: "Correct jace's name",
  when: "before",
  file: __filename
}