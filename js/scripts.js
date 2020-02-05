
let trainedNet;

function encode(arg) {
    return arg.split('').map(x => (x.charCodeAt(0) / 256));
}

function processTrainingData(data) {
    return data.map(d => {
        return {
            input: encode(d.input),
            output: d.output
        }
    })
}

function train(data) {
    let net = new brain.NeuralNetwork();
    net.train(processTrainingData(data));
    trainedNet = net.toFunction();
};

function execute(input) {
    let results = trainedNet(encode(input));
    let category;
    let certainty;
    /*
    if (results.trump > results.kardashian) {
        category = 'Donald Trump'
        certainty = Math.floor(results.trump * 100)
    } else { 
        category = 'Kim Kardashian'
        certainty = Math.floor(results.kardashian * 100)
    }
    */ 


    return results; 
}

train(trainingData);
