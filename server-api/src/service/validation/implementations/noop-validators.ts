import {
  // IValidator,
  IBaseTableModelValidator
} from '../interfaces';

// export class AlwaysValidValidator<T> implements IValidator<T> {
//   validate(data: T, error: Array<string>): boolean {
//     return true;
//   }
// }

// export class AlwaysInvalidValidator<T> implements IValidator<T> {
//   validate(data: T, error: Array<string>): boolean {
//     error.push('Invalid params');
//     return false;
//   }
// }

export class AlwaysValidTableModelValidator<T> implements IBaseTableModelValidator<T> {
  validateListForAdd(data: T[], errors?: Array<string>): boolean {
    return true;
  }
  validateListForUpdate(data: T[], errors?: Array<string>): boolean {
    return true;
  }
  validateListForDelete(data: T[], errors?: Array<string>): boolean {
    return true;
  }
}

export class AlwaysInvalidTableModelValidator<T> implements IBaseTableModelValidator<T> {
  validateListForAdd(data: T[], errors?: Array<string>): boolean {
    if (errors) {
      errors.push('Invalid list for add');
    }
    return false;
  }
  validateListForUpdate(data: T[], errors?: Array<string>): boolean {
    if (errors) {
      errors.push('Invalid list for update');
    }
    return false;
  }
  validateListForDelete(data: T[], errors?: Array<string>): boolean {
    if (errors) {
      errors.push('Invalid list for delete');
    }
    return false;
  }
}
