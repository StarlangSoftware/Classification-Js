Machine Learning
============

Machine learning is about optimization. In learning via optimization, we define an error function (loss function) on the model and try to optimize it, i.e., try to find the optimal parameters of the model by optimization techniques borrowed from optimization literature. 

Machine learning is about algorithms. In decision/regression trees, we need to write a recursive-learning algorithm to classify the data arriving at each decision node, and we also need to write a recursive code to generate the decision tree structure.

Machine learning is about statistics. We usually assume Gaussian noise on the data, we assume multivariate normal distribution on class covariance matrices in quadratic discriminant analysis, and we use cross-validation or bootstrapping to generate multiple training sets. 

Machine learning is about models. In decision trees, the data structure is a binary/L-ary tree depending on the type of the features and the decision function used.

Machine learning is about performance metrics. In classification, we use accuracy if we want to get a crude estimate on the performance of the classifier. If we need more details on pairwise classes, confusion matrix comes in handy. If the dataset has two classes, more metrics follow: precision, recall, true positive rate, false positive rate, F-measure, etc. 

What is machine learning about? Like defining an elephant, we need the combination of all of these topics to define machine learning: we start machine learning by assuming a certain model on the data, use algorithmic and/or optimization and/or statistical techniques to learn the parameters of that model (which is sometimes defined as curve fitting), and use performance metrics to evaluate our model/algorithm/classifier.

# Algorithms

## Nearest Neighbor

The most commonly used representative of nonparametric algorithms is the nearest neighbor. The assumption of nearest neighbor is simple, the world does not change much, i.e., similar things perform similarly. Therefore, we only need to store the dataset itself and make the decision on the test instance based on the similarity of it to the instances in the dataset. In other words, the class label of an instance is strongly influenced by its nearby instances.

## Parametric Classification

If the class distributions are assumed to follow Gaussian density, we obtain our first parametric classifier, namely, quadratic discriminant. The number of parameters, i.e., the model complexity is Kd + Kd (d + 1) / 2, the first part is for class means and the second part for class covariance matrices.

We can assume a single shared covariance matrix for all classes. In this case, simplifying the function reduces to our second classifier, namely, linear discriminant. The model complexity is Kd + d (d + 1) / 2, where the first part is for class means and the second part for shared covariance matrix.

When we assume all off-diagonals of the shared covariance matrix are zero; we get the naive Bayes classifier. The model complexity is Kd + d, where the first part is for class means and the second part for the diagonal of the shared covariance matrix.

We further reduce by taking priors equal and a single covariance value s. In this case, we get the nearest mean classifier and the model complexity is only Kd + 1.

## Decision Trees

Decision trees have a tree-based structure where each non-leaf node m implements a decision function, f<sub>m</sub>(x), and each leaf node corresponds to a class decision. Second, they are one of most interpretable learning algorithms available. When written as a set of IF-THEN rules, the decision tree can be transformed into a human-readable format, which then can be modified and/or validated by human experts in their corresponding domains.

## Kernel Machines

Kernel machines, in other words, support vector machines, are maximum margin methods, where the model is written as a weighted sum of support vectors. Kernel machines are discriminative methods, i.e., they are only interested in the instances across the class boundaries in classification, or instances across the regressor in regression. For obtaining the optimal separating hyperplane, kernel machines try to maximize separability, or margin, and write the problem as a quadratic optimization problem, whose solution gives us support vectors.

## Neural Networks

Artificial neural networks (ANN) take their inspiration from the brain. The brain consists of billions of neurons and these neurons are interconnected and work in parallel, which makes the brain a powerful computing machine. Each neuron is connected through synapses to thousands of neurons and the firing of a neuron depends on those synapses.

There are three types of neurons (units) in ANN. Each unit except the input unit takes an input and calculates an output. Input units represent a single input feature x<sub>i</sub> or the bias = +1. Hidden units calculate an intermediate output from its inputs. They first combine their inputs linearly and then use nonlinear activation functions to map that linear combination to a nonlinear space. Output units calculate the output of the ANN.

Video Lectures
============

[<img src="https://github.com/StarlangSoftware/Classification/blob/master/video1.jpg" width="50%">](https://youtu.be/1p0zBhji0YE)[<img src=https://github.com/StarlangSoftware/Classification/blob/master/video2.jpg width="50%">](https://youtu.be/xvNGStxTEsU)[<img src=https://github.com/StarlangSoftware/Classification/blob/master/video3.jpg width="50%">](https://youtu.be/EfDoMKHl_iY)[<img src=https://github.com/StarlangSoftware/Classification/blob/master/video4.jpg width="50%">](https://youtu.be/4Y-1r0H8vZc)[<img src=https://github.com/StarlangSoftware/Classification/blob/master/video5.jpg width="50%">](https://youtu.be/1b5sEp321Lo)[<img src=https://github.com/StarlangSoftware/Classification/blob/master/video6.jpg width="50%">](https://youtu.be/_bM4RmKMo3I)[<img src=https://github.com/StarlangSoftware/Classification/blob/master/video7.jpg width="50%">](https://youtu.be/xGHskyTb35s)[<img src=https://github.com/StarlangSoftware/Classification/blob/master/video8.jpg width="50%">](https://youtu.be/ZdFUDFmOjL4)[<img src=https://github.com/StarlangSoftware/Classification/blob/master/video9.jpg width="50%">](https://youtu.be/O0W99NhiFug)[<img src=https://github.com/StarlangSoftware/Classification/blob/master/video10.jpg width="50%">](https://youtu.be/k-sTBA9HGVc)[<img src=https://github.com/StarlangSoftware/Classification/blob/master/video11.jpg width="50%">](https://youtu.be/yDlcLtVJDGk)[<img src=https://github.com/StarlangSoftware/Classification/blob/master/video12.jpg width="50%">](https://youtu.be/7qxxNzymzLI)[<img src=https://github.com/StarlangSoftware/Classification/blob/master/video13.jpg width="50%">](https://youtu.be/sVzu7UYOFXM)[<img src=https://github.com/StarlangSoftware/Classification/blob/master/video14.jpg width="50%">](https://youtu.be/OynNcw2IItg)

For Developers
============
You can also see [Java](https://github.com/starlangsoftware/Classification), 
[Python](https://github.com/starlangsoftware/Classification-Py), 
[Cython](https://github.com/starlangsoftware/Classification-Cy), 
[Swift](https://github.com/starlangsoftware/Classification-Swift),
[C++](https://github.com/starlangsoftware/Classification-CPP),
[C](https://github.com/starlangsoftware/Classification-C), [Php](https://github.com/starlangsoftware/Classification-Php),
or [C#](https://github.com/starlangsoftware/Classification-CS) repository.

## Requirements

* [Node.js 14 or higher](#Node.js)
* [Git](#git)

### Node.js 

To check if you have a compatible version of Node.js installed, use the following command:

    node -v
    
You can find the latest version of Node.js [here](https://nodejs.org/en/download/).

### Git

Install the [latest version of Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

## Npm Install

	npm install nlptoolkit-classification
	
## Download Code

In order to work on code, create a fork from GitHub page. 
Use Git for cloning the code to your local or below line for Ubuntu:

	git clone <your-fork-git-link>

A directory called util will be created. Or you can use below link for exploring the code:

	git clone https://github.com/starlangsoftware/classification-js.git

## Open project with Webstorm IDE

Steps for opening the cloned project:

* Start IDE
* Select **File | Open** from main menu
* Choose `Classification-Js` file
* Select open as project option
* Couple of seconds, dependencies will be downloaded. 

Detailed Description
============

+ [Classification Algorithms](#classification-algorithms)
+ [Sampling Strategies](#sampling-strategies)
+ [Feature Selection](#feature-selection)
+ [Statistical Tests](#statistical-tests)

## Classification Algorithms

Algoritmaları eğitmek için

	void train(InstanceList trainSet, Parameter parameters)

Eğitilen modeli bir veri örneği üstünde sınamak için

	String predict(Instance instance)

Karar ağacı algoritması C45 sınıfında

Bagging algoritması Bagging sınıfında

Derin öğrenme algoritması DeepNetwork sınıfında

KMeans algoritması KMeans sınıfında

Doğrusal ve doğrusal olmayan çok katmanlı perceptron LinearPerceptron ve 
MultiLayerPerceptron sınıflarında

Naive Bayes algoritması NaiveBayes sınıfında

K en yakın komşu algoritması Knn sınıfında

Doğrusal kesme analizi algoritması Lda sınıfında

İkinci derece kesme analizi algoritması Qda sınıfında

Destek vektör makineleri algoritması Svm sınıfında

RandomForest ağaç tabanlı ensemble algoritması RandomForest sınıfında

Basit dummy ve rasgele sınıflandırıcı gibi temel iki sınıflandırıcı Dummy ve 
RandomClassifier sınıflarında

## Sampling Strategies

K katlı çapraz geçerleme deneyi yapmak için KFoldRun, KFoldRunSeparateTest, 
StratifiedKFoldRun, StratifiedKFoldRunSeparateTest

M tane K katlı çapraz geçerleme deneyi yapmak için MxKFoldRun, MxKFoldRunSeparateTest,
StratifiedMxKFoldRun, StratifiedMxKFoldRunSeparateTest

Bootstrap tipi deney yapmak için BootstrapRun

## Feature Selection

Pca tabanlı boyut azaltma için Pca sınıfı

Discrete değişkenleri Continuous değişkenlere çevirmek için DiscreteToContinuous sınıfı

Discrete değişkenleri binary değişkenlere değiştirmek için LaryToBinary sınıfı

## Statistical Tests

İstatistiksel testler için Combined5x2F, Combined5x2t, Paired5x2t, Pairedt, Sign sınıfları

For Contibutors
============

### package.json file

1. main and types are important when this package will be imported.
```
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
```
2. Dependencies should be maximum (not only direct but also indirect references should also be given), everything directly in the code should be given here.
```
  "dependencies": {
    "nlptoolkit-corpus": "^1.0.12",
    "nlptoolkit-dictionary": "^1.0.14",
    "nlptoolkit-morphologicalanalysis": "^1.0.19",
    "nlptoolkit-xmlparser": "^1.0.7"
  }
```

### tsconfig.json file

1. Compiler flags currently includes nodeNext for importing.
```
  "compilerOptions": {
    "outDir": "dist",
    "module": "nodeNext",
    "sourceMap": true,
    "noImplicitAny": true,
    "removeComments": false,
    "declaration": true,
  },
```
2. tests, node_modules and dist should be excluded.
```
  "exclude": [
    "tests",
    "node_modules",
    "dist"
  ]
```

### index.ts file

1. Should include all ts classes.
```
export * from "./CategoryType"
export * from "./InterlingualDependencyType"
export * from "./InterlingualRelation"
export * from "./Literal"
```

### Data files
1. Add data files to the project folder. Subprojects should include all data files of the parent projects.

### Javascript files

1. Classes should be defined as exported.
```
export class JCN extends ICSimilarity{
```
2. Do not forget to comment each function.
```
    /**
     * Computes JCN wordnet similarity metric between two synsets.
     * @param synSet1 First synset
     * @param synSet2 Second synset
     * @return JCN wordnet similarity metric between two synsets
     */
    computeSimilarity(synSet1: SynSet, synSet2: SynSet): number {
```
3. Function names should follow caml case.
```
    setSynSetId(synSetId: string){
```
4. Write getter and setter methods.
```
    getRelation(index: number): Relation{
    setName(name: string){
```
5. Use standard javascript test style.
```
describe('SimilarityPathTest', function() {
    describe('SimilarityPathTest', function() {
        it('testComputeSimilarity', function() {
            let turkish = new WordNet();
            let similarityPath = new SimilarityPath(turkish);
            assert.strictEqual(32.0, similarityPath.computeSimilarity(turkish.getSynSetWithId("TUR10-0656390"), turkish.getSynSetWithId("TUR10-0600460")));
            assert.strictEqual(13.0, similarityPath.computeSimilarity(turkish.getSynSetWithId("TUR10-0412120"), turkish.getSynSetWithId("TUR10-0755370")));
            assert.strictEqual(13.0, similarityPath.computeSimilarity(turkish.getSynSetWithId("TUR10-0195110"), turkish.getSynSetWithId("TUR10-0822980")));
        });
    });
});
```
6. Enumerated types should be declared with enum.
```
export enum CategoryType {
    MATHEMATICS, SPORT, MUSIC, SLANG, BOTANIC,
    PLURAL, MARINE, HISTORY, THEOLOGY, ZOOLOGY,
    METAPHOR, PSYCHOLOGY, ASTRONOMY, GEOGRAPHY, GRAMMAR,
    MILITARY, PHYSICS, PHILOSOPHY, MEDICAL, THEATER,
    ECONOMY, LAW, ANATOMY, GEOMETRY, BUSINESS,
    PEDAGOGY, TECHNOLOGY, LOGIC, LITERATURE, CINEMA,
    TELEVISION, ARCHITECTURE, TECHNICAL, SOCIOLOGY, BIOLOGY,
    CHEMISTRY, GEOLOGY, INFORMATICS, PHYSIOLOGY, METEOROLOGY,
    MINERALOGY
}
```
7. If there are multiple constructors for a class, define them as constructor1, constructor2, ..., then from the original constructor call these methods.
```
    constructor1(symbol: any){
    constructor2(symbol: any, multipleFile: MultipleFile) {
    constructor(symbol: any, multipleFile: MultipleFile = undefined) {
        if (multipleFile == undefined){
            this.constructor1(symbol);
        } else {
            this.constructor2(symbol, multipleFile);
        }
    }
```
8. Importing should be done via import method with referencing the node-modules.
```
import {Corpus} from "nlptoolkit-corpus/dist/Corpus";
import {Sentence} from "nlptoolkit-corpus/dist/Sentence";
```
9. Use xmlparser package for parsing xml files.
```
	var doc = new XmlDocument("test.xml")
	doc.parse()
	let root = doc.getFirstChild()
	let firstChild = root.getFirstChild()
```
