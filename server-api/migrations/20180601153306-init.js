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
  CREATE TABLE "user" (
    "login"    varchar(40) NOT NULL CONSTRAINT firstkey PRIMARY KEY,
    "password"  varchar(256) NOT NULL
  );

  CREATE TABLE companyInfo (
    "id"        SERIAL PRIMARY KEY,
    title       varchar(256) NOT NULL,
    subTitle  varchar(256) NULL
  );

  CREATE TABLE contact (
    "id"        SERIAL PRIMARY KEY,
    city       varchar(256) NOT NULL,
    street  varchar(256) NULL,
    primaryPhone varchar(256) NULL,
    mobPhones varchar(256) NULL
  );

  CREATE TABLE companyPartner (
    "id"        SERIAL PRIMARY KEY,
    name       varchar(256) NOT NULL,
    description  varchar(512) NULL,
    "imageRef"  varchar(512) NULL
  );

  CREATE TABLE companyServices (
    "id"        SERIAL PRIMARY KEY,
    name       varchar(256) NOT NULL,
    description  varchar(512) NULL
  );

  CREATE TABLE jobVacancy (
    "id"        SERIAL PRIMARY KEY,
    name       varchar(256) NOT NULL,
    description  varchar(512) NULL,
    gender varchar(5) NOT NULL
  );
`;

exports.up = function (db) {
  return db.runSql(sqlUp);
};


const sqlDown = `
DROP TABLE "user";
DROP TABLE companyInfo;
DROP TABLE companyPartner;
DROP TABLE companyServices;
DROP TABLE jobVacancy;
DROP TABLE contact
`;

exports.down = function (db) {
  return db.runSql(sqlDown);
};

exports._meta = {
  "version": 1
};
