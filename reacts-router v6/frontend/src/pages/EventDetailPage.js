import { Fragment } from "react";

import EventItem from "../components/EventItem";
import { json, redirect } from "react-router-dom";
import { useRouteLoaderData } from "react-router-dom";
const EventDetailPage = () => {
  const data = useRouteLoaderData("event-details");
  const event = data.event;
  return (
    <Fragment>
      <EventItem event={event} />
    </Fragment>
  );
};

async function loader({ request, params }) {
  const id = params.eventID;
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "not able to fetch the event detail data" },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}

async function action({ params, request }) {
  const id = params.eventID;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });
  if (!response.ok) {
    throw json(
      { message: "not able to delete the event" },
      {
        status: 500,
      }
    );
  }

  return redirect("/events");
}

export { EventDetailPage, loader, action };
