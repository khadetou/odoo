import { url } from '@web/core/utils/urls';
import { useService } from '@web/core/utils/hooks';
import { user } from "@web/core/user";

import { Component, onWillUnmount, useState } from '@odoo/owl';

export class AppsBar extends Component {
	static template = 'muk_web_appsbar.AppsBar';
    static props = {};
	setup() {
        this.appMenuService = useService('app_menu');
        this.orm = useService('orm');

        // State to track current sidebar type
        this.state = useState({
            sidebarType: user.sidebar_type || 'large',
            isToggling: false
        });

    	if (user.activeCompany.has_appsbar_image) {
            this.sidebarImageUrl = url('/web/image', {
                model: 'res.company',
                field: 'appbar_image',
                id: user.activeCompany.id,
            });
    	}
    	const renderAfterMenuChange = () => {
            this.render();
        };
        this.env.bus.addEventListener(
        	'MENUS:APP-CHANGED', renderAfterMenuChange
        );
        onWillUnmount(() => {
            this.env.bus.removeEventListener(
            	'MENUS:APP-CHANGED', renderAfterMenuChange
            );
        });
    }

    _onAppClick(app) {
        return this.appMenuService.selectApp(app);
    }

    /**
     * Toggle sidebar between large, small, and invisible states
     */
    async _toggleSidebar() {
        if (this.state.isToggling) {
            return; // Prevent multiple simultaneous toggles
        }

        this.state.isToggling = true;

        try {
            // Cycle through: large -> small -> invisible -> large
            let newType;
            switch (this.state.sidebarType) {
                case 'large':
                    newType = 'small';
                    break;
                case 'small':
                    newType = 'invisible';
                    break;
                case 'invisible':
                    newType = 'large';
                    break;
                default:
                    newType = 'large';
            }

            // Update user preference in database
            await this.orm.write('res.users', [user.userId], {
                sidebar_type: newType
            });

            // Update local state
            this.state.sidebarType = newType;
            user.sidebar_type = newType;

            // Update body class
            const body = document.body;
            body.classList.remove('mk_sidebar_type_large', 'mk_sidebar_type_small', 'mk_sidebar_type_invisible');
            body.classList.add(`mk_sidebar_type_${newType}`);

        } catch (error) {
            console.error('Failed to toggle sidebar:', error);
        } finally {
            this.state.isToggling = false;
        }
    }

    /**
     * Get icon class for toggle button based on current state
     */
    get toggleIcon() {
        switch (this.state.sidebarType) {
            case 'large':
                return 'fa-angle-double-left'; // Collapse to small
            case 'small':
                return 'fa-eye-slash'; // Hide completely
            case 'invisible':
                return 'fa-angle-double-right'; // Expand to large
            default:
                return 'fa-bars';
        }
    }

    /**
     * Get tooltip for toggle button
     */
    get toggleTooltip() {
        switch (this.state.sidebarType) {
            case 'large':
                return 'Collapse sidebar';
            case 'small':
                return 'Hide sidebar';
            case 'invisible':
                return 'Show sidebar';
            default:
                return 'Toggle sidebar';
        }
    }
}
