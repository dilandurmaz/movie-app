import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Box } from "@mui/material";
import "./Card.scss"

interface CardItemProps {
  image: string;
  title: string;
  plot: string;
  director: string;
  actors: string;
}

export default function CardItem({
  image,
  title,
  plot,
  director,
  actors,
}: CardItemProps) {
  return (
    <Card className="card-container" sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <Box sx={{ position: "relative", height: 400, overflow: "hidden" }}>
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              objectFit: "fill",
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </Box>
        <CardContent>
          <Typography variant="h6" >
            Director: {director}
          </Typography>
          <Typography variant="h6" >
            Actors: {actors}
          </Typography>
          <Typography variant="inherit">{plot}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
