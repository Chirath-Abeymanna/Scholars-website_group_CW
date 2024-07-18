let userData = {
    name: '',
    surname: '',
    age: '',
    gender: '',
    rationale: '',
    doa: '',
    task: '',
    place: '',
    assignmentType: '',
    areaOfStudy: '',
    degree: '',
    university: '',
    completionYear: '',
    country: ''
};

let currentStep = 1;

function showStartMessage() {
    if (currentStep === 1) {
        document.getElementById('startMessage').style.display = 'block';
    } else {
        document.getElementById('startMessage').style.display = 'none';
    }
}


showStartMessage();

function showStartButton() {
    document.getElementById('startButton').style.display = 'block';
}

showStartButton();

function start() {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('startMessage').style.display = 'none';
    showStep(currentStep);
}

function showStep(step) {
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(`step${step}`).classList.add('active');
}

function appendToDetails(key, value) {
    let userDetails = document.getElementById('userDetails');
    let detailItem = document.createElement('p');
    detailItem.innerHTML = `<strong>${key}:</strong> ${value}`;
    userDetails.appendChild(detailItem);
}

function goToSurname() {
    let nameInput = document.getElementById('nameInput').value.trim();
    if (nameInput !== "") {
        userData.name = nameInput;
        appendToDetails('Name', userData.name);
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Please enter your name.");
    }
}

function goToAge() {
    let surnameInput = document.getElementById('surnameInput').value.trim();
    if (surnameInput !== "") {
        userData.surname = surnameInput;
        appendToDetails('Surname', userData.surname);
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Please enter your surname.");
    }
}

function goToGender() {
    let ageInput = document.getElementById('ageInput').value.trim();
    if (ageInput !== "" && !isNaN(ageInput)) {
        userData.age = ageInput;
        appendToDetails('Age', userData.age);
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Please enter a valid age.");
    }
}

function goToStep2() {
    let genderInput = document.getElementById('genderInput').value.trim();
    if (genderInput !== "") {
        userData.gender = genderInput;
        appendToDetails('Gender', userData.gender);
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Please select your gender.");
    }
}


function goToRationale() {
    let rationaleInput = document.getElementById('rationaleInput').value.trim();
    if (rationaleInput !== "") {
        userData.rationale = rationaleInput;
        appendToDetails('Rationale', userData.rationale);
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Please enter your rationale.");
    }
}

function goToDateOfAvailability() {
    let rationaleInput = document.getElementById('rationaleInput').value.trim();
    if (rationaleInput !== "") {
        userData.rationale = rationaleInput;
        appendToDetails('Rationale', userData.rationale);
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Please enter your rationale.");
    }
}

function goToTask() {
    let doaInput = document.getElementById('doaInput').value.trim();
    if (doaInput !== "") {
        userData.doa = doaInput;
        appendToDetails('Date of Availability', userData.doa);
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Please enter the date of availability.");
    }
}

function goToPlace() {
    let taskInput = document.getElementById('taskInput').value.trim();
    if (taskInput !== "") {
        userData.task = taskInput;
        appendToDetails('Task', userData.task);
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Please enter the task.");
    }
}

function goToAssignmentType() {
    let placeInput = document.getElementById('placeInput').value.trim();
    if (placeInput !== "") {
        userData.place = placeInput;
        appendToDetails('Place', userData.place);
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Please enter the place.");
    }
}

function goToQualifications() {
    let assignmentTypeInput = document.getElementById('assignmentTypeInput').value.trim();
    if (assignmentTypeInput !== "") {
        userData.assignmentType = assignmentTypeInput;
        appendToDetails('Assignment Type', userData.assignmentType);
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Please enter the assignment type.");
    }
}

function goToDegree() {
    let areaInput = document.getElementById('areaInput').value.trim();
    if (areaInput !== "") {
        userData.areaOfStudy = areaInput;
        appendToDetails('Area of Study', userData.areaOfStudy);
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Please enter the area of study.");
    }
}

function goToUniversity() {
    let degreeInput = document.getElementById('degreeInput').value.trim();
    if (degreeInput !== "") {
        userData.degree = degreeInput;
        appendToDetails('Degree', userData.degree);
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Please enter the degree.");
    }
}

function goToCompletionYear() {
    let uniInput = document.getElementById('uniInput').value.trim();
    if (uniInput !== "") {
        userData.university = uniInput;
        appendToDetails('University/Institution', userData.university);
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Please enter the university/institution.");
    }
}

function goToCountry() {
    let yearInput = document.getElementById('yearInput').value.trim();
    if (yearInput !== "") {
        userData.completionYear = yearInput;
        appendToDetails('Completion Year', userData.completionYear);
        currentStep++;
        showStep(currentStep);
    } else {
        alert("Please enter the completion year.");
    }
}

function submitForm() {
    let countryInput = document.getElementById('countryInput').value.trim();
    if (countryInput !== "") {
        userData.country = countryInput;
        appendToDetails('Country', userData.country);
        showStep(15); // Confirmation step
    } else {
        alert("Please enter the country.");
    }
}

function skipStep() {
    currentStep++;
    showStep(currentStep);
}