import Image from 'next/image';
import {Element} from "domhandler";

export const UserForm = () => {
    return (
        <form id="form">
            <br/><br/>
            <div className="flex justify-center">
                <h1 className="text-center text-5xl title">Report/update a water resource</h1>
            </div>
            <p className="text-center text-lg leading-[30px] traking-tight mt-5 md:min-w-[400px] md:mr-10"> Your name:
                <input type="text" name="nameInput"/> <br/> <br/>
                <label> Your email: </label>
                <input type="text" name="emailInput"/> <br/> <br/>
                <label> Address of Resource: </label>
                <input type="text" name="addressInput"/> <br/> <br/>
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
                </select> <br/> <br/>
                <label> Any other information/comments: </label> <br/>
                <textarea rows={7} cols={50}/> <br/> <br/>
                <button className="btn btn-primary" name="submit" id="submit" onClick={formSubmit}>Submit</button>
            </p>
            <br/>
        </form>
    )
};

function formSubmit() {
    var form = document.getElementById("form");
    if (form != null) {
        form.outerHTML = "<p style=\"text-align:center;margin-top: 1em;margin-bottom: 1em;\"> Form Submitted! Thank You! " +
            "This information will be manually reviewed to improve our application.</p>";
    }
}