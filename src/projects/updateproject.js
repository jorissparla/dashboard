import ProjectForm from "./projectform";
import React from "react";
import { useRouteMatch } from "react-router";

const UpdateProject = () => {
  const {
    params: { id },
  } = useRouteMatch();
  console.log(id);
  return (
    <div>
      <ProjectForm id={id} />
    </div>
  );
};

export default UpdateProject;
