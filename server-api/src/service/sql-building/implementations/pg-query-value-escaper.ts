
import { injectable } from 'inversify';
import { string } from 'pg-escape';
import { IQueryValueEscaper } from '..';

@injectable()
export class PgQueryValueEscaper implements IQueryValueEscaper {

  constructor() { }

  public escape(value: any): string {
    let res = string(value);
    // res = escape.ident(value);
    // res = escape.dollarQuotedString(value);
    // res = escape.literal(value);
    return res;
  }
}
