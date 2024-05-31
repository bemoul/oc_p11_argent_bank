import { useDispatch, useSelector } from "react-redux";
import { storeSelector } from "../../store/storeSelectors";

/**
 * Component which displays inputs
 * for user profil update
 * 
 * @param {String} firstname 
 * @param {String} lastname 
 * 
 * @returns UserEdit component
 */
function UserEdit({firstname, lastname}) {
  const { currentUser, firstName, lastName } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleCancelEdit = (e) => {
        e.preventDefault();

        dispatch(profilEdit());
    }

    const handleSaveEdit = (e) => {
        e.preventDefault();

        let token = currentUser.authToken;
        let newFirstName = document.querySelector("#firstname").value;
        let newLastName = document.querySelector("#lastname").value;

        console.log("Save button clicked");
        console.log("New first name:", newFirstName);
        console.log("New last name:", newLastName);

        dispatch(userUpdateProfile({newFirstName, newLastName, token}));
    }

    return (
        <div className="user-edit">
            <input className="user-edit-input" id="firstname" type="text" defaultValue={firstname} />
            <input className="user-edit-input" id="lastname" type="text" defaultValue={lastname} />
            <button className="save-btn" onClick={(e) => handleSaveEdit(e)}>Save</button>
            <button className="cancel-btn" onClick={(e) => handleCancelEdit(e)}>Cancel</button>
        </div>
    )
}

export default UserEdit;

