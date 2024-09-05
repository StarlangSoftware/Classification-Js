import * as assert from "assert";
import {AttributeType} from "../../dist/Attribute/AttributeType";
import {DataDefinition} from "../../dist/DataSet/DataDefinition";
import {DataSet} from "../../dist/DataSet/DataSet";
import {MultiLayerPerceptronParameter} from "../../dist/Parameter/MultiLayerPerceptronParameter";
import {ActivationFunction} from "../../dist/Parameter/ActivationFunction";
import {MultiLayerPerceptronModel} from "../../dist/Model/NeuralNetwork/MultiLayerPerceptronModel";

describe('MultiLayerPerceptronTest', function() {
    describe('MultiLayerPerceptronTest', function() {
        let multiLayerPerceptron = new MultiLayerPerceptronModel()
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
            let multiLayerPerceptronParameter = new MultiLayerPerceptronParameter(1, 0.1, 0.99, 0.2, 100, 3, ActivationFunction.SIGMOID)
            multiLayerPerceptron.train(iris.getInstanceList(), multiLayerPerceptronParameter);
            assert.ok(Math.abs(7.33 - 100 * multiLayerPerceptron.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            multiLayerPerceptronParameter = new MultiLayerPerceptronParameter(1, 0.01, 0.99, 0.2, 100, 30, ActivationFunction.SIGMOID)
            multiLayerPerceptron.train(bupa.getInstanceList(), multiLayerPerceptronParameter);
            assert.ok(Math.abs(29.57 -  100 * multiLayerPerceptron.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            multiLayerPerceptronParameter = new MultiLayerPerceptronParameter(1, 0.01, 0.99, 0.2, 100, 20, ActivationFunction.SIGMOID)
            multiLayerPerceptron.train(dermatology.getInstanceList(), multiLayerPerceptronParameter);
            assert.ok(Math.abs(2.19 -  100 * multiLayerPerceptron.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
        });
        it('testLoad', function() {
            multiLayerPerceptron.loadModel("models/multiLayerPerceptron-iris.txt");
            assert.ok(Math.abs(2.67 - 100 * multiLayerPerceptron.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            multiLayerPerceptron.loadModel("models/multiLayerPerceptron-bupa.txt");
            assert.ok(Math.abs(27.54 -  100 * multiLayerPerceptron.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            multiLayerPerceptron.loadModel("models/multiLayerPerceptron-dermatology.txt");
            assert.ok(Math.abs(1.09 -  100 * multiLayerPerceptron.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
        });
    });
});
