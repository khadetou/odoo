# Hide Enterprise Modules

## Overview

This module automatically filters out and hides Enterprise-only modules from the Apps menu when running Odoo 19 Community Edition. This provides a cleaner interface by showing only modules that are actually available and installable in the Community Edition.

## Features

- **Automatic Detection**: Identifies Enterprise-only modules based on:
  - License type (OEEL-1 - Odoo Enterprise Edition License)
  - `to_buy` flag (modules marked as Enterprise purchases)

- **Clean Interface**: Hides Enterprise modules from the Apps menu by default

- **Non-Breaking**: Does not interfere with existing functionality or installed modules

- **Transparent**: Advanced users can still view Enterprise modules using search filters

- **Safe**: Only affects the display, not the actual module loading mechanism

## Installation

1. Copy this module to your `custom/addons` directory:
   ```
   custom/addons/hide_enterprise_modules/
   ```

2. Update the apps list:
   - Go to Apps menu
   - Click "Update Apps List" (you may need to activate Developer Mode)

3. Search for "Hide Enterprise Modules"

4. Click "Activate"

## Usage

Once installed, the module works automatically:

- **Apps Menu**: Only Community Edition compatible modules are shown
- **Search Filters**: Two new filters are available in the Apps search:
  - "Community Only": Shows only Community modules (default)
  - "Enterprise Only": Shows Enterprise modules (for reference)

## Technical Details

### Module Structure

```
hide_enterprise_modules/
├── __init__.py
├── __manifest__.py
├── README.md
├── models/
│   ├── __init__.py
│   └── ir_module_module.py
└── views/
    └── ir_module_views.xml
```

### How It Works

1. **Model Extension** (`ir_module_module.py`):
   - Adds a computed field `is_enterprise_only`
   - Automatically detects Enterprise modules based on license and to_buy fields

2. **View Modifications** (`ir_module_views.xml`):
   - Adds domain filter to the Apps action: `[('is_enterprise_only', '=', False)]`
   - Adds search filters for advanced users
   - Extends kanban and list views to include the new field

### Enterprise Module Detection Logic

A module is considered "Enterprise-only" if:
- `license == 'OEEL-1'` (Odoo Enterprise Edition License), OR
- `to_buy == True` (marked as Enterprise module to purchase)

## Compatibility

- **Odoo Version**: 19.0 Community Edition
- **Dependencies**: base (core module)
- **License**: LGPL-3

## Advanced Usage

### Viewing Enterprise Modules

If you need to see which modules are Enterprise-only:

1. Go to Apps menu
2. Click the search icon
3. Select "Enterprise Only" filter

### Debugging

For system administrators, the `is_enterprise_only` field is available in the list view (hidden by default):

1. Go to Apps menu
2. Switch to List view
3. Enable Developer Mode
4. Click on the column selector
5. Enable "Is Enterprise Only" column

## Uninstallation

To remove this module:

1. Go to Apps menu
2. Remove the default filter (you may need to search for "Hide Enterprise Modules")
3. Find "Hide Enterprise Modules"
4. Click "Uninstall"

After uninstallation, all modules (including Enterprise ones) will be visible again.

## Support

This is a community module designed to improve the user experience in Odoo Community Edition. It does not modify core functionality and can be safely installed or uninstalled at any time.

## License

LGPL-3 - See LICENSE file for details

