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
    api.logger.info(JSON.stringify(api.userConfig.extraCustomOption));

    const headerExtraLinks =
      api.userConfig.extraCustomOption.headerExtraLinks || [];

    if (headerExtraLinks.length > 0) {
      api.addHTMLLinks(() => {
        const result = headerExtraLinks.map(o => {
          return {
            rel: 'stylesheet',
            href: o,
          };
        });

        return result;
      });
    }

    if (typeof api.userConfig.extraCustomOption.babelCompact === 'boolean') {
      api.modifyBabelOpts(babelOpts => {
        babelOpts.compact = api.userConfig.extraCustomOption.babelCompact;

        api.logger.info(JSON.stringify({ babelConfig: babelOpts }));

        return babelOpts;
      });
    }
  }
}
