import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [add, setAdd] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      axios.get("http://localhost:3001/get")
        .then((response) => {
          setAdd(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    const handleDeletion = (addId) => {
        axios.delete(`http://localhost:3001/delete/${addId}`)
          .then((response) => {
            setAdd(add.filter((add) => add._id !== addId));
            console.log('Deleted successfully:', response);
          })
          .catch((error) => {
            console.log('Error deleting blog:', error);
          });
    };

  

    const handleUpdation = () => {
      axios
        .put(`http://localhost:3001/update/${addId}`, {
          title: inputs.title,
          content: inputs.content,
          img_url: inputs.img_url,
        })
        .then((res) => {
          alert(res.data.message);
          navigate("/");
        })
        .catch((err) => {
          console.log("Error:", err.response?.data || err.message);
        });
    };
    

    return (
      <div>
        <Grid container spacing={2}>
          {add.map((val) => (
            <Grid item xs={12} md={4} sm={6} key={val._id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia sx={{ height: 140 }} image={val.img_url} alt={val.title} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {val.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {val.content}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant='contained' color='secondary' onClick={() => handleDeletion(val._id)}>
                    Delete
                  </Button>
                  <Button size="small" variant='contained' color='secondary' onClick={() => handleUpdation(val._id)}>
                    Update
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    );
};

export default Home;
