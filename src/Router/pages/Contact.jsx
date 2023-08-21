import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Contact = () => {
  const params = useParams();
  const navigate = useNavigate();

  console.log(params);
  useEffect(() => {
    if (params.id == 1) navigate("/");
  }, []);

  return <h1>Contact Me id= {params.id}</h1>;
};

export default Contact;
