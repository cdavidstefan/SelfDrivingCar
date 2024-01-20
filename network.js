class Network {
    constructor(inputCount, outputCount) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);

        this.weights = [];
        for (let i = 0; i<inputCount.length; i++) {
            this.weights[i] = new Array(outputCount);
        }
    }
}