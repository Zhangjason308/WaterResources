import Image from 'next/image';

export const UserForm = () => {
    return (
            <form id="form">
            <label> Your name: </label>
            <input type="text" name="nameInput"> </input> <br> </br>
            <label> Your email: </label>
            <input type="text" name="emailInput"> </input>
            <label> Address of Resource: </label>
            <input type="text" name="addressInput"> </input>
            <label> Nature of update: </label>
            <select name="typeInput">
                <option value="newWashroom">Report a new washroom</option>
                <option value="newFountain">Report a new water fountain</option>
                <option value="newShower">Report a new shower</option>
                <option value="updateWashroom">Update washroom info</option>
                <option value="updateFountain">Update fountain info</option>
                <option value="updateShower">Update shower info</option>
                <option value="missingWashroom">Report a missing washroom</option>
                <option value="missingFountain">Report a missing fountain</option>
                <option value="missingShower">Report a missing shower</option>
            </select>
            <label> Any other information/comments: </label>
            <input type="text" name="infoInput"> </input>
            <button className="btn btn-primary" name="submit" id="submit" onClick={formSubmit}>Submit</button>
        </form>
    )
};

function formSubmit() {
    var form = document.getElementById("form");
    if(form != null){
        form.append("<p Form Submitted!> </p>");
        form.remove();
    }
}