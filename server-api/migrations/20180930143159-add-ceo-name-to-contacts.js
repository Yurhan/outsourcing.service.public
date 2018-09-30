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
  ALTER TABLE contact
  ADD COLUMN ceo_name varchar(256);

  UPDATE contact
  SET ceo_name='Тарас Квасниця';

  ALTER TABLE contact
  ALTER COLUMN ceo_name SET NOT NULL;
`;

exports.up = function (db) {
  return db.runSql(sqlUp);
};


const sqlDown = `
  ALTER TABLE contact
  DROP COLUMN IF EXISTS ceo_name;
`;

exports.down = function (db) {
  return db.runSql(sqlDown);
};

exports._meta = {
  "version": 1
};
