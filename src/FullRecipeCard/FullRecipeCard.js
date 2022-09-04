import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ReactMarkdown from 'react-markdown';

export default function FullRecipeCard(props) {
  const { text, image, title } = props;

  return (
    <Container disableGutters sx={{m: 0}}>
      <Box
        component="img"
        sx={{
          height: 200,
          width: 200,
          maxHeight: { xs: 100, md: 250 },
          maxWidth: { xs: 100, md: 250 },
          mr: 1,
        }}
        src={image}
        alt={title}
      ></Box>
      {/* <Typography component={'span'} variant="body2" color="text.secondary"></Typography> */}
      <ReactMarkdown>{text}</ReactMarkdown>
    </Container>
  );
}
