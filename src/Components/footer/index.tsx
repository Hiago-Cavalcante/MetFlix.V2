import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Grid,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  YouTube,
} from '@mui/icons-material';
import { APP_CONFIG } from '@/constants';

const footerLinks = {
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Supported Devices', href: '#' },
  ],
  legal: [
    { label: 'Terms of Use', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Cookie Preferences', href: '#' },
  ],
};

const socialLinks = [
  { icon: <Facebook />, href: '#', label: 'Facebook' },
  { icon: <Twitter />, href: '#', label: 'Twitter' },
  { icon: <Instagram />, href: '#', label: 'Instagram' },
  { icon: <YouTube />, href: '#', label: 'YouTube' },
];

export const Footer: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand Section */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 2,
              }}
            >
              {APP_CONFIG.NAME}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mb: 3,
                maxWidth: 300,
              }}
            >
              {APP_CONFIG.DESCRIPTION}
            </Typography>
            
            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.href}
                  color="inherit"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                  aria-label={social.label}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Links Sections */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={4}>
              {/* Company Links */}
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  Company
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {footerLinks.company.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      color="text.secondary"
                      underline="hover"
                      sx={{
                        '&:hover': {
                          color: 'text.primary',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>

              {/* Support Links */}
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  Support
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {footerLinks.support.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      color="text.secondary"
                      underline="hover"
                      sx={{
                        '&:hover': {
                          color: 'text.primary',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>

              {/* Legal Links */}
              <Grid item xs={12} sm={4}>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  Legal
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {footerLinks.legal.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      color="text.secondary"
                      underline="hover"
                      sx={{
                        '&:hover': {
                          color: 'text.primary',
                        },
                      }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Copyright */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} {APP_CONFIG.NAME}. All rights reserved.
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            Version {APP_CONFIG.VERSION}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
