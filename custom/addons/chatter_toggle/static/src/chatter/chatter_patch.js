/** @odoo-module **/

import { Chatter } from "@mail/chatter/web_portal/chatter";
import { patch } from "@web/core/utils/patch";
import { useState, onMounted, onWillUnmount } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { user } from "@web/core/user";

/**
 * Patch the Chatter component to add toggle visibility functionality
 */
patch(Chatter.prototype, {
    /**
     * Setup method - extends the original setup to add toggle state
     */
    setup() {
        super.setup(...arguments);

        // Add ORM service for database updates
        this.orm = useService('orm');

        // Initialize toggle state from user preference
        this.toggleState = useState({
            isVisible: user.chatter_visible !== undefined ? user.chatter_visible : true,
            isToggling: false,
        });

        // Bind event handler
        this.onChatterRestore = this.onChatterRestore.bind(this);

        // Listen for restore event from floating button
        onMounted(() => {
            this.env.bus.addEventListener('chatter:restore', this.onChatterRestore);
        });

        onWillUnmount(() => {
            this.env.bus.removeEventListener('chatter:restore', this.onChatterRestore);
        });
    },

    /**
     * Handle restore event from floating button
     */
    onChatterRestore() {
        if (!this.toggleState.isVisible) {
            this._toggleChatterVisibility();
        }
    },

    /**
     * Toggle the Chatter visibility
     * Cycles between: visible → hidden → visible
     */
    async _toggleChatterVisibility() {
        // Prevent rapid clicking
        if (this.toggleState.isToggling) {
            return;
        }
        
        this.toggleState.isToggling = true;
        
        try {
            // Toggle the visibility state
            const newVisibility = !this.toggleState.isVisible;
            
            // Update database - save user preference
            await this.orm.write('res.users', [user.userId], {
                chatter_visible: newVisibility
            });
            
            // Update component state
            this.toggleState.isVisible = newVisibility;
            
            // Update user object for consistency
            user.chatter_visible = newVisibility;
            
            // Trigger a custom event for the form renderer to handle layout changes
            this.env.bus.trigger('chatter:toggle', { visible: newVisibility });
            
        } catch (error) {
            console.error('Failed to toggle chatter visibility:', error);
        } finally {
            this.toggleState.isToggling = false;
        }
    },

    /**
     * Get the appropriate icon for the toggle button based on current state
     */
    get toggleIcon() {
        return this.toggleState.isVisible ? 'fa-chevron-right' : 'fa-chevron-left';
    },

    /**
     * Get the tooltip text for the toggle button
     */
    get toggleTooltip() {
        return this.toggleState.isVisible ? 'Hide Chatter' : 'Show Chatter';
    },
});

