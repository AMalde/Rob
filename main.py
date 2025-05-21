from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse

from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to your React dev server origin
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Robot Control Server is Running"}

@app.get("/ping")
def ping():
    return {"status": "I'm doing well, how are you?"}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        print(f"Received: {data}")
        await websocket.send_text(f"Echo: {data}")