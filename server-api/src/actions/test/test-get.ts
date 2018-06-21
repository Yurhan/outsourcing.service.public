import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IDataService } from '../../service/data-services';
import { ICompanyInfo } from '../../models';
import * as TYPES from '../../types';

import { Pool, PoolConfig } from 'pg';

export function testGetRouteHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.timer.testGetRouteHandler');
  logger.info('GET ALL /testGetRouteHandler');
  // let service = req.kernel.get<IDataService<ICompanyInfo>>(Symbol.for('IDataService<ICompanyInfo>'));

  // res.jsonPromise(service.getAll().then(res => res[0]));
  let config: PoolConfig = {
    host: 'localhost',
    password: 'yurshmir90',
    database: 'outsource_service',
    user: 'postgres'//,
    //port: 61649
  };
  let pool = new Pool(config);

  pool.connect()
    .then(client => {
      client.query('SELECT * FROM companyInfo', [])
        .then(dbRes => {
          client.release();
          console.log(dbRes);
          res.json(dbRes);
        })
        .catch(err => {
          client.release();
          console.log(err.stack);
          res.status(500).send(err.message);
        })
    });
  // res.json({ success: true });
  // const client = await pool.connect()
  // const stream = client.query(new QueryStream('select *'))
  // stream.on('end', client.release)
  // stream.pipe(res) // ..etc

  // pool.query('SELECT * FROM companyInfo;', [], (err, dbRes) => {
  //   console.log(dbRes);
  //   if (err) {
  //     res.status(500).send(err.message);
  //   } else {
  //     res.json(dbRes);
  //   }
  // });
}
