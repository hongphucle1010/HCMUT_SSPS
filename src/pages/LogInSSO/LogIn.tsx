import React, { useState } from "react";
// import styles from "./LogIn.module.scss"
import { Avatar, Alert } from "flowbite-react";

import { Button, Label, TextInput } from "flowbite-react";
import { logIn } from "../../api/hcmut_sso/login";
import { HiInformationCircle } from "react-icons/hi";
import { useDispatch } from "react-redux";

interface FormProps {
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: React.FC<FormProps> = ({ setHidden }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();

  const handleLogin = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    logIn(username, password, dispatch).then((success) => {
      if (success) {
        alert("Login success");
        window.location.href = "/";
      } else {
        setHidden(false);
      }
    });
  };

  return (
    <form className="flex flex-col gap-4 w-full">
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="email1"
            value="Tên tài khoản"
            className="font-bold text-red-700"
          />
        </div>
        <TextInput
          id="email1"
          type="text"
          placeholder="BKNetId"
          required
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setUsername(event.currentTarget.value);
          }}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="password1"
            value="Mật khẩu"
            className="font-bold text-red-700"
          />
        </div>
        <TextInput
          id="password1"
          type="password"
          required
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setPassword(event.currentTarget.value);
          }}
        />
      </div>
      <Button type="submit" onClick={(event) => handleLogin(event)}>
        Đăng nhập
      </Button>
    </form>
  );
};

const LogIn: React.FC = () => {
  const [hidden, setHidden] = useState(true);
  return (
    <div className="flex p-0 m-0 justify-center">
      <div className="bg-blue-400 p-6 flex flex-col justify-center items-center max-w-lg w-full rounded-lg">
        <div className="flex flex-row justify-center items-center gap-3 mb-3">
          <Avatar
            img="https://sso.hcmut.edu.vn/cas/images/bk_logo.png"
            alt="BK"
            size="md"
            className="flex-shrink-0"
          />
          <span className="text-lg font-bold">DỊCH VỤ XÁC THỰC TẬP TRUNG</span>
        </div>
        <div className={`mb-2 ${hidden ? "hidden" : ""}`}>
          <Alert color="failure" icon={HiInformationCircle}>
            <span className="font-medium">Đăng nhập thất bại </span>
          </Alert>
        </div>
        <div className="flex justify-center max-w-md bg-slate-100 rounded-lg p-4 w-full">
          <Form setHidden={setHidden} />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
