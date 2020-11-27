import xlrd

def get_students_data():
    workbook = xlrd.open_workbook('./data.xlsx')
    data_sheet = workbook.sheet_by_index(0)

    students = []

    for r in range(1, data_sheet.nrows):
        students.append({
            'name': data_sheet.cell_value(r, 0),
            'email': data_sheet.cell_value(r, 1),
            'age': int(data_sheet.cell_value(r, 2)),
            'grade': data_sheet.cell_value(r, 3),
            'phone': data_sheet.cell_value(r, 4),
            'id': int(data_sheet.cell_value(r, 5)),
            'address': data_sheet.cell_value(r, 6), 
        })

    return students
