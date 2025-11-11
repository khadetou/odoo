# Chatter Toggle - Installation Guide

## Quick Start (3 Steps)

### 1. Install the Module

```bash
# Navigate to Odoo directory
cd /path/to/odoo

# Update module list (if needed)
./odoo-bin -u chatter_toggle -d your_database

# Or install fresh
./odoo-bin -i chatter_toggle -d your_database
```

### 2. Update Apps List

1. Log in to Odoo
2. Go to **Apps** menu
3. Click **Update Apps List**
4. Search for "Chatter Toggle"
5. Click **Install**

### 3. Refresh Browser

Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac) to clear cache and reload

---

## Detailed Installation

### Prerequisites

- Odoo 19.0 Community or Enterprise Edition
- `mail` module installed (default in Odoo)
- `web` module installed (default in Odoo)
- Database with admin access

### Method 1: Via Odoo Interface (Recommended)

1. **Copy Module to Addons Directory**
   ```bash
   cp -r chatter_toggle /path/to/odoo/custom/addons/
   ```

2. **Restart Odoo Server**
   ```bash
   sudo systemctl restart odoo
   # Or if running manually:
   ./odoo-bin -c /path/to/odoo.conf
   ```

3. **Update Apps List**
   - Go to Apps menu
   - Remove "Apps" filter
   - Click "Update Apps List"
   - Confirm the update

4. **Install Module**
   - Search for "Chatter Toggle"
   - Click "Install" button
   - Wait for installation to complete

5. **Verify Installation**
   - Open any form view with Chatter (e.g., Sales Order)
   - Look for "Hide" button in Chatter topbar
   - Click it to test functionality

### Method 2: Via Command Line

```bash
# Install module
./odoo-bin -i chatter_toggle -d your_database -c /path/to/odoo.conf

# Or update if already installed
./odoo-bin -u chatter_toggle -d your_database -c /path/to/odoo.conf
```

### Method 3: Via Docker

```bash
# If using Docker
docker-compose exec odoo odoo -i chatter_toggle -d your_database

# Or update
docker-compose exec odoo odoo -u chatter_toggle -d your_database
```

---

## Post-Installation

### 1. Clear Browser Cache

**Chrome/Edge:**
- Press `Ctrl+Shift+Delete`
- Select "Cached images and files"
- Click "Clear data"

**Firefox:**
- Press `Ctrl+Shift+Delete`
- Select "Cache"
- Click "Clear Now"

**Safari:**
- Press `Cmd+Option+E`
- Or Safari → Clear History

### 2. Verify Assets Loaded

1. Open browser Developer Tools (F12)
2. Go to Network tab
3. Refresh page
4. Look for:
   - `chatter_patch.js`
   - `chatter_patch.xml`
   - `chatter_toggle.scss`

### 3. Test Functionality

1. **Open a form with Chatter**
   - Go to Sales → Orders → Create
   - Or Contacts → Create
   - Or any model with Chatter

2. **Test Toggle Button**
   - Look for "Hide" button in Chatter topbar
   - Click it
   - Chatter should hide smoothly
   - Floating button should appear

3. **Test Floating Button**
   - Click the floating button (bottom-right)
   - Chatter should reappear

4. **Test Persistence**
   - Hide the Chatter
   - Refresh the page
   - Chatter should remain hidden

---

## Configuration

### Set Default Visibility for All Users

```python
# In Odoo shell or Python code
users = env['res.users'].search([])
users.write({'chatter_visible': False})  # Hide by default
```

### Set for Specific User

1. Go to Settings → Users & Companies → Users
2. Select user
3. Go to Preferences tab
4. Check/uncheck "Show Chatter by Default"
5. Save

---

## Troubleshooting

### Module Not Appearing in Apps List

**Solution:**
```bash
# Make sure module is in addons path
./odoo-bin --addons-path=/path/to/addons,/path/to/custom/addons

# Update apps list
./odoo-bin -u base -d your_database
```

### Toggle Button Not Showing

**Check:**
1. Module is installed (Apps → Installed)
2. Browser cache is cleared
3. JavaScript console for errors (F12)

**Fix:**
```bash
# Rebuild assets
./odoo-bin --dev=all -d your_database

# Or update module
./odoo-bin -u chatter_toggle -d your_database
```

### Database Error on Installation

**Error:** `column "chatter_visible" does not exist`

**Solution:**
```bash
# Update module to create column
./odoo-bin -u chatter_toggle -d your_database
```

### Permission Error

**Error:** `Access Denied`

**Solution:**
- Make sure you're logged in as admin
- Check user has access to Settings

---

## Uninstallation

### Via Odoo Interface

1. Go to Apps menu
2. Search for "Chatter Toggle"
3. Click "Uninstall"
4. Confirm uninstallation

### Via Command Line

```bash
./odoo-bin -d your_database
# Then in Odoo shell:
>>> env['ir.module.module'].search([('name', '=', 'chatter_toggle')]).button_immediate_uninstall()
```

### Clean Uninstall (Remove Data)

```sql
-- Remove field from database
ALTER TABLE res_users DROP COLUMN IF EXISTS chatter_visible;

-- Remove module record
DELETE FROM ir_module_module WHERE name = 'chatter_toggle';
```

---

## Upgrade

### From Previous Version

```bash
# Update module
./odoo-bin -u chatter_toggle -d your_database

# Clear browser cache
# Refresh browser
```

---

## Development Mode

### Install in Development Mode

```bash
# Run with dev mode
./odoo-bin -i chatter_toggle -d your_database --dev=all

# This will:
# - Auto-reload on file changes
# - Show detailed error messages
# - Disable asset caching
```

### Watch for Changes

```bash
# Use watchdog for auto-reload
pip install watchdog
./odoo-bin --dev=all -d your_database
```

---

## Production Deployment

### 1. Test in Staging

```bash
# Install in staging environment
./odoo-bin -i chatter_toggle -d staging_database

# Test thoroughly
# - All form views
# - Different users
# - Different browsers
```

### 2. Deploy to Production

```bash
# Backup database first!
pg_dump production_database > backup.sql

# Install module
./odoo-bin -i chatter_toggle -d production_database

# Restart Odoo
sudo systemctl restart odoo
```

### 3. Monitor

```bash
# Check logs for errors
tail -f /var/log/odoo/odoo.log

# Monitor performance
# Check database queries
# Monitor user feedback
```

---

## Multi-Database Setup

### Install on Multiple Databases

```bash
# Loop through databases
for db in db1 db2 db3; do
    ./odoo-bin -i chatter_toggle -d $db
done
```

---

## Docker Deployment

### Dockerfile

```dockerfile
FROM odoo:19.0

# Copy module
COPY chatter_toggle /mnt/extra-addons/chatter_toggle

# Install dependencies (if any)
RUN pip3 install -r /mnt/extra-addons/chatter_toggle/requirements.txt
```

### docker-compose.yml

```yaml
version: '3'
services:
  odoo:
    image: odoo:19.0
    volumes:
      - ./chatter_toggle:/mnt/extra-addons/chatter_toggle
    environment:
      - ADDONS_PATH=/mnt/extra-addons
```

---

## Verification Checklist

After installation, verify:

- [ ] Module appears in Apps list
- [ ] Module status is "Installed"
- [ ] Toggle button appears in Chatter topbar
- [ ] Clicking toggle hides Chatter
- [ ] Floating button appears when hidden
- [ ] Clicking floating button shows Chatter
- [ ] Preference field in user settings
- [ ] Preference persists after refresh
- [ ] No JavaScript errors in console
- [ ] No Python errors in logs
- [ ] Works on different form views
- [ ] Works on mobile/tablet
- [ ] Smooth animations

---

## Support

### Getting Help

1. Check README.md for usage instructions
2. Check TECHNICAL_DOCUMENTATION.md for details
3. Check browser console for errors (F12)
4. Check Odoo logs for backend errors
5. Search Odoo forums for similar issues

### Reporting Issues

Include:
- Odoo version
- Module version
- Installation method
- Error messages
- Steps to reproduce

---

**Installation Guide Version**: 1.0.0  
**Last Updated**: 2025-11-11  
**Status**: ✅ Ready for Production

