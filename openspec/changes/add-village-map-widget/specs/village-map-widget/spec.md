## ADDED Requirements

### Requirement: Extract village data from destinations API at startup
The MCP server SHALL fetch destinations from the Club Med API during lifespan initialization, filtering for `type==VILLAGE`, and SHALL extract a flat list of village objects with coordinates for use by the widget.

#### Scenario: Successful village extraction
- **WHEN** the MCP server starts and the destinations API returns a successful response
- **THEN** the server SHALL extract all products with `type == "VILLAGE"` and non-null `coordinates` from the nested geographical_area → countries → products structure
- **THEN** each extracted village SHALL contain: `id` (product code), `name` (product id as label), `country` (country label), `area` (geographical_area label), `latitude`, and `longitude`
- **THEN** the extracted village list SHALL be stored in the lifespan context as `villages`

#### Scenario: Destinations API failure at startup
- **WHEN** the destinations API returns an error response during lifespan initialization
- **THEN** the server SHALL log a warning and set the village list to an empty list
- **THEN** the server SHALL continue to start normally (existing tools remain functional)

#### Scenario: No villages with coordinates
- **WHEN** the destinations API returns successfully but no products have `type == "VILLAGE"` with non-null coordinates
- **THEN** the village list SHALL be empty
- **THEN** the widget SHALL render a map with no markers

### Requirement: Generate self-contained HTML widget at startup
The MCP server SHALL generate a single self-contained HTML string at startup that renders an interactive map with village markers and a browsable carousel/list.

#### Scenario: HTML generation with village data
- **WHEN** the village list is available after startup
- **THEN** the server SHALL generate an HTML string that embeds the village data as an inline JSON `<script>` block
- **THEN** the HTML SHALL load React 19, Mapbox GL JS v3, and Tailwind CSS from CDN URLs
- **THEN** the HTML SHALL contain all application JavaScript inline (no external app JS files)

#### Scenario: Widget renders map with markers
- **WHEN** the HTML widget is loaded in a browser
- **THEN** it SHALL display a Mapbox GL map with the `streets-v12` style
- **THEN** it SHALL place a colored marker at each village's coordinates
- **THEN** the map SHALL auto-fit bounds to show all markers on initial load

#### Scenario: Widget renders village carousel
- **WHEN** the HTML widget is loaded in a browser in inline (non-fullscreen) mode
- **THEN** it SHALL display a horizontally scrollable carousel at the bottom of the map
- **THEN** each carousel card SHALL show the village name, country, and geographical area
- **THEN** clicking a carousel card SHALL pan the map to that village's location

#### Scenario: Widget renders village sidebar in fullscreen
- **WHEN** the HTML widget is displayed in fullscreen mode (`window.oai` displayMode is `"fullscreen"`)
- **THEN** it SHALL display a vertical scrollable sidebar on the left side of the map
- **THEN** each sidebar item SHALL show the village name, country, and geographical area
- **THEN** clicking a sidebar item SHALL pan the map to that village's location

### Requirement: Register widget as MCP tool with OpenAI output template
The MCP server SHALL register a tool named `show_clubmed_village_map` that returns structured content and references the widget HTML via the OpenAI Apps SDK resource pattern.

#### Scenario: Tool appears in list_tools
- **WHEN** an MCP client calls `list_tools`
- **THEN** the response SHALL include a tool with `name` equal to `"show-clubmed-village-map"`
- **THEN** the tool SHALL have `_meta` containing `"openai/outputTemplate"` pointing to the resource URI `"ui://widget/clubmed-village-map.html"`
- **THEN** the tool SHALL have `_meta` containing `"openai/toolInvocation/invoking"` and `"openai/toolInvocation/invoked"` status messages
- **THEN** the tool SHALL have annotations `readOnlyHint: true`, `destructiveHint: false`, `openWorldHint: false`

#### Scenario: Tool call returns structured content
- **WHEN** an MCP client calls the `show-clubmed-village-map` tool
- **THEN** the response SHALL include a `TextContent` with a summary message
- **THEN** the response SHALL include `structuredContent` with a `villageCount` field indicating how many villages are displayed
- **THEN** the response SHALL include `_meta` with invocation status metadata

### Requirement: Register widget as MCP resource
The MCP server SHALL register the widget HTML as an MCP resource accessible via a `ui://` URI scheme.

#### Scenario: Resource appears in list_resources
- **WHEN** an MCP client calls `list_resources`
- **THEN** the response SHALL include a resource with URI `"ui://widget/clubmed-village-map.html"`
- **THEN** the resource SHALL have `mimeType` equal to `"text/html+skybridge"`

#### Scenario: Resource read returns widget HTML
- **WHEN** an MCP client reads the resource at `"ui://widget/clubmed-village-map.html"`
- **THEN** the response SHALL contain the self-contained HTML widget string
- **THEN** the content SHALL have `mimeType` equal to `"text/html+skybridge"`

### Requirement: Coexist with existing decorator-registered tools
The widget tool and resource handlers SHALL coexist with the existing `@mcp.tool()`-decorated tools without breaking them.

#### Scenario: Existing tools remain functional
- **WHEN** the widget tool and resource handlers are registered
- **THEN** the `get_clubmed_products` tool SHALL continue to work as before
- **THEN** the `get_clubmed_destinations` tool SHALL continue to work as before

#### Scenario: All tools listed together
- **WHEN** an MCP client calls `list_tools`
- **THEN** the response SHALL include `get_clubmed_products`, `get_clubmed_destinations`, and `show-clubmed-village-map`
