import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IPictureService } from '../../service';
import * as TYPES from '../../types';
import * as stream from 'stream';

export function getPictureRouteHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.timer.getPictureRouteHandler');
  logger.info('GET /getPictureRouteHandler');
  let service = req.kernel.get<IPictureService>(TYPES.PICTURE_SERVICE);

  let id = req.params.id;

  service.getById(id)
    .then(picture => {
      let readStream = new stream.PassThrough();
      readStream.end(picture.content);
      console.log(picture.name);
      console.log(picture.mimeType);
      console.log(picture.pictureAddress);

      res.setHeader('Content-disposition', 'attachment; filename=' + encodeURIComponent(picture.name));
      console.log('file name setted');
      res.setHeader('Content-type', picture.mimeType);
      console.log('content type setted');
      console.log('before pipe');
      readStream.pipe(res);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}
