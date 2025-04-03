from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserData(BaseModel):
    sleep_hours: float
    meals: int
    water_ml: int

@app.post("/update-status")
def update_status(data: UserData):
    score = 0
    if data.sleep_hours >= 7:
        score += 1
    if data.meals >= 3:
        score += 1
    if data.water_ml >= 1500:
        score += 1

    if score == 3:
        mood = "happy"
    elif score == 2:
        mood = "neutral"
    else:
        mood = "sad"

    return {"mood": mood}
