/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */
const fs = require('fs');
const path = require('path');
module.exports.bootstrap = async function () {
  await initDatabase();
};
async function initDatabase() {
  let folder = path.join(__dirname, '../init');
  let rs = fs.readdirSync(folder);
  for (var i = 0; i < rs.length; i++) {
    try {
      let data = JSON.parse(fs.readFileSync(path.join(folder, rs[i]), 'utf8'));
      let model = rs[i].split('.')[0];
      await sails.models[model].createEach(data);
    } catch (err) {
      sails.log(`error on init `, err);
      continue;
    }
  }
}
