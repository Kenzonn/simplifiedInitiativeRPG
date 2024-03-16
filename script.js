const inputBox = document.getElementById("input-box");
const initiative = document.getElementById("initiative-container");

function addChar() {
    if (inputBox.value === "") {
        alert("Please enter a name");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value; // Prefer textContent for text
        li.setAttribute('draggable', 'true');
        
        // Handle drag start
        li.addEventListener('dragstart', () => {
            li.classList.add('dragging');
        });

        // Handle drag end
        li.addEventListener('dragend', () => {
            li.classList.remove('dragging');
        });

        // Append close button
        let span = document.createElement("span");
        span.textContent = "\u00D7"; // Use textContent for consistency
        span.className = "close"; // Example class name for styling
        li.appendChild(span);

        // Append li to the list
        initiative.appendChild(li);

        // Clear input box
        inputBox.value = "";
    }
}

// Toggle "dead" class or remove item on click
initiative.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("dead");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
}, false);

// Drag and drop functionality
document.addEventListener('DOMContentLoaded', () => {
    initiative.addEventListener('dragover', event => {
        event.preventDefault();
        const afterElement = getDragAfterElement(initiative, event.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            initiative.appendChild(draggable);
        } else {
            initiative.insertBefore(draggable, afterElement);
        }
    });
});

// Function to find the closest element based on cursor position
function getDragAfterElement(list, y) {
    const draggableElements = [...list.querySelectorAll('li:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
