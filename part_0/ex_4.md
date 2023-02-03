# New Note Creation

sequenceDiagram
    participant B as Browser
    participant S as Server
    B->>+S: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    S-->>-A: Redirect(302) https://studies.cs.helsinki.fi/exampleapp/notes
