// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
 module.exports = {
    devServer: {
        proxy: 'https://api.lib.byu.edu/',
    }
  }
  