from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId


app = Flask(__name__)
client = MongoClient("mongodb+srv://user:root@cluster.8acem.mongodb.net/dev?retryWrites=true&w=majority")
db = client.get_default_database('students')
students = db.students

@app.route('/')
def hello():
    return 'Hello World!'

@app.route('/students', methods=['GET'])
def get_students():
    data = list(students.find())
    for student in data:
        student['_id'] = str(student['_id'])
    return jsonify({
        'students': data
    })


@app.route('/students', methods=['POST'])
def add_student():
    body = request.get_json()
    id = students.insert_one(body).inserted_id
    return jsonify({
        'student_id': str(id)
    })


@app.route('/students/<id>', methods=['PATCH'])
def update_student(id):
    response = students.update_one(
        { '_id': ObjectId(id) },
        { '$set': { 'name': 'ahmed' } }
    )
    return jsonify({
        'updated': response.modified_count,
        'student_id': id
    })

@app.route('/students/<id>', methods=['DELETE'])
def delete_student(id):
    response = students.delete_one(
        { '_id': ObjectId(id) }
    )

    for attr in dir(response):
        print("--->>>" + attr)

    return jsonify({
        'updated': response.deleted_count,
        'student_id': id
    })


if __name__ == '__main__':
    app.run()
