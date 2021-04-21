import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Book as BookIcon,
} from 'react-feather';
import NavItem from './NavItem';
import { useSelector } from 'react-redux';
import getInitials from '../utils/getInitials';


const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/student/exams',
    icon: BarChartIcon,
    title: 'Exams',
    role: ['student'],
  },
  {
    href: '/student/records',
    icon: BookIcon,
    title: 'Records',
    role: ['student'],
  },
  {
    href: '/admin',
    icon: UsersIcon,
    title: 'All Users',
    role: ['admin'],
  },
  {
    href: '/admin/add-teacher',
    icon: UserPlusIcon,
    title: 'Add Teacher',
    role: ['admin'],
  },
  {
    href: '/teacher',
    icon: UsersIcon,
    title: 'All Exams',
    role: ['teacher'],
  },
  {
    href: '/teacher/exams/add',
    icon: UserPlusIcon,
    title: 'Add Exam',
    role: ['teacher'],
  },
  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Products',
    role: [],
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account',
    role: [],
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings',
    role: [],
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login',
    role: [],
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register',
    role: [],
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const { name, role } = useSelector(state => state.Auth);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          // src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        >
          {getInitials(name)}
        </Avatar>
        <Box mt={2}>
          <Typography
            color="textPrimary"
            variant="h5"
          >
            {name}
          </Typography>
        </Box>
        {/* <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography> */}
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => item['role'].includes(role) && (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
