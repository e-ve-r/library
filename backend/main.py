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

class LoginModel(BaseModel):
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
    "title": 'Quantum Computing',
    "quantity": 4
  },
  {
    "id": 2,
    "title": 'Machine Learning',
    "quantity": 3
  },
  {
    "id": 3,
    "title": 'Java',
    "quantity": 1
  },
  {
    "id": 4,
    "title": 'DSA',
    "quantity": 5
  },
  {
    "id": 5,
    "title": 'C++',
    "quantity": 2
  },
]

admin_db= [{
  "username": "ad1",
  "password": "admin123",
  "role":"admin"
},
{"username": "ad2",
  "password": "admin123",
  "role":"admin"
}]

student_db= [{
  "username": "stu1",
  "password": "student123",
  "role":"student",
  "overdues": True
},
{"username": "stu2",
  "password": "student123",
  "role":"student",
  "overdues": False
}]


# Note: eg. user.usename matches directly to the naming convention in the pydantic model as well as to the data coming from frontend
@app.post("/login")
def login(user: LoginModel):
  # retuning book, role and name as dictionary 
  # note: user is an pydantic: LoginModel object and not a dictionary
    
    for each_entry in admin_db:
      if user.username == each_entry["username"] and user.password == each_entry["password"]:
        return{
          "books": book_db,
          "role": "admin",
          "username":each_entry["username"]
        }

    for each_entry in student_db:
      if user.username == each_entry["username"] and user.password == each_entry["password"]:
        return{
          "books": book_db,
          "role": "student",
          "username":each_entry["username"],
          "overdues":each_entry["overdues"]
        }
    raise HTTPException(status_code=404, detail="Item not found")

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
def add_item(book: PostModel):
    global book_db
    book_db.append(book.model_dump())
    return book_db


@app.put("/edit/{id}")
def edit_item(id: int, new_book: EditModel):
    global book_db
    book_db = [
        new_book.model_dump()
        if book["id"] == id
        else book
        for book in book_db
    ]
    return book_db