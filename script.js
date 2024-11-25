class AnimalTable {
    constructor(tableId, data, sortOptions) {
        this.tableId = tableId;
        this.data = data;
        this.sortOptions = sortOptions;
        this.initTable();
    }

    initTable() {
        const container = document.getElementById(this.tableId);
        const table = document.createElement('table');
        table.className = 'table table-bordered table-striped';
        container.appendChild(this.createHeader());
        container.appendChild(this.createBody());
        container.appendChild(this.createAddForm());
        container.appendChild(table);
    }

    createHeader() {
        const header = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const columns = ['Species', 'Name', 'Size', 'Location', 'Actions'];

        columns.forEach((column, index) => {
            const th = document.createElement('th');
            th.textContent = column;

            // Add sort functionality where applicable
            if (this.sortOptions.includes(column.toLowerCase())) {
                th.style.cursor = 'pointer';
                th.addEventListener('click', () => this.sortTable(column.toLowerCase()));
            }

            headerRow.appendChild(th);
        });

        header.appendChild(headerRow);
        return header;
    }

    createBody() {
        const body = document.createElement('tbody');
        body.id = `${this.tableId}-body`;

        this.data.forEach((item, index) => {
            body.appendChild(this.createRow(item, index));
        });

        return body;
    }

    createRow(item, index) {
        const row = document.createElement('tr');

        Object.keys(item).forEach((key) => {
            const td = document.createElement('td');

            if (key === 'name') {
                // Apply bold/italic/blue styling based on table type
                if (this.tableId === 'dogsTable') {
                    td.className = 'bold';
                } else if (this.tableId === 'bigFishTable') {
                    td.className = 'italic-bold-blue';
                }
            }

            if (key === 'image') {
                const img = document.createElement('img');
                img.src = item[key];
                img.alt = item.name;
                td.appendChild(img);
            } else {
                td.textContent = item[key];
            }

            row.appendChild(td);
        });

        // Add actions (Edit/Delete)
        const actionTd = document.createElement('td');
        actionTd.innerHTML = `
          <button class="btn btn-warning btn-sm" onclick="editAnimal('${this.tableId}', ${index})">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteAnimal('${this.tableId}', ${index})">Delete</button>
        `;
        row.appendChild(actionTd);

        return row;
    }

    // createAddForm() {
    //     const form = document.createElement('form');
    //     form.className = 'mt-3';
    //     form.innerHTML = `
    //       <div class="row g-2">
    //         <div class="col">
    //           <input type="text" id="${this.tableId}-species" class="form-control" placeholder="Species" required>
    //         </div>
    //         <div class="col">
    //           <input type="text" id="${this.tableId}-name" class="form-control" placeholder="Name" required>
    //         </div>
    //         <div class="col">
    //           <input type="number" id="${this.tableId}-size" class="form-control" placeholder="Size (ft)" required>
    //         </div>
    //         <div class="col">
    //           <input type="text" id="${this.tableId}-location" class="form-control" placeholder="Location" required>
    //         </div>
    //         <div class="col">
    //           <button type="button" class="btn btn-primary" onclick="addAnimal('${this.tableId}')">Add</button>
    //         </div>
    //       </div>
    //     `;

    //     return form;
    // }

    sortTable(column) {
        this.data.sort((a, b) => {
            if (column === 'size') {
                return a.size - b.size;
            }
            return a[column].localeCompare(b[column]);
        });

        this.updateTable();
    }

    updateTable() {
        const body = document.getElementById(`${this.tableId}-body`);
        body.innerHTML = '';
        this.data.forEach((item, index) => {
            body.appendChild(this.createRow(item, index));
        });
    }
}

// Initialization
const bigCatsData = [
    { species: 'Big Cats', name: 'Tiger', size: 10, location: 'Asia', image: '/images/Alabai.png' },
    { species: 'Big Cats', name: 'Lion', size: 8, location: 'Africa', image: '/images/Caracal.png' },
    { species: 'Big Cats', name: 'Leopard', size: 5, location: 'Africa and Asia', image: '/images/Cheetah.png' },
    { species: 'Big Cats', name: 'Cheetah', size: 5, location: 'Africa', image: '/images/dog.png' },
    { species: 'Big Cats', name: 'Caracal', size: 3, location: 'Africa', image: '/images/German Shepherd.png' },
    { species: 'Big Cats', name: 'Jaguar', size: 5, location: 'Amazon', image: './images/Hammerhead Shark.png' }
];

const dogsData = [
    { species: 'Dog', name: 'Rottweiler', size: 2, location: 'Germany', image: '/images/German Shepherd.png' },
    { species: 'Dog', name: 'German Shepherd', size: 2, location: 'Germany', image: '/images/Hammerhead Shark.png' },
    { species: 'Dog', name: 'Labrador', size: 2, location: 'UK', image: '/images/Humpback Whale.png' },
];

const bigFishData = [
    { species: 'Big Fish', name: 'Humpback Whale', size: 15, location: 'Atlantic Ocean', image: './images/Humpback Whale.png' },
    { species: 'Big Fish', name: 'Killer Whale', size: 12, location: 'Atlantic Ocean', image: './images/Killer Whale.png' },
    { species: 'Big Fish', name: 'Tiger Shark', size: 8, location: 'Ocean', image: './images/Rotwailer.png' },
];

// Create table instances
new AnimalTable('bigCatsTable', bigCatsData, ['species', 'name', 'size', 'location']);
new AnimalTable('dogsTable', dogsData, ['name', 'location']);
new AnimalTable('bigFishTable', bigFishData, ['size']);

window.addAnimal = (tableId) => {
    const tableElement = document.getElementById(tableId);
    const speciesInput = document.getElementById(`${tableId}-species`);
    const nameInput = document.getElementById(`${tableId}-name`);
    const sizeInput = document.getElementById(`${tableId}-size`);
    const locationInput = document.getElementById(`${tableId}-location`);
    const imageInput = document.getElementById(`${tableId}-image`);

    // Fetch values from inputs
    const species = speciesInput.value.trim();
    const name = nameInput.value.trim();
    const size = parseFloat(sizeInput.value.trim());
    const location = locationInput.value.trim();
    const image = imageInput.files.length > 0 ? imageInput.files[0].name : 'default.jpg';

    // Validation
    if (!species || !name || isNaN(size) || !location) {
        alert("Please fill out all fields with valid values.");
        return;
    }

    if (size <= 0) {
        alert("Size must be a positive number.");
        return;
    }

    // Prevent duplicates (check if name already exists in the table)
    const existingNames = Array.from(tableElement.querySelectorAll("tbody tr td:nth-child(2)")).map(td => td.textContent.trim());
    if (existingNames.includes(name)) {
        alert("An animal with this name already exists in the table.");
        return;
    }

    // Add a new row to the table
    const tbody = tableElement.querySelector("tbody");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${species}</td>
        <td>${name}</td>
        <td>${size} ft</td>
        <td>${location}</td>
        <td><img src="${image}" alt="${name}" class="animal-image" style="width: 50px; height: 50px; border: 2px solid black;"></td>
        <td>
            <button class="btn btn-sm btn-primary" onclick="editAnimal('${tableId}', this)">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteAnimal('${tableId}', this)">Delete</button>
        </td>
    `;

    tbody.appendChild(newRow);

    // Clear input fields
    speciesInput.value = "";
    nameInput.value = "";
    sizeInput.value = "";
    locationInput.value = "";
    imageInput.value = "";

    alert("Animal added successfully!");
};


// window.editAnimal = (tableId, index) => {
//     // Implementation for editing animals
// };

// window.deleteAnimal = (tableId, index) => {
//     // Implementation for deleting animals
// };
