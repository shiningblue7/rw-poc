import * as path from 'path';
import * as fs from 'fs/promises';
let getRules = async function(current, table){
  console.log(`getrules start current: ${JSON.stringify(current)}`);
    var rules = []
    try {
      var directory = path.resolve(`./src/services/${table}/rules/`);
      console.log(directory);
      const files = await fs.readdir(directory);
      for await (const file of files){
        console.log(`file ${file}`);
        rules.push(path.resolve(`${directory}/${file}`))
      }
      console.log(`getrules after loop: ${JSON.stringify(current)}`);
      return rules;
    } catch (e) {
      console.log('test.js error', e);
    }
    // sort the rules
    // filter out the inactive
    console.log('getrules end')
    return rules;
}

module.exports = {
  runRules: async function (current, table){
    let rules = [];
    const rulePaths = await getRules(current, table);
    console.log(`rulePaths ${rulePaths}`)
    for await (const file of rulePaths){// rulePaths.forEach((file, index) => {
      let scriptPath = path.resolve(`${file}`);
      console.log(`scriptPath: ${scriptPath}`)
      let script = require(scriptPath)
      console.log(`script: ${JSON.stringify(script)}`);
      rules.push({
        name: file + '',
        command: script.command || function (current) { console.log('no script defined'); return current },
        order: script.order || 1000000, // default 1000000
        active: script.active || false  // default false
      });
    };
    rules.forEach(rule => {
      console.log(`rule: ${JSON.stringify(rule, '', ' ')}`)
      current = rule.command(current);
    });
    return current
  },
  getRules: function(current, table) {
    console.log(`getrules start current: ${JSON.stringify(current)}`);
    var rules = []
    try {
      var directory = path.resolve(`./src/services/${table}/rules/`);
      console.log(directory);
      const files = fs.readdir(directory);
      for (const file of files){
        console.log(`file ${file}`);
        rules.push(path.resolve(`${directory}/${file}`))
      }
      console.log(`getrules after loop: ${JSON.stringify(current)}`);
      return rules;
    } catch (e) {
      console.log('test.js error', e);
    }
    // sort the rules
    // filter out the inactive
    console.log('getrules end')
  },

      //console.log(`files ${JSON.stringify(files)}`);
      /*
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
              //console.log(`in runrules ${JSON.stringify(rules, '', ' ')}`)
              rules.forEach(rule => {
                console.log(`rule: ${JSON.stringify(rule, '', ' ')}`)
                current = rule.command(current);
              });
              return current
          }
        });

      });
      */

      //console.log(`rules: ${JSON.stringify(rules, '', ' ')}`)
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