'use client'
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation'

interface DashboardCardProps {
  title: string;
  color: string;
  icon: React.ReactNode;
  link: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ title, color, icon, link }) => {
  const router = useRouter();


  const handleClick = () => {
    router.push(link);
  };

  return (
    <Box
      sx={{
        backgroundColor: color,
        borderRadius: 1.2,
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#fff',
        cursor: 'pointer',
        '&:hover': {
          opacity: 0.9,
          '& .icon-container': {
            transform: 'scale(1.5)',
          },
        },
        transition: 'opacity 0.3s ease',
      }}
      onClick={handleClick}
    >
      <Box>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Box
        className="icon-container"
        sx={{
            fontSize: 30, // Icône plus grande par défaut
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease',
        }}
      >
        {icon}
      </Box>
    </Box>
  );
};





// // 'use client'
// // import React from 'react';
// import { Card, CardContent, CardActionArea } from '@mui/material';
// // import { useRouter } from 'next/navigation';

// // Définir l'interface pour les props
// interface DashboardCardProps {
//   title: string;
//   icon: React.ReactNode;
//   link: string;
// }

// export const DashboardCardNew: React.FC<DashboardCardProps> = ({ title, icon, link }) => {
//   const router = useRouter();

//   return (
//     <Card sx={{ height: '100%', bgcolor: getColor(title) }}>
//       <CardActionArea onClick={() => router.push(link)} sx={{ height: '100%' }}>
//         <CardContent>
//           <Typography variant="h5" component="div" color="white">
//             {title}
//           </Typography>
//           {icon}
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };

// const getColor = (title: string): string => {
//   switch (title) {
//     case 'Tanques': return '#4CAF50';
//     case 'Cultures': return '#FFC107';
//     case 'Capteurs': return '#F44336';
//     default: return '#2196F3';
//   }
// };
