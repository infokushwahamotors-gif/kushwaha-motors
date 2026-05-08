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
    // Improved tokenizer to handle both English and Nepali (Devanagari) characters
    return text.toLowerCase().match(/[\u0900-\u097F\w]+/g) || [];
  }

  train(text, className) {
    const tokens = this.tokenize(text);
    if (tokens.length === 0) return;

    if (!this.classes[className]) {
      this.classes[className] = { docCount: 0, tokens: {}, tokenTotal: 0 };
    }
    
    this.classes[className].docCount++;
    this.totalDocuments++;

    tokens.forEach(token => {
      this.vocabulary.add(token);
      this.classes[className].tokens[token] = (this.classes[className].tokens[token] || 0) + 1;
      this.classes[className].tokenTotal++;
    });
  }

  predict(text) {
    const tokens = this.tokenize(text);
    if (tokens.length === 0 || this.totalDocuments === 0) return null;

    let bestClass = null;
    let maxProb = -Infinity;

    // We calculate scores for each class
    for (const className in this.classes) {
      const classData = this.classes[className];
      
      // Initial score is the prior probability of the class: P(C)
      let prob = Math.log(classData.docCount / this.totalDocuments);
      
      tokens.forEach(token => {
        // Laplace Smoothing: (count + 1) / (totalClassTokens + vocabularySize)
        const tokenCount = classData.tokens[token] || 0;
        const wordProb = (tokenCount + 1) / (classData.tokenTotal + this.vocabulary.size);
        prob += Math.log(wordProb);
      });

      if (prob > maxProb) {
        maxProb = prob;
        bestClass = className;
      }
    }

    // Confidence check: If the user input is completely unrelated to anything trained, 
    // the maxProb will be extremely low. 
    // For a local naive bayes with small data, we return the best match,
    // but the AIChatbot component can decide to fallback if the result is 'unknown'
    return bestClass;
  }
}

export default NaiveBayesClassifier;
