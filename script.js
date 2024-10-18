const processSteps = {
    conveyorbeltreplacement: [
        "Check any damage condition in belt.",
        "Carry tools required.",
        "Verify belt spec.",
        "Spare availability.",
        "Apply LOTO.",
        "Check motor coupling removal.",
        "Replace belt.",
        "Tension adjustment.",
        "Alignment of idle pulley.",
        "Check idle run.",
        "LOTO removal.",
        "Power ON"



    ],
    encoderteaching: [
        "Put the machine in reference position.",
        "Select the axis which want to teach.",
        "Turn OFF the power.",
        "Remove the encoder cable of the selected axis.",
        "Connect Get B cable to encoder.",
        "Teach the encoder using get B.",
        "Remove the get B cable from encoder.",
        "Normalize the selected axis encoder cable.",
        "Turn ON the power.",
        "Again once put the reference position."



    ],
    backlasharresting: [
        "Touch the dial needle in respective axis.",
        "Set the dial as zero.",
        "Move the axis in jog mode in both axis.",
        "Identify the error of backlash.",
        "If backlash more thn 0.02 mm follow the steps.",
        "Check both drive end bearing conditions of ball screw.",
        "If ply in bearing replace with new one.",
        "Check the ball nut of ball screw.",
        "If ply in ball nut, replace the ball screw with nut.",
        "Repeat the backlash test once again & ensure within 0.02mm."


    ],
    plcprogrambackupupload: [
        "MPI or ethernet availability.",
        "Connect the PLC with laptop.",
        "Open simatic manager software in laptop.",
        "Select new project.",
        "Project name creation.",
        "Select storage location of PLC back up.",
        "Select PLC icon in software.",
        "Select - PG/PC interface.",
        "Select MPI/Ethernet as per communication cable used.",
        "Enter ok.",
        "Select PLC icon in software.",
        "Select upload option.",
        "Select scan.",
        "PLC CPU number will be displayed.",
        "Select ok."
    ]

};

const urlParams = new URLSearchParams(window.location.search);
const processType = urlParams.get('process');
const steps = processSteps[processType];
const correctOrder = [...steps];
let shuffledSteps = shuffleArray([...steps]);

const stepsContainer = document.getElementById('stepsContainer');
const message = document.getElementById('message');
const checkButton = document.getElementById('checkButton');
const resetButton = document.getElementById('resetButton');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createStepElements() {
    stepsContainer.innerHTML = '';
    shuffledSteps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.classList.add('step');
        stepDiv.setAttribute('draggable', true);
        stepDiv.textContent = step;
        stepDiv.dataset.index = index;

        stepDiv.addEventListener('dragstart', dragStart);
        stepDiv.addEventListener('dragend', dragEnd);
        stepDiv.addEventListener('dragover', dragOver);
        stepDiv.addEventListener('drop', drop);

        stepsContainer.appendChild(stepDiv);
    });
}

let draggedStep;

function dragStart(e) {
    draggedStep = this;
    setTimeout(() => {
        this.classList.add('dragging');
    }, 0);
}

function dragEnd() {
    this.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    if (this !== dragging) {
        this.parentNode.insertBefore(dragging, this);
    }
}

function drop(e) {
    e.preventDefault();
}

checkButton.addEventListener('click', () => {
    const userOrder = Array.from(stepsContainer.children).map(step => step.textContent);
    let correctCount = 0;

    Array.from(stepsContainer.children).forEach((stepDiv, index) => {
        if (userOrder[index] === correctOrder[index]) {
            stepDiv.classList.add('correct');
            stepDiv.innerHTML += ' <span class="symbol">✅</span>'; // Green checkmark
            correctCount++;
        } else {
            stepDiv.classList.add('incorrect');
            stepDiv.innerHTML += ' <span class="symbol">❌</span>'; // Red cross
        }
    });

    if (correctCount === correctOrder.length) {
        message.textContent = "Congratulations! You arranged the steps correctly!";
        resetButton.style.display = 'block';
        checkButton.disabled = true;
    } else {
        message.textContent = "Try again! Some steps are in the wrong order.";
        resetButton.style.display = 'block';
    }
});

resetButton.addEventListener('click', () => {
    shuffledSteps = shuffleArray([...steps]);
    createStepElements();
    message.textContent = '';
    resetButton.style.display = 'none';
    checkButton.disabled = false;

    // Clear any previous color indicators
    Array.from(stepsContainer.children).forEach(stepDiv => {
        stepDiv.classList.remove('correct', 'incorrect');
        stepDiv.innerHTML = stepDiv.textContent; // Reset the text
    });
});

function goBack() {
    window.location.href = "index.html";
}

createStepElements();
