var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var protobuf = require('protobufjs');
var proto_url = __dirname + '/sentiment_analysis_rpc.proto';
var exec = require('child_process').exec;
var child;


var packageDefinition = protoLoader.loadSync(
    proto_url,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

protobuf.load("sentiment_analysis_rpc.proto").then(function(root) {
    // console.log(JSON.stringify(root));
});

var basic_proto = grpc.loadPackageDefinition(packageDefinition).sentiment_analysis_rpc;

function main() {

    /**
     * Creating channels
     */
    var showClient = new basic_proto.ShowMessage('54.87.209.42:7011', grpc.credentials.createInsecure());
    var consensusClient = new basic_proto.SentimentConsensusAnalysis('54.87.209.42:7011', grpc.credentials.createInsecure());


    /**
     * Show method call
     */
    showClient.Show({value: "testandoooo"}, function (err, response) {
        console.log(JSON.stringify(response));
        if (err === undefined) {
            // console.log("ShowMessage Method error: " + JSON.stringify(err));
        }

    });

    /**
     * ConsensusAnalysis method call
     */
    consensusClient.ConsensusAnalysis({value: "U29tZSB0ZXh0IGlucHV0"}, function (err, response) {
        console.log(JSON.stringify(response));
        if (err === undefined) {
            // console.log("ConsensusAnalysis Method error: " + JSON.stringify(err));
        }
    });
}


main();
