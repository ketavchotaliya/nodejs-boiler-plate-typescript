import i18n from 'i18n';

i18n.configure({
  defaultLocale: 'en',
  // where to store json files - defaults to './locales' relative to modules directory
  directory: __dirname + '/../../locales',
  // setup some locales - other locales default to en silently
  locales: ['en'],
  // sets a custom cookie name to parse locale settings from - defaults to NULL
  cookie: 'breakdown-analytics-admin',
  // watch for changes in json files to reload locale on updates - defaults to false
  autoReload: true,
  // enable object notation
  // enable object notation
  objectNotation: true
});

export { i18n };
