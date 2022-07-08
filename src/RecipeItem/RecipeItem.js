import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Box from '@mui/material/Box';
// import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';


// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function RecipeItem(props) {

  const [fullRecipe, setFullRecipe] = React.useState(false);

    const handleClickFull = () => {
      setFullRecipe(!fullRecipe);
    };

    console.log(fullRecipe)

  const { title, src, subheader, alt, description, text, id } = props;
  return (

    <Card sx={{ maxWidth: 345 }} id={id}>
      <CardHeader
        action={
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        }
        title={title}
        subheader={subheader}
      />
      <CardMedia component="a" href="/">
        <Box
          component="img"
          src={src}
          width="100%"
          alt={alt}
          full={fullRecipe}
          onClick={handleClickFull}
        />
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        {fullRecipe ?
        <CardContent >
        <Typography component={'span'} variant="body2" color="text.secondary">
            <ReactMarkdown>{text}</ReactMarkdown>
        </Typography>
         </CardContent>
         : ''}
      </CardContent>
    </Card>
  );
}
