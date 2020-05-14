import pymysql.cursors
import csv
from collections import namedtuple

Row = namedtuple('Row', ['id', 'name', 'author', 'publisher', 'year'])

query_sql = "INSERT INTO `Books` VALUES (%s, %s, %s, %s, %s)"
values = []
for row in map(Row._make, csv.reader(open('BookListCleaned.csv', 'r'))):
    values.append((int(row.id.strip()), row.name.strip(), row.author.strip(), row.publisher.strip(), row.year.strip()))
    # query_sql += "({}, '{}', '{}', '{}', '{}'),".format(row.id.strip(), row.name.strip(), row.author.strip(), row.publisher.strip(), row.year.strip())

for val in values:
    print(val)
# print(query_sql)

connection = pymysql.connect(
    host='localhost',
    user='root',
    password='timberpot',
    db='Library',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

try:
    with connection.cursor() as cursor:
        cursor.executemany(query_sql, values)

        connection.commit()
finally:
    connection.close()