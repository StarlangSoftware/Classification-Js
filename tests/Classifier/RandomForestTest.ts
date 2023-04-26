import {AttributeType} from "../../dist/Attribute/AttributeType";
import {DataDefinition} from "../../dist/DataSet/DataDefinition";
import {DataSet} from "../../dist/DataSet/DataSet";
import * as assert from "assert";
import {RandomForest} from "../../dist/Classifier/RandomForest";
import {RandomForestParameter} from "../../dist/Parameter/RandomForestParameter";

describe('RandomForestTest', function() {
    describe('RandomForestTest', function() {
        let randomForest = new RandomForest()
        let randomForestParameter = new RandomForestParameter(1, 100, 35)
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
        attributeTypes = new Array<AttributeType>();
        let attributeValueList = new Array<Array<String>>()
        attributeValueList.push(["vhigh", "high", "low", "med"])
        attributeValueList.push(["vhigh", "high", "low", "med"])
        attributeValueList.push(["2", "3", "4", "5more"])
        attributeValueList.push(["2", "4", "more"])
        attributeValueList.push(["big", "med", "small"])
        attributeValueList.push(["high", "low", "med"])
        for (let i = 0; i < 6; i++){
            attributeTypes.push(AttributeType.DISCRETE_INDEXED)
        }
        dataDefinition = new DataDefinition(attributeTypes, attributeValueList)
        let carIndexed = new DataSet(dataDefinition, ",", "datasets/car.data")
        attributeTypes = new Array<AttributeType>()
        for (let i = 0; i < 9; i++){
            attributeTypes.push(AttributeType.DISCRETE)
        }
        dataDefinition = new DataDefinition(attributeTypes);
        let tictactoe = new DataSet(dataDefinition, ",", "datasets/tictactoe.data")
        it('testTrain', function() {
            this.timeout(4000);
            randomForest.train(iris.getInstanceList(), randomForestParameter);
            assert.ok(Math.abs(0.00 - 100 * randomForest.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            randomForest.train(bupa.getInstanceList(), randomForestParameter);
            assert.ok(Math.abs(0.00 -  100 * randomForest.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            randomForest.train(dermatology.getInstanceList(), randomForestParameter);
            assert.ok(Math.abs(0.00 -  100 * randomForest.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
            randomForest.train(car.getInstanceList(), randomForestParameter);
            assert.ok(Math.abs(0.00 - 100 * randomForest.test(car.getInstanceList()).getErrorRate()) <= 0.01);
            randomForest.train(tictactoe.getInstanceList(), randomForestParameter);
            assert.ok(Math.abs(0.00 - 100 * randomForest.test(tictactoe.getInstanceList()).getErrorRate()) <= 0.01);
            randomForest.train(carIndexed.getInstanceList(), randomForestParameter);
            assert.ok(Math.abs(0.00 - 100 * randomForest.test(carIndexed.getInstanceList()).getErrorRate()) <= 0.01);
        });
        it('testLoad', function() {
            randomForest.loadModel("models/randomforest-iris.txt");
            assert.ok(Math.abs(0.00 - 100 * randomForest.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            randomForest.loadModel("models/randomforest-bupa.txt");
            assert.ok(Math.abs(0.00 -  100 * randomForest.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            randomForest.loadModel("models/randomforest-dermatology.txt");
            assert.ok(Math.abs(0.00 -  100 * randomForest.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
            randomForest.loadModel("models/randomforest-car.txt");
            assert.ok(Math.abs(0.00 - 100 * randomForest.test(car.getInstanceList()).getErrorRate()) <= 0.01);
            randomForest.loadModel("models/randomforest-tictactoe.txt");
            assert.ok(Math.abs(0.00 - 100 * randomForest.test(tictactoe.getInstanceList()).getErrorRate()) <= 0.01);
            randomForest.loadModel("models/randomforest-carIndexed.txt");
            assert.ok(Math.abs(0.00 - 100 * randomForest.test(carIndexed.getInstanceList()).getErrorRate()) <= 0.01);
        });
    });
});
