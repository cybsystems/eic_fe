import { Link, Breadcrumbs as MUIBreadcrumbs, Stack, Typography } from '@mui/material';
import React from 'react';

interface BreadcrumbsWithBackButtonProps {
  breadcrumbs: { label: string; href?: string }[];
  title: string;
}

const Breadcrumbs: React.FC<BreadcrumbsWithBackButtonProps> = ({ breadcrumbs, title }) => {

  return (
    <Stack spacing={2} marginBottom={2}>
       
      <MUIBreadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((breadcrumb, index) => (
          breadcrumb.href ? (
            <Link key={index} color="inherit" href={breadcrumb.href}>
              {breadcrumb.label}
            </Link>
          ) : (
            <Typography key={index} color="text.primary">
              {breadcrumb.label}
            </Typography>
          )
        ))}
        <Typography color="text.primary">{title}</Typography>
      </MUIBreadcrumbs>
    </Stack>
  );
};

export default Breadcrumbs;
