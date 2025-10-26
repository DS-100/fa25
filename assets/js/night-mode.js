/**
 * Night Mode Toggle for Data 100 Website
 * Provides functionality to switch between light and dark themes
 */

(function() {
    'use strict';

    // Theme configuration
    const THEMES = {
        LIGHT: 'light',
        DARK: 'dark'
    };

    const STORAGE_KEY = 'data100-theme-preference';
    const THEME_ATTRIBUTE = 'data-theme';

    // CSS classes for theme switching
    const DARK_MODE_CLASS = 'dark-mode';

    /**
     * Initialize the night mode functionality
     */
    function initNightMode() {
        // Load saved theme preference or default to light
        const savedTheme = localStorage.getItem(STORAGE_KEY) || THEMES.LIGHT;
        
        // Apply the theme IMMEDIATELY to prevent white flash
        applyTheme(savedTheme);
        
        // Create and add the toggle button
        createToggleButton();
        
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addListener(handleSystemThemeChange);
        }
    }

    /**
     * Apply the specified theme
     * @param {string} theme - The theme to apply ('light' or 'dark')
     */
    function applyTheme(theme) {
        const html = document.documentElement;
        const body = document.body;
        
        // Remove existing theme classes
        html.classList.remove(DARK_MODE_CLASS);
        body.classList.remove(DARK_MODE_CLASS);
        
        // Apply new theme IMMEDIATELY
        if (theme === THEMES.DARK) {
            html.classList.add(DARK_MODE_CLASS);
            body.classList.add(DARK_MODE_CLASS);
            // Set attribute immediately to prevent flash
            html.setAttribute(THEME_ATTRIBUTE, THEMES.DARK);
        } else {
            html.setAttribute(THEME_ATTRIBUTE, THEMES.LIGHT);
        }
        
        // Save preference
        localStorage.setItem(STORAGE_KEY, theme);
        
        // Update toggle button state
        updateToggleButton(theme);
    }

    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute(THEME_ATTRIBUTE) || THEMES.LIGHT;
        const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
        applyTheme(newTheme);
    }

    /**
     * Handle system theme changes
     * @param {MediaQueryListEvent} e - The media query change event
     */
    function handleSystemThemeChange(e) {
        // Only auto-switch if user hasn't set a preference
        if (!localStorage.getItem(STORAGE_KEY)) {
            const systemTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
            applyTheme(systemTheme);
        }
    }

    /**
     * Create the night mode toggle button
     */
    function createToggleButton() {
        // Check if button already exists
        if (document.getElementById('night-mode-toggle')) {
            return;
        }

        const button = document.createElement('button');
        button.id = 'night-mode-toggle';
        button.className = 'night-mode-toggle';
        button.setAttribute('aria-label', 'Toggle night mode');
        button.setAttribute('title', 'Toggle night mode');
        
        // Add icon
        const icon = document.createElement('span');
        icon.className = 'night-mode-icon';
        icon.innerHTML = '🌙';
        button.appendChild(icon);
        
        // Add click handler
        button.addEventListener('click', toggleTheme);
        
        // Add to header
        const header = document.querySelector('.site-header') || document.querySelector('header');
        if (header) {
            header.appendChild(button);
        } else {
            // Fallback: add to body
            document.body.appendChild(button);
        }
    }

    /**
     * Update the toggle button appearance
     * @param {string} theme - The current theme
     */
    function updateToggleButton(theme) {
        const button = document.getElementById('night-mode-toggle');
        const icon = button?.querySelector('.night-mode-icon');
        
        if (button && icon) {
            icon.innerHTML = theme === THEMES.DARK ? '☀️' : '🌙';
            button.setAttribute('aria-label', `Switch to ${theme === THEMES.DARK ? 'light' : 'dark'} mode`);
            button.setAttribute('title', `Switch to ${theme === THEMES.DARK ? 'light' : 'dark'} mode`);
        }
    }

    // Initialize IMMEDIATELY - don't wait for DOM
    initNightMode();

    // Expose functions globally for debugging
    window.Data100NightMode = {
        toggleTheme: toggleTheme,
        applyTheme: applyTheme,
        getCurrentTheme: () => document.documentElement.getAttribute(THEME_ATTRIBUTE) || THEMES.LIGHT
    };

})();
