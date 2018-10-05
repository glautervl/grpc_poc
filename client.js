
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
// var proto_url = __dirname + '/basicmessage.proto';
// var proto_url = __dirname + '/object_detection.proto';
var proto_url = __dirname + '/sentiment_analysis_rpc.proto';

var packageDefinition = protoLoader.loadSync(
    proto_url,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });

// console.log("packageDefinition")
// console.log(JSON.stringify(packageDefinition));


var Reflector = function(obj) {
  this.getProperties = function() {
    var properties = [];
    for (var prop in obj) {
      if (typeof obj[prop] != 'function' || obj[prop] != undefined ) {
        properties.push(prop);
      }
    }
    return properties;
  };
}

var ProtoServices = function(){
  this.services = {};
  this.getMethods = function(service){
    return this.services[service];
  }
  this.loadProtoObj = function(protoObj){
      for(var serviceItem in protoObj) {
          var serviceName = serviceItem.split(".")[1];
          var methods = [];
          for(var methodItem in protoObj[serviceItem]) {
            methods.push(methodItem);
          }
          this.services[serviceName] = methods;
      }
  }
};

// var services = {};
// for(var serviceItem in packageDefinition) {
//   var serviceName = serviceItem.split(".")[1];
//   var methods = [];
//   for(var methodItem in packageDefinition[serviceItem]) {
//     console.log(methodItem);
//     methods.push(methodItem);
//   }
//   services[serviceName] = methods;
// }
// console.log(JSON.stringify(services));
// var protoService = new ProtoServices();
// protoService.loadProtoObj(packageDefinition);
// console.log(JSON.stringify(protoService.getMethods("BasicService")));
// var funcao = function(){
//   return console.log("executando funcao");
// }
// funcao();
// var tempFunction = new Function('name', 'return console.log("Olá, " + name + "!");');
// tempFunction('Cássio');

// var basic_proto = grpc.loadPackageDefinition(packageDefinition).basicmessage;

// function main() {
//   var client = new basic_proto.BasicService('localhost:50051', grpc.credentials.createInsecure());

//   var user;
//   if (process.argv.length >= 3) {
//     user = process.argv[2];
//   } else {
//     user = 'I am a node client ! Nice to meet you :)';
//   }
//   client.showMessage({name: user}, function(err, response) {
//     console.log('Show message:', response.message);
//   });
// }

var basic_proto = grpc.loadPackageDefinition(packageDefinition).sentiment_analysis_rpc;
// console.log(basic_proto);

function main() {
  var client = new basic_proto.ShowMessage('localhost:50051', grpc.credentials.createInsecure());

  // console.log(client);

  client.show({value: "testandoooo"}, function(err, response) {
    console.log(JSON.stringify(response));
    console.log(JSON.stringify(err));
  });
}


main();
