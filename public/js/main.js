const list = document.getElementById('recipe-list');

async function loadRecipes() {
  const res = await fetch('/api/recipes');
  const recipes = await res.json();
  list.innerHTML = '';
  recipes.forEach(r => {
    const li = document.createElement('li');
    li.textContent = `${r.en} / ${r.hi}`;
    
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteRecipe(r.id);

    const updateBtn = document.createElement('button');
    updateBtn.textContent = 'Update';
    updateBtn.onclick = () => updateRecipe(r.id);

    li.appendChild(delBtn);
    li.appendChild(updateBtn);
    list.appendChild(li);
  });
}

async function addRecipe() {
  const en = document.getElementById('en').value;
  const hi = document.getElementById('hi').value;

  await fetch('/api/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ en, hi })
  });
  loadRecipes();
}

async function deleteRecipe(id) {
  await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
  loadRecipes();
}

async function updateRecipe(id) {
  const en = prompt('Enter English name');
  const hi = prompt('Enter Hindi name');
  if (!en || !hi) return;
  await fetch(`/api/recipes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ en, hi })
  });
  loadRecipes();
}

loadRecipes();
