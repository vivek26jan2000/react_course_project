import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
import { Fragment } from "react";
import MainNavigation from "../components/MainNavigation";

const Error = () => {
  const error = useRouteError();
  let title = "An Error occured";
  let message = "something went wrong";

  if (error.status === 500) {
    title = error.data.message;
  }

  if (error.status === 404) {
    title = " Could Not Found page";
    message = "failed to load page";
  }
  return (
    <Fragment>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </Fragment>
  );
};

export default Error;
