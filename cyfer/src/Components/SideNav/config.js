// component
import SvgColor from "../svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
    <SvgColor
        src={`/assets/icons/navbar/${name}.svg`}
        sx={{ width: 1, height: 1 }}
    />
);

const navConfig = [
    {
        title: "dashboard",
        path: "/",
        icon: icon("ic_analytics"),
    },
    {
        title: "create",
        path: "/create",
        icon: icon("ic_user"),
    },
    {
        title: "edit",
        path: "/edit",
        icon: icon("ic_cart"),
    },
    {
        title: "vote",
        path: "/vote",
        icon: icon("ic_cart"),
    },
    {
        title: "view",
        path: "/view",
        icon: icon("ic_blog"),
    },
    {
        title: "admin",
        path: "/admin",
        icon: icon("ic_lock"),
    },
    {
        title: "test",
        path: "/test",
        icon: icon("ic_disabled"),
    },
];

export default navConfig;
