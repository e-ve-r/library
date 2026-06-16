from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# the frontend parameters like username, password and role should match with backend naming

class GetModel(BaseModel):
    username: str
    password: str
    role: str

class DeleteModel(BaseModel):
    id: int

class PostModel(BaseModel):
    id: int
    title: str
    author: str
    year: int
    genre: str

book_db = [
  {
    "id": 1,
    "title": 'The Great Gatsby',
    "author": 'F. Scott Fitzgerald',
    "year": 1925,
    "genre": 'Classic Fiction',
  },
  {
    "id": 2,
    "title": '1984',
    "author": 'George Orwell',
    "year": 1949,
    "genre": 'Dystopian',
  },
  {
    "id": 3,
    "title": 'To Kill a Mockingbird',
    "author": 'Harper Lee',
    "year": 1960,
    "genre": 'Historical Fiction',
  },
  {
    "id": 4,
    "title": 'The Hobbit',
    "author": 'J.R.R. Tolkien',
    "year": 1937,
    "genre": 'Fantasy',
  },
  {
    "id": 5,
    "title": 'Pride and Prejudice',
    "author": 'Jane Austen',
    "year": 1813,
    "genre": 'Romance',
  },
]
# converts to PostModel object, the data sent by frontend

@app.post("/login")
def login(user: GetModel):
    return book_db

@app.delete("/delete")
def delete_item(id: int):
    global book_db
    book_db = [
        book
        for book in book_db
        if book["id"] != id
    ]
    return book_db

@app.post("/add")
def login(book: PostModel):
    global book_db
    book_db.append(book)
    return book_db