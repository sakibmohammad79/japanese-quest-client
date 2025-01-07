import { USER_ROLE } from "@/constants/role";
import { DrawerItem, UserRole } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import LoupeIcon from "@mui/icons-material/Loupe";
import PlayLessonIcon from "@mui/icons-material/PlayLesson";
import YouTubeIcon from "@mui/icons-material/YouTube";
import VideoSettingsIcon from "@mui/icons-material/VideoSettings";
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
          icon: PlayLessonIcon,
        },
        {
          title: "Create Lesson",
          path: `${role}/create-lesson`,
          icon: NoteAddIcon,
        },
        {
          title: "Manage Vocabulary",
          path: `${role}/manage-vocabulary`,
          icon: GTranslateIcon,
        },
        {
          title: "Create Vocabulary",
          path: `${role}/create-vocabulary`,
          icon: LoupeIcon,
        },
        {
          title: "Create New Tutorial",
          path: `${role}/create-tutorial`,
          icon: YouTubeIcon,
        },
        {
          title: "Manage Tutorial",
          path: `${role}/manage-tutorial`,
          icon: VideoSettingsIcon,
        }
      );
      break;

    default:
      break;
  }
  return [...roleMenus];
};
