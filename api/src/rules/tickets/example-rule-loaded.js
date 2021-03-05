module.exports = {
  command: function (current) {
      try {
        console.log(`pre-current: ${JSON.stringify(current)}`)
          if (current.title==="jace") {
              current.title='Jace';
             //current.date = new Date()
          }
      } catch (e) {
          console.log('test.js error', e);
      }
      console.log(`post-current: ${JSON.stringify(current)}`)
      return current;
  },
  active: true,
  order: 10,
  title: "make jace's name correct",
  file: __filename
}