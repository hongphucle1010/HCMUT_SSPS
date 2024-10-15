import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { RootState } from "../../lib/redux/store";
import { useSelector } from "react-redux";
import { logOut } from "../../utils/authentication/authentication";

interface ContentProps {
  name: string;
  dispatch: Dispatch;
}

const AdminContent = ({ name, dispatch }: ContentProps) => {
  return (
    <div>
      <h1>Admin: {name}</h1>
      <div className="flex flex-col justify-center items-center">
        <span>Bấm vào đây để đăng xuất: </span>
        <Button onClick={() => logOut(dispatch)}>Đăng xuất</Button>
      </div>
    </div>
  );
};

const GuestContent = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <span>Bấm vào đây để đăng nhập: </span>
      <Link to="/login">
        <Button>Đăng nhập</Button>
      </Link>
    </div>
  );
};

const StudentContent = ({ name, dispatch }: ContentProps) => {
  return (
    <div>
      <h1>Student: {name}</h1>
      <div className="flex flex-col justify-center items-center">
        <span>Bấm vào đây để đăng xuất: </span>
        <Button onClick={() => logOut(dispatch)}>Đăng xuất</Button>
      </div>
    </div>
  );
};

export default function Content() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value);
  return (
    <div className="w-full flex justify-center">
      <div className="rounded-xl bg-blue-200 p-4 max-w-sm">
        <span>Đây là landing page</span>
        {user.role === "ADMIN" ? (
          <AdminContent name={user.name} dispatch={dispatch} />
        ) : user.role === "STUDENT" ? (
          <StudentContent name={user.name} dispatch={dispatch} />
        ) : (
          <GuestContent />
        )}
      </div>
    </div>
  );
}
