import * as assert from "assert";
import {C45} from "../../dist/Classifier/C45";
import {C45Parameter} from "../../dist/Parameter/C45Parameter";
import {AttributeType} from "../../dist/Attribute/AttributeType";
import {DataDefinition} from "../../dist/DataSet/DataDefinition";
import {DataSet} from "../../dist/DataSet/DataSet";

describe('C45Test', function() {
    describe('C45Test', function() {
        let c45 = new C45()
        let c45Parameter = new C45Parameter(1, true, 0.2)
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
        attributeTypes = new Array<AttributeType>()
        for (let i = 0; i < 6; i++){
            attributeTypes.push(AttributeType.DISCRETE)
        }
        dataDefinition = new DataDefinition(attributeTypes);
        let car = new DataSet(dataDefinition, ",", "datasets/car.data");
        attributeTypes = new Array<AttributeType>()
        for (let i = 0; i < 9; i++){
            attributeTypes.push(AttributeType.DISCRETE)
        }
        dataDefinition = new DataDefinition(attributeTypes);
        let tictactoe = new DataSet(dataDefinition, ",", "datasets/tictactoe.data")
        it('testTrain', function() {
            c45.train(iris.getInstanceList(), c45Parameter);
            assert.ok(Math.abs(4.00 - 100 * c45.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            c45.train(bupa.getInstanceList(), c45Parameter);
            assert.ok(Math.abs(28.41 -  100 * c45.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            c45.train(dermatology.getInstanceList(), c45Parameter);
            assert.ok(Math.abs(2.46 -  100 * c45.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
            c45.train(car.getInstanceList(), c45Parameter);
            assert.ok(Math.abs(21.35 - 100 * c45.test(car.getInstanceList()).getErrorRate()) <= 0.01);
            c45.train(tictactoe.getInstanceList(), c45Parameter);
            assert.ok(Math.abs(19.94 - 100 * c45.test(tictactoe.getInstanceList()).getErrorRate()) <= 0.01);
        });
        it('testLoad', function() {
            c45.loadModel("models/c45-iris.txt");
            assert.ok(Math.abs(4.00 - 100 * c45.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            c45.loadModel("models/c45-bupa.txt");
            assert.ok(Math.abs(42.03 -  100 * c45.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            c45.loadModel("models/c45-dermatology.txt");
            assert.ok(Math.abs(2.19 -  100 * c45.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
            c45.loadModel("models/c45-car.txt");
            assert.ok(Math.abs(8.16 - 100 * c45.test(car.getInstanceList()).getErrorRate()) <= 0.01);
            c45.loadModel("models/c45-tictactoe.txt");
            assert.ok(Math.abs(14.61 - 100 * c45.test(tictactoe.getInstanceList()).getErrorRate()) <= 0.01);
        });
    });
});
