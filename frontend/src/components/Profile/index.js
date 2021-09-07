import axios from "axios";
import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { errorResponse, ThemeContext } from "../../utils/helper";
import ImageUploader from "./ImageUploader";
import "./profile.css";

const Profile = () => {
  const { user, token } = useContext(ThemeContext);
  const [loader, setLoader] = useState(false);

  console.log("user", user);

  const updateUserHandler = async (values) => {
    setLoader(true);
    const { name, aboutMe } = values;

    const payload = {
      username: name,
      aboutMe,
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      await axios.put(`/api/user/${user?.id}`, payload, config);
      setLoader(false);
      toast.success("Profile Updated!");
    } catch (error) {
      setLoader(false);
      errorResponse(error);
    }
  };

  return (
    <div className="profile-container">
      <h1>Account Settings</h1>
      <Formik
        enableReinitialize={true}
        onSubmit={updateUserHandler}
        initialValues={{
          name: user?.username,
          image: "",
          aboutMe: user?.aboutMe,
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <Form className="form">
            <ImageUploader
              name="image"
              handleChange={handleChange}
              value={values.image}
            />
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={values.name}
                name="name"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>About</label>
              <textarea
                value={values.aboutMe}
                rows={4}
                name="aboutMe"
                onChange={handleChange}
              />
            </div>
            <button type="submit" disabled={loader} onClick={handleSubmit}>
              {loader ? "Loading..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
