# Quick Start Guide - Hide Enterprise Modules

## What This Module Does

Automatically hides Enterprise-only modules from the Apps menu in Odoo 19 Community Edition, showing you only the modules you can actually install and use.

## Installation (3 Simple Steps)

### Step 1: Update Apps List
1. Open Odoo
2. Go to **Apps** menu
3. Click **Update Apps List** (you may need to enable Developer Mode first)
4. Click **Update** and wait

### Step 2: Find and Install
1. In the Apps menu, search for: **Hide Enterprise Modules**
2. Click on the module card
3. Click **Activate**
4. Wait for installation to complete

### Step 3: Verify
1. Go back to the Apps menu
2. Enterprise modules should now be hidden
3. You'll only see Community Edition compatible modules

## That's It!

The module now works automatically. No configuration needed.

## Quick Reference

### What Gets Hidden?
- Modules with license = 'OEEL-1' (Enterprise License)
- Modules marked with to_buy = True (Enterprise modules)

### How to View Hidden Modules (Optional)
1. In Apps menu, click the search/filter icon
2. Select **Enterprise Only** filter
3. You'll see all the hidden Enterprise modules
4. Click **Community Only** to go back to normal view

### How to Uninstall
1. Go to Apps menu
2. Search for "Hide Enterprise Modules"
3. Click **Uninstall**
4. All modules will be visible again

## Troubleshooting

### Module Not Showing Up?
- Make sure you updated the Apps List
- Try restarting Odoo server
- Check that the module is in: `custom/addons/hide_enterprise_modules/`

### Still See Enterprise Modules?
- Verify the module is installed (not just "to install")
- Refresh your browser
- Clear browser cache

### Need Help?
- Check `README.md` for detailed documentation
- Check `INSTALLATION.md` for detailed installation steps
- Check `MODULE_SUMMARY.md` for technical details

## Module Location

```
/data/workspace/odoo/community/19/odoo/custom/addons/hide_enterprise_modules/
```

## Files Included

- `__manifest__.py` - Module configuration
- `__init__.py` - Module initialization
- `models/ir_module_module.py` - Enterprise detection logic
- `views/ir_module_views.xml` - View modifications
- `README.md` - Full documentation
- `INSTALLATION.md` - Detailed installation guide
- `MODULE_SUMMARY.md` - Technical summary
- `QUICK_START.md` - This file

## Support

This is a community module designed for Odoo 19 Community Edition. It's safe to install and uninstall at any time.

---

**Version**: 19.0.1.0.0  
**License**: LGPL-3  
**Author**: Odoo Community

