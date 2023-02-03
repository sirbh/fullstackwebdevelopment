# New Note Creation

```mermaid
sequenceDiagram
    participant B as Browser
    participant S as Server
    B->>+S: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of B: Payload note="text"
    S-->>-B: Redirect(302) https://studies.cs.helsinki.fi/exampleapp/notes
    
    B->>+S: GET https://studies.cs.helsinki.fi/exampleapp/notes
    S-->>-B: HTML document
    
    B->>+S: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    S-->>-B: the css file
    
    B->>+S: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    S-->>-B: the JavaScript file
    
    Note right of B: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    B->>+S: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    S-->>-B: [{ "content": "Text", "date": "2023-1-1" }, ... ]    

    Note right of B: The browser executes the callback function that renders the notes
