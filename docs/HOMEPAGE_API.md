# Homepage Configuration API Documentation

## Overview
The Homepage Configuration API allows users to save and retrieve personalized dashboard configurations. Each user can customize which widgets appear on their homepage, their order, and layout preferences.

---

## Endpoints

### 1. Get Homepage Configuration

**Endpoint:** `GET /homepage/config/`

**Description:** Retrieves the saved homepage configuration for a specific user.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| playerTag | string | Yes | The user's player handle/tag |

**Request Example:**
```bash
GET http://localhost:3000/homepage/config/?playerTag=3D-Printed-Cat
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "widgets": [
      {
        "id": "welcome",
        "type": "welcome",
        "enabled": true,
        "order": 1
      },
      {
        "id": "stats",
        "type": "stats",
        "enabled": true,
        "order": 2
      },
      {
        "id": "quickLinks",
        "type": "quickLinks",
        "enabled": true,
        "order": 3
      },
      {
        "id": "recentActivity",
        "type": "recentActivity",
        "enabled": false,
        "order": 4
      }
    ],
    "layout": "grid",
    "theme": "default"
  },
  "playerTag": "3D-Printed-Cat"
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "No configuration found for user",
  "playerTag": "3D-Printed-Cat"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "playerTag parameter is required"
}
```

---

### 2. Save Homepage Configuration

**Endpoint:** `POST /homepage/config/`

**Description:** Saves or updates the homepage configuration for a specific user.

**Request Body:**
```json
{
  "playerTag": "3D-Printed-Cat",
  "config": {
    "widgets": [
      {
        "id": "welcome",
        "type": "welcome",
        "enabled": true,
        "order": 1
      },
      {
        "id": "stats",
        "type": "stats",
        "enabled": true,
        "order": 2
      },
      {
        "id": "quickLinks",
        "type": "quickLinks",
        "enabled": true,
        "order": 3
      },
      {
        "id": "recentActivity",
        "type": "recentActivity",
        "enabled": false,
        "order": 4
      }
    ],
    "layout": "grid",
    "theme": "default"
  }
}
```

**Request Example (cURL):**
```bash
curl -X POST http://localhost:3000/homepage/config/ \
  -H "Content-Type: application/json" \
  -d '{
    "playerTag": "3D-Printed-Cat",
    "config": {
      "widgets": [
        {
          "id": "welcome",
          "type": "welcome",
          "enabled": true,
          "order": 1
        }
      ],
      "layout": "grid",
      "theme": "default"
    }
  }'
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Homepage configuration saved successfully",
  "playerTag": "3D-Printed-Cat",
  "data": {
    "widgets": [...],
    "layout": "grid",
    "theme": "default"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "playerTag and config are required"
}
```

---

## Data Structure

### Configuration Object

The configuration object contains all homepage customization settings.

```typescript
interface HomepageConfig {
  widgets: Widget[];
  layout: "grid" | "list";
  theme: string;
}
```

### Widget Object

Each widget represents a component on the homepage.

```typescript
interface Widget {
  id: string;           // Unique identifier for the widget
  type: WidgetType;     // Type of widget (determines what is displayed)
  enabled: boolean;     // Whether the widget is visible
  order: number;        // Display order (1 = first, 2 = second, etc.)
}
```

### Widget Types

Available widget types and their purposes:

| Type | Description | Default Enabled |
|------|-------------|----------------|
| `welcome` | Welcome message with user's name | Yes |
| `stats` | Summary statistics (items, events, members) | Yes |
| `quickLinks` | Quick navigation buttons | Yes |
| `recentActivity` | Recent user/org activity feed | Yes |

---

## Database Schema

### Recommended MongoDB Schema

```javascript
{
  playerTag: String,        // Primary key / user identifier
  config: {
    widgets: [{
      id: String,
      type: String,
      enabled: Boolean,
      order: Number
    }],
    layout: String,         // "grid" or "list"
    theme: String           // Theme preference
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Recommended SQL Schema

```sql
-- Main config table
CREATE TABLE homepage_configs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    player_tag VARCHAR(255) UNIQUE NOT NULL,
    layout VARCHAR(50) DEFAULT 'grid',
    theme VARCHAR(50) DEFAULT 'default',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Widgets table (many-to-one relationship)
CREATE TABLE homepage_widgets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    config_id INT NOT NULL,
    widget_id VARCHAR(50) NOT NULL,
    widget_type VARCHAR(50) NOT NULL,
    enabled BOOLEAN DEFAULT true,
    display_order INT NOT NULL,
    FOREIGN KEY (config_id) REFERENCES homepage_configs(id) ON DELETE CASCADE
);
```

---

## Implementation Example (Node.js/Express)

```javascript
// Backend implementation example
app.get('/homepage/config/', async (req, res) => {
  const { playerTag } = req.query;
  
  if (!playerTag) {
    return res.status(400).json({
      success: false,
      error: 'playerTag parameter is required'
    });
  }
  
  try {
    // Query database for user's config
    const config = await db.query(
      'SELECT * FROM homepage_configs WHERE player_tag = ?',
      [playerTag]
    );
    
    if (!config) {
      return res.status(404).json({
        success: false,
        error: 'No configuration found for user',
        playerTag
      });
    }
    
    res.json({
      success: true,
      data: config,
      playerTag
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

app.post('/homepage/config/', async (req, res) => {
  const { playerTag, config } = req.body;
  
  if (!playerTag || !config) {
    return res.status(400).json({
      success: false,
      error: 'playerTag and config are required'
    });
  }
  
  try {
    // Upsert (insert or update) config in database
    await db.query(
      `INSERT INTO homepage_configs (player_tag, config, updated_at) 
       VALUES (?, ?, NOW()) 
       ON DUPLICATE KEY UPDATE config = ?, updated_at = NOW()`,
      [playerTag, JSON.stringify(config), JSON.stringify(config)]
    );
    
    res.json({
      success: true,
      message: 'Homepage configuration saved successfully',
      playerTag,
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});
```

---

## Testing

### Test GET Request
```bash
curl -X GET "http://localhost:3000/homepage/config/?playerTag=TestUser"
```

### Test POST Request
```bash
curl -X POST http://localhost:3000/homepage/config/ \
  -H "Content-Type: application/json" \
  -d '{
    "playerTag": "TestUser",
    "config": {
      "widgets": [
        {"id": "welcome", "type": "welcome", "enabled": true, "order": 1},
        {"id": "stats", "type": "stats", "enabled": true, "order": 2}
      ],
      "layout": "grid",
      "theme": "default"
    }
  }'
```

---

## Notes

1. **Default Configuration**: If a user hasn't configured their homepage yet, the frontend will use a default configuration client-side.

2. **Widget Validation**: The backend should validate that widget types are valid before saving.

3. **Authentication**: In production, add authentication middleware to verify the requesting user matches the playerTag.

4. **Rate Limiting**: Consider implementing rate limiting to prevent abuse of the save endpoint.

5. **Versioning**: Consider adding a version field to handle future config schema changes.

---

## Future Enhancements

- **Widget Settings**: Allow widgets to have their own configuration (e.g., number of items to show)
- **Preset Layouts**: Provide pre-made layout templates users can select
- **Widget Positioning**: Precise grid positions instead of just order
- **Custom Widgets**: Allow users to create custom widgets
- **Import/Export**: Let users share configurations
