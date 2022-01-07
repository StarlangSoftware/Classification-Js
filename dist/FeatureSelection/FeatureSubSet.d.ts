export declare class FeatureSubSet {
    private readonly indexList;
    /**
     * A constructor that takes number of features as input and initializes indexList with these numbers.
     *
     * @param numberOfFeaturesOrList Indicates the indices of indexList.
     */
    constructor(numberOfFeaturesOrList?: any);
    /**
     * The clone method creates a new ArrayList with the elements of indexList and returns it as a new FeatureSubSet.
     *
     * @return A new ArrayList with the elements of indexList and returns it as a new FeatureSubSet.
     */
    clone(): FeatureSubSet;
    /**
     * The size method returns the size of the indexList.
     *
     * @return The size of the indexList.
     */
    size(): number;
    /**
     * The get method returns the item of indexList at given index.
     *
     * @param index Index of the indexList to be accessed.
     * @return The item of indexList at given index.
     */
    get(index: number): number;
    /**
     * The contains method returns True, if indexList contains given input number and False otherwise.
     *
     * @param featureNo Feature number that will be checked.
     * @return True, if indexList contains given input number.
     */
    contains(featureNo: number): boolean;
    /**
     * The add method adds given Integer to the indexList.
     *
     * @param featureNo Integer that will be added to indexList.
     */
    add(featureNo: number): void;
    /**
     * The remove method removes the item of indexList at the given index.
     *
     * @param index Index of the item that will be removed.
     */
    remove(index: number): void;
}
