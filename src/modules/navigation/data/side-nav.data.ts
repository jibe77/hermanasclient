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
        items: ['energy', 'notification', 'system'],
    },
];

export const sideNavItems: SideNavItems = {
    dashboard: {
        icon: 'tachometer-alt',
        text: 'Dashboard',
        link: '/dashboard',
    },
    weather: {
        icon: 'columns',
        text: 'Weather (TODO)',
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
        icon: 'book-open',
        text: 'Webcam (TODO)',
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
        icon: 'chart-area',
        text: 'Logs (TODO)',
        link: '/dashboard',
    },
    energy: {
        icon: 'table',
        text: 'Energy saving (TODO)',
        link: '/dashboard',
    },
    notification: {
        icon: 'table',
        text: 'Notification (TODO)',
        link: '/dashboard',
    },
    system: {
        icon: 'table',
        text: 'System (TODO)',
        link: '/dashboard',
    },
};
