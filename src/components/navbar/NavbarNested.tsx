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
import { Chapter } from "../../types/Chapter";
import { useEffect, useState } from "react";
import axios from "axios";
import WhichAccess from "../WhichAccess";
import { useAuth } from "../../hooks/AuthContext";

export function NavbarNested() {
    const { user } = useAuth();
    const [chapters, setChapters] = useState<Chapter[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get<Chapter[]>(
                `${import.meta.env.VITE_BACKEND_URL}/chapters`
            );
            setChapters(response.data);
        };

        fetchData();
    }, []);

    const pages = [
        { label: "Dashboard", icon: IconHome2, links: "/" },
        ...(user && ["admin", "faculty", "ta"].includes(user?.role)
            ? [
                  {
                      label: "Chapters",
                      icon: IconNotes,
                      links: "/chapters",
                  },
              ]
            : [
                  {
                      label: "Chapters",
                      icon: IconNotes,
                      initiallyOpened: false,
                      links: chapters.map((chapter) => ({
                          label: `Chapter ${chapter.order}`,
                          link: `/chapters/${chapter.order}`,
                      })),
                  },
              ]),
        {
            label: "Progress",
            icon: IconPresentationAnalytics,
            links: "/progress",
        },

        { label: "Settings", icon: IconAdjustments, links: "/" },
    ];

    const links = pages.map((item) => (
        <LinksGroup {...item} key={item.label} />
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.header}></div>

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

            <div className={classes.footer}>
                <UserButton />
            </div>
        </nav>
    );
}
