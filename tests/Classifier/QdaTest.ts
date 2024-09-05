import * as assert from "assert";
import {AttributeType} from "../../dist/Attribute/AttributeType";
import {DataDefinition} from "../../dist/DataSet/DataDefinition";
import {DataSet} from "../../dist/DataSet/DataSet";
import {QdaModel} from "../../dist/Model/Parametric/QdaModel";

describe('QdaTest', function() {
    describe('QdaTest', function() {
        let qda = new QdaModel()
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
        it('testTrain', function() {
            qda.train(iris.getInstanceList(), null);
            assert.ok(Math.abs(2.00 - 100 * qda.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            qda.train(bupa.getInstanceList(), null);
            assert.ok(Math.abs(36.52 -  100 * qda.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
        });
        it('testLoad', function() {
            qda.loadModel("models/qda-iris.txt");
            assert.ok(Math.abs(2.00 - 100 * qda.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            qda.loadModel("models/qda-bupa.txt");
            assert.ok(Math.abs(36.52 -  100 * qda.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
        });
    });
});
