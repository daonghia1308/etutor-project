/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */
const express = require('express')
module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/

    order: [
      'cookieParser',
      'session',
      'bodyParser',
      'staticUpload',
      "staticUploadFile",
      'compress',
      'logApiCall',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],
    staticUpload: express.static(process.cwd() + '/upload/images'),
    staticUploadFile: express.static(process.cwd() + '/upload/other'),
    logApiCall: (function () {
      return async function (req, res, next) {
        // req.setTimeout(40000);
        let method = req.method;
        let startTime = new Date().getTime();
        let logInfo = sails.helpers.plog.with({
          type: 1,
          content: `request-${req.url} - ${JSON.stringify(req.body)}`
        });
        res.on('finish', async () => {
          sails.helpers.plog.with({
            key: logInfo.key,
            type: 2,
            content: `request-${req.url}-done`
          })
          if (method !== 'OPTIONS') sails.log(method, res.statusCode, req.url, `[${new Date().getTime() - startTime}]`);
        })
        return next();
      }
    })(),

    bodyParser: (function _configureBodyParser() {
      var skipper = require('skipper');
      var middlewareFn = skipper({ strict: true, maxTimeToBuffer: 10000, limit: '20mb' });
      return middlewareFn;
    })(),

  },

};
