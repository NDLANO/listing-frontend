const hmrPort = parseInt(process.env.PORT, 10) + 1;

const scriptSrc = (() => {
  const defaultScriptSrc = [
    "'self'",
    "'unsafe-inline'",
    " 'unsafe-eval'",
    'https://*.ndla.no',
    'https://players.brightcove.net',
    'http://players.brightcove.net',
    'https://players.brightcove.net',
    '*.nrk.no',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://tagmanager.google.com',
    'https://www.youtube.com',
    'https://s.ytimg.com',
    'https://cdn.auth0.com',
    'https://vjs.zencdn.net',
    'https://httpsak-a.akamaihd.net',
    '*.brightcove.com',
    '*.brightcove.net',
    'bcove.me',
    'bcove.video',
    '*.api.brightcove.com',
    '*.o.brightcove.com',
    'players.brightcove.net',
    'hls.ak.o.brightcove.com',
    'uds.ak.o.brightcove.com',
    'brightcove.vo.llnwd.net',
    '*.llnw.net',
    '*.llnwd.net',
    '*.edgefcs.net',
    '*.akafms.net',
    '*.edgesuite.net',
    '*.akamaihd.net',
    '*.analytics.edgekey.net',
    '*.deploy.static.akamaitechnologies.com',
    '*.cloudfront.net',
    'hlstoken-a.akamaihd.net',
    'vjs.zencdn.net',
    ' *.gallerysites.net',
    'ndla.no',
    '*.ndla.no',
    'ws://*.hotjar.com',
    'wss://*.hotjar.com',
    'https://*.hotjar.com',
  ];
  if (process.env.NODE_ENV === 'development') {
    return [...defaultScriptSrc, `http://localhost:${hmrPort}`];
  }
  return defaultScriptSrc;
})();

const connectSrc = (() => {
  const defaultConnectSrc = [
    " 'self' ",
    'https://*.ndla.no',
    'https://logs-01.loggly.com',
    'https://edge.api.brightcove.com',
    'https://secure.brightcove.com',
    'https://bcsecure01-a.akamaihd.net',
    'https://hlsak-a.akamaihd.net',
    'https://www.google-analytics.com',
    'ws://*.hotjar.com wss://*.hotjar.com',
    'https://*.hotjar.com',
    'https://*.hotjar.com:*',
  ];
  if (process.env.NODE_ENV === 'development') {
    return [
      ...defaultConnectSrc,
      `http://localhost:${hmrPort}`,
      `ws://localhost:${hmrPort}`,
      'https://devtools.apollodata.com/graphql',
      'http://localhost:4000',
    ];
  }
  return defaultConnectSrc;
})();

export default {
  directives: {
    scriptSrc,
    connectSrc,
    defaultSrc: ["'self'", 'blob:'],
    frameSrc: [
      '*.nrk.no',
      'https://www.youtube.com',
      'players.brightcove.net',
      'ndla.no',
      '*.ndla.no',
      '*.ndlah5p.com',
      'https://*.hotjar.com',
    ],
    workerSrc: ["'self'", 'blob:'],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      'https://tagmanager.google.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ],
    fontSrc: [
      "'self'",
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://*.hotjar.com',
      'data:',
    ],
    imgSrc: [
      "'self'",
      'https://*.ndla.no',
      'https://www.google-analytics.com',
      'https://ssl.gstatic.com',
      'https://www.gstatic.com',
      'https://stats.g.doubleclick.net',
      'http://metrics.brightcove.com',
      'https://httpsak-a.akamaihd.net',
      'https://www.nrk.no/',
      'https://*.hotjar.com',
      ' data:',
    ],
    mediaSrc: ["'self'", 'blob:', 'https://*.ndla.no'],
  },
};
