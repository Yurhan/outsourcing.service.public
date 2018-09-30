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
  CREATE TABLE job_vacancy_description_record (
    "id"       SERIAL PRIMARY KEY,
    "job_vacancy" INTEGER,
    "type" varchar(40),
    description  varchar(1024) NULL
  );

  ALTER TABLE job_vacancy_description_record
  ADD CONSTRAINT FK_job_vacancy_description_record FOREIGN KEY (job_vacancy) REFERENCES jobVacancy (id);
`;

exports.up = function (db) {
  return db.runSql(sqlUp);
};


const sqlDown = `
DROP TABLE job_vacancy_description_record;
`;

exports.down = function (db) {
  return db.runSql(sqlDown);
};

exports._meta = {
  "version": 1
};
