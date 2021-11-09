module.exports = (ctx,next) => {

  if (!ctx.request.query["post.author"]) {
    return ctx.unauthorized("You must provide a post.author query parameter")
  }

  const targetUser = String(ctx.request.query["post.author"])
  const loggedInUser = String(ctx.state.user.id)

  if (targetUser === loggedInUser) {
    return next()
  } else {
    return ctx.unauthorized("Target user is different than logged in user")
  }


}
// End module.exports
// End 1.js
// Start 1.js
// Language: javascript
// Path: project3-quickstart\first-strapi-app\api\like\config\policies\postAuthorIsMe.js
