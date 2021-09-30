var chai = require('chai')
  , spies = require('chai-spies');
chai.use(spies);
process.on('unhandledRejection', (error) => {
  console.log(error.stack);
  // application specific logging, throwing an error, or other logic here
});
