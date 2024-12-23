from fastapi import FastAPI, HTTPException
import httpx

app = FastAPI()

BASE_URL = "https://take-home-assessment-423502.uc.r.appspot.com"

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
