import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const extractionController = async (req, res) => {
  try {
    const { sentence } = await req.body;
    const prompt = `Identify Names of Places from a sentence. A universe of canonical names (single way of spelling and correct spelling) will be provided in the form of tables. For example, a Country, City and State table containing the possible universe of names. It should take into account spelling errors in the names and multiple ways of spelling and mentioning the same entity in the query and map it to a canonical name.For example- 
    Given an input- Which of the following saw the highest average temperature in January, Maharashtra, Ahmedabad or entire New-Zealand? 
    Output- 
    [{"token": "Maharashtra", "canonical_name": "Maharashtra", "table":"State"},{"token": "Ahmedabad", "canonical_name": "ahmedabad", "table": "City"},{"token": "New-Zealand", "canonical_name": "new zealand", "table": "Country"}]. 
    the given input is: ${sentence}
    find the output like shown in the example and return only the json formatted array`;
    const data = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 2048,
      temperature: 0.2,
    });
    console.log(data);
    console.log("\n");
    console.log(data?.choices[0]?.text);
    const extracted_data = await JSON.parse(data?.choices[0]?.text);
    res.status(200).json({ data: extracted_data });
  } catch (err) {
    console.log(err.message);
  }
};
