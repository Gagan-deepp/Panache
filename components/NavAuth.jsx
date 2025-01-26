import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, } from "@/components/ui/navigation-menu"
import Link from "next/link"
const NavAuth = ({ scrolled, pathName }) => {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={`${scrolled || pathName != "/" ? "!text-black-3" : "!text-white-1"}`} >Admin</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className=" bg-cream text-card_clr_light">
                            <Link href="/register" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Registration
                                </NavigationMenuLink>
                            </Link>
                            <Link href="/update" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    Update
                                </NavigationMenuLink>
                            </Link>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default NavAuth