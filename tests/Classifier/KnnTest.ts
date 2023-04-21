import * as assert from "assert";
import {AttributeType} from "../../dist/Attribute/AttributeType";
import {DataDefinition} from "../../dist/DataSet/DataDefinition";
import {DataSet} from "../../dist/DataSet/DataSet";
import {Knn} from "../../dist/Classifier/Knn";
import {KnnParameter} from "../../dist/Parameter/KnnParameter";
import {EuclidianDistance} from "../../dist/DistanceMetric/EuclidianDistance";

describe('KnnTest', function() {
    describe('KnnTest', function() {
        let knn = new Knn()
        let knnParameter = new KnnParameter(1, 3, new EuclidianDistance())
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
            knn.train(iris.getInstanceList(), knnParameter);
            assert.ok(Math.abs(4.00 - 100 * knn.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            knn.train(bupa.getInstanceList(), knnParameter);
            assert.ok(Math.abs(19.42 -  100 * knn.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            knn.train(dermatology.getInstanceList(), knnParameter);
            assert.ok(Math.abs(3.00 -  100 * knn.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
            knn.train(car.getInstanceList(), knnParameter);
            assert.ok(Math.abs(20.31 - 100 * knn.test(car.getInstanceList()).getErrorRate()) <= 0.01);
            knn.train(tictactoe.getInstanceList(), knnParameter);
            assert.ok(Math.abs(32.57 - 100 * knn.test(tictactoe.getInstanceList()).getErrorRate()) <= 0.01);
        });
        it('testLoad', function() {
            knn.loadModel("models/knn-iris.txt");
            assert.ok(Math.abs(4.00 - 100 * knn.test(iris.getInstanceList()).getErrorRate()) <= 0.01);
            knn.loadModel("models/knn-bupa.txt");
            assert.ok(Math.abs(19.42 -  100 * knn.test(bupa.getInstanceList()).getErrorRate()) <= 0.01);
            knn.loadModel("models/knn-dermatology.txt");
            assert.ok(Math.abs(3.00 -  100 * knn.test(dermatology.getInstanceList()).getErrorRate()) <= 0.01);
            knn.loadModel("models/knn-car.txt");
            assert.ok(Math.abs(29.98 - 100 * knn.test(car.getInstanceList()).getErrorRate()) <= 0.01);
            knn.loadModel("models/knn-tictactoe.txt");
            assert.ok(Math.abs(34.66 - 100 * knn.test(tictactoe.getInstanceList()).getErrorRate()) <= 0.01);
        });
    });
});
