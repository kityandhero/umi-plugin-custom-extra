// ref:
// - https://umijs.org/plugins/api

export default function(api) {
  api.logger.info('use umi-plugin-custom-extra');

  api.describe({
    key: 'extraCustomOption',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });

  if (api.userConfig.extraCustomOption) {
    const headerExtraLinks =
      api.userConfig.extraCustomOption.headerExtraLinks || [];

    if (headerExtraLinks.length > 0) {
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

    if ((api.userConfig.extraCustomOption.babelCompact || 'auto') !== 'auto') {
      if (typeof api.userConfig.extraCustomOption.babelCompact === 'boolean') {
        api.modifyBabelOpts(babelOpts => {
          babelOpts.compact = api.userConfig.extraCustomOption.babelCompact;

          return babelOpts;
        });
      }
    }
  }
}
