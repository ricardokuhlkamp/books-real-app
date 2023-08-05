const mapStatusHTTP = (status) => {
  const statusHTTPMap = {
    NOTFOUND: 404,
    UNAUTHORIZED: 401,
    SUCCESSFUL: 200,
    CREATED: 201,
    BADREQUEST: 400,
  };
  return statusHTTPMap[status] ?? 500;
}

module.exports = mapStatusHTTP;
