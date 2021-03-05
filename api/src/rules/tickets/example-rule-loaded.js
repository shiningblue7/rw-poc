import * as util from 'src/lib/util'

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
      util.log(e);
    }
    return current;
  },
  active: true,
  order: 10,
  title: "make jace's name correct",
  file: __filename
}