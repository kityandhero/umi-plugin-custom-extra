import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [require.resolve('../lib')],
  extraCustomOption: {
    headerExtraLinks: ['/home.css'],
    babelCompact: false,
  },
});
