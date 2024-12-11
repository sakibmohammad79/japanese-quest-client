import { USER_ROLE } from "@/constants/role";
import { DrawerItem, UserRole } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PetsIcon from "@mui/icons-material/Pets";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import StarIcon from "@mui/icons-material/Star";

import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

export const DrawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  switch (role) {
    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },

        {
          title: "Manage User",
          path: `${role}/manage-user`,
          icon: SupervisorAccountIcon,
        },
        {
          title: "Manage Lesson",
          path: `${role}/manage-lesson`,
          icon: PetsIcon,
        },
        {
          title: "Create Lesson",
          path: `${role}/create-lesson`,
          icon: AddHomeWorkIcon,
        },
        {
          title: "Manage Vocabulary",
          path: `${role}/manage-vocabulary`,
          icon: AccountCircleIcon,
        },
        {
          title: "Create Vocabulary",
          path: `${role}/create-vocabulary`,
          icon: KeyIcon,
        }
      );
      break;

    // case USER_ROLE.PET_PUBLISHER:
    //   roleMenus.push(
    //     {
    //       title: "Dashboard",
    //       path: `${role}`,
    //       icon: DashboardIcon,
    //     },
    //     {
    //       title: "Create New Pet",
    //       path: `${role}/pet-create`,
    //       icon: PublishedWithChangesIcon,
    //     },

    //     {
    //       title: "Profile",
    //       path: `${role}/profile`,
    //       icon: AccountCircleIcon,
    //     },

    //     {
    //       title: "Give Review",
    //       path: `${role}/review`,
    //       icon: StarIcon,
    //     },
    //     {
    //       title: "Password Change",
    //       path: `${role}/password-change`,
    //       icon: KeyIcon,
    //     }
    //   );
    //   break;

    default:
      break;
  }
  return [...roleMenus];
};
