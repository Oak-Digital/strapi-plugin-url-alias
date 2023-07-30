'use strict';

export default [
  {
    method: "GET",
    path: "/pattern/findOne/:id",
    handler: "pattern.findOne",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/pattern/findMany",
    handler: "pattern.findMany",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/pattern/delete/:id",
    handler: "pattern.delete",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/pattern/update/:id",
    handler: "pattern.update",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/pattern/create",
    handler: "pattern.create",
    config: {
      policies: [],
    },
  },
  {
    method: "GET",
    path: "/pattern/allowed-fields",
    handler: "pattern.allowedFields",
    config: {
      policies: [],
    },
  },
  {
    method: "POST",
    path: "/pattern/validate",
    handler: "pattern.validatePattern",
    config: {
      policies: [],
    },
  },
];
