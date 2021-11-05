'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

 module.exports = {
   /**
    * Create a record.
    *
    * @return {Object}
    */

   async create(ctx) {
     let entity;
     if (ctx.is('multipart')) {
       const { data, files } = parseMultipartData(ctx);

       if (!data || !data.description || !data.title) {
         ctx.throw(400, "please add some data")
       }
       if (!files || !files.image) {
        ctx.throw(400, "please add a file")
      }
       entity = await strapi.services.post.create({...data, likes: 0,}, { files,  });
     } else {
       ctx.throw(400, 'You must submit a multipart req')
     }
     return sanitizeEntity(entity, { model: strapi.models.post });
   },
 };
