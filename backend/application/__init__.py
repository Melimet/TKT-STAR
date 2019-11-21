import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'

db = SQLAlchemy(app)

from .Models.models import Book


if not os.path.isfile('./Application/database.db'):
   db.create_all()
   db.session.add(Book(title="Clean Code: A Handbook of Agile Software Craftsmanship", author='Robert Martin', isbn='978-0132350884', tags='Ohjelmointi, design patterns'))
   db.session.add(Book(title="Clean Agile", author='Robert Martin', isbn='9784322350884', tags='Ohjelmointi, design patterns, Ohjelmistuotanto, Agile'))
   db.session.commit()

@app.route('/')
@app.route('/api/books', methods = ['GET', 'POST'])
def booksFunc():
   if request.method == 'GET':
      return get_books()
   elif request.method == 'POST':
      data = request.json
      title = data.get('title')
      author = data.get('author')
      isbn = data.get('isbn')
      tags = data.get('tags')

      db.session.add(Book(title=title, author=author, isbn=isbn, tags=tags))
      db.session.commit()
      return get_books()


def get_books():
   with app.app_context():
      books = Book.query.all()
      for book in books:
         print((book.serialize))
      return jsonify(books= [book.serialize for book in books])

