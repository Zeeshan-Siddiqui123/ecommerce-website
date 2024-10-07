import Index from "./Screens/Index";
import About from "./Screens/About";
import Products from "./Screens/Products";
import Contact from "./Screens/Contact";

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
]