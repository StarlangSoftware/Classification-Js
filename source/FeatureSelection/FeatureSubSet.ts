export class FeatureSubSet {

    private readonly indexList: Array<number> = new Array<number>()

    /**
     * A constructor that takes number of features as input and initializes indexList with these numbers.
     *
     * @param numberOfFeaturesOrList Indicates the indices of indexList.
     */
    constructor(numberOfFeaturesOrList?: any) {
        if (numberOfFeaturesOrList != undefined){
            if (typeof numberOfFeaturesOrList == "number"){
                for (let i = 0; i < numberOfFeaturesOrList; i++) {
                    this.indexList.push(i);
                }
            } else {
                this.indexList = numberOfFeaturesOrList
            }
        }
    }

    /**
     * The clone method creates a new ArrayList with the elements of indexList and returns it as a new FeatureSubSet.
     *
     * @return A new ArrayList with the elements of indexList and returns it as a new FeatureSubSet.
     */
    clone(): FeatureSubSet{
        let result = new FeatureSubSet(this.indexList.length)
        for (let i = 0; i < this.indexList.length; i++){
            result.add(this.indexList[i])
        }
        return result
    }

    /**
     * The size method returns the size of the indexList.
     *
     * @return The size of the indexList.
     */
    size(): number{
        return this.indexList.length
    }

    /**
     * The get method returns the item of indexList at given index.
     *
     * @param index Index of the indexList to be accessed.
     * @return The item of indexList at given index.
     */
    get(index: number): number{
        return this.indexList[index]
    }

    /**
     * The contains method returns True, if indexList contains given input number and False otherwise.
     *
     * @param featureNo Feature number that will be checked.
     * @return True, if indexList contains given input number.
     */
    contains(featureNo: number){
        return this.indexList.includes(featureNo)
    }

    /**
     * The add method adds given Integer to the indexList.
     *
     * @param featureNo Integer that will be added to indexList.
     */
    add(featureNo: number){
        this.indexList.push(featureNo)
    }

    /**
     * The remove method removes the item of indexList at the given index.
     *
     * @param index Index of the item that will be removed.
     */
    remove(index: number){
        this.indexList.splice(index, 1)
    }

}