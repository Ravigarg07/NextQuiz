const express = require("express");
const cors = require("cors");
require("./DataBase/config");
const User = require("./DataBase/Users");
const generateQuiz = require("./gemini");
const History = require("./DataBase/History")

const app = express();

app.use(express.json());
app.use(cors());

const isDataPresent = async (obj) => {
  let data = await User.find();
  let isData = false;
  data.forEach((item) => {
    if (item.email == obj.email) {
      isData = true;
    }
  });
  return isData;
};


// Register
app.post("/register", async (req, resp) => {
  try {
    let isData = await isDataPresent(req.body).then((res)=>{
      return res;
    })
    if(!isData){
      let user = new User(req.body);
      await user.save();
      resp.send({ result: "Registration Successful!" });
    }
    else{
      resp.send({result:"Account already Exist with this Email,\nPlease SignIn!"});
    }
  } catch (error) {
    resp.status(500).send({ error: error.message });
  }
});

// Login
app.post("/login", async (req, resp) => {
  try {
    let result = await User.findOne(req.body);
    if (result) {
      resp.send({ result: "user found" ,name:result.name});
    } else {
      resp.send({ result: "user not found" });
    }
  } catch (error) {
    resp.status(500).send({ error: error.message });
  }
});

// Profile Data
app.post("/profileData", async (req, resp) => {
  try {
    let result = await User.findOne(req.body);
    resp.send(result);
  } catch (error) {
    resp.status(500).send({ error: error.message });
  }
});

// Generate Quiz
app.post("/generateQuiz", async (req, res) => {
  try {
    const { email,name,topic,difficulty,ques,date,duration,marks } = req.body;
    const quiz = await generateQuiz(topic,difficulty,ques);
    const history = new History({email,name,topic,difficulty,ques,date,duration,marks});
    await history.save();
    res.json({ quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/regenerateQuiz", async (req, res) => {
  try {
    const { topic,difficulty,ques } = req.body;
    const quiz = await generateQuiz(topic,difficulty,ques);
    res.json({ quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/quiz-history/:email",async (req,resp)=>{
  try{
    let {email} = req.params;
    email = email.substring(1);
    const result = await History.find({email});
    resp.send(result);
  } catch{
    resp.status(500).json({error:error.message});
  }
})

app.post("/submitQuiz/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { marks } = req.body;

    const updatedUser = await History.findByIdAndUpdate(
      _id,
      { $set: { marks } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.send("Update Successfully!");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.listen(5000, () => {
  console.log("Server running on port 5000");
}); 
