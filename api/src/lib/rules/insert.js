var fs = require('fs');
const fsPromises = fs.promises;
var path = require('path');
async function listDir(dirPath){
  try{
    return await fsPromises.readdir(dirPath);
  }catch(e){
    console.error(`Error occured reading ${dirPath}`)
  }
}

module.exports = {
  runRulesSimple: function (current, table){
    current.title = "simple";
    current.id = -1;
    return current;
  },
  runRules: function (current, table) {
    console.log('getrules start')
    try {
      var directory = path.resolve(`./src/lib/rules/${table}/`);
      console.log(directory);
      var rules = [];
      listDir(directory, (error, files) => {
        if (error) {
          console.error(error);
        }
        async ((current)=>{
          files.forEach((file, index) => {
            let scriptPath = path.resolve(`${directory}/${file}`);
            console.log(`scriptPath: ${scriptPath}`)
            let script = require(scriptPath)
            console.log(`script: ${JSON.stringify(script)}`);
            rules.push({
              name: file + '',
              command: script.command || function (current) { console.log('no script defined'); return current },
              order: script.order || 1000000, // default 1000000
              active: script.active || false  // default false
            });
            current.title = file;
            console.log(`${index + 1}/${files.length}`)
          });
        })(current)
      });
      console.log(`rules: ${JSON.stringify(rules, '', ' ')}`)

    } catch (e) {
      console.log('test.js error', e);
    }
    // sort the rules
    // filter out the inactive
    console.log(`getrules end ${JSON.stringify(current)}`)
    current.title = "modified by insert.js"
    return current;
  },
  runRules2: function (current, table) {

    console.log('getrules start')
    try {
      var directory = path.resolve(`./src/lib/rules/${table}/`);
      console.log(directory);
      var rules = [];
      fs.readdir(directory, (error, files) => {
        if (error) {
          console.error(error);
        }
        files.forEach((file, index) => {
          let scriptPath = path.resolve(`${directory}/${file}`);
          console.log(`scriptPath: ${scriptPath}`)
          let script = require(scriptPath)
          console.log(`script: ${JSON.stringify(script)}`);
          rules.push({
            name: file + '',
            command: script.command || function (current) { console.log('no script defined'); return current },
            order: script.order || 1000000, // default 1000000
            active: script.active || false  // default false
          });
          console.log(`${index + 1}/${files.length}`)
          if ((index + 1) === files.length) {
              console.log(`in runrules ${JSON.stringify(rules, '', ' ')}`)
              rules.forEach(rule => {
                console.log(`rule: ${JSON.stringify(rule, '', ' ')}`)
                current = rule.command(current);
              });
              return current
          }
        });
      });
      console.log(`rules: ${JSON.stringify(rules, '', ' ')}`)
    } catch (e) {
      console.log('test.js error', e);
    }
    // sort the rules
    // filter out the inactive
    console.log('getrules end')
  },

    /*
    // sort the rules
    // filter out the inactive
    console.log('rules', rules);
    console.log('getrules')
    //return rules;
    //var rules = this.getRules(table);
    console.log('in run rules')
    rules.forEach((loadedRule)=>{
      console.log(JSON.stringify(loadedRule,'',' '));
    })
    return input;
    */
  }