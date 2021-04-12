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
    },
    webcam: {
        icon: 'camera',
        text: 'Webcam (TODO)',
        i18n: '@@door',
        link: '/dashboard',
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
