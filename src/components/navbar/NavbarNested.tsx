import {
    IconAdjustments,
    IconHome2,
    IconNotes,
    IconPresentationAnalytics,
    IconUsersGroup,
} from "@tabler/icons-react";
import { ScrollArea } from "@mantine/core";
import { LinksGroup } from "./NavbarLinksGroup";
import classes from "./NavbarNested.module.css";
import { useAuth } from "../../hooks/AuthContext";

const NavbarNested: React.FC = () => {
    const { user, viewAsStudent } = useAuth();

    const pages = [
        { label: "Dashboard", icon: IconHome2, links: "/" },
        {
            label: "Chapters",
            icon: IconNotes,
            links: "/chapters",
        },
        {
            label: "Progress",
            icon: IconPresentationAnalytics,
            links: "/progress",
        },
        ...(user &&
        ["admin", "faculty", "ta"].includes(user?.role) &&
        !viewAsStudent
            ? [
                  {
                      label: "Directory",
                      icon: IconUsersGroup,
                      links: "/directory",
                  },
                  {
                      label: "Exercises",
                      icon: IconNotes,
                      links: "/exercises",
                  },
              ]
            : []),

        { label: "Settings", icon: IconAdjustments, links: "/settings" },
    ];

    const links = pages.map((item) => (
        <LinksGroup {...item} key={item.label} />
    ));

    return (
        <nav className={classes.navbar}>
            {/*<div className={classes.header}></div>*/}

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

            {/*<div className={classes.footer}></div>*/}
        </nav>
    );
};

export default NavbarNested;
