module.exports = {
  apps: [
    {
      name: "stylekit",
      cwd: __dirname,
      script: "./node_modules/next/dist/bin/next",
      args: "start -p 13000",
      interpreter: process.execPath,
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      min_uptime: "10s",
      max_restarts: 10,
      restart_delay: 5000,
      max_memory_restart: "512M",
      kill_timeout: 10000,
      env: {
        NODE_ENV: "production",
        NODE_OPTIONS: "--max-old-space-size=384",
      },
    },
  ],
};
