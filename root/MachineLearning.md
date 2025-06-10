# MachineLearning

## Algorithms

### Random Forest

Combines multiple decision trees for accurate, robust classification and regression.

### SVM

Identifies optimal hyperplane to maximize class separation with high accuracy.

### K-Nearest Neighbors

Classifies data points by majority vote of nearest neighbors.

### Decision Tree

Divides data into branches using feature splits for clear decisions.

### Logistic Regression

Uses a logistic function to model the probability of a binary outcome, often used for classification tasks.

### Naive Bayes

Applies Bayes' Theorem with strong (naive) independence assumptions to classify data, often used for text classification.

## Code

https://www.mycompiler.io/new/python

```python
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score
import matplotlib.pyplot as pyplot
import numpy as numpy

digits = load_digits()

X_train, X_test, y_train, y_test = train_test_split(digits.data, digits.target, test_size=0.3, random_state=42)

models = {
    "Random Forest": RandomForestClassifier(random_state=42),
    "SVM": SVC(random_state=42),
    "KNN": KNeighborsClassifier(),
    "Decision Tree": DecisionTreeClassifier(random_state=42),
    "Logistic Regression": LogisticRegression(max_iter=10000, random_state=42),
    "Naive Bayes": GaussianNB()
}

index = numpy.random.randint(0, len(X_test))

fig, axes = pyplot.subplots(1, len(models), figsize=(4 * len(models), 6))

for axe, (name, model) in zip(axes, models.items()):
    model.fit(X_train, y_train)
    predicted = model.predict([X_test[index]])[0]
    actual = y_test[index]
    accuracy = accuracy_score(y_test, model.predict(X_test)) * 100
    axe.set_title(f" {name} \n Predicted: {predicted} \n Actual: {actual} \n Accuracy: {accuracy:.2f}%")
    axe.imshow(X_test[index].reshape(8, 8), cmap='gray')

pyplot.tight_layout()

pyplot.show()

```
