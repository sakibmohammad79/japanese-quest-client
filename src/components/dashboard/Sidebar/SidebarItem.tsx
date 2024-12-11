import Link from "next/link";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { DrawerItem } from "@/types";
import { usePathname } from "next/navigation";

interface ISideBarItemProps {
  item: DrawerItem;
}
const SidebarItem = ({ item }: ISideBarItemProps) => {
  const pathLink = `/dashboard/${item.path}`;
  const pathName = usePathname();
  return (
    <Link href={pathLink}>
      <ListItem
        disablePadding
        sx={{
          ...(pathName === pathLink
            ? {
                borderRight: "2px solid #F04336",
                "& svg": {
                  color: "#F04336",
                },
              }
            : {}),
          mb: 1,
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item.icon && <item.icon></item.icon>}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;
