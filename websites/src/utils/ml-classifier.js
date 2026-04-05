/**
 * Lightweight Naive Bayes Text Classifier for Local ML Training
 */

class NaiveBayesClassifier {
  constructor() {
    this.vocabulary = new Set();
    this.classes = {};
    this.totalDocuments = 0;
  }

  tokenize(text) {
    return text.toLowerCase().match(/\b\w+\b/g) || [];
  }

  train(text, className) {
    const tokens = this.tokenize(text);
    if (!this.classes[className]) {
      this.classes[className] = { docCount: 0, tokens: {} };
    }
    
    this.classes[className].docCount++;
    this.totalDocuments++;

    tokens.forEach(token => {
      this.vocabulary.add(token);
      this.classes[className].tokens[token] = (this.classes[className].tokens[token] || 0) + 1;
    });
  }

  predict(text) {
    const tokens = this.tokenize(text);
    if (tokens.length === 0) return null;

    let maxProb = -Infinity;
    let bestClass = null;

    for (const className in this.classes) {
      const classData = this.classes[className];
      
      // Prior probability of this class: P(C)
      let prob = Math.log(classData.docCount / this.totalDocuments);
      
      // Likelihood of words given this class: P(W|C)
      const totalClassTokens = Object.values(classData.tokens).reduce((sum, count) => sum + count, 0);

      tokens.forEach(token => {
        // Laplace Smoothing: (count + 1) / (totalClassTokens + vocabularySize)
        const tokenCount = classData.tokens[token] || 0;
        const wordProb = (tokenCount + 1) / (totalClassTokens + this.vocabulary.size);
        prob += Math.log(wordProb);
      });

      if (prob > maxProb) {
        maxProb = prob;
        bestClass = className;
      }
    }
    
    return bestClass;
  }
}

export default NaiveBayesClassifier;
