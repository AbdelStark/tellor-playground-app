// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DashboardLayout from "@/layout/dashboard/DashboardLayout";
import Tracker from "@/pages/Dashboard/Tracker";


const routes = [
    {
        path: '/',
        name: 'home',
        redirect: '/dashboard',
        component: DashboardLayout,
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                components: {default: Dashboard}
            },
            {
                path: 'tracker',
                name: 'tracker',
                components: {default: Tracker}
            },
        ]
    },
    {path: "*", component: NotFound},
];

export default routes;
