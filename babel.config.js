module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript"
  ],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@modules/*": ["./src/modules/*"],
          "@config/*": ["./srcconfig/*"],
          "@shared/*": ["./srcshared/*"],
          "@errors/*": ["./srcerrors/*"],
          "@utils/*": [".src/utils/*"]
        },
      },
    ],
    "babel-plugin-transform-typescript-metadata",
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }]
  ]
}