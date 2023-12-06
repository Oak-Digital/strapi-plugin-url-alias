import _ from 'lodash';
import { Schema } from '@strapi/strapi';
import { IStrapi } from '../../types/strapi';

const migrateToNativeRelation = (strapi: IStrapi) => {
  Object.values(strapi.contentTypes).map(async (contentType: Schema.ContentType) => {
    const notMigrated = _.get(contentType.pluginOptions, ['url-alias', 'enabled'], false) as boolean;

    if (!notMigrated) {
      return;
    }

    const pagesToBeMigrated = await strapi.entityService.findMany(contentType.uid, {
      // @ts-ignore
      fields: 'url_path_id',
      filters: {
        // @ts-ignore
        url_path_id: {
          $notNull: true,
        },
      },
    });

    pagesToBeMigrated.map(async (page) => {
      await strapi.entityService.update(contentType.uid, page.id, {
        data: {
          // @ts-ignore
          url_alias: Number(page.url_path_id),
          url_path_id: null,
        },
      });
    });
  });
};

export default migrateToNativeRelation;
