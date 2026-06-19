from fastapi import FastAPI, HTTPException
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

class DeleteModel(BaseModel):
    id: int

class PostModel(BaseModel):
    id: int
    title: str
    quantity: int

class EditModel(BaseModel):
    id: int
    title: str
    quantity: int

book_db = [
  {
    "id": 1,
    "title": 'The Great Gatsby',
    "quantity": 4
  },
  {
    "id": 2,
    "title": '1984',
    "quantity": 3
  },
  {
    "id": 3,
    "title": 'To Kill a Mockingbird',
    "quantity": 1
  },
  {
    "id": 4,
    "title": 'The Hobbit',
    "quantity": 5
  },
  {
    "id": 5,
    "title": 'Pride and Prejudice',
    "quantity": 2
  },
]

admin_db= [{
  "username": "ad1",
  "password": "admin123"
},
{"username": "ad2",
  "password": "admin123"
}]

student_db= [{
  "username": "stu1",
  "password": "stu123"
},
{"username": "stu2",
  "password": "stu123"
}]

# converts to PostModel object, the data sent by frontend

@app.post("/login")
def login(user: GetModel):
    user_dict = {"username": user.username, "password": user.password}
    if user_dict in admin_db:
      return {"books": book_db, "role": "admin", "name":user.username}
    elif user_dict in student_db:
      return {"books": book_db, "role": "student"}
    else:
      raise HTTPException(status_code=401, detail="Invalid credentials")

@app.delete("/delete/{id}")
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


@app.put("/edit")
def edit_item(edit: EditModel):
    global book_db
    book_db = [
        edit if book["id"] == edit.id else book
        for book in book_db
    ]
    return book_db