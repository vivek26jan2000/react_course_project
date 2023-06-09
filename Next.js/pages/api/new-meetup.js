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

// const Meetup = mongoose.model("Meetup", meetupSchema);

let Meetup;

try {
  Meetup = mongoose.model("Meetup");
} catch (error) {
  Meetup = mongoose.model("Meetup", meetupSchema);
}

async function newMeetupHandler(req, res) {
  if (req.method === "POST") {
    const newMeetup = await Meetup.create(req.body);

    res.status(201).json({
      status: "success",
      message: "New meetup created successfully",
      data: {
        newMeetup,
      },
    });
  }
}

export default newMeetupHandler;
