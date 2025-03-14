// Sicherstellen, dass alle Rezepte ein "tags"-Array haben
recipes = recipes.map(recipe => ({
    ...recipe,
    tags: recipe.tags || [] // Falls tags nicht existiert, setze es auf ein leeres Array
}));

// Aktualisiere die Daten in localStorage
localStorage.setItem('recipes', JSON.stringify(recipes));

// Initiale Rezepte mit Tags
let recipes = JSON.parse(localStorage.getItem('recipes')) || [
    { name: 'Lachs', details: 'Ein lachsiger Fisch', tags: ['Fisch', 'Gesund'] },
    { name: 'Dosenravioli', details: 'Beste wo gibt!', tags: ['Schnell', 'Camping'] },
];

  

// Zufälliges Rezept anzeigen 

document.getElementById('randomRecipeButton').addEventListener('click', () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    document.getElementById('recipeDisplay').innerHTML = `
        <h2>${randomRecipe.name}</h2>
        <p>${randomRecipe.details.replace(/\n/g, "<br>")}</p>
        <div>${randomRecipe.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</div>
    `;
});

  

// Neues Rezept hinzufügen
document.getElementById('addRecipeForm').addEventListener('submit', (event) => {
    event.preventDefault();
    
    const recipeName = document.getElementById('recipeName').value.trim();
    const recipeDetails = document.getElementById('recipeDetails').value.trim();
    const recipeTags = document.getElementById('recipeTags').value.split(',').map(tag => tag.trim()).filter(tag => tag);

    if (recipeName && recipeDetails) {
        recipes.push({ name: recipeName, details: recipeDetails, tags: recipeTags });
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

            <button type="submit">Änderungen speichern</button> 

        </form> 

    `; 

  

    document.getElementById('editRecipeForm').addEventListener('submit', (event) => { 

        event.preventDefault(); 

        const newRecipeName = document.getElementById('editRecipeName').value.trim(); 

        const newRecipeDetails = document.getElementById('editRecipeDetails').value.trim(); 

  

        if (newRecipeName && newRecipeDetails) { 

            recipes[index] = { name: newRecipeName, details: newRecipeDetails }; 

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

  

// Suchfunktion für alle Rezepte (nach Namen und Tags)
document.getElementById('searchAllRecipes').addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    displayAllRecipes(searchTerm);
});

  

// Suchfunktion für zu löschende Rezepte 

document.getElementById('searchDeleteRecipes').addEventListener('input', (event) => { 

    const searchTerm = event.target.value.toLowerCase(); 

    displayDeleteRecipes(searchTerm); 

}); 

  

// Funktion zum Anzeigen aller Rezepte mit optionaler Suche 

function displayAllRecipes(searchTerm = '') { 
    const allRecipesDisplay = document.getElementById('allRecipesDisplay');
    allRecipesDisplay.innerHTML = '';

    recipes.forEach((recipe, index) => {
        const recipeTags = Array.isArray(recipe.tags) ? recipe.tags : []; // Sicherstellen, dass tags immer ein Array ist

        const matchesName = recipe.name.toLowerCase().includes(searchTerm);
        const matchesTags = recipeTags.length > 0 && recipeTags.some(tag => tag.toLowerCase().includes(searchTerm));

        if (matchesName || matchesTags) { 
            const recipeElement = document.createElement('div');
            recipeElement.className = 'recipe-name';
            recipeElement.innerHTML = `<strong>${recipe.name}</strong> <br> ${recipeTags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}`;
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

