import * as exp from 'express';
import * as path from 'path';
import * as fallback from 'express-history-api-fallback/dist';

let app = exp();
let port = process.env.PORT;
let publicPath = path.resolve(__dirname, 'public');

console.log(publicPath);
app.use('/static', exp.static(publicPath));
app.use(fallback('index.html', { root: publicPath }));

app.listen(port);
