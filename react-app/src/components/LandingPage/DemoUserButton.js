import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";
import { useModal } from "../../context/Modal";
function DemoUserButton(){
    const [errors, setErrors] = useState();
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const demoUser = () => {

        dispatch(login("demo@aa.io", "password"))
          .then(closeModal)
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(["The provided credentials were invalid."]);
            }
          });
      }
    return (
        <button onClick={demoUser}>Sign In as a Demo User</button>
    )
}
export default DemoUserButton
