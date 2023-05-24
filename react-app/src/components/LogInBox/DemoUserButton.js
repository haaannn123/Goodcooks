import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
function DemoUserButton() {
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const demoUser = () => {
    dispatch(login("demo@aa.io", "Onecooldog123"))
      .then(closeModal)
      .then(history.push("/"))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(["The provided credentials were invalid."]);
        }
      });
  };

  return (
    <>
      <div className="demo-user-button" onClick={demoUser}>  Demo user</div>
    </>
  );
}
export default DemoUserButton;
