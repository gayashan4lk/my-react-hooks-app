import React, {useState, useEffect} from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";

import * as contentful from "contentful";

const SPACE_ID = "qvnfz6cl8yp5";
const ACCESS_TOKEN = "JH2y-1Kj40r9DACSEqSvYxBtPQkPxOzOK9HSp17flfc";

const client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});

function Course({course, index}) {
  return (
      <div>
        <Card style={{maxWidth: '500px', marginBottom: '10px'}}>
          <CardMedia style={{height: 0, paddingTop: '56.25%'}}
                     image={course.fields.courseImage.fields.file.url}
                     title={course.fields.title} />

          <CardContent>
            <Typography variant="headline" component="h2">{course.fields.title}</Typography>
            <Typography component="p" color="textSecondary">{course.fields.content}</Typography>
            <br/>
{/*            <Typography color="textSecondary">{course.upvote_count}
            <Icon color="primary" onClick={() => upvoteCourse(index)}>
              thumb_up_alt
            </Icon>
              &nbsp;&nbsp;
            <span>{course.downvote_count}</span>
            <Icon color="primary" onClick={() => downvoteCourse(index)}>
                thumb_down_alt
            </Icon>
            </Typography>*/}
          </CardContent>
          <CardActions>
            <Button size="small" href={course.fields.url} target="_blank">Go To Course</Button>
          </CardActions>

        </Card>
      </div>
  );
}


function App() {
  const [courses, setCourses] = useState(0);

  useEffect ( () => {
    getCourses();
  }, []);

  const getCourses = () => {
    client.getEntries({
      content_type: "course"
    })
        .then((response) => {
          setCourses(response.items);
          console.log(courses);
        })
        .catch((error) => {
          console.log("Error occured while fetching entries");
        })
  }

  console.log(courses);

/*  const upvoteCount = index => {
    const newCourses = [...courses];
    newCourses[index].upvote_count++;
    setCourses(newCourses);
  }

  const downvoteCount = index => {
    const newCourses = [...courses];
    newCourses[index].downvote_count++;
    setCourses(newCourses);
  }*/

  return (
      <div className={"app"}>
          {courses ? (
              <Grid container spacing={24} style={{padding: 24}}>
                  {courses.map((course, index) => (
                      <Grid item xs={12} sm={12} lg={4} xl={3}>
                          <Course
                              key={index}
                              index={index}
                              course={course}
                              /*                  upvoteCourse={upvoteCount}
                                                downvoteCourse={downvoteCount}*/
                          />
                      </Grid>
                  ))}
              </Grid>
          ) : "No courses found"}
      </div>
  );
}

export default App;