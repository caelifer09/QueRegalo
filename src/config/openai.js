import {REACT_APP_OPENAI_KEY, REACT_APP_URL} from 'dotenv'

const generateText = async (prompt) => {
  try {
    const requestOptions = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${REACT_APP_OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          max_tokens: 500,
          messages: [{"role": "user", "content": prompt}],
          temperature: 0.7
        }),
      };

      const result = await fetch(REACT_APP_URL, requestOptions);
      const json = await result.json();
      console.log(json)
    return json.choices[0].message.content
  } catch (error) {
    console.log(error);
  }
}

export default generateText
