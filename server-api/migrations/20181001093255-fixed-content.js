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
  update jobVacancy
  set name = 'Стікерувальниця'
  where name = 'Сіккерувальниця';
 
  update companyServices
  set description = 'Передача компанією частини її завдань або процесів стороннім виконавцям на умовах субпідряду. Це угода, за якою робота виконується людьми з зовнішньої компанії, які зазвичай є також експертами у цьому виді робіт. Аутсорсинг часто використовується для скорочення витрат.'
  where name = 'Аутсорсинг';
  
  update companyServices
  set description = 'Вивід персоналу за штат компанії-замовника і оформлення його у штат компанії-провайдера. Ідея аутстафінгу персоналу полягає у тому, що співробітники, формально працевлаштовані в компанії-провайдері, але в той же час виконували свої обовязки на попередньому місці роботи.'
  where name = 'Аутстафінг';
  
  update companyServices
  set description = 'Підбір персоналу в штат компанії, або під замовлення клієнта у випадку рекрутингового агентства; основна функція і обовязок менеджерів по персоналу та рекрутерів.'
  where name = 'Рекрутинг';

`;

exports.up = function (db) {
  return db.runSql(sqlUp);
};


const sqlDown = `
  update jobVacancy
  set name = 'Сіккерувальниця'
  where name = 'Стікерувальниця';

  update companyServices
  set description = null
  where name = 'Аутсорсинг';

  update companyServices
  set description = null
  where name = 'Аутстафінг';

  update companyServices
  set description = null
  where name = 'Рекрутинг';
`;

exports.down = function (db) {
  return db.runSql(sqlDown);
};

exports._meta = {
  "version": 1
};
