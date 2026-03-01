// Initiale Rezepte mit Kategorie
let recipes = JSON.parse(localStorage.getItem('recipes')) || [
    { name: 'Lachs', details: 'Ein lachsiger Fisch', category: 'Hauptspeise' },
    { name: 'Dosenravioli', details: 'Beste wo gibt!', category: 'Sonstiges' },
];

// Datenmigration: Alte Rezepte mit "tags" auf "category" umstellen
let needsMigration = false;
recipes = recipes.map(recipe => {
    if (recipe.tags) {
        needsMigration = true;
        // Bestimme Standard-Kategorie aus Tags oder setze "Sonstiges"
        let cat = 'Sonstiges';
        const tagsLower = recipe.tags.map(t => t.toLowerCase());
        if (tagsLower.includes('dessert') || tagsLower.includes('nachtisch')) cat = 'Dessert';
        else if (tagsLower.includes('hauptgericht') || tagsLower.includes('hauptspeise')) cat = 'Hauptspeise';
        else if (tagsLower.length > 0 && recipe.tags[0].length > 0) cat = 'Hauptspeise'; // Fallback

        return {
            name: recipe.name,
            details: recipe.details,
            category: cat
        };
    }
    // Sicherstellen, dass neue Rezepte immer eine Kategorie haben
    return {
        ...recipe,
        category: recipe.category || 'Sonstiges'
    };
});

if (needsMigration) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Aktualisiere die Daten in localStorage
localStorage.setItem('recipes', JSON.stringify(recipes));

// Zufälliges Rezept anzeigen 

document.getElementById('randomRecipeButton').addEventListener('click', () => {
    const searchTerm = document.getElementById('searchRandomRecipe').value.toLowerCase(); // Suchbegriff von der Eingabe abholen
    const checkedCategories = Array.from(document.querySelectorAll('.category-filter-random:checked')).map(cb => cb.value);

    const filteredRecipes = recipes.filter(recipe => {
        const matchesName = recipe.name.toLowerCase().includes(searchTerm);
        const matchesCat = checkedCategories.includes(recipe.category);
        return matchesName && matchesCat;
    });

    if (filteredRecipes.length > 0) {
        const randomRecipe = filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)];
        document.getElementById('recipeDisplay').innerHTML = `
            <h2>${randomRecipe.name}</h2>
            <p>${randomRecipe.details.replace(/\n/g, "<br>")}</p>
            <div><span class="category">${randomRecipe.category}</span></div>
        `;
    } else {
        alert("Kein Rezept mit den gewählten Tags gefunden.");
    }
});



// Neues Rezept hinzufügen
document.getElementById('addRecipeForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const recipeName = document.getElementById('recipeName').value.trim();
    const recipeDetails = document.getElementById('recipeDetails').value.trim();
    const recipeCategory = document.getElementById('recipeCategory').value;

    if (recipeName && recipeDetails && recipeCategory) {
        recipes.push({ name: recipeName, details: recipeDetails, category: recipeCategory });
        localStorage.setItem('recipes', JSON.stringify(recipes));
        document.getElementById('addRecipeForm').reset();
        alert('Rezept hinzugefügt!');
    } else {
        alert('Bitte füllen Sie alle Felder aus.');
    }
});



// Alle Rezepte anzeigen 

document.getElementById('showAllRecipesButton').addEventListener('click', () => {

    displayAllRecipes();

    document.getElementById('homePage').style.display = 'none';

    document.getElementById('allRecipesPage').style.display = 'block';

});



// Rezeptdetails anzeigen und bearbeiten 

function showRecipeDetails(index) {

    const recipe = recipes[index];

    document.getElementById('recipeDetailsDisplay').innerHTML = ` 

        <h2>${recipe.name}</h2> 

        <p>${recipe.details.replace(/\n/g, '<br>')}</p> 

        <button id="editRecipeButton">Rezept bearbeiten</button> 

    `;

    document.getElementById('allRecipesPage').style.display = 'none';

    document.getElementById('recipeDetailsPage').style.display = 'block';



    document.getElementById('editRecipeButton').addEventListener('click', () => {

        editRecipe(index);

    });

}



// Rezept bearbeiten 

function editRecipe(index) {
    const recipe = recipes[index];

    document.getElementById('recipeDetailsDisplay').innerHTML = `
        <h2>Rezept bearbeiten</h2>
        <form id="editRecipeForm">
            <label for="editRecipeName">Rezeptname:</label>
            <input type="text" id="editRecipeName" name="editRecipeName" value="${recipe.name}" required>

            <label for="editRecipeDetails">Details:</label>
            <textarea id="editRecipeDetails" name="editRecipeDetails" required>${recipe.details}</textarea>

            <label for="editRecipeCategory">Kategorie:</label>
            <select id="editRecipeCategory" name="editRecipeCategory" required>
                <option value="Hauptspeise" ${recipe.category === 'Hauptspeise' ? 'selected' : ''}>Hauptspeise</option>
                <option value="Dessert" ${recipe.category === 'Dessert' ? 'selected' : ''}>Dessert</option>
                <option value="Sonstiges" ${recipe.category === 'Sonstiges' ? 'selected' : ''}>Sonstiges</option>
            </select>

            <button type="submit">Änderungen speichern</button>
        </form>
    `;

    document.getElementById('editRecipeForm').addEventListener('submit', (event) => {
        event.preventDefault();

        const newRecipeName = document.getElementById('editRecipeName').value.trim();
        const newRecipeDetails = document.getElementById('editRecipeDetails').value.trim();
        const newRecipeCategory = document.getElementById('editRecipeCategory').value;

        if (newRecipeName && newRecipeDetails && newRecipeCategory) {
            recipes[index] = { name: newRecipeName, details: newRecipeDetails, category: newRecipeCategory };
            localStorage.setItem('recipes', JSON.stringify(recipes));
            alert('Rezept aktualisiert!');
            showRecipeDetails(index);
        } else {
            alert('Bitte füllen Sie alle Felder aus.');
        }
    });
}



// Zurück zur Startseite 

document.getElementById('backButton').addEventListener('click', () => {

    document.getElementById('homePage').style.display = 'block';

    document.getElementById('allRecipesPage').style.display = 'none';

});



// Zurück zur Rezeptliste 

document.getElementById('backToAllRecipesButton').addEventListener('click', () => {

    document.getElementById('recipeDetailsPage').style.display = 'none';

    document.getElementById('allRecipesPage').style.display = 'block';

});



// Rezepte löschen 

document.getElementById('deleteRecipeButton').addEventListener('click', () => {

    displayDeleteRecipes();

    document.getElementById('homePage').style.display = 'none';

    document.getElementById('deleteRecipePage').style.display = 'block';

});



// Rezept löschen 

function deleteRecipe(index) {

    recipes.splice(index, 1);

    localStorage.setItem('recipes', JSON.stringify(recipes));

    alert('Rezept gelöscht!');

    document.getElementById('deleteRecipePage').style.display = 'none';

    document.getElementById('homePage').style.display = 'block';

}



// Zurück zur Startseite vom Löschen 

document.getElementById('backToHomeButton').addEventListener('click', () => {

    document.getElementById('deleteRecipePage').style.display = 'none';

    document.getElementById('homePage').style.display = 'block';

});



// Suchfunktion für alle Rezepte (nach Namen und Kategorien)
document.getElementById('searchAllRecipes').addEventListener('input', () => {
    displayAllRecipes();
});

document.querySelectorAll('.category-filter').forEach(cb => {
    cb.addEventListener('change', () => {
        displayAllRecipes();
    });
});



// Suchfunktion für zu löschende Rezepte 

document.getElementById('searchDeleteRecipes').addEventListener('input', (event) => {

    const searchTerm = event.target.value.toLowerCase();

    displayDeleteRecipes(searchTerm);

});



// Funktion zum Anzeigen aller Rezepte mit Filtern 

function displayAllRecipes() {
    const searchTerm = document.getElementById('searchAllRecipes').value.toLowerCase();
    const checkedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);

    const allRecipesDisplay = document.getElementById('allRecipesDisplay');
    allRecipesDisplay.innerHTML = '';

    recipes.forEach((recipe, index) => {
        const matchesName = recipe.name.toLowerCase().includes(searchTerm);
        const matchesCat = checkedCategories.includes(recipe.category);

        if (matchesName && matchesCat) {
            const recipeElement = document.createElement('div');
            recipeElement.className = 'recipe-name';
            recipeElement.innerHTML = `<strong>${recipe.name}</strong> <br> <span class="category">${recipe.category}</span>`;
            recipeElement.addEventListener('click', () => { showRecipeDetails(index); });
            allRecipesDisplay.appendChild(recipeElement);
        }
    });
}




// Funktion zum Anzeigen der zu löschenden Rezepte mit optionaler Suche 

function displayDeleteRecipes(searchTerm = '') {

    const deleteRecipesDisplay = document.getElementById('deleteRecipesDisplay');

    deleteRecipesDisplay.innerHTML = '';

    recipes.forEach((recipe, index) => {

        if (recipe.name.toLowerCase().includes(searchTerm)) {

            const recipeElement = document.createElement('div');

            recipeElement.className = 'recipe-name';

            recipeElement.textContent = recipe.name;

            recipeElement.addEventListener('click', () => {

                if (confirm(`Bist du sicher, dass du das Rezept "${recipe.name}" löschen möchtest?`)) {

                    deleteRecipe(index);

                }

            });

            deleteRecipesDisplay.appendChild(recipeElement);

        }

    });

}

document.getElementById('exportRecipesButton').addEventListener('click', () => {
    const jsonData = JSON.stringify(recipes, null, 2); // Konvertiere Daten in JSON-Format
    const blob = new Blob([jsonData], { type: "application/json" }); // Erstelle Blob-Objekt
    const url = URL.createObjectURL(blob); // Erstelle Download-URL

    const a = document.createElement("a"); // Erstelle unsichtbaren <a>-Tag
    a.href = url;
    a.download = "rezepte.json"; // Dateiname für den Download
    document.body.appendChild(a);
    a.click(); // Simuliere den Klick auf den Download-Link
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Speicher wieder freigeben
});

document.getElementById('importRecipesButton').addEventListener('click', () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";

    input.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result); // JSON parsen
                if (Array.isArray(importedData)) {
                    recipes = importedData; // Daten in der App speichern
                    localStorage.setItem('recipes', JSON.stringify(recipes)); // Auch im LocalStorage speichern
                    alert("Rezepte erfolgreich importiert!");
                } else {
                    alert("Fehler: Ungültiges Datenformat.");
                }
            } catch (error) {
                alert("Fehler beim Importieren der Datei.");
            }
        };
        reader.readAsText(file);
    });

    input.click(); // Öffne Dateiauswahl
});

