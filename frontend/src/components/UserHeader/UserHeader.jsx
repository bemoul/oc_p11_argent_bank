import { useDispatch, useSelector } from 'react-redux';
import { storeSelector } from '../../store/storeSelectors';
import { profilEdit } from '../../store/storeActions';
import UserEdit from '../UserEdit/UserEdit';

/**
 * Component which displays user's information 
 * in header part if he's connected
 * 
 * @param {String} firstname 
 * @param {String} lastname 
 * 
 * @returns UserHeader Component
 */
function UserHeader({firstname, lastname}) {
    const user = useSelector(storeSelector);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();

        dispatch(profilEdit());
    }

    return (
        <div className="header">
            <h1>Welcome back {firstname} {lastname}</h1>
            <div className="user">
                {
                    user.isUserEdit ? 
                    <UserEdit firstname={user.userFirstName} lastname={user.userLastName} />
                    : 
                    <>
                        <h1>{firstname} {lastname}!</h1>
                        <button className="edit-button" onClick={(e) => handleEdit(e)}>Edit Name</button>
                    </>
                }
                
            </div>
        </div>
    )
}


export default UserHeader;