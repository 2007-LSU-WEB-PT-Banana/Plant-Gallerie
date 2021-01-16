import React from 'react'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  CardMedia,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './SingleOrder.css'

function SingleOrder({ id, price, productName, quantity }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
      }}
      key={id}
    >
      <Card
        variant="outlined"
        key={price}
        style={{ height: '270px', width: '650px', margin: '10px' }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            alt="image not found"
            height="180"
            width="150"
            image="https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1533&q=80"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {productName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {quantity}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small"> Add</Button>
          <Button size="small"> Remove From The Basket</Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default SingleOrder
