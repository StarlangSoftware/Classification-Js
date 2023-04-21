import {AttributeType} from "../../dist/Attribute/AttributeType";
import {DataDefinition} from "../../dist/DataSet/DataDefinition";
import {DataSet} from "../../dist/DataSet/DataSet";
import * as assert from "assert";
import {Dummy} from "../../dist/Classifier/Dummy";

describe('DummyTest', function() {
    describe('DummyTest', function() {
        let dummy = new Dummy()
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
        attributeTypes = new Array<AttributeType>()
        for (let i = 0; i < 8; i++){
            attributeTypes.push(AttributeType.DISCRETE)
        }
        dataDefinition = new DataDefinition(attributeTypes);
        let nursery = new DataSet(dataDefinition, ",", "datasets/nursery.data")
        attributeTypes = new Array<AttributeType>()
        for (let i = 0; i < 6; i++){
            if (i % 2 == 0){
                attributeTypes.push(AttributeType.DISCRETE)
            } else {
                attributeTypes.push(AttributeType.CONTINUOUS)
            }
        }
        dataDefinition = new DataDefinition(attributeTypes)
        let chess = new DataSet(dataDefinition, ",", "datasets/chess.data")
        it('testTrain', function() {
            dummy.train(iris.getInstanceList(), null);
            assert.ok(Math.abs(66.67 - 100 * dummy.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            dummy.train(bupa.getInstanceList(), null);
            assert.ok(Math.abs(42.03 -  100 * dummy.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            dummy.train(dermatology.getInstanceList(), null);
            assert.ok(Math.abs(69.40 -  100 * dummy.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
            dummy.train(car.getInstanceList(), null);
            assert.ok(Math.abs(29.98 - 100 * dummy.test(car.getInstanceList()).getErrorRate()) <= 0.01);
            dummy.train(tictactoe.getInstanceList(), null);
            assert.ok(Math.abs(34.66 - 100 * dummy.test(tictactoe.getInstanceList()).getErrorRate()) <= 0.01);
            dummy.train(nursery.getInstanceList(), null);
            assert.ok(Math.abs(66.67 - 100 * dummy.test(nursery.getInstanceList()).getErrorRate()) <= 0.01);
            dummy.train(chess.getInstanceList(), null);
            assert.ok(Math.abs(83.77 - 100 * dummy.test(chess.getInstanceList()).getErrorRate()) <= 0.01);
        });
        it('testLoad', function() {
            dummy.loadModel("models/dummy-iris.txt");
            assert.ok(Math.abs(66.67 - 100 * dummy.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            dummy.loadModel("models/dummy-bupa.txt");
            assert.ok(Math.abs(42.03 -  100 * dummy.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            dummy.loadModel("models/dummy-dermatology.txt");
            assert.ok(Math.abs(69.40 -  100 * dummy.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
            dummy.loadModel("models/dummy-car.txt");
            assert.ok(Math.abs(29.98 - 100 * dummy.test(car.getInstanceList()).getErrorRate()) <= 0.01);
            dummy.loadModel("models/dummy-tictactoe.txt");
            assert.ok(Math.abs(34.66 - 100 * dummy.test(tictactoe.getInstanceList()).getErrorRate()) <= 0.01);
            dummy.loadModel("models/dummy-nursery.txt");
            assert.ok(Math.abs(66.67 - 100 * dummy.test(nursery.getInstanceList()).getErrorRate()) <= 0.01);
            dummy.loadModel("models/dummy-chess.txt");
            assert.ok(Math.abs(83.77 - 100 * dummy.test(chess.getInstanceList()).getErrorRate()) <= 0.01);
        });
    });
});
