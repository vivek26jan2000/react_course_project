import Card from "../../components/ui/Card";
const mongoose = require("mongoose");
import classes from "../../components/meetups/MeetupItem.module.css";

const MeetupDetails = (props) => {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.meetup.image} alt={props.meetup.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.meetup.title}</h3>
          <address>{props.meetup.address}</address>
          <h3>{props.meetup.description}</h3>
        </div>
      </Card>
    </li>
  );
};

export async function getStaticPaths() {
  await mongoose.connect(
    "mongodb+srv://vivek:Vivek%4026jan2000@cluster0.aqinzv6.mongodb.net/test"
  );

  const meetupSchema = new mongoose.Schema({
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    image: {
      type: String,
    },
  });

  let Meetup;

  try {
    Meetup = mongoose.model("Meetup");
  } catch (error) {
    Meetup = mongoose.model("Meetup", meetupSchema);
  }
  const allMeetups = await Meetup.find().maxTimeMS(30000);
  // console.log(allMeetups);

  const meetupIds = allMeetups.map((meetup) => meetup._id.toString());
  // console.log(meetupIds);

  return {
    paths: meetupIds.map((id) => ({
      params: { meetupsID: id },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const meetupID = context.params.meetupsID;
  await mongoose.connect(
    "mongodb+srv://vivek:Vivek%4026jan2000@cluster0.aqinzv6.mongodb.net/test"
  );

  const meetupSchema = new mongoose.Schema({
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    address: {
      type: String,
    },
    image: {
      type: String,
    },
  });

  let Meetup;

  try {
    Meetup = mongoose.model("Meetup");
  } catch (error) {
    Meetup = mongoose.model("Meetup", meetupSchema);
  }

  const meetup = await Meetup.findById(meetupID);

  return {
    props: {
      meetup: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
        image: meetup.image,
      },
    },
  };
}

export default MeetupDetails;
