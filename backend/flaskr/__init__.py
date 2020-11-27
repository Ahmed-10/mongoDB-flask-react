from flask import Flask, request, jsonify, abort
from pymongo import MongoClient
from bson.objectid import ObjectId

from load_xlsx import get_students_data

app = Flask(__name__)
client = MongoClient("mongodb+srv://user:root@cluster.8acem.mongodb.net/dev?retryWrites=true&w=majority")
db = client.get_default_database('students')
students = db.students


@app.route('/')
def index():
    # data = list(students.find())
    # students_data = get_students_data()
    # students.insert_many(students_data)
    return 'Hello World!'


@app.route('/students', methods=['GET'])
def get_students():
    data = list(students.find())
    
    try:
        for student in data:
            student['_id'] = str(student['_id'])
        return jsonify({
            'students': data
        })
    except Exception as error:
        print(error)
        abort(500)        


@app.route('/students', methods=['POST'])
def add_student():
    body = request.get_json()
    
    try:
        id = len(list(students.find())) + 1
        body['id'] = id
        _id = students.insert_one(body).inserted_id
        return jsonify({
            'student_id': str(_id)
        })
    except Exception as error:
        print(error)
        abort(500)


@app.route('/students/<int:id>', methods=['PATCH'])
def update_student(id):
    body = request.get_json()

    try:
        response = students.update_one(
            { 'id': id },
            { '$set': body }
        )
        return jsonify({
            'updated': response.modified_count,
            'student_id': id
        })
    except Exception as error:
        print(error)
        abort(500)
    

@app.route('/students/<int:id>', methods=['DELETE'])
def delete_student(id):
    try:
        response = students.delete_one(
            { 'id': id }
        )
        return jsonify({
            'updated': response.deleted_count,
            'student_id': id
        })
    except Exception as error:
        print(error)
        abort(500)


if __name__ == '__main__':
    app.run()
