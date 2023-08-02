
'use strict';

const {
  logMessage,
} = require('..');

describe('Generic utilities', () => {
  describe('Log message formatting', () => {
    const message = logMessage('An error occurred');

    expect(message).toEqual('[strapi-plugin-sitemap]: An error occurred');

  });
});
