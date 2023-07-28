'use strict';

export default [
  {
    method: "GET",
    path: "/info/getContentTypes",
    handler: "info.getContentTypes",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/info/getLanguages",
    handler: "info.getLanguages",
    config: {
      policies: [],
    },
  },
];
