import {AttributeType} from "../../dist/Attribute/AttributeType";
import {DataDefinition} from "../../dist/DataSet/DataDefinition";
import {DataSet} from "../../dist/DataSet/DataSet";
import * as assert from "assert";
import {KMeansParameter} from "../../dist/Parameter/KMeansParameter";
import {KMeansModel} from "../../dist/Model/Parametric/KMeansModel";

describe('KMeansTest', function() {
    describe('KMeansTest', function() {
        let kMeans = new KMeansModel()
        let kMeansParameter = new KMeansParameter(1)
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
            kMeans.train(iris.getInstanceList(), kMeansParameter);
            assert.ok(Math.abs(7.33 - 100 * kMeans.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            kMeans.train(bupa.getInstanceList(), kMeansParameter);
            assert.ok(Math.abs(43.77 -  100 * kMeans.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            kMeans.train(dermatology.getInstanceList(), kMeansParameter);
            assert.ok(Math.abs(45.08 -  100 * kMeans.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
            kMeans.train(car.getInstanceList(), kMeansParameter);
            assert.ok(Math.abs(47.98 - 100 * kMeans.test(car.getInstanceList()).getErrorRate()) <= 0.01);
            kMeans.train(tictactoe.getInstanceList(), kMeansParameter);
            assert.ok(Math.abs(38.94 - 100 * kMeans.test(tictactoe.getInstanceList()).getErrorRate()) <= 0.01);
            kMeans.train(nursery.getInstanceList(), kMeansParameter);
            assert.ok(Math.abs(53.60 - 100 * kMeans.test(nursery.getInstanceList()).getErrorRate()) <= 0.01);
            kMeans.train(chess.getInstanceList(), kMeansParameter);
            assert.ok(Math.abs(83.25 - 100 * kMeans.test(chess.getInstanceList()).getErrorRate()) <= 0.01);
        });
        it('testLoad', function() {
            kMeans.loadModel("models/kMeans-iris.txt");
            assert.ok(Math.abs(7.33 - 100 * kMeans.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            kMeans.loadModel("models/kMeans-bupa.txt");
            assert.ok(Math.abs(43.77 -  100 * kMeans.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            kMeans.loadModel("models/kMeans-dermatology.txt");
            assert.ok(Math.abs(45.08 -  100 * kMeans.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
            kMeans.loadModel("models/kMeans-car.txt");
            assert.ok(Math.abs(29.98 - 100 * kMeans.test(car.getInstanceList()).getErrorRate()) <= 0.01);
            kMeans.loadModel("models/kMeans-tictactoe.txt");
            assert.ok(Math.abs(34.66 - 100 * kMeans.test(tictactoe.getInstanceList()).getErrorRate()) <= 0.01);
            kMeans.loadModel("models/kMeans-chess.txt");
            assert.ok(Math.abs(85.83 - 100 * kMeans.test(chess.getInstanceList()).getErrorRate()) <= 0.01);
        });
    });
});
