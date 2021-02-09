module.exports = {
  ci: {
    collect: {
      staticDistDir: "./public",
      autodiscoverUrlBlocklist:
        "http://localhost/offline-plugin-app-shell-fallback/index.html",
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
}
