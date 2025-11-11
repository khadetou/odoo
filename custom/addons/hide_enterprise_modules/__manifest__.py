{
    'name': 'Hide Enterprise Modules',
    'version': '19.0.1.0.0',
    'category': 'Hidden',
    'summary': 'Automatically hide Enterprise-only modules from the Apps menu in Community Edition',
    'description': """
Hide Enterprise Modules
=======================

This module automatically filters out and hides Enterprise-only modules from the Apps menu
when running Odoo Community Edition.

Features:
---------
* Automatically detects Enterprise-only modules based on license type (OEEL-1)
* Hides modules marked with to_buy=True (Enterprise modules)
* Works seamlessly with the existing Apps interface
* Does not break any existing functionality
* Specifically designed for Odoo 19 Community Edition

Technical Details:
------------------
The module extends the ir.module.module model to add a computed field that identifies
Enterprise modules, and modifies the Apps menu views to filter them out automatically.

Enterprise modules are identified by:
1. License field = 'OEEL-1' (Odoo Enterprise Edition License)
2. to_buy field = True (marked as Enterprise module)
    """,
    'author': 'Odoo Community',
    'website': 'https://www.odoo.com',
    'license': 'LGPL-3',
    'depends': ['base'],
    'data': [
        'views/ir_module_views.xml',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
}

