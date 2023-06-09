// import { useEffect, useState } from "react";

import EventsList from "../components/EventsList";
import { useLoaderData, json } from "react-router-dom";

function EventsPage() {
  const data = useLoaderData();

  const events = data.events;

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

// loader function

async function loader() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Could not Fetch Data" }), {
    //   status: 500,
    // });

    // with the help of util json() func
    return json(
      { message: "Could not Fetch Data" },
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}

export { EventsPage, loader };

// //////////WITHOUT USING LOADER FUNC PROVIDE BY THE ROUTES

// function EventsPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [fetchedEvents, setFetchedEvents] = useState();
//   const [error, setError] = useState();

//   useEffect(() => {
//     async function fetchEvents() {
//       setIsLoading(true);
//       const response = await fetch("http://localhost:8080/events");

//       if (!response.ok) {
//         setError("Fetching events failed.");
//       } else {
//         const resData = await response.json();
//         setFetchedEvents(resData.events);
//       }
//       setIsLoading(false);
//     }

//     fetchEvents();
//   }, []);
//   return (
//     <>
//       <div style={{ textAlign: "center" }}>
//         {isLoading && <p>Loading...</p>}
//         {error && <p>{error}</p>}
//       </div>
//       {!isLoading && fetchedEvents && <EventsList events={fetchedEvents} />}
//     </>
//   );
// }

// export default EventsPage;
