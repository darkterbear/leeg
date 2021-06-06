module.exports = {
  apps : [
    {
      name: "leeg-backend",
      script: "server.js",
      cwd: 'server/',
      env: {
        PORT: 3003
      },
      instances: 1,
      autorestart: true,
      watch: false
    },
    {
      name: "leeg-client",
      script: "serve",
      cwd: "client/",
      env: {
        PM2_SERVE_PATH: './',
        PM2_SERVE_PORT: 5003,
      },
      instances: 1,
      autorestart: true,
      watch: false
    },
  ]
}