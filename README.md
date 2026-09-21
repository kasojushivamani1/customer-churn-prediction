# Customer Churn Prediction

A machine learning project that predicts whether a customer is likely to churn based on their service and account information.

## Project Overview

Customer churn prediction is a common machine learning problem in which the goal is to identify customers who may leave a service.

In this project, I built and evaluated multiple machine learning models using the Telco Customer Churn dataset.

## Machine Learning Workflow

The project follows a complete ML workflow:

1. Data loading
2. Data exploration
3. Data cleaning
4. Exploratory Data Analysis (EDA)
5. Feature engineering
6. Categorical encoding
7. Train/test split
8. Feature scaling
9. Model training
10. Model evaluation
11. Model comparison

## Models Used

- Logistic Regression
- Decision Tree
- Random Forest

## Evaluation Metrics

The models were evaluated using:

- Accuracy
- Precision
- Recall
- F1-score
- Confusion Matrix

## Technologies Used

- Python
- Jupyter Notebook
- Pandas
- NumPy
- Matplotlib
- Seaborn
- Scikit-learn

## Dataset

The project uses the Telco Customer Churn dataset, containing customer demographic, service, contract, and billing information.

The target variable is:

- `0` → Customer stays
- `1` → Customer churns

## Results

The models were trained and evaluated on unseen test data.

The notebook contains the detailed evaluation results and comparison between the different models.

## Project Structure

```text
customer-churn-prediction/
│
├── customer_churn_prediction.ipynb
└── README.md
