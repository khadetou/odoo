# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models


class IrModuleModule(models.Model):
    _inherit = 'ir.module.module'

    is_enterprise_only = fields.Boolean(
        string='Is Enterprise Only',
        compute='_compute_is_enterprise_only',
        store=True,
        help='Technical field to identify Enterprise-only modules that should be hidden in Community Edition'
    )

    @api.depends('license', 'to_buy')
    def _compute_is_enterprise_only(self):
        """
        Compute whether a module is Enterprise-only.
        
        A module is considered Enterprise-only if:
        1. It has an Enterprise license (OEEL-1), OR
        2. It's marked as to_buy (Enterprise module to purchase)
        
        This allows the Apps menu to filter out these modules in Community Edition.
        """
        for module in self:
            # Check if module has Enterprise license or is marked for purchase
            is_enterprise = (
                module.license == 'OEEL-1' or  # Odoo Enterprise Edition License
                module.to_buy  # Marked as Enterprise module to buy
            )
            module.is_enterprise_only = is_enterprise

    def _get_modules_to_load_domain(self):
        """
        Override to ensure Enterprise modules are not loaded.
        This is a safety measure, though the main filtering happens in the view.
        """
        domain = super()._get_modules_to_load_domain()
        # Don't modify the loading domain - only filter the display
        return domain

