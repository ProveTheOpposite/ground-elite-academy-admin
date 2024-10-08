// hook
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { app, auth } from "src/server/firebase";
// react hot toast
import toast, { Toaster } from "react-hot-toast";
// yup
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const createValidation = () => {
  return yup.object({
    email: yup
      .string()
      .required("L'email est obligatoire")
      .email("Le champ doit être un email"),
    password: yup.string().required("Le mot de passe est obligatoire"),
  });
};

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const schema = createValidation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const login = async (values) => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (e) {
      setError("globalError", { type: "global", message: e.message });
      toast.error("Connexion échoué !");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 pt-10 md:flex md:items-center md:justify-center">
      <Toaster
        position={window.innerWidth >= 1024 ? "bottom-right" : "top-right"}
        reverseOrder={false}
      />

      <div className="flex flex-col items-center p-5 py-10">
        <form
          className="flex w-full flex-col gap-y-10 rounded-lg bg-[#eee] p-3 md:w-[500px]"
          onSubmit={handleSubmit(login)}
        >
          <div className="relative flex flex-col gap-y-1">
            <label>Email</label>
            <input
              {...register("email")}
              className="rounded-md border border-gray-700 p-1 outline-none"
              type="email"
            />
            {errors.email && (
              <p className="absolute -bottom-6 left-1 text-sm text-red-600 md:-bottom-7 md:text-base">
                {" "}
                <i className="fa-solid fa-triangle-exclamation mr-1"></i>{" "}
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative flex flex-col gap-y-1">
            <label>Mot de passe</label>
            <input
              {...register("password")}
              className="rounded-md border border-gray-700 p-1 outline-none"
              type="password"
            />
            {errors.password && (
              <p className="absolute -bottom-6 left-1 text-sm text-red-600 md:-bottom-7 md:text-base">
                {" "}
                <i className="fa-solid fa-triangle-exclamation mr-1"></i>{" "}
                {errors.password.message}
              </p>
            )}
          </div>

          {errors?.globalError && (
            <p className="pl-2 text-red-600">
              Le mot de passe ou l&apos;adresse e-mail fournis semblent
              introuvables. Veuillez vérifier et réessayer.
            </p>
          )}

          <div className="text-center">
            <button className="rounded-md bg-blue-400 p-2 text-white active:scale-95">
              {isLoading ? (
                <i className="fa-solid fa-spinner animate-spin text-lg"></i>
              ) : (
                "Se connecter"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
