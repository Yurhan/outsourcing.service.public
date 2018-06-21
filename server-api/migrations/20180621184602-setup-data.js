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
INSERT INTO "companyinfo"
  (title, subtitle)
VALUES
  ('Ми не беремо гроші за ваше працевлаштування', 'Не їдь в Європу - ми маємо роботу');

INSERT INTO "companyservices"
  ("name", "description")
VALUES
  ('Аутсорсинг', ''),
  ('Аутстафінг', ''),
  ('Рекрутинг', '');

INSERT INTO "companypartner"
  ("name", "description")
VALUES
  ('Нестле', ''),
  ('Світоч', ''),
  ('Торчин', ''),
  ('Перша приватна броварня', ''),
  ('Фуджікура', ''),
  ('Ярич', '');

INSERT INTO "jobvacancy"
  ("name", "description", "gender")
VALUES
  ('Транспортувальник', '', 'Man'),
  ('Вантажник', '', 'Man'),
  ('Двірник', '', 'Man'),
  ('Комплектувальник', '', 'Man'),
  ('Комірник', '', 'Man'),
  ('Диспечер', '', 'Man'),
  ('Водій автонавантажувач', '', 'Man'),
  ('Слюсар з контрольно-вимірювальних приладів', '', 'Man'),
  ('Слюсар-ремонтник', '', 'Man'),
  ('Приймальник-здавальник', '', 'Man'),
  ('Налагоджувальник устаткування у виробництві харчової продукції', '', 'Man'),
  ('Машиніст розфасувального-пакувальних машин', '', 'Man'),
  ('Ліфтер', '', 'Man'),
  ('Інженер-електронік', '', 'Man'),
  ('Інженер з контрольно вимірюваних приладів', '', 'Man'),
  ('Укладниця-пакульниця', '', 'Woman'),
  ('Сіккерувальниця', '', 'Woman'),
  ('Прибиральниця', '', 'Woman');
`;

exports.up = function (db) {
  return db.runSql(sqlUp);
};


const sqlDown = `
DELETE FROM companyinfo;
DELETE FROM companypartner;
DELETE FROM companyservices;
DELETE FROM jobvacancy;
`;

exports.down = function (db) {
  return db.runSql(sqlDown);
};

exports._meta = {
  "version": 1
};
