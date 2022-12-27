```mermaid
sequenceDiagram
    Browser->>Server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of Browser: Browser sending payload with JSON - {content: "Testing", date: "2022-12-27T13:11:47.538Z"}
    Server-->>Browser: {"message":"note created"}

```
