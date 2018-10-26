// var funcao = function(){
//   return console.log("executando funcao");
// }
// funcao();
// var tempFunction = new Function('name', 'return console.log("Olá, " + name + "!");');
// tempFunction('Cássio');



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

//EXECUTA SHELL COMMANDS
// var child;
// child = exec(
//     "node_modules/.bin/pbjs -t json sentiment_analysis_rpc.proto > proto.json",
//     function (error, stdout, stderr) {
//         console.log('stdout: ' + stdout);
//         console.log(JSON.stringify(stdout));
//         console.log('stderr: ' + stderr);
//         if (error !== null) {
//             console.log('exec error: ' + error);
//         }
//     });