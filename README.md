# Club Med MCP Server - POC

MCP (Model Context Protocol) server with chatbot interface for Club Med resort recommendations.

## Quick Start

### 1. Setup Environment

```bash
# Create and activate virtual environment
uv sync
uv run club-med-mcp 

# Install dependencies
Expose with ngrok → ngrok http 8000 (in a second terminal)
Add to ChatGPT → paste https://<your-ngrok-url>/mcp as an MCP server
```

