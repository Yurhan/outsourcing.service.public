import { IJsonResponse, IAppRequest } from '../../middlewares';
import { ILoggerFactory } from '../../common/logger';
import { IDataService } from '../../service/data-services';
import { IUnitOfWork } from '../../service/unit-of-work';
import { ICompanyInfo } from '../../models';
// import * as validation from '../../service/validation';
import * as TYPES from '../../types';
import * as path from 'path';
import * as uuid from 'node-uuid';

export function postPictureHandler(req: IAppRequest, res: IJsonResponse): void {
  let logger = req.kernel.get<ILoggerFactory>(TYPES.LOGGER_FACTORY).getLogger('actions.timer.postPictureHandler');
  logger.info('Upload /Picture');
  // let service = req.kernel.get<IDataService<ICompanyInfo>>(Symbol.for('IDataService<ICompanyInfo>'));
  // let unitOfWork = req.kernel.get<IUnitOfWork>(TYPES.UNIT_OF_WORK);

  // let companyInfo: ICompanyInfo = req.body;

  // res.jsonPromise(unitOfWork.beginAutoCommitTransaction(service.update(companyInfo)));

  console.log('Upload Picture');
  if (!req.files) {
    res.status(400).send('No files were uploaded');
    return;
  }

  console.log(req.files);
  let file: any = req.files.upload;
  let generatedFileName = `${uuid.v4()}_${file.name}`;
  let fileAddress = path.join(path.dirname(process.env.INIT_CWD), '\\www-ui\\src\\static', generatedFileName);
  console.log('Before move');
  file.mv(fileAddress, (err) => {
    console.log('after move');
    if (err) {
      return res.status(500).send(err);
    }
    console.log('after move');
    res.send(`${generatedFileName}`);
  });
}
