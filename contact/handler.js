'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES();

function sendEmail(data, callback) {
  const params = {
    Source: 'hi@dbushell.com',
    ReplyToAddresses: [data.replyTo],
    Destination: {
      ToAddresses: ['hi@dbushell.com']
    },
    Message: {
      Body: {
        Text: {
          Charset: 'UTF-8',
          Data: `Name: ${String(data.name).substr(0, 100)}\nEmail: ${String(
            data.replyTo
          ).substr(0, 100)}\n\nEnquiry:\n${String(data.enquiry).substr(
            0,
            10000
          )}`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `dbushell.com enquiry: ${data.name}`
      }
    }
  };
  SES.sendEmail(params, callback);
}

function contactHandler(event, context, callback) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://dbushell.com'
  };
  try {
    sendEmail(JSON.parse(event.body), (err, data) => {
      callback(null, {
        statusCode: err ? 500 : 200,
        headers,
        body: JSON.stringify({
          message: err ? err.message : data
        })
      });
    });
  } catch (err) {
    callback(null, {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        message: err ? err.message : 'No error message'
      })
    });
  }
}

module.exports = {
  contact: contactHandler
};
