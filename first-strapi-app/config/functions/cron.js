"use strict";

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }
  "* * * * * * *": async () => {
    console.log("once a day at midnight");
    // const users = await strapi.plugins[
    //   "users-permissions"
    // ].services.user.fetchAll({});

    // const res = await Promise.all(
    //   users.map(async (user) => {
    //     const post = await strapi.services.post.find({ author: user.id });
    //     console.log("post.length", post.length);
    //     const total = post.reduce((sum, post) => sum + post.likes, 0);

    //     await strapi.plugins["email"].services.email.send({
    //       to: user.email,
    //       from: "StrapiTest@localhost",
    //       subject: "Your daily likes",
    //       text: `You have ${total} likes today.`,
    //     });
    //   })
    // );
  },
};
