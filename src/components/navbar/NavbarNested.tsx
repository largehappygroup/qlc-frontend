import {
    IconAdjustments,
    IconHome2,
    IconNotes,
    IconPresentationAnalytics,
    IconUsersGroup,
} from "@tabler/icons-react";
import {  ScrollArea } from "@mantine/core";
import { LinksGroup } from "./NavbarLinksGroup";
import classes from "./NavbarNested.module.css";
import { Chapter } from "../../types/Chapter";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/AuthContext";

export function NavbarNested() {
    const { user } = useAuth();
    const [chapters, setChapters] = useState<Chapter[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get<Chapter[]>(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/chapters?date=${new Date()}`
            );
            setChapters(response.data);
        };

        fetchData();
    }, []);

    const sortedChapters = [...chapters].sort(
        (a, b) => (a.order ?? 0) - (b.order ?? 0)
    );

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
                      links: sortedChapters.map((chapter) => ({
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
        ...(user && ["admin", "faculty", "ta"].includes(user?.role) ? [
            {
                label: "Directory",
                icon: IconUsersGroup,
                links: "/directory",
            }
        ] : []),
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
}
