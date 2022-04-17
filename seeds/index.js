const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20 + 10);
    const camp = new Campground({
      author: "61e5de92b31b1b96b9fc83f5",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla non exercitationem tempore error dignissimos perferendis veritatis dicta! Velit officia tempore unde impedit ea fugit alias perferendis quae ducimus quidem! Tempore!
      Nisi, ut! Quo animi ipsa dignissimos aliquam adipisci aut, asperiores eaque voluptatem temporibus laudantium omnis voluptatibus voluptates totam reiciendis ex provident quam, natus magni a illum, commodi perspiciatis reprehenderit? Eos`,
      price,
      images: [
        {
          url: "https://res.cloudinary.com/ddlurnz1d/image/upload/v1649976181/YelpCamp/b38vfw5ctu9hymianhrb.jpg",
          filename: "YelpCamp/b38vfw5ctu9hymianhrb",
        },
        {
          url: "https://res.cloudinary.com/ddlurnz1d/image/upload/v1649976182/YelpCamp/eojzmltzzuxusd7mrphw.jpg",
          filename: "YelpCamp/eojzmltzzuxusd7mrphw",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
