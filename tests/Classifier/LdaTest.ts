import * as assert from "assert";
import {AttributeType} from "../../dist/Attribute/AttributeType";
import {DataDefinition} from "../../dist/DataSet/DataDefinition";
import {DataSet} from "../../dist/DataSet/DataSet";
import {Lda} from "../../dist/Classifier/Lda";

describe('LdaTest', function() {
    describe('LdaTest', function() {
        let lda = new Lda()
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
            lda.train(iris.getInstanceList(), null);
            assert.ok(Math.abs(2.00 - 100 * lda.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            lda.train(bupa.getInstanceList(), null);
            assert.ok(Math.abs(29.57 -  100 * lda.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            lda.train(dermatology.getInstanceList(), null);
            assert.ok(Math.abs(1.91 -  100 * lda.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
        });
        it('testLoad', function() {
            lda.loadModel("models/lda-iris.txt");
            assert.ok(Math.abs(2.00 - 100 * lda.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            lda.loadModel("models/lda-bupa.txt");
            assert.ok(Math.abs(29.57 -  100 * lda.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            lda.loadModel("models/lda-dermatology.txt");
            assert.ok(Math.abs(1.91 -  100 * lda.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
        });
    });
});
