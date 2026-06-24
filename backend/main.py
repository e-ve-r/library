from jose import jwt
from datetime import datetime, timedelta
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from fastapi import Header

load_dotenv()
jwt_key = os.getenv("SECRET_KEY")

hasing_algorithm = "HS256"

app = FastAPI()

def encode_token(data: dict):
  payload = data.copy()
  token = jwt.encode(
      payload,
      jwt_key,
      algorithm=hasing_algorithm
    )
  return token

def decode_token(token: str):
  payload = jwt.decode(
      token,
      jwt_key,
      algorithms=[hasing_algorithm] 
      # there is an extra 's'
    )
  return payload

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
        data_to_be_tokenized = {
          "username":each_entry["username"],
          "role":each_entry["role"]
        }
        token=encode_token(data_to_be_tokenized)
        return {"token":token}

    for each_entry in student_db:
      if user.username == each_entry["username"] and user.password == each_entry["password"]:
        data_to_be_tokenized = {
          "username":each_entry["username"],
          "role":each_entry["role"],
          "overdues":each_entry["overdues"]
        }
        token=encode_token(data_to_be_tokenized)
        return {"token":token}
    raise HTTPException(status_code=404, detail="Item not found")

# sending token as a body
# @app.post("/getuser")
# def get_books(token: str = Body(...)):
#  payload = decode_token(token)
#  return payload

# shall be sent as a header

@app.get("/getuser")
def get_books(authorization: str = Header()):
  token = authorization.split(" ")[1]
  payload = decode_token(token)
  return payload

@app.get("/getbooks")
def get_books():
  return book_db

@app.get("/overdues/{username}")
def get_books(username:str):
  for stu in student_db:
    if stu["username"] == username:
      return stu["overdues"]

# Admin Routes

@app.delete("/delete/{id}")
def delete_item(id: int, authorization: str = Header()):
  token = authorization.split(" ")[1]
  payload = decode_token(token)
  if payload["role"] != "admin":
    raise HTTPException(status_code=403,detail="Admins only")
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