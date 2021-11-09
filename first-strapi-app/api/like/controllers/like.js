'use strict';

// const post = require("../../post/controllers/post");

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {

  async create(ctx) {

    let entity;
    const { user } = ctx.state;
    const { post } = ctx.request.body;


    if (typeof post !== 'number') {
      ctx.throw(400, "please only pass id for post");
    }

    const realPost = await strapi.services.post.findOne({ id: post });

    if (!realPost) {
      ctx.throw(400, "post not found");
    }

    const found = await strapi.services.like.findOne({ user: user.id, post: post });

    if (found) {
      ctx.throw(400, "already liked");
    }

    if (ctx.is('multipart')) {

      ctx.throw(ctx, 400, "multipart not supported");

    } else {
      entity = await strapi.services.like.create({
        post,
        user
      });
    }
    const { likes } = realPost

    const updatedPost = await strapi.services.post.update({
      id: post
    },
      {
        likes: likes + 1
      })

    return sanitizeEntity(entity, { model: strapi.models.like });
  },
  async delete(ctx) {


    const { postId } = ctx.params;
    const { user } = ctx.state;

    const post = parseInt(postId)

    if (typeof post !== 'number') {
      return ctx.throw(400, "please only pass id for post");
    }

    const entity = await strapi.services.like.delete({ post, user: user.id });

    if (entity.length) {
      const { likes } = entity[0].post
      const updatedPost = await strapi.services.post.update({
        id: post
      },
        {
          likes: likes - 1
        });
    }
    return sanitizeEntity(entity[0], { model: strapi.models.like });

  },

};
