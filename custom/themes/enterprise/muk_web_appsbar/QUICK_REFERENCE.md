# Sidebar Toggle - Quick Reference Guide

## 🎯 Quick Start

### For End Users

**To toggle the sidebar:**
1. Look for the toggle button at the top of the sidebar
2. Click it to cycle through: **Large → Small → Invisible → Large**

**When sidebar is hidden:**
- A floating button appears on the left edge of the screen
- Click it to restore the sidebar

### For Developers

**Key Files:**
- `appsbar.js` - Component logic
- `appsbar.xml` - Template with toggle buttons
- `appsbar.scss` - Styles and transitions
- `res_users.py` - Backend field definition

---

## 📊 Three Sidebar States

| State | Width | What You See | Icon |
|-------|-------|--------------|------|
| **Large** | 146px | Icons + Labels | ⏪ (collapse) |
| **Small** | 46px | Icons only | 👁️‍🗨️ (hide) |
| **Invisible** | 0px | Nothing (floating button appears) | ⏩ (expand) |

---

## 🔧 Code Snippets

### Toggle the Sidebar Programmatically

```javascript
// In a component with access to AppsBar
this._toggleSidebar();
```

### Set Sidebar State Directly

```python
# Python - Set for current user
self.env.user.sidebar_type = 'small'  # or 'large' or 'invisible'

# Python - Set for specific user
user = self.env['res.users'].browse(user_id)
user.sidebar_type = 'invisible'
```

```javascript
// JavaScript - Update via ORM
await this.orm.write('res.users', [user.userId], {
    sidebar_type: 'large'
});
```

### Check Current State

```javascript
// In AppsBar component
const currentState = this.state.sidebarType;

// From user object
const currentState = user.sidebar_type;
```

```python
# Python
current_state = self.env.user.sidebar_type
```

---

## 🎨 Customization

### Change Sidebar Widths

Edit `static/src/scss/variables.scss`:

```scss
$mk-sidebar-large-width: 146px !default;  // Change this
$mk-sidebar-small-width: 46px !default;   // Change this
```

### Change Colors

Edit `static/src/scss/variables.scss`:

```scss
$mk-appbar-color: #dee2e6 !default;        // Text color
$mk-appbar-active: $o-brand-primary !default;  // Active/hover color
$mk-appbar-background: #111827 !default;   // Background color
```

### Change Animation Speed

Edit `static/src/webclient/appsbar/appsbar.scss`:

```scss
.mk_apps_sidebar_panel {
    transition: width 200ms ease-in-out;  // Change 200ms
}
```

### Change Toggle Button Position

Edit `static/src/webclient/appsbar/appsbar.scss`:

```scss
.mk_sidebar_floating_toggle {
    left: 0;      // Change position
    top: 50%;     // Change vertical position
}
```

---

## 🐛 Troubleshooting

### Issue: Toggle button not appearing

**Solution:**
```bash
# Clear browser cache
# Check browser console for errors
# Verify module is installed
```

### Issue: State not persisting

**Check:**
1. Database connection is active
2. User has write permissions on `res.users`
3. No JavaScript errors in console

**Debug:**
```javascript
// Check if state is updating
console.log('Current state:', this.state.sidebarType);
console.log('User preference:', user.sidebar_type);
```

### Issue: Floating button not showing

**Check:**
```javascript
// Verify condition
console.log('Sidebar type:', this.state.sidebarType);
// Should be 'invisible' for floating button to show
```

**CSS Check:**
```css
/* Verify z-index is not overridden */
.mk_sidebar_floating_toggle {
    z-index: 1000 !important;
}
```

---

## 📱 Responsive Behavior

### Desktop (>992px)
- All three states available
- Full functionality

### Tablet (768-992px)
- Large mode auto-converts to Small
- Small and Invisible states available

### Mobile (<768px)
- Sidebar hidden by default
- Can be shown via floating button

---

## ⌨️ Keyboard Shortcuts (Future)

*Not yet implemented - planned for future version*

```
Ctrl + B  - Toggle sidebar
Ctrl + [  - Collapse sidebar
Ctrl + ]  - Expand sidebar
```

---

## 🔍 Debugging

### Enable Debug Mode

```javascript
// Add to appsbar.js setup()
console.log('AppsBar initialized with state:', this.state.sidebarType);
```

### Watch State Changes

```javascript
// In _toggleSidebar method
console.log('Toggling from', this.state.sidebarType, 'to', newType);
```

### Check Database Updates

```python
# In Odoo shell
user = env['res.users'].browse(USER_ID)
print(f"Sidebar type: {user.sidebar_type}")
```

---

## 📦 Installation

### Module Already Installed

If `muk_web_appsbar` is already installed:

1. **Update the module:**
   ```bash
   ./odoo-bin -u muk_web_appsbar -d your_database
   ```

2. **Clear browser cache**

3. **Refresh the page**

### Fresh Installation

1. **Install module:**
   ```bash
   ./odoo-bin -i muk_web_appsbar -d your_database
   ```

2. **Restart Odoo server**

3. **Clear browser cache**

---

## 🧪 Testing

### Manual Test Checklist

- [ ] Toggle button appears in sidebar
- [ ] Clicking cycles: Large → Small → Invisible → Large
- [ ] Floating button appears when sidebar is invisible
- [ ] Clicking floating button restores sidebar
- [ ] State persists after page refresh
- [ ] Smooth animation between states
- [ ] Hover effects work on buttons
- [ ] Tooltips display correctly
- [ ] Icons change based on state
- [ ] Works on mobile/tablet/desktop

### Automated Test (Future)

```javascript
// Example test structure
QUnit.test('Sidebar toggle cycles through states', async (assert) => {
    const appsBar = new AppsBar();
    assert.equal(appsBar.state.sidebarType, 'large');
    
    await appsBar._toggleSidebar();
    assert.equal(appsBar.state.sidebarType, 'small');
    
    await appsBar._toggleSidebar();
    assert.equal(appsBar.state.sidebarType, 'invisible');
    
    await appsBar._toggleSidebar();
    assert.equal(appsBar.state.sidebarType, 'large');
});
```

---

## 📚 Related Documentation

- **Full Documentation**: `SIDEBAR_TOGGLE_FEATURE.md`
- **Analysis & Changes**: `ANALYSIS_AND_CHANGES.md`
- **Odoo OWL Documentation**: https://github.com/odoo/owl
- **Odoo Development**: https://www.odoo.com/documentation/19.0/developer.html

---

## 🆘 Support

### Common Questions

**Q: Can I set a default sidebar state for all users?**
A: Yes, modify the default in `res_users.py`:
```python
sidebar_type = fields.Selection(
    ...
    default='small',  # Change this
)
```

**Q: Can I disable the toggle button?**
A: Yes, remove or comment out the toggle button in `appsbar.xml`

**Q: Can I add a fourth state?**
A: Yes, but requires modifications to:
- `res_users.py` - Add new selection option
- `appsbar.js` - Update toggle logic
- `appsbar.scss` - Add new state class

**Q: Does this work with custom themes?**
A: Yes, but you may need to adjust colors in `variables.scss`

---

## 📝 Version Info

- **Module**: muk_web_appsbar
- **Feature**: Dynamic Sidebar Toggle
- **Odoo Version**: 19.0
- **Last Updated**: 2025-11-11
- **Status**: ✅ Production Ready

---

## 🚀 Quick Commands

```bash
# Update module
./odoo-bin -u muk_web_appsbar -d DATABASE_NAME

# Restart Odoo
sudo systemctl restart odoo

# Check logs
tail -f /var/log/odoo/odoo.log

# Clear assets
./odoo-bin --dev=all -d DATABASE_NAME
```

---

**Need more help?** Check the full documentation files in this directory.

