import * as assert from "assert";
import {AttributeType} from "../../dist/Attribute/AttributeType";
import {DataDefinition} from "../../dist/DataSet/DataDefinition";
import {DataSet} from "../../dist/DataSet/DataSet";
import {NaiveBayes} from "../../dist/Classifier/NaiveBayes";

describe('NaiveBayesTest', function() {
    describe('NaiveBayesTest', function() {
        let naiveBayes = new NaiveBayes()
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
            naiveBayes.train(iris.getInstanceList(), null);
            assert.ok(Math.abs(5.33 - 100 * naiveBayes.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            naiveBayes.train(bupa.getInstanceList(), null);
            assert.ok(Math.abs(38.55 -  100 * naiveBayes.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            naiveBayes.train(dermatology.getInstanceList(), null);
            assert.ok(Math.abs(9.56 -  100 * naiveBayes.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
        });
        it('testLoad', function() {
            naiveBayes.loadModel("models/naiveBayes-iris.txt");
            assert.ok(Math.abs(5.33 - 100 * naiveBayes.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            naiveBayes.loadModel("models/naiveBayes-bupa.txt");
            assert.ok(Math.abs(38.55 -  100 * naiveBayes.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            naiveBayes.loadModel("models/naiveBayes-dermatology.txt");
            assert.ok(Math.abs(9.56 -  100 * naiveBayes.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
        });
    });
});
