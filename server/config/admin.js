module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'af59b2cd15b9f33811da2f4605a69f7d'),
  },
});
