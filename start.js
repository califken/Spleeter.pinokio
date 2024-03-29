{
    "daemon": true,
    "run": [{
      "method": "shell.run",
      "params": {
        "path": "Spleeter",
        "venv": "venv",
        "message": "streamlit run app.py",
        "on": [{
          "event": "/http://[0-9.:]+/",
          "done": true
        }]
      }
    }, {
      "method": "self.set",
      "params": {
        "session.json": {
          "url": "{{input.event[0]}}"
        }
      }
    }, {
      "method": "browser.open",
      "params": {
        "uri": "{{self.session.url}}",
        "target": "_blank"
      }
    }]
  }
  