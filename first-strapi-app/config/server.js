module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron: {
    enabled: env.bool('CRON_ENABLED', true),
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '5e4926f7d3c856d1ab2dec3cd3d9769b'),
    },
  },
});
