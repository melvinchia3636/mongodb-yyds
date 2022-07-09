import requests
import json
data = requests.post("http://localhost:3636/create", headers={
    "content-type": "application/json"
}, data=json.dumps({
  "name": "test",
  "content": "lorem ipsum"
}))
print(data)