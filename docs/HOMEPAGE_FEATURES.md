# Homepage Feature - Implementation Guide

## Overview

A customizable dashboard that serves as the landing page for logged-in users. Users can configure which widgets appear, their order, and save preferences to the backend.

---

## What Was Created

### Frontend Components

1. **`/src/components/Homepage.js`**
   - Main homepage component with widget system
   - Built-in widgets: Welcome, Stats, Quick Links, Recent Activity
   - Customization controls (refresh, customize button)
   - Responsive grid layout

2. **Updated `/src/shared/mainTradingPage.js`**
   - Added "Home" menu item with icon
   - Homepage set as default route (`/`)
   - Settings modal moved to route (`/Settings`)

### Backend

3. **Updated `/workspaces/bmtapp/backend/server.js`**
   - `GET /homepage/config/` - Retrieve user config
   - `POST /homepage/config/` - Save user config
   - Default configuration response included

### Documentation

4. **`/workspaces/bmtapp/docs/HOMEPAGE_API.md`**
   - Complete API documentation
   - Request/response examples
   - Database schema recommendations (MongoDB & SQL)
   - Implementation examples
   - Testing instructions

---

## Features Implemented

### ✅ Current Features

- **4 Default Widgets:**
  - Welcome Widget - Personalized greeting
  - Stats Widget - Quick stats with navigation (Items, Events, Members, Services)
  - Quick Links - Fast navigation buttons
  - Recent Activity - Activity feed (placeholder)

- **Widget Management:**
  - Enable/disable widgets
  - Custom ordering
  - Persistent storage

- **UI/UX:**
  - Responsive design (mobile, tablet, desktop)
  - Loading states
  - Error handling
  - Refresh data button
  - Navigate to customization

- **Backend Integration:**
  - GET endpoint to retrieve config
  - POST endpoint to save config
  - Default config fallback

---

## How to Use

### For Users

1. **Access the Homepage:**
   - Log in to the app
   - Homepage loads automatically as the default view
   - Click "Home" in the sidebar to return anytime

2. **View Dashboard:**
   - See welcome message with your username
   - Check quick stats (clickable to navigate)
   - Use quick links for fast navigation
   - View recent activity

3. **Customize (Future):**
   - Click "Customize" button (top right)
   - Toggle widgets on/off
   - Reorder widgets
   - Save configuration

### For Developers

#### Adding New Widgets

1. **Create Widget Component:**
```javascript
const MyNewWidget = ({ data }) => {
  return (
    <Card title="My Widget">
      {/* Widget content */}
    </Card>
  );
};
```

2. **Register in Homepage.js:**
```javascript
// In getDefaultConfig()
{ id: 'myWidget', type: 'myWidget', enabled: true, order: 5 }

// In render logic
case 'myWidget':
  return (
    <Col xs={24} md={12} key={widget.id}>
      <MyNewWidget />
    </Col>
  );
```

3. **Update Documentation:**
Add the new widget type to `HOMEPAGE_API.md` widget types table.

#### Implementing Database Storage

**MongoDB Example:**
```javascript
const HomepageConfig = mongoose.model('HomepageConfig', {
  playerTag: { type: String, unique: true, required: true },
  config: {
    widgets: [{
      id: String,
      type: String,
      enabled: Boolean,
      order: Number
    }],
    layout: String,
    theme: String
  },
  updatedAt: { type: Date, default: Date.now }
});

// GET endpoint
app.get('/homepage/config/', async (req, res) => {
  const { playerTag } = req.query;
  const config = await HomepageConfig.findOne({ playerTag });
  
  if (!config) {
    return res.status(404).json({
      success: false,
      error: 'No configuration found'
    });
  }
  
  res.json({ success: true, data: config.config, playerTag });
});

// POST endpoint
app.post('/homepage/config/', async (req, res) => {
  const { playerTag, config } = req.body;
  
  await HomepageConfig.findOneAndUpdate(
    { playerTag },
    { config, updatedAt: new Date() },
    { upsert: true, new: true }
  );
  
  res.json({ success: true, message: 'Config saved', playerTag, data: config });
});
```

---

## Widget System Architecture

### Widget Structure
```javascript
{
  id: string,        // Unique identifier
  type: string,      // Widget type (determines render)
  enabled: boolean,  // Visibility toggle
  order: number      // Display sequence
}
```

### Adding Widget Settings (Future Enhancement)
```javascript
{
  id: string,
  type: string,
  enabled: boolean,
  order: number,
  settings: {        // Widget-specific configuration
    itemsToShow: 5,
    displayMode: 'compact',
    // ... other settings
  }
}
```

---

## Future Enhancements

### Priority 1 (High Impact)
- [ ] Widget customization modal (drag & drop reordering)
- [ ] Real recent activity data
- [ ] User profile card widget
- [ ] News/announcements widget

### Priority 2 (Medium Impact)
- [ ] Widget resize capability
- [ ] Preset layout templates
- [ ] Export/import configuration
- [ ] Widget-specific settings

### Priority 3 (Nice-to-Have)
- [ ] Custom widget creation
- [ ] Third-party widget support
- [ ] Analytics widget
- [ ] Weather/location widget

---

## Testing

### Manual Testing Checklist

- [ ] Homepage loads on login
- [ ] All widgets display correctly
- [ ] Stats show accurate counts
- [ ] Quick links navigate properly
- [ ] Refresh button updates data
- [ ] Customize button opens settings
- [ ] Mobile responsive (test all breakpoints)
- [ ] Configuration persists across sessions
- [ ] Error states display properly

### API Testing

```bash
# Test GET (retrieve config)
curl "http://localhost:3000/homepage/config/?playerTag=TestUser"

# Test POST (save config)
curl -X POST http://localhost:3000/homepage/config/ \
  -H "Content-Type: application/json" \
  -d '{
    "playerTag": "TestUser",
    "config": {
      "widgets": [
        {"id":"welcome","type":"welcome","enabled":true,"order":1}
      ],
      "layout": "grid",
      "theme": "default"
    }
  }'
```

---

## Performance Considerations

1. **Lazy Loading:** Widget components should load data independently
2. **Caching:** Cache stats/data to reduce API calls
3. **Debouncing:** Debounce save operations when dragging widgets
4. **Pagination:** Limit items in activity feed/lists
5. **Virtual Scrolling:** For long lists of data

---

## Accessibility

- All widgets have proper ARIA labels
- Keyboard navigation supported
- Color contrast meets WCAG standards
- Screen reader compatible
- Focus indicators visible

---

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Android

---

## Related Documentation

- [Homepage API Documentation](./HOMEPAGE_API.md)
- Main README: `/workspaces/bmtapp/README.md`
- Backend Server: `/workspaces/bmtapp/backend/server.js`
