# Installation and Testing Guide

## Module Overview

**Module Name**: Hide Enterprise Modules  
**Technical Name**: `hide_enterprise_modules`  
**Version**: 19.0.1.0.0  
**Location**: `custom/addons/hide_enterprise_modules/`

## Prerequisites

- Odoo 19 Community Edition
- Access to the Odoo Apps menu
- System Administrator privileges

## Installation Steps

### Step 1: Verify Module Location

The module should already be in the correct location:
```
/data/workspace/odoo/community/19/odoo/custom/addons/hide_enterprise_modules/
```

Verify the module structure:
```bash
ls -la custom/addons/hide_enterprise_modules/
```

You should see:
- `__init__.py`
- `__manifest__.py`
- `README.md`
- `models/` directory
- `views/` directory
- `static/` directory

### Step 2: Update Apps List

1. **Enable Developer Mode** (if not already enabled):
   - Go to Settings
   - Scroll to the bottom
   - Click "Activate the developer mode"

2. **Update Apps List**:
   - Go to Apps menu
   - Click on the "⋮" (three dots) menu or "Update Apps List" button
   - Click "Update" in the dialog
   - Wait for the update to complete

### Step 3: Install the Module

1. **Find the Module**:
   - In the Apps menu, remove any default filters
   - Search for "Hide Enterprise Modules"
   - You should see the module in the list

2. **Install**:
   - Click on the module card
   - Click "Activate" or "Install"
   - Wait for installation to complete

### Step 4: Verify Installation

After installation, the module should:
- Automatically filter out Enterprise modules from the Apps menu
- Show only Community Edition compatible modules by default

## Testing the Module

### Test 1: Verify Enterprise Modules are Hidden

1. Go to Apps menu
2. Look for modules that are typically Enterprise-only (examples):
   - Accounting (accountant) - if it has Enterprise features
   - Studio
   - Planning
   - Helpdesk
   - Any module with "Enterprise" in the name

3. These should NOT appear in the default view

### Test 2: Use Search Filters

1. In the Apps menu, click the search/filter icon
2. You should see two new filters:
   - **Community Only**: Shows only Community modules (should be active by default)
   - **Enterprise Only**: Shows Enterprise modules

3. Click "Enterprise Only" to see the hidden modules
4. Click "Community Only" to return to the filtered view

### Test 3: Verify Existing Functionality

1. Try installing a Community module (e.g., Contacts, Sales, Inventory)
2. Verify it installs normally
3. Verify you can uninstall it normally
4. Check that no errors appear in the log

### Test 4: Check List View

1. In Apps menu, switch to List view
2. Enable Developer Mode if not already enabled
3. Click on column selector (optional columns)
4. Look for "Is Enterprise Only" field (should be available for technical users)

## Troubleshooting

### Module Not Appearing in Apps List

**Solution**:
1. Verify the module is in the correct directory
2. Check file permissions: `chmod -R 755 custom/addons/hide_enterprise_modules/`
3. Restart Odoo server
4. Update Apps List again

### Module Installed but Not Working

**Solution**:
1. Check if the module is actually installed: Apps → Installed
2. Try upgrading the module:
   ```bash
   odoo-bin -u hide_enterprise_modules -d your_database_name
   ```
3. Clear browser cache
4. Check Odoo logs for errors

### Enterprise Modules Still Visible

**Solution**:
1. Verify the module is installed (not just "to install")
2. Refresh the Apps page
3. Check if any custom filters are overriding the default domain
4. Verify the `is_enterprise_only` field is computed correctly:
   - Go to Apps → List view
   - Enable "Is Enterprise Only" column
   - Check if Enterprise modules are marked as True

### Installation Errors

**Common Issues**:

1. **Import Error**: Check that all files are present and properly formatted
2. **XML Syntax Error**: Validate `views/ir_module_views.xml`
3. **Python Syntax Error**: Check `models/ir_module_module.py`

**Check Logs**:
```bash
tail -f /var/log/odoo/odoo.log
```

## Uninstallation

To remove the module:

1. Go to Apps menu
2. Remove the "Community Only" filter (if active)
3. Search for "Hide Enterprise Modules"
4. Click on the module
5. Click "Uninstall"
6. Confirm uninstallation

After uninstallation:
- All modules (including Enterprise ones) will be visible again
- No data will be lost
- No other modules will be affected

## Command Line Installation (Alternative)

If you prefer command line installation:

```bash
# Navigate to Odoo directory
cd /data/workspace/odoo/community/19/odoo

# Install the module
./odoo-bin -d your_database_name -i hide_enterprise_modules --stop-after-init

# Or upgrade if already installed
./odoo-bin -d your_database_name -u hide_enterprise_modules --stop-after-init
```

## Verification Checklist

- [ ] Module files are in `custom/addons/hide_enterprise_modules/`
- [ ] Apps list has been updated
- [ ] Module appears in Apps search
- [ ] Module is installed successfully
- [ ] Enterprise modules are hidden from default view
- [ ] Search filters work correctly
- [ ] Community modules can still be installed/uninstalled
- [ ] No errors in Odoo logs

## Support

For issues or questions:
1. Check the README.md file
2. Review the module code in `models/` and `views/`
3. Check Odoo logs for detailed error messages
4. Verify Odoo version compatibility (19.0)

## Technical Details

### Files Created

1. `__manifest__.py` - Module metadata and dependencies
2. `__init__.py` - Module initialization
3. `models/__init__.py` - Models package initialization
4. `models/ir_module_module.py` - Extended module model with Enterprise detection
5. `views/ir_module_views.xml` - View modifications and filters
6. `README.md` - User documentation
7. `static/description/index.html` - Module description page

### Key Components

- **Computed Field**: `is_enterprise_only` - Identifies Enterprise modules
- **Domain Filter**: `[('is_enterprise_only', '=', False)]` - Hides Enterprise modules
- **Search Filters**: Community Only / Enterprise Only - User control
- **View Inheritance**: Extends kanban, list, and search views

### Database Changes

The module adds one computed field to the `ir_module_module` table:
- Field: `is_enterprise_only` (Boolean, stored)
- Computed based on: `license` and `to_buy` fields

