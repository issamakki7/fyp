import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { formatCurrency } from "../../utils/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};


export function StoreItem({ id, name, price,image }: StoreItemProps) {

  return (
    <Card sx={{ height: "100%" }}>
      <CardMedia component="img" height="200" src={image} alt={name} />
      <CardContent
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      >
        <Typography variant="h5" component="div" sx={{ mb: 2 }}>
          {name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {formatCurrency(price)}
        </Typography>
      </CardContent>
    </Card>
  );
}
