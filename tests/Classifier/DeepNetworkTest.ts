import * as assert from "assert";
import {AttributeType} from "../../dist/Attribute/AttributeType";
import {DataDefinition} from "../../dist/DataSet/DataDefinition";
import {DataSet} from "../../dist/DataSet/DataSet";
import {MultiLayerPerceptron} from "../../dist/Classifier/MultiLayerPerceptron";
import {MultiLayerPerceptronParameter} from "../../dist/Parameter/MultiLayerPerceptronParameter";
import {ActivationFunction} from "../../dist/Parameter/ActivationFunction";
import {DeepNetwork} from "../../dist/Classifier/DeepNetwork";
import {DeepNetworkParameter} from "../../dist/Parameter/DeepNetworkParameter";

describe('DeepNetworkTest', function() {
    describe('DeepNetworkTest', function() {
        let deepNetwork = new DeepNetwork()
        let attributeTypes = new Array<AttributeType>();
        for (let i = 0; i < 4; i++){
            attributeTypes.push(AttributeType.CONTINUOUS)
        }
        let dataDefinition = new DataDefinition(attributeTypes)
        let iris = new DataSet(dataDefinition, ",", "datasets/iris.data")
        attributeTypes = new Array<AttributeType>();
        for (let i = 0; i < 6; i++){
            attributeTypes.push(AttributeType.CONTINUOUS)
        }
        dataDefinition = new DataDefinition(attributeTypes)
        let bupa = new DataSet(dataDefinition, ",", "datasets/bupa.data")
        attributeTypes = new Array<AttributeType>()
        for (let i = 0; i < 34; i++){
            attributeTypes.push(AttributeType.CONTINUOUS)
        }
        dataDefinition = new DataDefinition(attributeTypes)
        let dermatology = new DataSet(dataDefinition, ",", "datasets/dermatology.data")
        it('testTrain', function() {
            let deepNetworkParameter = new DeepNetworkParameter(1, 0.1, 0.99, 0.2, 100, [5, 5], ActivationFunction.SIGMOID)
            deepNetwork.train(iris.getInstanceList(), deepNetworkParameter);
            assert.ok(Math.abs(2.67 - 100 * deepNetwork.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            deepNetworkParameter = new DeepNetworkParameter(1, 0.01, 0.99, 0.2, 100, [15, 15], ActivationFunction.SIGMOID)
            deepNetwork.train(bupa.getInstanceList(), deepNetworkParameter);
            assert.ok(Math.abs(28.70 -  100 * deepNetwork.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            deepNetworkParameter = new DeepNetworkParameter(1, 0.01, 0.99, 0.2, 100, [20], ActivationFunction.SIGMOID)
            deepNetwork.train(dermatology.getInstanceList(), deepNetworkParameter);
            assert.ok(Math.abs(2.73 -  100 * deepNetwork.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
        });
        it('testLoad', function() {
            deepNetwork.loadModel("models/deepNetwork-iris.txt");
            assert.ok(Math.abs(1.33 - 100 * deepNetwork.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            deepNetwork.loadModel("models/deepNetwork-bupa.txt");
            assert.ok(Math.abs(28.99 -  100 * deepNetwork.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            deepNetwork.loadModel("models/deepNetwork-dermatology.txt");
            assert.ok(Math.abs(1.09 -  100 * deepNetwork.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
        });
    });
});
