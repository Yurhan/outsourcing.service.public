'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

const sqlUp = `
  DELETE FROM companypartner 
  where name = 'Фуджікура';
`;

exports.up = function (db) {
  return db.runSql(sqlUp);
};


const sqlDown = `

INSERT INTO "companypartner"
  ("name", "description")
VALUES 
  ('Фуджікура', ''),

`;

exports.down = function (db) {
  return db.runSql(sqlDown);
};

exports._meta = {
  "version": 1
};
