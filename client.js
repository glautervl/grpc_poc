
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

// // ======
// // AWS
// // ======
// var basic_proto = grpc.loadPackageDefinition(packageDefinition).sentiment_analysis_rpc;
// // console.log(basic_proto);

// function main() {
//   // var client = new basic_proto.ShowMessage('http://ec2-54-87-209-42.compute-1.amazonaws.com:7016', grpc.credentials.createInsecure());
//   var client = new basic_proto.ShowMessage('54.87.209.42:7016', grpc.credentials.createInsecure());

//   client.show({value: "testandoooo"}, function(err, response) {
//     console.log(JSON.stringify(response));
//     console.log(JSON.stringify(err));
//   });
// }

// var basic_proto = grpc.loadPackageDefinition(packageDefinition).basicmessage;

// function main() {
//   var client = new basic_proto.BasicService('54.87.209.42:50051', grpc.credentials.createInsecure());

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
// }


// ======
// AWS Sentiment Analysis
// ======
var basic_proto = grpc.loadPackageDefinition(packageDefinition).sentiment_analysis_rpc;
// console.log(basic_proto);

function main() {
  // var client = new basic_proto.ShowMessage('http://ec2-54-87-209-42.compute-1.amazonaws.com:7016', grpc.credentials.createInsecure());
  var showClient = new basic_proto.ShowMessage('54.87.209.42:7011', grpc.credentials.createInsecure());
  var consensusClient = new basic_proto.SentimentConsensusAnalysis('54.87.209.42:7011', grpc.credentials.createInsecure());
  // var client = new basic_proto.ShowMessage('localhost:7016', grpc.credentials.createInsecure());

  console.log(showClient)

  showClient.Show({value: "testandoooo"}, function(err, response) {
    console.log(JSON.stringify(response));
    if(err === undefined){
      console.log("ShowMessage Method error: " + JSON.stringify(err));  
    }
    
  });

  consensusClient.ConsensusAnalysis({value: "U29tZSB0ZXh0IGlucHV0"}, function(err, response) {
    console.log(JSON.stringify(response));
    if(err === undefined) {
      console.log("ConsensusAnalysis Method error: " + JSON.stringify(err));  
    }
  });
}



main();
