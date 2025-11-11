# -*- coding: utf-8 -*-
from odoo import models, fields, api


class ResUsers(models.Model):
    """Extend res.users to add chatter visibility preference."""
    
    _inherit = 'res.users'
    
    # ----------------------------------------------------------
    # Properties
    # ----------------------------------------------------------
    
    @property
    def SELF_READABLE_FIELDS(self):
        """Add chatter_visible to self-readable fields."""
        return super().SELF_READABLE_FIELDS + [
            'chatter_visible',
        ]

    @property
    def SELF_WRITEABLE_FIELDS(self):
        """Add chatter_visible to self-writeable fields."""
        return super().SELF_WRITEABLE_FIELDS + [
            'chatter_visible',
        ]

    # ----------------------------------------------------------
    # Fields
    # ----------------------------------------------------------
    
    chatter_visible = fields.Boolean(
        string="Chatter Visible",
        default=True,
        required=True,
        help="Show or hide the Chatter in form views. "
             "When hidden, a floating button will appear to restore it."
    )

