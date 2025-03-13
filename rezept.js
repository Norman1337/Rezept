// Initiale Rezepte 

let recipes = JSON.parse(localStorage.getItem('recipes')) || [ 

    { name: 'Spaghetti Bolognese', details: 'Ein klassisches italienisches Gericht...' }, 

    { name: 'Chicken Curry', details: 'Ein würziges indisches Gericht...' }, 

]; 

  

// Zufälliges Rezept anzeigen 

document.getElementById('randomRecipeButton').addEventListener('click', () => { 

    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)]; 

    document.getElementById('recipeDisplay').innerHTML = `<h2>${randomRecipe.name}</h2><p>${randomRecipe.details}</p>`; 

}); 

  

// Neues Rezept hinzufügen 

document.getElementById('addRecipeForm').addEventListener('submit', (event) => { 

    event.preventDefault(); 

    const recipeName = document.getElementById('recipeName').value.trim(); 

    const recipeDetails = document.getElementById('recipeDetails').value.trim(); 

  

    if (recipeName && recipeDetails) { 

        recipes.push({ name: recipeName, details: recipeDetails }); 

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

  

// Suchfunktion für alle Rezepte 

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

        if (recipe.name.toLowerCase().includes(searchTerm)) { 

            const recipeElement = document.createElement('div'); 

            recipeElement.className = 'recipe-name'; 

            recipeElement.textContent = recipe.name; 

            recipeElement.addEventListener('click', () => { 

                showRecipeDetails(index); 

            }); 

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

  

// Rezepte als JSON-Datei exportieren 

document.getElementById('exportRecipesButton').addEventListener('click', () => { 

    fetch('https://your-external-ip-address:3000/upload', { // Ändere die URL hier 

        method: 'POST', 

        headers: { 

            'Content-Type': 'application/json' 

        }, 

        body: JSON.stringify(recipes) 

    }) 

    .then(response => response.text()) 

    .then(data => { 

        alert(data); 

    }) 

    .catch(error => { 

        console.error('Fehler beim Exportieren der Rezepte:', error); 

    }); 

}); 

  

// Rezepte von JSON-Datei importieren 

document.getElementById('importRecipesButton').addEventListener('click', () => { 

    fetch('https://your-external-ip-address:3000/download') // Ändere die URL hier 

    .then(response => response.json()) 

    .then(data => { 

        recipes = data; 

        localStorage.setItem('recipes', JSON.stringify(recipes)); 

        alert('Rezepte importiert!'); 

        displayAllRecipes(); 

    }) 

    .catch(error => { 

        console.error('Fehler beim Importieren der Rezepte:', error); 

    }); 

}); 
