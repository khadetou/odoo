# Sidebar Toggle Feature - Documentation

## Overview

The `muk_web_appsbar` module now includes a **dynamic sidebar toggle feature** that allows users to show/hide the apps sidebar with a single click, without needing to navigate to Settings.

## Features

### 1. Three Sidebar States

The sidebar can be in one of three states:

| State | Width | Description | Icon Shown |
|-------|-------|-------------|------------|
| **Large** | 146px | Full sidebar with app icons and labels | `fa-angle-double-left` (collapse) |
| **Small** | 46px | Compact sidebar with icons only | `fa-eye-slash` (hide) |
| **Invisible** | 0px | Completely hidden | `fa-angle-double-right` (expand) |

### 2. Toggle Button Locations

#### When Sidebar is Visible (Large or Small)
- Toggle button appears **at the top of the sidebar**
- Integrated into the sidebar design
- Styled to match the sidebar theme

#### When Sidebar is Invisible
- A **floating toggle button** appears on the left edge of the screen
- Positioned at 50% vertical height
- Slides out slightly on hover for better visibility
- Always accessible to restore the sidebar

### 3. User Preference Persistence

- The selected sidebar state is **saved to the user's profile**
- Preference persists across sessions and page refreshes
- Each user can have their own sidebar preference
- Stored in `res.users.sidebar_type` field

## How It Works

### Toggle Cycle

The toggle button cycles through the three states in this order:

```
Large → Small → Invisible → Large → ...
```

1. **Large to Small**: Collapses the sidebar, hiding labels but keeping icons
2. **Small to Invisible**: Completely hides the sidebar
3. **Invisible to Large**: Restores the full sidebar

### Technical Implementation

#### JavaScript Component (`appsbar.js`)

**State Management:**
```javascript
this.state = useState({
    sidebarType: user.sidebar_type || 'large',
    isToggling: false
});
```

**Toggle Method:**
```javascript
async _toggleSidebar() {
    // Cycle through states
    let newType;
    switch (this.state.sidebarType) {
        case 'large': newType = 'small'; break;
        case 'small': newType = 'invisible'; break;
        case 'invisible': newType = 'large'; break;
    }
    
    // Save to database
    await this.orm.write('res.users', [user.userId], {
        sidebar_type: newType
    });
    
    // Update UI
    this.state.sidebarType = newType;
    document.body.classList.remove('mk_sidebar_type_large', 'mk_sidebar_type_small', 'mk_sidebar_type_invisible');
    document.body.classList.add(`mk_sidebar_type_${newType}`);
}
```

**Dynamic Icons:**
- `toggleIcon` computed property returns appropriate icon based on current state
- `toggleTooltip` computed property provides helpful tooltip text

#### Template (`appsbar.xml`)

**Sidebar Toggle Button:**
```xml
<div class="mk_apps_sidebar_toggle">
    <button 
        class="btn btn-sm mk_sidebar_toggle_btn" 
        t-on-click="() => this._toggleSidebar()"
        t-att-title="this.toggleTooltip"
        t-att-disabled="this.state.isToggling"
    >
        <i t-attf-class="fa {{ this.toggleIcon }}"/>
    </button>
</div>
```

**Floating Toggle Button:**
```xml
<div t-if="this.state.sidebarType === 'invisible'" class="mk_sidebar_floating_toggle">
    <button class="btn btn-sm mk_sidebar_floating_btn" ...>
        <i t-attf-class="fa {{ this.toggleIcon }}"/>
    </button>
</div>
```

#### Styles (`appsbar.scss`)

**Smooth Transitions:**
```scss
.mk_apps_sidebar_panel {
    transition: width 200ms ease-in-out;
}
```

**State-Based Widths:**
```scss
.mk_sidebar_type_large { --mk-sidebar-width: 146px; }
.mk_sidebar_type_small { --mk-sidebar-width: 46px; }
.mk_sidebar_type_invisible { --mk-sidebar-width: 0; }
```

**Floating Button Styling:**
```scss
.mk_sidebar_floating_toggle {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
}
```

## User Experience

### Visual Feedback

1. **Hover Effects**: Buttons highlight on hover
2. **Smooth Animations**: 200ms transition for width changes
3. **Disabled State**: Button is disabled during toggle operation to prevent rapid clicks
4. **Tooltips**: Helpful tooltips indicate what the button will do

### Accessibility

- **Keyboard Accessible**: Toggle button can be activated with keyboard
- **ARIA Labels**: Tooltips provide context for screen readers
- **Visual Indicators**: Clear icons show current state and next action

### Responsive Behavior

The sidebar automatically adjusts based on screen size:

- **Large screens (>992px)**: All three states available
- **Medium screens (768-992px)**: Large mode becomes Small mode automatically
- **Small screens (<768px)**: Sidebar hidden by default (mobile)

## Usage Examples

### For End Users

**To collapse the sidebar:**
1. Click the toggle button at the top of the sidebar
2. Sidebar shrinks to show icons only

**To hide the sidebar completely:**
1. Click the toggle button again
2. Sidebar disappears, giving more screen space

**To restore the sidebar:**
1. Click the floating button on the left edge
2. Sidebar expands to full size

### For Administrators

**Setting Default Sidebar State:**
1. Go to Settings → Users & Companies → Users
2. Select a user
3. Find "Sidebar Type" field under Preferences
4. Choose: Invisible, Small, or Large
5. Save

**Programmatic Access:**
```python
# Set sidebar type for a user
user = self.env['res.users'].browse(user_id)
user.sidebar_type = 'small'  # or 'large' or 'invisible'
```

## Benefits

### For Users
- **More Screen Space**: Hide sidebar when not needed
- **Quick Access**: Toggle with one click instead of navigating to Settings
- **Personalization**: Each user can set their preferred sidebar state
- **Flexibility**: Easily switch between states based on current task

### For Administrators
- **User Satisfaction**: Users can customize their workspace
- **Productivity**: Less navigation to Settings
- **Consistency**: Preference persists across sessions

## Troubleshooting

### Toggle Button Not Appearing
- **Check**: Module is installed and activated
- **Verify**: Browser cache is cleared
- **Confirm**: User has `sidebar_type` field in their profile

### Sidebar State Not Persisting
- **Check**: Database write permissions for `res.users`
- **Verify**: User session is active
- **Confirm**: No JavaScript errors in browser console

### Floating Button Not Showing When Sidebar Hidden
- **Check**: `this.state.sidebarType === 'invisible'`
- **Verify**: CSS z-index is not being overridden
- **Confirm**: Element is not hidden by other styles

## Future Enhancements

Potential improvements for future versions:

1. **Keyboard Shortcut**: Add hotkey (e.g., Ctrl+B) to toggle sidebar
2. **Animation Options**: Allow users to choose animation speed
3. **Auto-Hide**: Automatically hide sidebar after period of inactivity
4. **Custom Widths**: Allow users to set custom sidebar widths
5. **Position Options**: Allow sidebar on left or right side
6. **Collapse on Click**: Auto-collapse after selecting an app

## Technical Notes

### Database Schema

**Field Added to `res.users`:**
```python
sidebar_type = fields.Selection(
    selection=[
        ('invisible', 'Invisible'),
        ('small', 'Small'),
        ('large', 'Large')
    ], 
    string="Sidebar Type",
    default='large',
    required=True,
)
```

### Performance Considerations

- **Minimal Impact**: Toggle operation is lightweight (single database write)
- **Cached State**: Current state stored in component state for instant UI updates
- **Debouncing**: `isToggling` flag prevents rapid successive toggles
- **CSS Transitions**: Hardware-accelerated for smooth animations

### Browser Compatibility

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **CSS Variables**: Used for dynamic width (IE11 not supported)
- **Flexbox**: Used for layout (widely supported)

## Version History

- **v1.0.0**: Initial implementation with three-state toggle
- **v1.1.0**: Added floating toggle button for invisible state
- **v1.2.0**: Added smooth transitions and hover effects

## Support

For issues or questions about the sidebar toggle feature:
1. Check this documentation
2. Review browser console for JavaScript errors
3. Verify module is up to date
4. Check Odoo logs for backend errors

---

**Module**: muk_web_appsbar  
**Feature**: Dynamic Sidebar Toggle  
**Version**: 19.0  
**Last Updated**: 2025-11-11

