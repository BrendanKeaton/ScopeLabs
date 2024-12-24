from fastapi import FastAPI, HTTPException
import httpx
from pydantic import BaseModel

# Create classes for the input of functions
class Video(BaseModel):
    user_id: str
    description: str
    video_url: str
    title: str

class Comment(BaseModel):
      video_id: str
      content: str
      user_id: str

app = FastAPI()

print(app.routes)

@app.get("/api/py/getVideo")
async def get_video(user_id: str):
    try:
        #request the external API
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id={user_id}")

        #check return code / success
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)

    except httpx.RequestError as exc:
        raise HTTPException(status_code=500, detail=f"Request to external API failed: {exc}")
    
@app.get("/api/py/getComments")
async def get_comments(video_id: str):
    try:
        #request the external API
        async with httpx.AsyncClient() as client:
            response = await client.get(f"https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id={video_id}")

        #check return code / success
        if response.status_code == 200:
            return response.json()
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)

    except httpx.RequestError as exc:
        raise HTTPException(status_code=500, detail=f"Request to external API failed: {exc}")

@app.post("/api/py/addVideo")
async def add_video(video: Video):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://take-home-assessment-423502.uc.r.appspot.com/api/videos",
                json=video.model_dump(), 
                headers={
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            )

        if response.status_code == 201:
            return {"message": "Video added successfully!"}
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)

    except httpx.RequestError as exc:
        raise HTTPException(status_code=500, detail=f"Request to external API failed: {exc}")
    
@app.post("/api/py/addComment")
async def add_comment(comment: Comment):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments",
                json=comment.model_dump(), 
                headers={
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            )

        if response.status_code == 201:
            return {"message": "Comment added successfully!"}
        else:
            raise HTTPException(status_code=response.status_code, detail=response.text)

    except httpx.RequestError as exc:
        raise HTTPException(status_code=500, detail=f"Request to external API failed: {exc}")