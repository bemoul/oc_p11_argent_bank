import { useDispatch, useSelector } from "react-redux";
import { profilEdit } from "../../reducers/authSlice";
import { userUpdateProfile } from "../../reducers/authThunks";

function UserEdit({ firstname, lastname }) {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCancelEdit = (e) => {
    e.preventDefault();
    dispatch(profilEdit());
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    let token = currentUser;
    console.log("token !!!!", token);
    let newFirstName = document.querySelector("#firstname").value;
    let newLastName = document.querySelector("#lastname").value;

    console.log("Save button clicked");
    console.log("New first name:", newFirstName);
    console.log("New last name:", newLastName);

    dispatch(userUpdateProfile({ newFirstName, newLastName, token }));
  };

  return (
    <div className="user-edit">
      <input className="user-edit-input" id="firstname" type="text" defaultValue={firstname} />
      <input className="user-edit-input" id="lastname" type="text" defaultValue={lastname} />
      <button className="save-btn" onClick={handleSaveEdit}>Save</button>
      <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
    </div>
  );
}

export default UserEdit;
