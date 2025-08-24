import { useState } from "react"
import axios from "axios"

const Form = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        startDate: "",
        gender: "",
        course: "",
        aggred: false,
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        startDate: "",
        gender: "",
        course: "",
        aggred: "",
    });
    const [formValid, setFormValid] = useState({
        name: false,
        email: false,
        phoneNumber: false,
        startDate: false,
        gender: false,
        course: false,
        aggred: false,
        isDisabled: false,
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const validation = (feildValue, feildName) => {
        const newErrors = { ...errors };
        const newFormValid = { ...formValid };

        switch (feildName) {
            case "name": {
                if (feildValue === "") {
                    newErrors.name = "Name should not be empty";
                    newFormValid.name = false;
                } else if (!/^[A-Z][a-z]+\s[A-Z][a-z]+$/.test(feildValue)) {
                    newErrors.name = "first name and last name should be separated by space";
                    newFormValid.name = false;
                } else {
                    newErrors.name = "";
                    newFormValid.name = true;
                }
                break;
            }
            case "email": {
                if (feildValue === "") {
                    newErrors.email = "Email should not be empty";
                    newFormValid.email = false;
                } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(feildValue)) {
                    newErrors.email = "Please enter a valid email";
                    newFormValid.email = false;
                } else {
                    newErrors.email = "";
                    newFormValid.email = true;
                }
                break;
            }
            case "phoneNumber": {
                if (feildValue === "") {
                    newErrors.phoneNumber = "Phone number should not be empty";
                    newFormValid.phoneNumber = false;
                } else if (!/^[0-9]{10}$/.test(feildValue)) {
                    newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
                    newFormValid.phoneNumber = false;
                } else {
                    newErrors.phoneNumber = "";
                    newFormValid.phoneNumber = true;
                }
                break;
            }
            case "startDate": {
                if (feildValue === "") {
                    newErrors.startDate = "please select a date";
                    newFormValid.startDate = false;
                } else if (new Date(feildValue) < Date.now()) {
                    // new Date(feildValue) is a Date object. Date.now() returns a number (timestamp).
                    // JavaScript will coerce them, but it’s cleaner and safer to compare two timestamps.
                    // like new Date(feildValue).getTime() < Date.now()
                    newErrors.startDate = "Please select a future date";
                    newFormValid.startDate = false;
                } else {
                    newErrors.startDate = "";
                    newFormValid.startDate = true;
                }
            }
            case "gender": {
                if (feildValue === "") {
                    newErrors.gender = "Please select a gender";
                    newFormValid.gender = false;
                } else {
                    newErrors.gender = "";
                    newFormValid.gender = true;
                }
                break;
            }
            case "course": {
                if (feildValue === "" || feildValue === "select") {
                    newErrors.course = "Please select a course";
                    newFormValid.course = false;
                } else {
                    newErrors.course = "";
                    newFormValid.course = true;
                }
                break;
            }
            case "aggred": {
                if (!feildValue) {
                    newErrors.aggred = "You must agree to the terms and conditions";
                    newFormValid.aggred = false;
                } else {
                    newErrors.aggred = "";
                    newFormValid.aggred = true;
                }
                break;
            }

        }
        setErrors(newErrors);

        newFormValid.isDisabled = newErrors.name && newErrors.email && newErrors.startDate
            && newErrors.gender && newErrors.course && newErrors.aggred
            && newErrors.phoneNumber

        setFormValid(newFormValid);
    }

    const handleChange = (event) => {
        const { name: feildName, value: feildValue, type, checked } = event.target;

        if (type === "checkbox") {
            setFormData({
                ...formData,
                [feildName]: checked
            })
        } else {
            setFormData({
                ...formData,
                [feildName]: feildValue
            })
        }

        validation(feildValue, feildName);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(URL, formData)
            .then((res) => {
                console.log(`Form submitted successfully, ${res}`)
                setSuccessMessage("Form Submitted Successfully...")
                setErrorMessage("");
            })
            .catch((err) => {
                console.log("Something went wrong while submitting the form ");
                console.error(err);
                setErrorMessage("Please try again after some time");
                setSuccessMessage("");
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="">
                <div className="form-group">
                    <label className="form-label" htmlFor="name"> Enter Name :</label>
                    <input type="text" name="name" id="name" value={formData.name}
                        onChange={handleChange} className="form-control" placeholder="Enter the name" />

                    <span className="text-danger">{errors.name}</span>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email"> Enter email :</label>
                    <input type="email" name="email" id="email" value={formData.email}
                        onChange={handleChange} className="form-control" placeholder="Enter the email" />
                    <span className="text-danger">{errors.email}</span>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="phoneNumber"> Enter PhoneNumber :</label>
                    <input type="number" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber}
                        onChange={handleChange} className="form-control" placeholder="Enter the phoneNumber" />
                    <span className="text-danger">{errors.phoneNumber}</span>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="startDate">Select course start date</label>
                    <input className="form-control" type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} />
                    <span className="text-danger">{errors.startDate}</span>
                </div>
                {/* for radio  */}
                <div className="form-group">
                    <label className="form-label" htmlFor="gender"> Select Gender :</label>

                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="male" checked={formData.gender === "male"} onChange={handleChange} />
                        <div className="form-check-label" htmlFor="male"> Male</div>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="gender" id="female" checked={formData.gender === "female"} onChange={handleChange} />
                        <div className="form-check-label" htmlFor="female"> Female</div>
                    </div>
                    <span className="text-danger">{errors.gender}</span>
                </div>

                {/* for dropdown */}

                <div className="form-group">
                    <label className="form-label" htmlFor="course"> Select Course :</label>

                    <select className="form-control" name="course" id="course" value={formData.course} onChange={handleChange}>

                        <option value={select}>Select...</option>
                        {
                            {/* here data of courses come from the api call  */ }
                            ["Html", "CSS", "JavaScript", "React", "Express"].map((course, index) => (
                                <option key={index} value={course}>{course}</option>
                            ))
                        }
                    </select>
                    <span className="text-danger">{errors.course}</span>
                </div>

                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="aggred" name="aggred" checked={formData.aggred} onChange={handleChange} />
                        <label className="form-check-label" htmlFor="aggred" > I agree to above term and conditions</label>
                    </div>
                    <span className="text-danger">{errors.aggred}</span>
                </div>

                <button className="btn btn-primary" disabled={!formValid.isDisabled}>Submit</button>

            </form>

            <div className="text-success">{successMessage}</div>
            <div className="text-danger">{errorMessage}</div>

        </div>
    )
}


export default Form
