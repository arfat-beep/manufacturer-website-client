import React from "react";
import { useForm } from "react-hook-form";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { async } from "@firebase/util";
import Loading from "../Shared/Loading";
const Signup = () => {
  const [createUserWithEmailAndPassword, loading] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (e) => {
    const name = e.name;
    const email = e.email;
    const password = e.password;
    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    reset();
  };
  if (loading || updating) {
    return <Loading />;
  }
  return (
    <div className="grid justify-center items-center h-screen w-screen">
      <div className="shadow-lg w-96">
        <form onSubmit={handleSubmit(onSubmit)} className=" m-8">
          <div class="form-control ">
            <label class="label">
              <span class="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered"
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required", // JS only: <p>error message</p> TS only support string
                },
              })}
            />
            <label class="label">
              {errors.name?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.name.message}
                </span>
              )}
            </label>
          </div>

          <div class="form-control ">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              class="input input-bordered"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required", // JS only: <p>error message</p> TS only support string
                },
              })}
            />
            <label class="label">
              {errors.email?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.email.message}
                </span>
              )}
            </label>
          </div>

          <div class="form-control ">
            <label class="label">
              <span class="label-text">Passoword</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              class="input input-bordered"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required", // JS only: <p>error message</p> TS only support string
                },
                minLength: {
                  value: 6,
                  message: "Minimum Length 6 character", // JS only: <p>error message</p> TS only support string
                },
              })}
            />
            <label class="label">
              {errors.password?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.password.message}
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="label-text-alt text-red-500">
                  {errors.password.message}
                </span>
              )}
            </label>
          </div>
          <div>
            <input
              type="submit"
              value="Submit"
              className="btn btn-secondary text-white"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;