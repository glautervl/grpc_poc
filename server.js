
var proto_url = __dirname + '/basicmessage.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    proto_url,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var basic_proto = grpc.loadPackageDefinition(packageDefinition).basicmessage;

/**
 * Implements the SayHello RPC method.
 */
function showMessage(call, callback) {
  callback(null, {message: 'Hi Mr. ' + call.request.name});
}

/**
 * Starts an RPC server that receives requests for the BasicService service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(basic_proto.BasicService.service, {showMessage: showMessage});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
