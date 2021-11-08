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
      const {user} = ctx.state;
      console.log("user", user)

       entity = await strapi.services.post.create({...data, ...{likes: 0, author: user}}, { files,  });
     } else {
       ctx.throw(400, 'You must submit a multipart req')
     }
     return sanitizeEntity(entity, { model: strapi.models.post });
   },

   async update(ctx) {
    const { id } = ctx.params;
    const {user} = ctx.state;

    let entity;
    if (ctx.is('multipart')) {
     ctx.throw(400, 'Please only update descripton')
    } else {
      delete ctx.request.body.likes
      entity = await strapi.services.post.update({ id, author: user.id }, ctx.request.body);
      //only works if post is owned and exists
    }

    return sanitizeEntity(entity, { model: strapi.models.post });
  },

  async delete(ctx) {
    const { id } = ctx.params;
    const {user} = ctx.state;
    const entity = await strapi.services.post.delete({ id, author: user.id });
    return sanitizeEntity(entity, { model: strapi.models.post });
  },

 };
