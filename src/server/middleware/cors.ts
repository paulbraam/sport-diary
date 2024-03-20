export default defineEventHandler((event) => {
  // enabled for dev-only
  if (process.env.NODE_ENV === 'development') {
    setResponseHeaders(event, {
      'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Expose-Headers': '*',
      'Access-Control-Allow-Headers': '*'
    });

    if (event.method === 'OPTIONS') {
      event.node.res.statusCode = 204;
      event.node.res.statusMessage = 'No Content.';
      return 'OK';
    }
  }
});
