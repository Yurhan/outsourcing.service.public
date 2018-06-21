import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import kernel from './ioc-config';
import { IConfig } from './common/config';
import * as middlewares from './middlewares';
import { ILoggerFactory } from './common/logger';

import * as swagger from './swagger';
import * as auth from './authentication';

import * as companyInfo from './actions/company-info';
import * as companyPartner from './actions/company-partner';
import * as companyServices from './actions/company-services';
import * as jobVacancy from './actions/job-vacancy';
import * as user from './actions/user';
import * as test from './actions/test';

let app = express();

auth.init(app, kernel);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(middlewares.addRegularRequestHandler(kernel));
app.use(middlewares.addJsonResponseHandler());

let config = kernel.get<IConfig>(Symbol.for('IConfig'));
let logfactory = kernel.get<ILoggerFactory>(Symbol.for('ILoggerFactory'));
let systemLog = logfactory.getLogger('appsetup');

companyInfo.init(app);
companyPartner.init(app);
companyServices.init(app);
jobVacancy.init(app);
user.init(app);
test.init(app);
swagger.init(app);

app.use(middlewares.addErrorRequestHandler(app.get('env'), systemLog));

let stopServer = (): void => {
  systemLog.info(`$ server stopped working`);
  process.exit(0);
}

let port = config.get<number>('port');
app.listen(port, () => {
  systemLog.info(`Server running on port ${port}`);
});

// listen for TERM signal .e.g. kill
process.once('SIGTERM', stopServer);
// listen for INT signal e.g. Ctrl-C
process.once('SIGINT', stopServer);

export default app;