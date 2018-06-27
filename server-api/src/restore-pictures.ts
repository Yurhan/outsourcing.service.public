import kernel from './ioc-config';
import { bindRequestScope } from './ioc-request-scope-config';
import * as TYPE from './types';
import { IPictureService, IDataService } from './service';
import { ICompanyPartner } from './models';
import { IUnitOfWork } from './service/unit-of-work';
import { ISqlDataDriver } from './service/sql-data-access';

bindRequestScope(kernel);

(function restorePictures(): void {
  let pictureService = kernel.get<IPictureService>(TYPE.PICTURE_SERVICE);
  let companyPartnerService = kernel.get<IDataService<ICompanyPartner>>(TYPE.COMPANY_PARTNER_SERVICE);
  let unitOfWork = kernel.get<IUnitOfWork>(TYPE.UNIT_OF_WORK);
  let sqlDriver = kernel.get<ISqlDataDriver>(TYPE.SQL_DATA_DRIVER);
  unitOfWork.beginAutoCommitTransaction(
    companyPartnerService.getAll()
      .then(partners => {
        let imgIds = partners.map(p => p.imageRef).filter(img => img && img.trim() !== '');
        return pictureService.deleteUnAssigned(<string[]>imgIds);
      })
      .then(() => pictureService.copyAllToStorage())
  )
    .then(() => sqlDriver.end())
    .then(() => process.exit(0));
})();