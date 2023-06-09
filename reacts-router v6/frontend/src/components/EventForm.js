import { useActionData, useNavigate } from "react-router-dom";
import { Form } from "react-router-dom";
import { json, redirect } from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const data = useActionData();

  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      {data &&
        data.errors &&
        Object.values(data.errors).map((err) => (
          <li
            style={{
              textAlign: "center",

              listStyle: "none",
            }}>
            {err}
          </li>
        ))}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
}

export async function action({ request, params }) {
  const data = await request.formData();
  const enteredData = {
    title: data.get("title"),
    image: data.get("image"),
    description: data.get("description"),
    date: data.get("date"),
  };

  const method = request.method;
  const eventId = params.eventID;

  let url = "http://localhost:8080/events";

  if (method === "PATCH") {
    url = "http://localhost:8080/events/" + eventId;
  }

  console.log(enteredData);
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(enteredData),
  });
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "not able to add new event" },
      {
        status: 500,
      }
    );
  }

  return redirect("/events");
}

export default EventForm;
