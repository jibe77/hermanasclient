import { SideNavItems, SideNavSection } from '@modules/navigation/models';

export const sideNavSections: SideNavSection[] = [
    {
        text: 'CORE',
        items: ['dashboard'],
    },
    {
        text: 'HISTORY',
        items: ['weather', 'webcam', 'logs'],
    },
    {
        text: 'SETTING',
        items: ['energy', 'notification', 'music', 'system'],
    },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        i18n: '@@dashboard',
        link: '/dashboard',
    },
    weather: {
        icon: 'sun',
        text: 'Weather (TODO)',
        i18n: '@@door',
        link: '/dashboard',
        /*submenu: [
            {
                text: 'Temperature',
                link: '/dashboard/static',
            },
            {
                text: 'Light Sidenav',
                link: '/dashboard/light',
            },
        ],*/
    },
    webcam: {
        icon: 'camera',
        text: 'Webcam (TODO)',
        i18n: '@@door',
        link: '/dashboard',
        /*submenu: [
            {
                text: 'Authentication',
                submenu: [
                    {
                        text: 'Login',
                        link: '/auth/login',
                    },
                    {
                        text: 'Register',
                        link: '/auth/register',
                    },
                    {
                        text: 'Forgot Password',
                        link: '/auth/forgot-password',
                    },
                ],
            },
            {
                text: 'Error',
                submenu: [
                    {
                        text: '401 Page',
                        link: '/error/401',
                    },
                    {
                        text: '404 Page',
                        link: '/error/404',
                    },
                    {
                        text: '500 Page',
                        link: '/error/500',
                    },
                ],
            },
        ],*/
    },
    logs: {
        icon: 'file-contract',
        text: 'Logs (TODO)',
        i18n: '@@door',
        link: '/dashboard',
    },
    energy: {
        icon: 'car-battery',
        text: 'Energy saving (TODO)',
        i18n: '@@door',
        link: '/dashboard',
    },
    notification: {
        icon: 'envelope-open-text',
        text: 'Notification (TODO)',
        i18n: '@@door',
        link: '/dashboard',
    },
    music: {
        icon: 'music',
        text: 'Music playlist (TODO)',
        i18n: '@@door',
        link: '/dashboard',
    },
    system: {
        icon: 'laptop',
        text: 'System (TODO)',
        i18n: '@@door',
        link: '/dashboard',
    },
};
