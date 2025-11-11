/** @odoo-module **/

import { FormRenderer } from "@web/views/form/form_renderer";
import { patch } from "@web/core/utils/patch";
import { useState, onMounted, onWillUnmount } from "@odoo/owl";
import { user } from "@web/core/user";

/**
 * Patch FormRenderer to handle Chatter visibility state
 */
patch(FormRenderer.prototype, {
    /**
     * Setup method - extends the original setup to add chatter visibility state
     */
    setup() {
        super.setup(...arguments);
        
        // Initialize chatter visibility state from user preference
        this.chatterVisibilityState = useState({
            isVisible: user.chatter_visible !== undefined ? user.chatter_visible : true,
        });
        
        // Listen for chatter toggle events
        this.onChatterToggle = this.onChatterToggle.bind(this);
        
        onMounted(() => {
            this.env.bus.addEventListener('chatter:toggle', this.onChatterToggle);
        });
        
        onWillUnmount(() => {
            this.env.bus.removeEventListener('chatter:toggle', this.onChatterToggle);
        });
    },

    /**
     * Handle chatter toggle event from Chatter component
     * @param {Object} event - Event object with visible property
     */
    onChatterToggle(event) {
        if (event.detail && event.detail.visible !== undefined) {
            this.chatterVisibilityState.isVisible = event.detail.visible;
        }
    },

    /**
     * Get CSS class for chatter container based on visibility state
     */
    get chatterContainerClass() {
        return this.chatterVisibilityState.isVisible ? '' : 'o-chatter-hidden';
    },
});

