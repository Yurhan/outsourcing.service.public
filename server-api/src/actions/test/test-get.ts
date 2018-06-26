import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IPictureService } from '../../service';
import { IPicture } from '../../models';
import * as TYPES from '../../types';

import * as fs from 'fs';
import * as stream from 'stream';

export function testGetRouteHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.timer.testGetRouteHandler');
  logger.info('GET ALL /testGetRouteHandler');
  let service = req.kernel.get<IPictureService>(TYPES.PICTURE_SERVICE);

  service.getAll()
    .then(res => res[0])
    .then(file => {
      console.log('HERE!!!');
      console.log(file.content);
      let readStream = new stream.PassThrough();
      readStream.end(file.content);
      console.log('after creating stream');
      res.setHeader('Content-disposition', 'attachment; filename=' + file.name);
      res.setHeader('Content-type', file.mimeType);
      console.log('before pipe');
      readStream.pipe(res);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}
