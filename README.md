# mongoDB-flask-react
web application example for using mongoDB with python flask

## the application contains three sub-application/service:

* ## Frontend
  - This project was bootstrapped with Create React App.
  - the elements is created using Material-UI
  - to start the frontend
    ```
    cd <project directory>/frontend
    ```
    - install the dependancies
    ```
    yarn
    ```
    - start the development server
    ```
    yarn start
    ```
* ## Backend
  simple flask application 
  layout:
  ```
  ├── flaskr/
  │   └── __init__.py
  ├── venv/
  ├── load_xlsx.py
  ├── data.xlsx
  └── requirements.txt
  ```
  - to start the backend in your local machine
    ```
    cd <project directory>/backend
    ```
    - create virtual environment
    ```
    python3 -m venv venv
    ```
    - activate the virtual environment
    ```
    source venv/bin/activate
    ```    
    - install the dependancies
    ```
    pip3 install -r requirements.txt
    ```
    - select flask app
    ```
    export FLASK_APP=flaskr
    ```
    - start the development server
    ```
    flask run
    ```
* ## MongoDB Database
  the application is using a cloud database service MongoDB Atlas so you need to be connected to the internet to use the full functionality of the application on your local machine
  
  no steps are required 
