module.exports = {
  apps: [
    {
      name: "JCWD-0206-03", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 2603,
      },
      time: true,
    },
  ],
};
