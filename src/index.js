// ref:
// - https://umijs.org/plugins/api

export default function(api) {
  api.logger.info('use plugin');

  api.describe({
    key: 'headerExtraLinks',
    config: {
      schema(joi) {
        return joi.array();
      },
    },
  });

  api.describe({
    key: 'babelExtraOption',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });

  if (api.userConfig.headerExtraLinks) {
    api.addHTMLLinks(() => {
      const result = (api.config.headerExtraLinks || []).map(o => {
        return {
          rel: 'stylesheet',
          href: o,
        };
      });

      return result;
    });
  }

  if (api.userConfig.babelExtraOption) {
    api.modifyBabelOpts(babelOpts => {
      return { ...babelOpts, ...(api.userConfig.babelExtraOption || {}) };
    });
  }
}
