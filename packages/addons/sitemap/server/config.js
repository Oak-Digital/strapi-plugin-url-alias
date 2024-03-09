'use strict';

export default {
  default: {
    cron: '0 0 0 * * *',
    limit: 45000,
    xsl: true,
    autoGenerate: false,
    caching: true,
    allowedFields: ['id', 'uid'],
    excludedTypes: [
      'admin::permission',
      'admin::role',
      'admin::user',
      'admin::api-token',
      'admin::transfer-token-permission',
      'admin::transfer-token',
      'admin::api-token-permission',
      'plugin::i18n.locale',
      'plugin::users-permissions.permission',
      'plugin::users-permissions.role',
      'plugin::webtools-addon-sitemap.sitemap',
      'plugin::upload.folder',
    ],
  },
  validator() {},
};
