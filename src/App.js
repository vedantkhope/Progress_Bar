import React, { useState } from 'react';
import './App.css';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, HeadingLevel } from 'docx';


function WelcomePage({ onStart }) {
    return ( <
        div className = "WelcomePage" >
        <
        h1 > Welcome < /h1> <
        p > < /p> <
        button onClick = { onStart } > Get Started < /button> < /
        div >
    );
}

function SelfInfo({ onNext, formData, setFormData }) {
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [photo, setPhoto] = useState(null); // State for the uploaded photo

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({...formData, firstName, middleName, lastName, age, gender, photo }); // Include photo in form data
        onNext();
    };

    return ( <
        div >
        <
        h2 > Personal Information < /h2> <
        form onSubmit = { handleSubmit } >
        <
        div className = "form-group" >
        <
        label > First Name: < /label> <
        input type = "text"
        value = { firstName }
        onChange = {
            (e) => setFirstName(e.target.value)
        }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Middle Name: < /label> <
        input type = "text"
        value = { middleName }
        onChange = {
            (e) => setMiddleName(e.target.value)
        }
        /> < /
        div > <
        div className = "form-group" >
        <
        label > Last Name: < /label> <
        input type = "text"
        value = { lastName }
        onChange = {
            (e) => setLastName(e.target.value)
        }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Upload Photo: < /label> <
        input type = "file"
        accept = "image/*"
        onChange = { handlePhotoChange }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Age: < /label> <
        input type = "number"
        value = { age }
        onChange = {
            (e) => setAge(e.target.value)
        }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Gender: < /label> <
        select value = { gender }
        onChange = {
            (e) => setGender(e.target.value)
        }
        required >
        <
        option value = "" > Select Gender < /option> <
        option value = "male" > Male < /option> <
        option value = "female" > Female < /option> <
        option value = "other" > Other < /option> < /
        select > <
        /div>

        <
        button type = "submit" > Next < /button> < /
        form > <
        /div>
    );
}

function Address({ onNext, onPrev, formData, setFormData }) {
    const [permanentAddress, setPermanentAddress] = useState({
        houseNo: '',
        apartmentName: '',
        road: '',
        landmark: '',
        city: '',
        state: '',
        country: '',
        pinCode: ''
    });
    const [correspondenceAddress, setCorrespondenceAddress] = useState({
        houseNo: '',
        apartmentName: '',
        road: '',
        landmark: '',
        city: '',
        state: '',
        country: '',
        pinCode: ''
    });
    const [copyPermanent, setCopyPermanent] = useState(false); // State for checkbox

    const handlePermanentAddressChange = (e) => {
        const { name, value } = e.target;
        setPermanentAddress({...permanentAddress, [name]: value });
        if (copyPermanent) {
            setCorrespondenceAddress({...correspondenceAddress, [name]: value });
        }
    };

    const handleCorrespondenceAddressChange = (e) => {
        const { name, value } = e.target;
        setCorrespondenceAddress({...correspondenceAddress, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setCopyPermanent(e.target.checked);
        if (e.target.checked) {
            // If checkbox is checked, copy permanent address to correspondence address
            setCorrespondenceAddress({...permanentAddress });
        } else {
            // If checkbox is unchecked, clear correspondence address
            setCorrespondenceAddress({
                houseNo: '',
                apartmentName: '',
                road: '',
                landmark: '',
                city: '',
                state: '',
                country: '',
                pinCode: ''
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({...formData, permanentAddress, correspondenceAddress });
        onNext();
    };

    return ( <
        div >
        <
        h2 > Address < /h2> <
        form onSubmit = { handleSubmit } >
        <
        h3 > Permanent Address < /h3> <
        div className = "form-group" >
        <
        label > House No / Apartment Name: < /label> <
        input type = "text"
        name = "houseNo"
        value = { permanentAddress.houseNo }
        onChange = { handlePermanentAddressChange }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Apartment Name: < /label> <
        input type = "text"
        name = "apartmentName"
        value = { permanentAddress.apartmentName }
        onChange = { handlePermanentAddressChange }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Road: < /label> <
        input type = "text"
        name = "road"
        value = { permanentAddress.road }
        onChange = { handlePermanentAddressChange }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Landmark: < /label> <
        input type = "text"
        name = "landmark"
        value = { permanentAddress.landmark }
        onChange = { handlePermanentAddressChange }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > City: < /label> <
        input type = "text"
        name = "city"
        value = { permanentAddress.city }
        onChange = { handlePermanentAddressChange }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > State: < /label> <
        input type = "text"
        name = "state"
        value = { permanentAddress.state }
        onChange = { handlePermanentAddressChange }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Country: < /label> <
        input type = "text"
        name = "country"
        value = { permanentAddress.country }
        onChange = { handlePermanentAddressChange }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Pin Code: < /label> <
        input type = "text"
        name = "pinCode"
        value = { permanentAddress.pinCode }
        onChange = { handlePermanentAddressChange }
        required /
        >
        <
        /div> <
        h3 > Correspondence Address < /h3> <
        div className = "form-group" >
        <
        label >
        <
        input type = "checkbox"
        onChange = { handleCheckboxChange }
        /> Same as Permanent Address < /
        label > <
        /div>

        <
        div className = "form-group" >
        <
        label > House No / Apartment Name: < /label> <
        input type = "text"
        name = "houseNo"
        value = { correspondenceAddress.houseNo }
        onChange = { handleCorrespondenceAddressChange }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Apartment Name: < /label> <
        input type = "text"
        name = "apartmentName"
        value = { correspondenceAddress.apartmentName }
        onChange = { handleCorrespondenceAddressChange }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Road: < /label> <
        input type = "text"
        name = "road"
        value = { correspondenceAddress.road }
        onChange = { handleCorrespondenceAddressChange }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Landmark: < /label> <
        input type = "text"
        name = "landmark"
        value = { correspondenceAddress.landmark }
        onChange = { handleCorrespondenceAddressChange }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > City: < /label> <
        input type = "text"
        name = "city"
        value = { correspondenceAddress.city }
        onChange = { handleCorrespondenceAddressChange }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > State: < /label> <
        input type = "text"
        name = "state"
        value = { correspondenceAddress.state }
        onChange = { handleCorrespondenceAddressChange }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Country: < /label> <
        input type = "text"
        name = "country"
        value = { correspondenceAddress.country }
        onChange = { handleCorrespondenceAddressChange }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Pin Code: < /label> <
        input type = "text"
        name = "pinCode"
        value = { correspondenceAddress.pinCode }
        onChange = { handleCorrespondenceAddressChange }
        required /
        >
        <
        /div> <
        br / >
        <
        button type = "button"
        onClick = { onPrev } > Previous < /button> <
        button type = "submit" > Next < /button> < /
        form > <
        /div>
    );
}



function Education({ onNext, onPrev, formData, setFormData }) {
    const [educationDetails, setEducationDetails] = useState({
        '10th': { schoolName: '', marks: '', year: '' },
        '12th': { collegeName: '', marks: '', year: '' },
        'Diploma': { collegeName: '', marks: '', year: '' },
        'Degree': { collegeName: '', marks: '', year: '' }
    });

    const handleDetailsChange = (level, e) => {
        const { name, value } = e.target;
        setEducationDetails({
            ...educationDetails,
            [level]: {...educationDetails[level], [name]: value }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData({...formData, educationDetails });
        onNext();
    };

    return ( <
        div >

        <
        h2 > Education < /h2> <
        form onSubmit = { handleSubmit } >
        <
        div >
        <
        h3 > 10 th < /h3> <
        div className = "form-group" >
        <
        label > School Name: < /label> <
        input type = "text"
        name = "schoolName"
        value = { educationDetails['10th'].schoolName }
        onChange = {
            (e) => handleDetailsChange('10th', e)
        }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Marks: < /label> <
        input type = "text"
        name = "marks"
        value = { educationDetails['10th'].marks }
        onChange = {
            (e) => handleDetailsChange('10th', e)
        }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Year: < /label> <
        input type = "text"
        name = "year"
        value = { educationDetails['10th'].year }
        onChange = {
            (e) => handleDetailsChange('10th', e)
        }
        required /
        >
        <
        /div> < /
        div > <
        div >
        <
        h3 > 12 th < /h3> <
        div className = "form-group" >
        <
        label > College Name: < /label> <
        input type = "text"
        name = "collegeName"
        value = { educationDetails['12th'].collegeName }
        onChange = {
            (e) => handleDetailsChange('12th', e)
        }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Marks: < /label> <
        input type = "text"
        name = "marks"
        value = { educationDetails['12th'].marks }
        onChange = {
            (e) => handleDetailsChange('12th', e)
        }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Year: < /label> <
        input type = "text"
        name = "year"
        value = { educationDetails['12th'].year }
        onChange = {
            (e) => handleDetailsChange('12th', e)
        }
        required /
        >
        <
        /div> < /
        div > <
        div >
        <
        h3 > Diploma < /h3> <
        div className = "form-group" >
        <
        label > College Name: < /label> <
        input type = "text"
        name = "collegeName"
        value = { educationDetails['Diploma'].collegeName }
        onChange = {
            (e) => handleDetailsChange('Diploma', e)
        }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Marks: < /label> <
        input type = "text"
        name = "marks"
        value = { educationDetails['Diploma'].marks }
        onChange = {
            (e) => handleDetailsChange('Diploma', e)
        }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Year: < /label> <
        input type = "text"
        name = "year"
        value = { educationDetails['Diploma'].year }
        onChange = {
            (e) => handleDetailsChange('Diploma', e)
        }
        required /
        >
        <
        /div> < /
        div > <
        div >
        <
        h3 > Degree < /h3> <
        div className = "form-group" >
        <
        label > College Name: < /label> <
        input type = "text"
        name = "collegeName"
        value = { educationDetails['Degree'].collegeName }
        onChange = {
            (e) => handleDetailsChange('Degree', e)
        }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Marks: < /label> <
        input type = "text"
        name = "marks"
        value = { educationDetails['Degree'].marks }
        onChange = {
            (e) => handleDetailsChange('Degree', e)
        }
        required /
        >
        <
        /div> <
        div className = "form-group" >
        <
        label > Year: < /label> <
        input type = "text"
        name = "year"
        value = { educationDetails['Degree'].year }
        onChange = {
            (e) => handleDetailsChange('Degree', e)
        }
        required /
        >
        <
        /div> < /
        div > <
        br / >
        <
        button type = "button"
        onClick = { onPrev } > Previous < /button> <
        button type = "submit" > Next < /button> < /
        form >

        <
        /div>
    );
}

function Preview({ formData, onPrev, onSubmit }) {

    const downloadFormData = () => {
        let formattedData = '';

        // Add title for Self Information section
        formattedData += 'Personal Information\n';
        for (const [key, value] of Object.entries(formData)) {
            if (key === 'firstName' || key === 'middleName' || key === 'lastName' || key === 'age' || key === 'gender' || key === 'photo') {
                formattedData += `${key}: ${value}\n`;
            }
        }
        formattedData += '\n';

        // Add title for Address section
        formattedData += 'Address\n';
        const { permanentAddress, correspondenceAddress } = formData;
        formattedData += 'Permanent Address\n';
        for (const [key, value] of Object.entries(permanentAddress)) {
            formattedData += `${key}: ${value}\n`;
        }
        formattedData += '\n';
        formattedData += 'Correspondence Address\n';
        for (const [key, value] of Object.entries(correspondenceAddress)) {
            formattedData += `${key}: ${value}\n`;
        }
        formattedData += '\n';

        // Add title for Education section
        formattedData += 'Education\n';
        const { educationDetails } = formData;
        for (const [key, value] of Object.entries(educationDetails)) {
            formattedData += `${key}\n`;
            for (const [subKey, subValue] of Object.entries(value)) {
                formattedData += `${subKey}: ${subValue}\n`;
            }
            formattedData += '\n';
        }

        // Create a Blob with the formatted data
        const blob = new Blob([formattedData], { type: 'text/plain;charset=utf-8' });

        // Create an <a> element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'formData.txt';

        // Append the <a> element to the body
        document.body.appendChild(link);

        // Trigger a click event on the <a> element to initiate download
        link.click();

        // Remove the <a> element from the body
        document.body.removeChild(link);
    };






    // Function to generate table rows for address details
    const renderAddressRows = (address) => {
        return Object.entries(address).map(([key, value]) => ( <
            tr key = { key } >
            <
            td > { key } < /td> <
            td > { value } < /td> < /
            tr >
        ));
    };

    // Function to generate table rows for education details
    const renderEducationRows = (educationDetails) => {
        return Object.entries(educationDetails).map(([key, value]) => ( <
            tr key = { key } >
            <
            td > { key } < /td> <
            td > { value.schoolName } { key !== '10th' && value.collegeName } < /td> 

            <
            td > { value.marks } < /td> <
            td > { value.year } < /td>

            <
            /tr>
        ));
    };


    // Destructure data object to get the required fields
    const { firstName, middleName, lastName, age, gender, photo, permanentAddress, correspondenceAddress, educationDetails } = formData;

    return ( <
        div >
        <
        h2 > Preview < /h2> <
        h3 > Self Information < /h3> <
        table >
        <
        tbody >
        <
        tr > < td > First Name: < /td><td>{firstName}</td > < /tr> <
        tr > < td > Middle Name: < /td><td>{middleName}</td > < /tr> <
        tr > < td > Last Name: < /td><td>{lastName}</td > < /tr> <
        tr > < td > Age: < /td><td>{age}</td > < /tr> <
        tr > < td > Gender: < /td><td>{gender}</td > < /tr> <
        tr > < td > Photo: < /td><td>{photo ? "Uploaded" : "Not Uploaded"}</td > < /tr> < /
        tbody > <
        /table>

        <
        h3 > Address < /h3> <
        table >
        <
        tbody > { renderAddressRows(permanentAddress) } < /
        tbody > <
        /table> <
        br / >
        <
        h3 > Correspond Address < /h3> <
        table >
        <
        tbody > { renderAddressRows(correspondenceAddress) } < /
        tbody > <
        /table>

        <
        h3 > Education < /h3> <
        table >
        <
        tbody >
        <
        tr > < th > Type < /th><th>School/College
        Name < /th><th>Precentage</th > < th > Year < /th></tr > { renderEducationRows(educationDetails) } <
        /tbody> < /
        table >

        <
        br / >
        <
        button onClick = { onPrev } > Previous < /button> <
        button onClick = { downloadFormData } > Download PDF < /button> <
        button onClick = { onSubmit } > Submit < /button> < /
        div >
    );
}


function App() {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        // Initial empty education details
        educationDetails: {
            '10th': { schoolName: '', marks: '', year: '' },
            '12th': { collegeName: '', marks: '', year: '' },
            'Diploma': { collegeName: '', marks: '', year: '' },
            'Degree': { collegeName: '', marks: '', year: '' }
        }
    });
    const [submitted, setSubmitted] = useState(false);

    const handleStart = () => {
        setStep(1);
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    const downloadFormData = () => {
        // Convert form data to a string
        const dataString = `
      First Name: ${formData.firstName}
      Middle Name: ${formData.middleName}
      Last Name: ${formData.lastName}
      Age: ${formData.age}
      Gender: ${formData.gender}
      Permanent Address: ${JSON.stringify(formData.permanentAddress)}
      Correspondence Address: ${JSON.stringify(formData.correspondenceAddress)}
      Education Details: ${JSON.stringify(formData.educationDetails)}
    `;

        // Create a new Blob object with the data
        const blob = new Blob([dataString], { type: 'text/plain;charset=utf-8' });

        // Use saveAs function from file-saver to download the file
        saveAs(blob, 'formData.txt');
    };

    const handleFormSubmit = () => {
        // Store the form data in local storage
        localStorage.setItem('formData', JSON.stringify(formData));

        // Set the submitted state to true
        setSubmitted(true);

        // Optionally, you can reset the form data or perform any other actions
        setFormData({
            // Resetting self-info data
            firstName: '',
            middleName: '',
            lastName: '',
            age: '',
            gender: '',
            photo: null,
            // Resetting address data
            permanentAddress: {
                houseNo: '',
                partmentName: '',
                road: '',
                landmark: '',
                city: '',
                state: '',
                country: '',
                pinCode: ''
            },
            correspondenceAddress: {
                houseNo: '',
                apartmentName: '',
                road: '',
                landmark: '',
                city: '',
                state: '',
                country: '',
                pinCode: ''
            },
            // Resetting the form data
            educationDetails: {
                '10th': { schoolName: '', marks: '', year: '' },
                '12th': { collegeName: '', marks: '', year: '' },
                'Diploma': { collegeName: '', marks: '', year: '' },
                'Degree': { collegeName: '', marks: '', year: '' }
            }
        });

        // Show the success message
        alert('Form submitted successfully and data stored locally!');

        // Reset step to 0
        setStep(0);
    };

    const progress = step * 25; // Calculate progress percentage

    return ( <
            >
            {
                step === 0 ? ( <
                    WelcomePage onStart = { handleStart }
                    />
                ) : ( <
                        div className = "App" >
                        <
                        div className = "progress-container" >
                        <
                        div className = "progress-bar" >
                        <
                        div className = "progress-bar-inner"
                        style = {
                            { width: `${progress}%` }
                        } >
                        <
                        /div> <
                        div className = "progress-label" > { progress } % < /div> < /
                        div > <
                        /div> {
                        step === 1 && ( <
                            SelfInfo onNext = { handleNext }
                            formData = { formData }
                            setFormData = { setFormData }
                            />
                        )
                    } {
                        step === 2 && ( <
                            Address onNext = { handleNext }
                            onPrev = { handlePrev }
                            formData = { formData }
                            setFormData = { setFormData }
                            />
                        )
                    } {
                        step === 3 && ( <
                            Education onNext = { handleNext }
                            onPrev = { handlePrev }
                            formData = { formData }
                            setFormData = { setFormData }
                            />
                        )
                    } {
                        step === 4 && ( <
                            Preview formData = { formData }
                            onPrev = { handlePrev }
                            onSubmit = { handleFormSubmit }
                            />
                        )
                    } <
                    /div>
            )
        } <
        />
);
}

export default App;