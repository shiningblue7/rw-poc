module.exports = {
  command: function (current) {
      try {
        console.log(`pre-current: ${JSON.stringify(current)}`)
          current.title+=new Date()
      } catch (e) {
          console.log('test.js error', e);
      }
      console.log(`post-current: ${JSON.stringify(current)}`)
      return current;
  },
  active: true,
  order: 12,
  title: "append date"
}