import * as assert from "assert";
import {AttributeType} from "../../dist/Attribute/AttributeType";
import {DataDefinition} from "../../dist/DataSet/DataDefinition";
import {DataSet} from "../../dist/DataSet/DataSet";
import {LinearPerceptron} from "../../dist/Classifier/LinearPerceptron";
import {LinearPerceptronParameter} from "../../dist/Parameter/LinearPerceptronParameter";

describe('LinearPerceptronTest', function() {
    describe('LinearPerceptronTest', function() {
        let linearPerceptron = new LinearPerceptron()
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
            let linearPerceptronParameter = new LinearPerceptronParameter(1, 0.1, 0.99, 0.2, 100)
            linearPerceptron.train(iris.getInstanceList(), linearPerceptronParameter);
            assert.ok(Math.abs(3.33 - 100 * linearPerceptron.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            linearPerceptronParameter = new LinearPerceptronParameter(1, 0.001, 0.99, 0.2, 100)
            linearPerceptron.train(bupa.getInstanceList(), linearPerceptronParameter);
            assert.ok(Math.abs(33.33 -  100 * linearPerceptron.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            linearPerceptronParameter = new LinearPerceptronParameter(1, 0.1, 0.99, 0.2, 100)
            linearPerceptron.train(dermatology.getInstanceList(), linearPerceptronParameter);
            assert.ok(Math.abs(1.36 -  100 * linearPerceptron.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
        });
        it('testLoad', function() {
            linearPerceptron.loadModel("models/linearPerceptron-iris.txt");
            assert.ok(Math.abs(3.33 - 100 * linearPerceptron.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            linearPerceptron.loadModel("models/linearPerceptron-bupa.txt");
            assert.ok(Math.abs(31.88 -  100 * linearPerceptron.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            linearPerceptron.loadModel("models/linearPerceptron-dermatology.txt");
            assert.ok(Math.abs(0.82 -  100 * linearPerceptron.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
        });
    });
});
