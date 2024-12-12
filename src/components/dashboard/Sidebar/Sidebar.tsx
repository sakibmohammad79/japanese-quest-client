import List from "@mui/material/List";
import { Box, Divider, Stack, Toolbar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { DrawerItems } from "@/utils/DrawerItems";
import { getUserInfo } from "@/services/auth.services";
import { UserRole } from "@/types";
const Sidebar = () => {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const { role } = getUserInfo();
    setUserRole(role);
  }, []);
  return (
    <Box>
      <Stack
        component={Link}
        href="/"
        sx={{ py: 1 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        <Image
          height={50}
          width={50}
          src="https://i.postimg.cc/CLDN0X9F/language.jpg"
          alt="language-icon"
        ></Image>
        <Typography variant="h6" component="h1">
          Japanse Quest
        </Typography>
      </Stack>
      <List>
        {DrawerItems(userRole as UserRole).map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
