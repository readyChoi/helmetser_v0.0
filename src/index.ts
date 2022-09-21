import './pre-start'; // Must be the first import
// import app from '@server';
// import logger from '@shared/Logger';

import app from './Server'
import logger from './shared/Logger'


// Start the server
const port = Number(process.env.PORT || 5000);
// const port = Number(5000);
app.listen(port, () => {
    console.log('Express server started on port : ', port, process.env.PORT)
    logger.info('Express server started on port: ' + port);
    logger.info('\t ' + process.env.PORT);
});
