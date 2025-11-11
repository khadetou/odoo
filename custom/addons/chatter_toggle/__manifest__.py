{
    'name': 'Chatter Toggle',
    'summary': 'Add toggle button to show/hide Chatter in form views',
    'description': '''
        Chatter Toggle Module
        =====================
        
        This module adds a toggle button to the Chatter component that allows users to:
        - Show/hide the Chatter with a single click
        - Save their preference (visible/hidden) to the database
        - Maximize screen space for form content when Chatter is not needed
        - Access the toggle button easily from the Chatter topbar
        
        Features:
        ---------
        * Toggle button in Chatter topbar
        * Smooth CSS transitions when showing/hiding
        * User preference persistence across sessions
        * Works on all form views with Chatter
        * Responsive design for different screen sizes
        * Floating button when Chatter is hidden for easy restoration
        
        The module follows Odoo 19 best practices and integrates seamlessly with
        the existing Chatter component without breaking any functionality.
    ''',
    'version': '19.0.1.0.0',
    'category': 'Productivity/Discuss',
    'license': 'LGPL-3',
    'author': 'Custom Development',
    'website': 'https://www.odoo.com',
    'depends': [
        'mail',  # Required for Chatter component
        'web',   # Required for form views
    ],
    'data': [
        'views/res_users_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            # JavaScript files
            'chatter_toggle/static/src/chatter/chatter_patch.js',
            'chatter_toggle/static/src/views/form/form_renderer_patch.js',
            
            # XML templates
            'chatter_toggle/static/src/chatter/chatter_patch.xml',
            'chatter_toggle/static/src/views/form/form_renderer_patch.xml',
            
            # SCSS styles
            'chatter_toggle/static/src/chatter/chatter_toggle.scss',
        ],
    },
    'images': [
        'static/description/icon.png',
    ],
    'installable': True,
    'application': False,
    'auto_install': False,
}

