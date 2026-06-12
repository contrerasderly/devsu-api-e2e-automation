function fn() {
  var config = {
    baseUrl: 'https://petstore.swagger.io/v2',
    connectTimeout: 30000,
    readTimeout: 30000,
  };

  karate.configure('connectTimeout', config.connectTimeout);
  karate.configure('readTimeout', config.readTimeout);
  karate.configure('ssl', true);

  return config;
}
