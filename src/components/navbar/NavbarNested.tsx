import {
    IconAdjustments,
    IconCalendarStats,
    IconFileAnalytics,
    IconGauge,
    IconHome2,
    IconLock,
    IconNotes,
    IconPresentationAnalytics,
} from "@tabler/icons-react";
import { Code, Group, ScrollArea } from "@mantine/core";
import { LinksGroup } from "./NavbarLinksGroup";
import classes from "./NavbarNested.module.css";
import { UserButton } from "./UserButton";

const pages = [
    { label: "Dashboard", icon: IconHome2, links: "/" },
    {
        label: "Chapters",
        icon: IconNotes,
        initiallyOpened: false,
        links: [
            { label: "Chapter 1", link: "/" },
            { label: "Chapter 2", link: "/" },
            { label: "Chapter 3", link: "/" },
            { label: "Chapter 4", link: "/" },
        ],
    },
    { label: "Progress", icon: IconPresentationAnalytics, links: "/" },
    {
        label: "Admin Panel",
        icon: IconAdjustments,
        initiallyOpened: true,
        links: [
            { label: "Edit Chapters", link: "/chapters" },
            {
                label: "Student Performance",
                link: "/performance",
            },
        ],
    },
    { label: "Settings", icon: IconAdjustments, links: "/" },

];

export function NavbarNested() {
    const links = pages.map((item) => (
        <LinksGroup {...item} key={item.label} />
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.header}>
                
            </div>

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

            <div className={classes.footer}>
                <UserButton />
            </div>
        </nav>
    );
}
