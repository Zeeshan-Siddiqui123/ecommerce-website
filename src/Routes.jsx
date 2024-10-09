import Index from "./Screens/Index";
import About from "./Screens/About";
import Products from "./Screens/Products";
import Contact from "./Screens/Contact";
import Users from "./Screens/Users";


export const routes = [
    {
        path: "/",
        screen: <Index/>,
        label: "Home",
    },
    {
        path: "/about",
        screen: <About/>,
        label: "About",
    },
    {
        path: "/products",
        screen: <Products/>,
        label: "Products",
    },
    {
        path: "/contact",
        screen: <Contact/>,
        label: "Contact",
    },
    {
        path: "/user",
        screen: <Users/>,
        label: "Users",
    },
]