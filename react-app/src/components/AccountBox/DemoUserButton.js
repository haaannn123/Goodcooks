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

  const demoUser = async () => {
    console.log("demo user useEffect")
    const data = await dispatch(login("demo@aa.io", "Onecooldog123"))
      // .then(closeModal)
     

    if (data) {
      setErrors(data)
    } else {
      closeModal();
      history.push("/")
    }
  };

  return (
    <>
      <div className="demo-user-button" onClick={demoUser}>Sign in Demo user</div>
    </>
  );
}
export default DemoUserButton;
