# Chatter Toggle Module

## Overview

The **Chatter Toggle** module adds a convenient toggle button to the Chatter component in Odoo 19 form views, allowing users to show or hide the Chatter with a single click. This maximizes screen real estate for the main form content when the Chatter is not actively being used.

## Features

### 🎯 Core Functionality

- **Toggle Button**: Easy-to-access button in the Chatter topbar
- **Smooth Transitions**: Professional CSS animations when showing/hiding
- **User Preference Persistence**: Choice saved to database and persists across sessions
- **Floating Button**: When Chatter is hidden, a floating action button appears for easy restoration
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Non-Breaking**: Fully compatible with existing Chatter functionality

### 📊 Two States

| State | Description | Button Location |
|-------|-------------|-----------------|
| **Visible** | Chatter is shown (default) | Toggle button in Chatter topbar |
| **Hidden** | Chatter is completely hidden | Floating button in bottom-right corner |

## Installation

### Prerequisites

- Odoo 19 Community or Enterprise Edition
- `mail` module installed (comes with Odoo by default)

### Steps

1. **Copy the module** to your Odoo addons directory:
   ```bash
   cp -r chatter_toggle /path/to/odoo/custom/addons/
   ```

2. **Update the apps list**:
   - Go to Apps menu
   - Click "Update Apps List"
   - Search for "Chatter Toggle"

3. **Install the module**:
   - Click "Install" on the Chatter Toggle module

4. **Refresh your browser** to load the new assets

## Usage

### For End Users

#### Hiding the Chatter

1. Open any form view that has a Chatter (e.g., Sales Order, Contact, Task)
2. Look for the "Hide" button in the top-right corner of the Chatter
3. Click the button to hide the Chatter
4. The form content will expand to use the full width

#### Showing the Chatter

**Method 1: Floating Button**
- Click the blue floating button with a comment icon in the bottom-right corner

**Method 2: User Preferences**
- Go to Settings → Users & Companies → Users
- Edit your user
- Go to Preferences tab
- Check "Show Chatter by Default"
- Save

### For Administrators

#### Setting Default Visibility for Users

1. Go to Settings → Users & Companies → Users
2. Select a user
3. Go to Preferences tab
4. Set "Show Chatter by Default" checkbox
5. Save

#### Programmatic Access

```python
# Set chatter visibility for a user
user = self.env['res.users'].browse(user_id)
user.chatter_visible = False  # Hide chatter

# Or
user.chatter_visible = True  # Show chatter
```

## Technical Details

### Architecture

The module consists of the following components:

#### 1. Backend (Python)

**File**: `models/res_users.py`
- Extends `res.users` model
- Adds `chatter_visible` boolean field
- Adds field to `SELF_READABLE_FIELDS` and `SELF_WRITEABLE_FIELDS`

#### 2. Frontend (JavaScript)

**File**: `static/src/chatter/chatter_patch.js`
- Patches the `Chatter` component from `@mail/chatter/web_portal/chatter`
- Adds state management for visibility
- Implements `_toggleChatterVisibility()` method
- Handles database updates via ORM service
- Triggers custom events for form renderer

**File**: `static/src/views/form/form_renderer_patch.js`
- Patches the `FormRenderer` component
- Manages chatter container visibility state
- Listens for toggle events from Chatter component
- Provides CSS class for hiding/showing

#### 3. Templates (XML)

**File**: `static/src/chatter/chatter_patch.xml`
- Extends `mail.Chatter` template
- Adds toggle button to Chatter topbar
- Binds click event to toggle method

**File**: `static/src/views/form/form_renderer_patch.xml`
- Extends `web.FormRenderer` template
- Adds floating button when Chatter is hidden
- Adds dynamic CSS class to chatter container

#### 4. Styles (SCSS)

**File**: `static/src/chatter/chatter_toggle.scss`
- Styles for toggle button in topbar
- Styles for floating button
- Smooth transition animations
- Responsive design adjustments
- Print and dark mode support

### Data Flow

```
User clicks toggle button
    ↓
Chatter component: _toggleChatterVisibility()
    ↓
Update database (res.users.chatter_visible)
    ↓
Update component state (toggleState.isVisible)
    ↓
Trigger event (chatter:toggle)
    ↓
FormRenderer receives event
    ↓
Update container class (o-chatter-hidden)
    ↓
CSS transition animates the change
```

### Database Schema

**Table**: `res_users`

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `chatter_visible` | Boolean | `True` | Whether Chatter is visible in form views |

### Events

The module uses custom events for communication between components:

| Event Name | Direction | Payload | Description |
|------------|-----------|---------|-------------|
| `chatter:toggle` | Chatter → FormRenderer | `{ visible: boolean }` | Fired when toggle button is clicked |
| `chatter:restore` | FormRenderer → Chatter | None | Fired when floating button is clicked |

## Customization

### Change Toggle Button Position

Edit `static/src/chatter/chatter_patch.xml`:

```xml
<!-- Move to left side -->
<xpath expr="//div[hasclass('o-mail-Chatter-topbar')]" position="before">
    <!-- Toggle button code -->
</xpath>
```

### Change Floating Button Position

Edit `static/src/chatter/chatter_toggle.scss`:

```scss
.o-chatter-floating-toggle {
    right: 20px;  // Change horizontal position
    bottom: 20px; // Change vertical position
}
```

### Change Animation Speed

Edit `static/src/chatter/chatter_toggle.scss`:

```scss
.o-mail-Form-chatter.o-chatter-hidden {
    transition: all 0.3s ease-in-out;  // Change 0.3s to desired speed
}
```

### Change Button Colors

Edit `static/src/chatter/chatter_toggle.scss`:

```scss
.o-chatter-toggle-btn {
    background: your-color;
    border-color: your-border-color;
    color: your-text-color;
}
```

## Compatibility

### Odoo Versions
- ✅ Odoo 19.0 (tested)
- ⚠️ Odoo 18.0 (may require adjustments)
- ❌ Odoo 17.0 and below (not compatible)

### Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ❌ IE11 (not supported)

### Other Modules
- ✅ Compatible with `muk_web_chatter` (chatter position/resize)
- ✅ Compatible with `mail_enterprise` (if present)
- ✅ Compatible with all standard Odoo modules

## Troubleshooting

### Toggle Button Not Appearing

**Possible Causes:**
1. Module not installed correctly
2. Browser cache not cleared
3. Assets not loaded

**Solutions:**
```bash
# Update module
./odoo-bin -u chatter_toggle -d your_database

# Clear browser cache
Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)

# Restart Odoo with assets rebuild
./odoo-bin --dev=all -d your_database
```

### Chatter Not Hiding

**Check:**
1. JavaScript console for errors (F12)
2. User has write permissions on `res.users`
3. Database connection is active

**Debug:**
```javascript
// In browser console
console.log('User chatter_visible:', odoo.session_info.user_context.chatter_visible);
```

### Floating Button Not Showing

**Check:**
1. Chatter is actually hidden (`chatter_visible = False`)
2. Form view has a Chatter component
3. CSS z-index is not being overridden

**Debug:**
```javascript
// Check if chatter is hidden
document.querySelector('.o-mail-Form-chatter.o-chatter-hidden');
```

## Performance

### Impact Analysis

- **Database**: Minimal (1 boolean field per user)
- **Memory**: Negligible (small state object per Chatter instance)
- **Network**: 1 additional write request per toggle
- **Rendering**: Smooth CSS transitions (hardware-accelerated)

### Optimization Tips

1. **Reduce Animation Time**: For slower devices, reduce transition duration
2. **Disable Animations**: Set `transition: none` for instant toggle
3. **Lazy Loading**: Chatter content is not loaded when hidden

## Security

### Permissions

- Users can only modify their own `chatter_visible` preference
- Field is in `SELF_WRITEABLE_FIELDS` (no admin rights required)
- No security vulnerabilities introduced

### Data Privacy

- Preference is user-specific (not shared)
- No sensitive data exposed
- Standard Odoo security rules apply

## Roadmap

### Planned Features

- [ ] Keyboard shortcut (e.g., `Ctrl+H`) to toggle
- [ ] Remember state per model (different for Sales Orders vs Contacts)
- [ ] Animation preferences (speed, style)
- [ ] Auto-hide after period of inactivity
- [ ] Slide-in/slide-out animation options
- [ ] Minimize to tab instead of complete hide

### Future Enhancements

- Integration with user dashboard
- Analytics on Chatter usage
- Customizable button icons
- Multiple hide modes (minimize, collapse, hide)

## Support

### Getting Help

1. **Documentation**: Read this README thoroughly
2. **Issues**: Check browser console for JavaScript errors
3. **Logs**: Check Odoo server logs for backend errors
4. **Community**: Ask on Odoo forums or community channels

### Reporting Bugs

When reporting issues, please include:
- Odoo version
- Module version
- Browser and version
- Steps to reproduce
- Error messages (console and server logs)
- Screenshots if applicable

## License

This module is licensed under **LGPL-3**.

## Credits

**Author**: Custom Development  
**Version**: 19.0.1.0.0  
**Category**: Productivity/Discuss  
**Depends**: mail, web

---

**Last Updated**: 2025-11-11  
**Status**: ✅ Production Ready

