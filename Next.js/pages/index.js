import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups}></MeetupList>;
};
export default HomePage;

export async function getStaticProps(context) {
  const mongoose = require("mongoose");

  mongoose
    .connect(
      "mongodb+srv://vivek:Vivek%4026jan2000@cluster0.aqinzv6.mongodb.net/test"
    )
    .then(() => {
      console.log("db is connect");
    });

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

  const allMeetups = await Meetup.find();

  return {
    props: {
      meetups: allMeetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
        image: meetup.image,
      })),
    },
  };
}
