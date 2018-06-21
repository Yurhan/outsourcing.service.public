import * as exp from 'express';
import * as path from 'path';
import * as fallback from 'express-history-api-fallback/dist';
import * as config from 'config';

let app = exp();
let port = process.env.PORT;
let publicPath = path.resolve(__dirname, 'public');

console.log(publicPath);

const servicesConfig = config.get('googleMapApiKey');
app.get(
  '/configs',
  (req: exp.Request, res: exp.Response) => {
    res.type('json').send(servicesConfig);
  });

app.use('/static', exp.static(publicPath));
app.use(fallback('index.html', { root: publicPath }));

app.listen(port);
