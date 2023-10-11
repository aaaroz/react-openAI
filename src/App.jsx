import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import Markdown from "react-markdown";
import "./App.css";
import { openai } from "./configs/openai";

function App() {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    const result = openai.chat.completions
      .create({
        messages: [{ role: "user", content: data.prompt }],
        model: "gpt-3.5-turbo",
      })
      .then((result) => {
        console.log(result);
        setResult(result.choices[0].message.content);
        setIsLoading(false);
      });
    console.log(data);
  };

  return (
    <>
      <div className="container d-flex justify-content-center">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h2>Chat GPT-Lite</h2>
          <div className="form-floating mb-3 pe-5">
            <textarea
              id="prompt"
              type="text-area"
              className="form-control"
              {...register("prompt", { required: true })}
            ></textarea>
            <label htmlFor="prompt">Write your prompt here!</label>
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            {isLoading ? "Generating..." : "Generate"}
          </button>
        </Form>
      </div>
      <div className="align-start">
        <h2>Result</h2>
        <Markdown>{result}</Markdown>
      </div>
    </>
  );
}

export default App;
