
const googleAI = require("@google/generative-ai");
const GoogleGenerativeAI = googleAI.GoogleGenerativeAI;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateQuiz = async (topic,difficulty,ques)=> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  console.log(model);
  const prompt = `Generate ${ques} multiple-choice quiz questions on the topic "${topic}" with ${difficulty} level without any explainition.
  Each question should have:
  - Question text
  - 4 options (A-D)
  - Correct answer
  
  format should be in below format strictly!
  "1. **Question:** What is the extension for Java source code files?
    A) .txt     B) .class    C) .java     D) .exe
    **Correct Answer:** C

2. **Question:** Which keyword is used to create a new class in Java?
    A) int      B) class     C) void      D) main
    **Correct Answer:** B"
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = generateQuiz;