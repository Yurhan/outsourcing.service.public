import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IUnitOfWork } from '../../service/unit-of-work';
// import * as validation from '../../service/validation';
import * as TYPES from '../../types';
import { IPictureService } from '../../service';

export function postPictureHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.timer.postPictureHandler');
  logger.info('Upload /Picture');

  console.log('Upload Picture');
  if (!req.files) {
    res.status(400).send('No files were uploaded');
    return;
  }

  let service = req.kernel.get<IPictureService>(TYPES.PICTURE_SERVICE);
  let unitOfWork = req.kernel.get<IUnitOfWork>(TYPES.UNIT_OF_WORK);
  let file: any = req.files.upload;
  res.jsonPromise(unitOfWork.beginAutoCommitTransaction(() => service.upload(file.name, file.mimetype, file.data)));
}
