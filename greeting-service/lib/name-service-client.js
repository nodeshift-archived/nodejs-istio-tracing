/*
 *
 *  Copyright 2016-2017 Red Hat, Inc, and individual contributors.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */
'use strict';
const request = require('request');

module.exports = (endpoint, headers) => {
  return new Promise((resolve, reject) => {
    const options = {
      url: endpoint,
      headers: {
        'x-request-id': headers['x-request-id'],
        'x-b3-traceid': headers['x-b3-traceid'],
        'x-b3-spanid': headers['x-b3-spanid'],
        'x-b3-parentspanid': headers['x-b3-parentspanid'],
        'x-b3-sampled': headers['x-b3-sampled'],
        'x-b3-flags': headers['x-b3-flags'],
        'x-ot-span-context': headers['x-ot-span-context'],
        'user-agent': headers['user-agent']
      }
    };

    request(options, (error, response, body) => {
      if (response.statusCode !== 200) {
        return reject();
      }

      return resolve(body);
    });
  });
};
